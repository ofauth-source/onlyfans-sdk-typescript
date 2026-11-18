/* eslint-disable */
/**
 * Media uploads: start an upload, PUT each part, then finalize.
 */

import { DEFAULT_TIMEOUT_MS, OFAuthError, isRecord, request } from './runtime';
import type { OFAuthConfig } from './runtime';
import { OPERATION_SCOPES } from './operations';
import type { AccessUploadsFinalizeResponse, AccessUploadsStartResponse } from './client';

/** Vault media returned when the file is already in the vault (`access.uploads.start`). */
export type UploadedMedia = Extract<AccessUploadsStartResponse, { status: 'already_exists' }>['media'];

/** Minimum per-attempt timeout for each part PUT, in milliseconds. */
export const UPLOAD_PART_MIN_TIMEOUT_MS = 300_000;

export interface UploadMediaOptions {
  /** Original file name, including its extension. */
  filename: string;
  /** MIME type, e.g. `image/jpeg` or `video/mp4`. Taken from a `Blob` when omitted. */
  contentType?: string;
  /** Linked account to upload to. Defaults to the client's. */
  linkedAccountId?: string;
  /**
   * File hash used to find media already in the vault. Defaults to the MD5 hex
   * digest of the file.
   */
  etag?: string;
  /** Also save the upload to the vault (and optionally a vault list). */
  vaultUpload?: { userId: string; listId?: number };
  /** Called after each part with the bytes uploaded so far. */
  onProgress?: (uploadedBytes: number, totalBytes: number) => void;
  signal?: AbortSignal;
  /** Per-attempt timeout in milliseconds. Part PUTs use at least 300 000. */
  timeout?: number;
  /** Override the client's `maxRetries` for every request of the upload. */
  maxRetries?: number;
}

export type UploadMediaResult =
  | {
      /** The file was already in the vault; nothing was uploaded. */
      status: 'already_exists';
      media: UploadedMedia;
      /** Use in `mediaItems` for posts, messages, and stories. */
      mediaId: number;
    }
  | {
      status: 'uploaded';
      /** Use in `mediaItems` for posts, messages, and stories. */
      uploadId: string;
      /** The `access.uploads.finalize` response, with vault media when `vaultUpload` was set. */
      finalize: AccessUploadsFinalizeResponse;
      /**
       * With `vaultUpload`: the numeric vault media ids created, e.g. for
       * `access.vault.media.hide`. Undefined without `vaultUpload`.
       */
      vaultMediaIds?: number[];
    };

async function toBytes(data: Uint8Array | ArrayBuffer | Blob): Promise<Uint8Array> {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return new Uint8Array(await data.arrayBuffer());
}

/**
 * Upload a file: start, upload every part, finalize. Media that already
 * exists in the vault is returned without uploading.
 */
