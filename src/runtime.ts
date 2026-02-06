/* eslint-disable */
/**
 * OFAuth API
 * TypeScript SDK v2 - Nested client structure
 */

export const BASE_PATH = "https://api-next.ofauth.com";

export interface OFAuthConfig {
  apiKey: string;
  basePath?: string;
  connectionId?: string;
  fetchApi?: typeof fetch;
}

export interface RequestConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  connectionId?: string;
}

export interface PaginatedResponse<T> {
  list: T[];
  hasMore: boolean;
  nextOffset?: number;
}

export interface MarkerPaginatedResponse<T> {
  list: T[];
  hasMore: boolean;
  marker?: string;
}

export interface PaginationOptions {
  maxItems?: number;
  pageSize?: number;
}

export class OFAuthAPIError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: any;
  readonly response: Response;

  constructor(response: Response, body?: { message?: string; code?: string; details?: any }) {
    super(body?.message || `HTTP ${response.status}: ${response.statusText}`);
    this.name = 'OFAuthAPIError';
    this.status = response.status;
    this.code = body?.code;
    this.details = body?.details;
    this.response = response;
  }
}

function buildQueryString(params: Record<string, any>): string {
  const entries: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        entries.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      }
    } else {
      entries.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  return entries.length > 0 ? `?${entries.join('&')}` : '';
}

export async function request<T>(config: OFAuthConfig, reqConfig: RequestConfig): Promise<T> {
  const fetchFn = config.fetchApi || fetch;
  const basePath = config.basePath || BASE_PATH;
  const connectionId = reqConfig.connectionId || config.connectionId;

  const url = basePath + reqConfig.path + (reqConfig.query ? buildQueryString(reqConfig.query) : '');
  
  const headers: Record<string, string> = {
    'apiKey': config.apiKey,
    ...reqConfig.headers,
  };

  if (connectionId) {
    headers['x-connection-id'] = connectionId;
  }

  if (reqConfig.body && typeof reqConfig.body === 'object' && 
      !(reqConfig.body instanceof FormData) && !(reqConfig.body instanceof Blob)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetchFn(url, {
    method: reqConfig.method,
    headers,
    body: reqConfig.body instanceof FormData || reqConfig.body instanceof Blob 
      ? reqConfig.body 
      : reqConfig.body ? JSON.stringify(reqConfig.body) : undefined,
  });

  if (!response.ok) {
    let errorBody: any;
    try { errorBody = await response.json(); } catch {}
    throw new OFAuthAPIError(response, errorBody);
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  
  if (response.status === 204) return {} as T;
  return response.text() as unknown as T;
}

export type ItemType<T> = T extends { list: Array<infer U> } ? U : never;

export interface ProxyRequestOptions {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, any>;
  body?: any;
  connectionId?: string;
}

export async function proxy<T = any>(config: OFAuthConfig, opts: ProxyRequestOptions): Promise<T> {
  const fetchFn = config.fetchApi || fetch;
  const basePath = config.basePath || BASE_PATH;
  
  let targetPath = opts.path;
  if (targetPath.startsWith('/api2/v2')) {
    targetPath = targetPath.slice(8);
  } else if (targetPath.startsWith('api2/v2')) {
    targetPath = '/' + targetPath.slice(7);
  }
  
  if (!targetPath.startsWith('/')) {
    targetPath = '/' + targetPath;
  }
  
  let url = basePath + '/v2/access/proxy' + targetPath;
  
  if (opts.query) {
    url += buildQueryString(opts.query);
  }
  
  const headers: Record<string, string> = {
    'apiKey': config.apiKey,
  };
  
  const connectionId = opts.connectionId || config.connectionId;
  if (connectionId) {
    headers['x-connection-id'] = connectionId;
  }
  
  if (opts.body && typeof opts.body === 'object' && 
      !(opts.body instanceof FormData) && !(opts.body instanceof Blob)) {
    headers['Content-Type'] = 'application/json';
  }
  
  const response = await fetchFn(url, {
    method: opts.method,
    headers,
    body: opts.body instanceof FormData || opts.body instanceof Blob 
      ? opts.body 
      : opts.body ? JSON.stringify(opts.body) : undefined,
  });
  
  if (!response.ok) {
    let errorBody: any;
    try { errorBody = await response.json(); } catch {}
    throw new OFAuthAPIError(response, errorBody);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  
  if (response.status === 204) return {} as T;
  return response.text() as unknown as T;
}