export async function uploadMedia(
  config: OFAuthConfig,
  data: Uint8Array | ArrayBuffer | Blob,
  options: UploadMediaOptions,
): Promise<UploadMediaResult> {
  if (!options?.filename) throw new OFAuthError('uploadMedia needs a filename');
  const bytes = await toBytes(data);
  const contentType = options.contentType ?? (typeof Blob !== 'undefined' && data instanceof Blob ? data.type : '');
  if (!contentType) throw new OFAuthError('uploadMedia needs a contentType');
  const common = {
    linkedAccount: true,
    linkedAccountId: options.linkedAccountId,
    signal: options.signal,
    maxRetries: options.maxRetries,
    requiredScope: OPERATION_SCOPES['access.uploads.start'] ?? undefined,
  };
  const timeout = options.timeout ?? config.timeout ?? DEFAULT_TIMEOUT_MS;

  const start = await request<AccessUploadsStartResponse>(config, {
    ...common,
    timeout,
    operation: 'access.uploads.start',
    headers: { 'idempotency-key': crypto.randomUUID() },
    method: 'POST',
    path: '/v3/access/uploads/start',
    body: { filename: options.filename, etag: options.etag ?? md5Hex(bytes), size: bytes.byteLength, contentType },
  });

  if (start.status === 'already_exists') {
    return { status: 'already_exists', media: start.media, mediaId: start.media?.id };
  }
  if (start.status !== 'needs_upload' || typeof start.uploadId !== 'string') {
    throw new OFAuthError(`Unexpected upload start status: ${String((start as { status?: unknown }).status)}`);
  }

  let uploaded = 0;
  for (const part of start.parts) {
    const chunk = bytes.subarray(part.byteRange.start, part.byteRange.end + 1);
    await request(config, {
      ...common,
      // Parts are large: allow at least five minutes per attempt.
      timeout: Math.max(timeout, UPLOAD_PART_MIN_TIMEOUT_MS),
      method: 'PUT',
      path: new URL(part.uploadUrl).pathname,
      url: part.uploadUrl,
      rawBody: chunk as unknown as BodyInit,
      contentType,
    });
    uploaded += chunk.byteLength;
    options.onProgress?.(uploaded, bytes.byteLength);
  }

  const finalize = await request<AccessUploadsFinalizeResponse>(config, {
    ...common,
    timeout,
    operation: 'access.uploads.finalize',
    headers: { 'idempotency-key': crypto.randomUUID() },
    method: 'POST',
    path: '/v3/access/uploads/finalize',
    body: { uploadIds: [start.uploadId], ...(options.vaultUpload ? { vaultUpload: options.vaultUpload } : {}) },
  });
  return {
    status: 'uploaded',
    uploadId: start.uploadId,
    finalize,
    ...(options.vaultUpload ? { vaultMediaIds: vaultMediaIdsOf(finalize) } : {}),
  };
}

/** Numeric vault media ids in a finalize response: `uploads[].mediaId`, else `mediaIds` or `media[].id`. */
function vaultMediaIdsOf(finalize: unknown): number[] {
  if (!isRecord(finalize)) return [];
  const ids: unknown[] = Array.isArray(finalize.uploads)
    ? finalize.uploads.map((upload: unknown) => (isRecord(upload) ? upload.mediaId ?? upload.media?.id : undefined))
    : Array.isArray(finalize.mediaIds)
      ? finalize.mediaIds
      : Array.isArray(finalize.media)
        ? finalize.media.map((media: unknown) => (isRecord(media) ? media.id : undefined))
        : [];
  return ids.flatMap((id) => {
    const n = typeof id === 'string' && id !== '' ? Number(id) : id;
    return typeof n === 'number' && Number.isInteger(n) ? [n] : [];
  });
}

// ============================================================================
// MD5 (RFC 1321). WebCrypto has no MD5, and the vault lookup expects it.
// ============================================================================

const S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
const K = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) >>> 0);

/** MD5 hex digest. */
export function md5Hex(input: Uint8Array): string {
  const length = input.byteLength;
  const padded = new Uint8Array((((length + 8) >> 6) + 1) * 64);
  padded.set(input);
  padded[length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 8, (length * 8) >>> 0, true);
  view.setUint32(padded.length - 4, Math.floor(length / 0x20000000), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;
  const m = new Uint32Array(16);

  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i++) m[i] = view.getUint32(offset + i * 4, true);
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;
    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const shift = S[(i >> 4) * 4 + (i % 4)];
      const sum = (a + f + K[i] + m[g]) >>> 0;
      a = d;
      d = c;
      c = b;
      b = (b + ((sum << shift) | (sum >>> (32 - shift)))) >>> 0;
    }
    a0 = (a0 + a) >>> 0;
    b0 = (b0 + b) >>> 0;
    c0 = (c0 + c) >>> 0;
    d0 = (d0 + d) >>> 0;
  }

  const out = new DataView(new ArrayBuffer(16));
  [a0, b0, c0, d0].forEach((word, i) => out.setUint32(i * 4, word, true));
  return Array.from(new Uint8Array(out.buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
