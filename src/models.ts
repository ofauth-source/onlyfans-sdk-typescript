/* eslint-disable */
/**
 * OFAuth V3 API models. Generated from the OpenAPI spec; do not edit.
 */

/**
 * An OAuth scope. Request only what you need; Code exchange always returns a refresh token.
 */
export type Scope =
  | "analytics:read"
  | "finances:read"
  | "identity:read"
  | "lists:read"
  | "lists:write"
  | "messages:read"
  | "messages:write"
  | "notifications:read"
  | "notifications:write"
  | "posts:read"
  | "posts:write"
  | "profile:read"
  | "profile:write"
  | "promotions:read"
  | "promotions:write"
  | "queue:read"
  | "queue:write"
  | "stories:read"
  | "stories:write"
  | "subscribers:read"
  | "subscribers:write"
  | "subscriptions:read"
  | "subscriptions:write"
  | "users:read"
  | "users:write"
  | "vault:read"
  | "vault:write";

/**
 * Every supported action scope.
 */
export const SCOPES: readonly Scope[] = ["analytics:read","finances:read","identity:read","lists:read","lists:write","messages:read","messages:write","notifications:read","notifications:write","posts:read","posts:write","profile:read","profile:write","promotions:read","promotions:write","queue:read","queue:write","stories:read","stories:write","subscribers:read","subscribers:write","subscriptions:read","subscriptions:write","users:read","users:write","vault:read","vault:write"];

export type AccessError400 = RuntimeError & {
  /**
   * Stable error code: `provider_request_rejected` (`correct_request` or `check_request`).
   */
  error?: "provider_request_rejected";
};

export type AccessError401 = RuntimeError & {
  /**
   * Stable error code: `authorization_required` (`restart_authorization`), `external_oauth_bearer_required` (`obtain_external_oauth_token`), `grant_revoked_or_expired` (`restart_authorization`), `invalid_token` (`obtain_external_oauth_token`), `linked_account_reconnect_required` (`reconnect_linked_account`).
   */
  error?: "authorization_required" | "external_oauth_bearer_required" | "grant_revoked_or_expired" | "invalid_token" | "linked_account_reconnect_required";
};

export type AccessError403 = RuntimeError & {
  /**
   * Stable error code: `additional_consent_required` (`request_additional_consent`), `authorization_required` (`restart_authorization`), `client_deleted` (`contact_integration_owner`), `integration_not_approved` (`complete_integration_approval`), `integration_suspended` (`contact_integration_owner`), `linked_account_not_granted` (`grant_linked_account`), `linked_account_required` (`select_linked_account`), `missing_scope` (`request_additional_consent`), `provider_request_rejected` (`do_not_repeat`), `security_suspended` (`contact_integration_owner`), `subscription_required` (`update_developer_plan`).
   */
  error?: "additional_consent_required" | "authorization_required" | "client_deleted" | "integration_not_approved" | "integration_suspended" | "linked_account_not_granted" | "linked_account_required" | "missing_scope" | "provider_request_rejected" | "security_suspended" | "subscription_required";
};

export type AccessError404 = RuntimeError & {
  /**
   * Stable error code: `provider_resource_not_found` (`check_resource`).
   */
  error?: "provider_resource_not_found";
};

export type AccessError409 = RuntimeError & {
  /**
   * Stable error code: `capability_execution_completed` (`do_not_repeat`).
   */
  error?: "capability_execution_completed";
};

export type AccessError429 = RuntimeError & {
  /**
   * Stable error code: `quota_exhausted` (`retry_after_reset`), `rate_limited` (`retry`).
   */
  error?: "quota_exhausted" | "rate_limited";
};

export type AccessError503 = RuntimeError & {
  /**
   * Stable error code: `authorization_temporarily_unavailable` (`retry`), `capability_execution_failed` (`restart_upload`), `capability_execution_in_progress` (`retry`), `capability_execution_unavailable` (`retry`), `provider_maintenance` (`retry`), `provider_outcome_unknown` (`do_not_repeat`), `transient_provider_failure` (`retry`).
   */
  error?: "authorization_temporarily_unavailable" | "capability_execution_failed" | "capability_execution_in_progress" | "capability_execution_unavailable" | "provider_maintenance" | "provider_outcome_unknown" | "transient_provider_failure";
};

/**
 * Returned by some Access handlers (uploads, Sandbox data, user lookups, request body parsing) instead of `RuntimeError`: `error` is a message, so branch on the HTTP status and `type`.
 */
export type AccessHandlerError = {
  /**
   * Human-readable message.
   */
  error: string;
  message?: string;
  requestId?: string;
  success?: false;
  /**
   * Error class.
   */
  type?: "UNAUTHORIZED" | "SESSION_NOT_PROVIDED" | "RULES_OUTDATED" | "SESSION_EXPIRED" | "PROXY_ERROR" | "UPSTREAM_MAINTENANCE" | "NETWORK_ERROR" | "UNKNOWN_ERROR" | "RESOURCE_NOT_FOUND" | "ROUTE_NOT_FOUND" | "BAD_REQUEST" | "RATE_LIMIT_EXCEEDED" | "SPEND_LIMIT_REACHED" | "FORBIDDEN" | "PROVIDER_FORBIDDEN" | "UPLOAD_ERROR";
};

export type AvatarThumbs = {
  c144: string;
  c50: string;
};

export type Bundle = {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number | string;
};

export type Chargeback = {
  createdAt: string;
  id: number;
  payment: ChargebackPayment | null;
  paymentType: string | null;
};

export type ChargebackPage = {
  items: Array<Chargeback>;
  page: CursorPage;
};

export type ChargebackPayment = {
  amounts: TransactionAmounts;
  createdAt: string | null;
  currency: string | null;
  description: string | null;
  id: string | null;
  status: string | null;
  user: TransactionUser | null;
};

export type ChartPoint = {
  count: number;
  date: string;
};

export type Chat = {
  canGoToProfile?: boolean;
  canSendMessage?: boolean;
  cannotSendReason?: string | null;
  hasPurchasedFeed?: boolean;
  hasUnreadTips?: boolean;
  lastMessage?: Message;
  lastReadMessageId?: number | string;
  mutedNotifications?: boolean;
  pinnedMessagesCount?: number;
  unreadCount?: number;
  user: ChatUser;
};

export type ChatPage = {
  items: Array<Chat>;
  page: CursorPage;
};

/**
 * An OnlyFans user in a chat. Only `id` is always present. Chat lists (`GET /chats`, `/chats/priority`, `/chats/unread`, `/chats/with-tips`) return only `id` by default; send `include_users=true` to get each chat's `user` and `lastMessage.sender` with their profile fields (the same profile `GET /users/:userId` returns). The profile fields are set only when OnlyFans includes them.
 */
export type ChatUser = {
  avatar?: string | null;
  avatarThumbs?: Record<string, string> | null;
  displayName?: string | null;
  id: number;
  isVerified?: boolean | null;
  lastSeen?: string | null;
  name?: string | null;
  username?: string | null;
};

/**
 * Reference to an OnlyFans user. Only `id` is guaranteed; other user fields may be present.
 */
export type ChatUserRef = {
  id: number;
};

export type ContentStats = {
  commentChart: Array<ChartPoint>;
  commentCount: number;
  hasStats: boolean;
  hasVideo?: boolean;
  isAvailable: boolean;
  likeChart: Array<ChartPoint>;
  likeCount: number;
  lookChart: Array<ChartPoint>;
  lookCount: number;
  lookDuration: number;
  lookDurationAverage: number;
  purchasedCount: number;
  purchasedSumm: number;
  tipChart: Array<ChartPoint>;
  tipCount: number;
  tipSum: number;
  uniqueLookChart: Array<ChartPoint>;
  uniqueLookCount: number;
};

export type CursorPage = {
  /**
   * Cursor used for the current page request. Pass this value as `cursor` to retrieve the same page again.
   */
  cursor?: string | null;
  hasMore: boolean;
  nextCursor: string | null;
};

export type EarningsChart = {
  monthlyTotal?: Array<{
    date: string;
    gross: number;
    net: number;
  }>;
  [key: string]: unknown;
};

export type EarningsChartSection = {
  chartAmount: Array<ChartPoint>;
  chartCount?: Array<ChartPoint>;
  delta?: number;
  gross?: number;
  total: number;
};

export type LifecycleAuthorizationGrantedData = {
  authorization_id: string;
  linked_account_ids: Array<string>;
  reason: "authorized";
} | {
  authorization_id: string;
  linked_account_count: number;
  linked_account_ids_truncated: true;
  linked_accounts_url: "/v3/linked-accounts";
  reason: "authorized";
};

/**
 * The owner approved your app and a new authorization was created. Lists the linked account IDs it covers, or tells you to fetch the list when there are more than 100.
 */
export type LifecycleAuthorizationGrantedEnvelope = {
  authorizationId: string;
  data: LifecycleAuthorizationGrantedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: null;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "authorization.granted";
};

export type LifecycleAuthorizationRevokedData = {
  authorization_id: string;
  linked_account_ids: Array<string>;
  reason: "owner_revoked" | "oauth_revocation" | "refresh_token_replay" | "integration_deleted" | "integration_suspended";
} | {
  authorization_id: string;
  linked_account_count: number;
  linked_account_ids_truncated: true;
  reason: "owner_revoked" | "oauth_revocation" | "refresh_token_replay" | "integration_deleted" | "integration_suspended";
};

/**
 * The whole authorization ended: the owner revoked it, its last session was revoked through the OAuth revoke endpoint, or the integration was deleted or suspended. Every linked account it covered stops working for your app.
 */
export type LifecycleAuthorizationRevokedEnvelope = {
  authorizationId: string;
  data: LifecycleAuthorizationRevokedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: null;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "authorization.revoked";
};

export type LifecycleAuthorizationUpdatedData = {
  added_linked_account_ids: Array<string>;
  authorization_id: string;
  reason: "consent_updated" | "auto_added";
  removed_linked_account_ids: Array<string>;
  scopes_changed: boolean;
} | {
  authorization_id: string;
  linked_account_count: number;
  linked_account_ids_truncated: true;
  linked_accounts_url: "/v3/linked-accounts";
  reason: "consent_updated" | "auto_added";
  scopes_changed: boolean;
};

/**
 * The owner consented again and added or removed linked accounts or changed scopes, or the authorization shared a newly linked account automatically (reason auto_added).
 */
export type LifecycleAuthorizationUpdatedEnvelope = {
  authorizationId: string;
  data: LifecycleAuthorizationUpdatedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: null;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "authorization.updated";
};

export type LifecycleLinkedAccountDisconnectedData = {
  authorization_id: string;
  linked_account_id: string;
  reason: "owner_removed" | "owner_disconnected" | "owner_deleted" | "developer_deleted";
};

/**
 * One linked account no longer works for this authorization: the owner removed, disconnected, or deleted it, or you deleted it through the API.
 */
export type LifecycleLinkedAccountDisconnectedEnvelope = {
  authorizationId: string;
  data: LifecycleLinkedAccountDisconnectedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "linked_account.disconnected";
};

export type LifecycleLinkedAccountExpiredData = {
  authorization_id: string;
  linked_account_id: string;
  reason: "provider_session_expired";
};

/**
 * One linked account needs a reconnect. Access remains granted, but no operation may use the account until the owner reconnects it.
 */
export type LifecycleLinkedAccountExpiredEnvelope = {
  authorizationId: string;
  data: LifecycleLinkedAccountExpiredData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "linked_account.expired";
};

export type LifecycleLinkedAccountReconnectedData = {
  authorization_id: string;
  linked_account_id: string;
  reason: "reconnected";
};

/**
 * One linked account is usable again after the owner reconnected it.
 */
export type LifecycleLinkedAccountReconnectedEnvelope = {
  authorizationId: string;
  data: LifecycleLinkedAccountReconnectedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "linked_account.reconnected";
};

export type LifecycleWebhookEventEnvelope = LifecycleAuthorizationGrantedEnvelope | LifecycleAuthorizationUpdatedEnvelope | LifecycleAuthorizationRevokedEnvelope | LifecycleLinkedAccountExpiredEnvelope | LifecycleLinkedAccountReconnectedEnvelope | LifecycleLinkedAccountDisconnectedEnvelope;

export type LinkAuthorization = {
  id: string;
  linked_accounts: LinkedAccountsPage;
  scope: string;
};

export type LinkAuthorizationError = {
  /**
   * RFC 6749 section 4.1.2.1 error code returned directly when the request cannot be bound to a registered redirect URI.
   */
  error: "invalid_request" | "invalid_scope" | "unauthorized_client" | "access_denied";
  reason?: string;
};

export type LinkAuthorizationServerMetadata = {
  authorization_endpoint: string;
  authorization_response_iss_parameter_supported: true;
  code_challenge_methods_supported: Array<"S256">;
  grant_types_supported: Array<"authorization_code" | "refresh_token">;
  issuer: string;
  registration_endpoint: string;
  response_types_supported: Array<"code">;
  revocation_endpoint: string;
  revocation_endpoint_auth_methods_supported: Array<"client_secret_basic" | "client_secret_post">;
  scopes_supported: Array<string>;
  token_endpoint: string;
  token_endpoint_auth_methods_supported: Array<"client_secret_basic" | "client_secret_post">;
  userinfo_endpoint: string;
};

export type LinkOAuthError = {
  /**
   * RFC 6749 section 5.2 error code.
   */
  error: "invalid_request" | "invalid_client" | "invalid_grant" | "invalid_scope" | "invalid_target" | "unauthorized_client" | "unsupported_grant_type" | "rate_limited" | "server_error";
  error_description?: string;
  /**
   * Present when the client lifecycle blocks the grant.
   */
  reason?: string;
  recovery?: {
    action: string;
  };
};

/**
 * Deprecated alias of `RuntimeError`.
 */
export type LinkRuntimeError = RuntimeError;

export type LinkTokenResponse = {
  /**
   * Opaque access token. Present it only as a Bearer resource credential.
   */
  access_token: string;
  /**
   * Informational authorization identifier. Discover accounts through GET /v3/linked-accounts.
   */
  authorization_id?: string;
  expires_in: number;
  /**
   * Stable renewable credential bound to this confidential client. Returned on every code exchange and echoed on refresh. Expires after 90 days without successful authenticated refresh.
   */
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
};

export type LinkUserInfo = {
  email?: string;
  email_verified?: boolean;
  id: string;
  name?: string;
  picture?: string | null;
  sub: string;
};

export type LinkedAccount = {
  display_name: string | null;
  granted_at: string;
  id: string;
  provider: string;
  provider_account_id: string;
  scopes: Array<string>;
  status: "connected" | "needs_reconnect" | "disconnected";
  username: string | null;
};

export type LinkedAccountReconnectError400 = RuntimeError & {
  /**
   * Stable error code: `invalid_redirect_uri` (`correct_request`), `invalid_request`.
   */
  error?: "invalid_redirect_uri" | "invalid_request";
};

export type LinkedAccountReconnectError409 = RuntimeError & {
  /**
   * Stable error code: `linked_account_reconnect_not_required`, `linked_account_reconnect_unavailable`.
   */
  error?: "linked_account_reconnect_not_required" | "linked_account_reconnect_unavailable";
};

export type LinkedAccountReconnectJourney = {
  authorization_id: string;
  expires_at: string;
  linked_account_id: string;
  url: string;
};

export type LinkedAccountReconnectRequest = {
  redirect_uri: string;
  state: string;
};

export type LinkedAccountSettings = {
  linked_account_id: string;
  vault_plus: {
    /**
     * Qualities your Developer plan includes.
     */
    allowed_qualities: {
      image_qualities: Array<"thumb" | "preview" | "full">;
      video_qualities: Array<"preview" | "720p" | "1080p" | "source">;
    };
    /**
     * Settings Vault+ applies: integration settings, then this account's overrides, limited to your plan's qualities.
     */
    effective: {
      /**
       * Retained media not read for this many days is removed.
       */
      access_expiry_days: number;
      /**
       * Retain message media automatically.
       */
      auto_cache_messages: boolean;
      /**
       * Retain post media automatically.
       */
      auto_cache_posts: boolean;
      /**
       * Retain story media automatically.
       */
      auto_cache_stories: boolean;
      /**
       * Retain vault media automatically.
       */
      auto_cache_vault: boolean;
      /**
       * Retain audio.
       */
      cache_audio: boolean;
      /**
       * Retain images.
       */
      cache_images: boolean;
      /**
       * Retain videos.
       */
      cache_videos: boolean;
      /**
       * Image qualities to retain. Only qualities your Developer plan includes are accepted.
       */
      image_qualities: Array<"thumb" | "preview" | "full">;
      /**
       * Accesses before message media is retained.
       */
      min_access_count_messages: number;
      /**
       * Accesses before post media is retained.
       */
      min_access_count_posts: number;
      /**
       * Accesses before story media is retained.
       */
      min_access_count_stories: number;
      /**
       * Accesses before vault media is retained.
       */
      min_access_count_vault: number;
      /**
       * Lifetime of download URLs, in seconds.
       */
      presigned_url_ttl_seconds: number;
      /**
       * Days retained media is kept.
       */
      retention_days: number;
      /**
       * Storage limit for this account in bytes; 0 means no account limit.
       */
      storage_limit_bytes: number;
      /**
       * What happens at the storage limit. `block_new` stops retaining new media.
       */
      storage_limit_purge_strategy: "purge_oldest" | "purge_largest" | "purge_smallest" | "block_new";
      /**
       * Video qualities to retain. Only qualities your Developer plan includes are accepted.
       */
      video_qualities: Array<"preview" | "720p" | "1080p" | "source">;
    };
    /**
     * Whether Vault+ retains this account's media.
     */
    enabled: boolean;
    /**
     * Settings this account overrides. Every other field follows the integration's Vault+ settings.
     */
    overrides: {
      /**
       * Retained media not read for this many days is removed.
       */
      access_expiry_days?: number;
      /**
       * Retain message media automatically.
       */
      auto_cache_messages?: boolean;
      /**
       * Retain post media automatically.
       */
      auto_cache_posts?: boolean;
      /**
       * Retain story media automatically.
       */
      auto_cache_stories?: boolean;
      /**
       * Retain vault media automatically.
       */
      auto_cache_vault?: boolean;
      /**
       * Retain audio.
       */
      cache_audio?: boolean;
      /**
       * Retain images.
       */
      cache_images?: boolean;
      /**
       * Retain videos.
       */
      cache_videos?: boolean;
      /**
       * Image qualities to retain. Only qualities your Developer plan includes are accepted.
       */
      image_qualities?: Array<"thumb" | "preview" | "full">;
      /**
       * Accesses before message media is retained.
       */
      min_access_count_messages?: number;
      /**
       * Accesses before post media is retained.
       */
      min_access_count_posts?: number;
      /**
       * Accesses before story media is retained.
       */
      min_access_count_stories?: number;
      /**
       * Accesses before vault media is retained.
       */
      min_access_count_vault?: number;
      /**
       * Lifetime of download URLs, in seconds.
       */
      presigned_url_ttl_seconds?: number;
      /**
       * Days retained media is kept.
       */
      retention_days?: number;
      /**
       * Storage limit for this account in bytes; 0 means no account limit.
       */
      storage_limit_bytes?: number;
      /**
       * What happens at the storage limit. `block_new` stops retaining new media.
       */
      storage_limit_purge_strategy?: "purge_oldest" | "purge_largest" | "purge_smallest" | "block_new";
      /**
       * Video qualities to retain. Only qualities your Developer plan includes are accepted.
       */
      video_qualities?: Array<"preview" | "720p" | "1080p" | "source">;
    };
    /**
     * Qualities requested by the integration or this account that your plan does not include. They are kept and apply again after an upgrade.
     */
    restricted_qualities: {
      image_qualities: Array<"thumb" | "preview" | "full">;
      video_qualities: Array<"preview" | "720p" | "1080p" | "source">;
    };
  };
};

export type LinkedAccountSettingsUpdate = {
  vault_plus: {
    enabled?: boolean;
    /**
     * Fields to override. A field set to null follows the integration setting again; null clears every override.
     */
    overrides?: {
      /**
       * Retained media not read for this many days is removed.
       */
      access_expiry_days?: number | null;
      /**
       * Retain message media automatically.
       */
      auto_cache_messages?: boolean | null;
      /**
       * Retain post media automatically.
       */
      auto_cache_posts?: boolean | null;
      /**
       * Retain story media automatically.
       */
      auto_cache_stories?: boolean | null;
      /**
       * Retain vault media automatically.
       */
      auto_cache_vault?: boolean | null;
      /**
       * Retain audio.
       */
      cache_audio?: boolean | null;
      /**
       * Retain images.
       */
      cache_images?: boolean | null;
      /**
       * Retain videos.
       */
      cache_videos?: boolean | null;
      /**
       * Image qualities to retain. Only qualities your Developer plan includes are accepted.
       */
      image_qualities?: (Array<"thumb" | "preview" | "full">) | null;
      /**
       * Accesses before message media is retained.
       */
      min_access_count_messages?: number | null;
      /**
       * Accesses before post media is retained.
       */
      min_access_count_posts?: number | null;
      /**
       * Accesses before story media is retained.
       */
      min_access_count_stories?: number | null;
      /**
       * Accesses before vault media is retained.
       */
      min_access_count_vault?: number | null;
      /**
       * Lifetime of download URLs, in seconds.
       */
      presigned_url_ttl_seconds?: number | null;
      /**
       * Days retained media is kept.
       */
      retention_days?: number | null;
      /**
       * Storage limit for this account in bytes; 0 means no account limit.
       */
      storage_limit_bytes?: number | null;
      /**
       * What happens at the storage limit. `block_new` stops retaining new media.
       */
      storage_limit_purge_strategy?: ("purge_oldest" | "purge_largest" | "purge_smallest" | "block_new") | null;
      /**
       * Video qualities to retain. Only qualities your Developer plan includes are accepted.
       */
      video_qualities?: (Array<"preview" | "720p" | "1080p" | "source">) | null;
    } | null;
  };
};

export type LinkedAccountSettingsUpdateError403 = RuntimeError & {
  /**
   * Stable error code: `additional_consent_required` (`request_additional_consent`), `client_deleted` (`contact_integration_owner`), `integration_not_approved` (`complete_integration_approval`), `integration_suspended` (`contact_integration_owner`), `linked_account_not_granted` (`grant_linked_account`), `missing_scope` (`request_additional_consent`), `security_suspended` (`contact_integration_owner`), `subscription_required` (`update_developer_plan`), `vault_plus_quality_not_in_plan` (`update_developer_plan`).
   */
  error?: "additional_consent_required" | "client_deleted" | "integration_not_approved" | "integration_suspended" | "linked_account_not_granted" | "missing_scope" | "security_suspended" | "subscription_required" | "vault_plus_quality_not_in_plan";
};

export type LinkedAccountSettingsUpdateError409 = RuntimeError & {
  /**
   * Stable error code: `linked_account_settings_conflict` (`retry`), `linked_account_settings_fixed`.
   */
  error?: "linked_account_settings_conflict" | "linked_account_settings_fixed";
};

export type LinkedAccountsError400 = RuntimeError & {
  /**
   * Stable error code: `invalid_request`.
   */
  error?: "invalid_request";
};

export type LinkedAccountsError401 = RuntimeError & {
  /**
   * Stable error code: `authorization_required` (`restart_authorization`), `external_oauth_bearer_required` (`obtain_external_oauth_token`), `grant_revoked_or_expired` (`restart_authorization`), `invalid_token` (`obtain_external_oauth_token`).
   */
  error?: "authorization_required" | "external_oauth_bearer_required" | "grant_revoked_or_expired" | "invalid_token";
};

export type LinkedAccountsError403 = RuntimeError & {
  /**
   * Stable error code: `additional_consent_required` (`request_additional_consent`), `client_deleted` (`contact_integration_owner`), `integration_not_approved` (`complete_integration_approval`), `integration_suspended` (`contact_integration_owner`), `linked_account_not_granted` (`grant_linked_account`), `missing_scope` (`request_additional_consent`), `security_suspended` (`contact_integration_owner`), `subscription_required` (`update_developer_plan`).
   */
  error?: "additional_consent_required" | "client_deleted" | "integration_not_approved" | "integration_suspended" | "linked_account_not_granted" | "missing_scope" | "security_suspended" | "subscription_required";
};

export type LinkedAccountsError404 = RuntimeError & {
  /**
   * Stable error code: `linked_account_not_found` (`list_linked_accounts`).
   */
  error?: "linked_account_not_found";
};

export type LinkedAccountsError429 = RuntimeError & {
  /**
   * Stable error code: `quota_exhausted` (`retry_after_reset`), `rate_limited` (`retry`).
   */
  error?: "quota_exhausted" | "rate_limited";
};

export type LinkedAccountsError503 = RuntimeError & {
  /**
   * Stable error code: `authorization_temporarily_unavailable` (`retry`).
   */
  error?: "authorization_temporarily_unavailable";
};

export type LinkedAccountsPage = {
  data: Array<LinkedAccount>;
  /**
   * Whether another page follows.
   */
  has_more: boolean;
  /**
   * Pass as `cursor` to `GET /v3/linked-accounts` for the next page; `null` on the last page.
   */
  next_cursor: string | null;
};

/**
 * Mass message details. This endpoint does not normally return the schedule or recipients; read `GET /queue/messages/:queueMessageId` for `scheduledDate`, `userIds`, `userLists`, `excludeUserLists` and `subscribedAfterDate`. When OnlyFans does include list targeting here it is returned under the same request names.
 */
export type MassMessageDetails = {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  /**
   * Whether the queued mass message can still be cancelled with `DELETE /queue/messages/:queueMessageId`.
   */
  canUnsend?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  /**
   * The `excludeUserLists` entries with their names, present only when OnlyFans returns list names.
   */
  excludeUserListDetails?: Array<{
    /**
     * List ID.
     */
    id: number | string;
    /**
     * List name, when OnlyFans returns it.
     */
    name?: string;
  }>;
  /**
   * IDs of the user lists excluded from the message (upstream `excludedLists`). Send as `excludeUserLists` when rebuilding the message. Absent when no list is excluded.
   */
  excludeUserLists?: Array<number | string>;
  fromUser: ChatUser;
  giphyId?: string | null;
  id: number;
  isCouplePeopleMedia?: boolean;
  isFree?: boolean;
  isFromQueue?: boolean;
  isLiked?: boolean;
  isMarkdownDisabled?: boolean;
  isMediaReady?: boolean;
  isNew?: boolean;
  isOpened?: boolean;
  isPinned?: boolean;
  isReportedByMe?: boolean;
  isTip?: boolean;
  lockedText?: boolean;
  /**
   * Mass message queue ID. This is the same value as `id` returned by `POST /chats/mass-messages`, `:massMessageId` in `/chats/mass-messages/:massMessageId` and `/analytics/mass-messages/:massMessageId/buyers`, and `:queueMessageId` in `/queue/messages/:queueMessageId`. It is not the `scheduleId` (`QueueItem.id`) used by `/queue/schedules`.
   */
  massMessageId?: number;
  media: Array<MediaAsset>;
  mediaCount?: number;
  /**
   * Number of preview media items (length of the upstream preview list). Send this as `previewMediaCount` when rebuilding the message, with the preview media first in `mediaItems`.
   */
  previewMediaCount?: number;
  previews: Array<number>;
  /**
   * Unlock price in dollars (0 when free). Send as `price` when rebuilding the message.
   */
  price?: number | string;
  /**
   * Same value as `massMessageId`.
   */
  queueId?: number;
  releaseForms?: unknown | null;
  responseType?: string;
  /**
   * Only fans who subscribed after this date receive the message (upstream `scheduledSubscribedOn`). Send as `subscribedAfterDate` when rebuilding the message. Absent when not set.
   */
  subscribedAfterDate?: string;
  text: string;
  /**
   * Seconds left in which the queued mass message can still be cancelled.
   */
  unsendSeconds?: number;
  unsendSecondsQueue?: number;
  /**
   * The `userLists` entries with their names, present only when OnlyFans returns list names.
   */
  userListDetails?: Array<{
    /**
     * List ID.
     */
    id: number | string;
    /**
     * List name, when OnlyFans returns it.
     */
    name?: string;
  }>;
  /**
   * IDs of the user lists the message is sent to (upstream `userLists`). Send as `userLists` when rebuilding the message. Absent when the message does not target lists.
   */
  userLists?: Array<number | string>;
};

export type MassMessageRequest = {
  /**
   * User list IDs to exclude
   */
  excludeUserLists?: Array<number | string>;
  /**
   * Whether this is a forwarded message
   */
  isForwardedMessage?: boolean;
  /**
   * Whether text is locked behind paywall (defaults to false).
   */
  isLockedText?: boolean;
  /**
   * Whether to parse text as markdown (default: true). See [Text Formatting Guide](/guides/how-to/text-formatting).
   */
  isMarkdown?: boolean;
  /**
   * Media references to attach. Accepts vault media IDs, upload references (mediaUploadId), or http(s) URLs. See [mediaItems reference](/guides/media-items).
   */
  mediaItems?: Array<number | string>;
  /**
   * How many items in mediaItems should be previews. Uses the first N items from left to right.
   */
  previewMediaCount?: number | null;
  /**
   * Price to unlock message content (0 for free)
   */
  price?: number | null;
  /**
   * Release form participants
   */
  releaseForms?: ReleaseFormSelection;
  /**
   * Reply to an existing chat message
   */
  replyToMessageId?: string | null;
  /**
   * When to send the message (omit for immediate)
   */
  scheduledDate?: (string | null) | (unknown | null);
  /**
   * Only send to users subscribed after this date
   */
  subscribedAfterDate?: (string | null) | (unknown | null);
  /**
   * Text content. Supports markdown by default. See [Text Formatting Guide](/guides/how-to/text-formatting).
   */
  text?: string;
  /**
   * Specific user IDs to send to
   */
  userIds?: Array<number | string>;
  /**
   * User list IDs to send to
   */
  userLists?: Array<number | string>;
  /**
   * Users to tag
   */
  userTags?: Array<number>;
};

export type MediaAsset = {
  canView: boolean;
  convertedToVideo: boolean;
  /**
   * When OnlyFans created the media, or `null` when OnlyFans does not report it (bookmarked posts, story media).
   */
  createdAt: string | null;
  duration?: number;
  error: boolean;
  hasCustomPreview?: boolean;
  id: number;
  playback?: {
    expiresAt: string;
    licenseServers: Record<string, string>;
    manifestUrl: string;
    mimeType: "application/dash+xml";
    renewUrl: string;
    retainUrl?: string;
  };
  ready: boolean;
  releaseForms: Array<ReleaseForm>;
  sizes?: Record<string, MediaAssetSize>;
  type: MediaType;
  urls?: Record<string, string>;
  /**
   * Video URL by quality (`240`, `720`, ...). Qualities OnlyFans has not produced are omitted.
   */
  videoSources?: Record<string, string>;
};

export type MediaAssetSize = {
  height?: number;
  size?: number;
  width?: number;
};

export type MediaType = "photo" | "video" | "gif" | "audio";

export type Message = {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  /**
   * The id of the fan whose chat this message is in, whoever sent it. Present on chat list and thread messages.
   */
  chatUserId?: number;
  createdAt?: string;
  id?: number | string;
  isFree?: boolean;
  /**
   * True when the tip went to a fundraising goal.
   */
  isFundRaisingTip?: boolean;
  isLiked?: boolean;
  isNew?: boolean;
  isOpened?: boolean;
  isPinned?: boolean;
  /**
   * True when the message is a tip. Its amount is `tipAmount`.
   */
  isTip?: boolean;
  lockedText?: boolean;
  media?: Array<MediaAsset>;
  mediaReady?: boolean;
  mediaTotal?: number;
  previewIds?: Array<unknown | null>;
  /**
   * Pay-per-view price in US dollars to unlock the message's content. 0 for free messages and on tips: a tip's amount is `tipAmount`.
   */
  price?: number | string;
  sender?: ChatUserRef;
  text?: string;
  /**
   * The tip amount in US dollars when the message is a tip (`isTip` or `isFundRaisingTip` is true); null when it is not a tip.
   */
  tipAmount?: number | null;
  /**
   * The note the fan wrote with a tip (may be empty).
   */
  tipText?: string;
};

export type MessageContent = {
  /**
   * Whether this is a forwarded message
   */
  isForwardedMessage?: boolean;
  /**
   * Whether text is locked behind paywall (defaults to false).
   */
  isLockedText?: boolean;
  /**
   * Whether to parse text as markdown (default: true). See [Text Formatting Guide](/guides/how-to/text-formatting).
   */
  isMarkdown?: boolean;
  /**
   * Media references to attach. Accepts vault media IDs, upload references (mediaUploadId), or http(s) URLs. See [mediaItems reference](/guides/media-items).
   */
  mediaItems?: Array<number | string>;
  /**
   * How many items in mediaItems should be previews. Uses the first N items from left to right.
   */
  previewMediaCount?: number | null;
  /**
   * Price to unlock message content (0 for free)
   */
  price?: number | null;
  /**
   * Release form participants
   */
  releaseForms?: ReleaseFormSelection;
  /**
   * Reply to an existing chat message
   */
  replyToMessageId?: string | null;
  /**
   * Text content. Supports markdown by default. See [Text Formatting Guide](/guides/how-to/text-formatting).
   */
  text?: string;
  /**
   * Users to tag
   */
  userTags?: Array<number>;
};

export type MessagePage = {
  items: Array<Message>;
  page: CursorPage;
};

export type Post = {
  author?: PostAuthor;
  canComment?: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canEditMedia?: boolean;
  canEditSchedule?: boolean;
  canEditText?: boolean;
  canEditVote?: boolean;
  canViewMedia: boolean;
  favoritesCount?: number;
  id: number;
  isFavorite?: boolean;
  labelStates?: Array<{
    id: number;
    isClearInProgress?: boolean;
    name: string;
    postsCount: number;
    type: string;
  }>;
  media: Array<MediaAsset>;
  mediaReady?: boolean;
  mediaTotal?: number;
  postedAt?: string;
  postedAtPrecise?: string;
  previewIds?: Array<unknown | null>;
  price?: number;
  releaseForms?: Array<ReleaseForm>;
  text?: string;
  tipsAmount?: string;
};

export type PostAuthor = {
  avatar?: string | null;
  avatarThumbs?: Record<string, string> | null;
  displayName?: string | null;
  id: number;
  isVerified?: boolean | null;
  name?: string | null;
  username?: string | null;
};

export type PostPage = {
  items: Array<Post>;
  page: CursorPage;
};

export type PostRequest = {
  /**
   * Days until post expires (1-30)
   */
  expireAfter?: number;
  /**
   * Target amount for fund raising post
   */
  fundRaisingTargetAmount?: number;
  /**
   * Preset tip amounts for fund raising
   */
  fundRaisingTipsPresets?: Array<number>;
  /**
   * Whether text is locked behind paywall (defaults to false).
   */
  isLockedText?: boolean;
  /**
   * Whether to parse text as markdown (default: true). See [Text Formatting Guide](/guides/how-to/text-formatting).
   */
  isMarkdown?: boolean;
  /**
   * Creator post label IDs. Omit to leave labels unchanged when editing; send [] to clear them.
   */
  labelIds?: Array<number>;
  /**
   * Media references to attach. Accepts vault media IDs, upload references (mediaUploadId), or http(s) URLs. See [mediaItems reference](/guides/media-items).
   */
  mediaItems?: Array<number | string>;
  /**
   * Poll attached to the post
   */
  poll?: {
    /**
     * Number of days before the poll closes
     */
    dueDays: number;
    /**
     * Poll answer options
     */
    options: Array<string>;
    /**
     * OnlyFans poll type
     */
    type: number;
  };
  /**
   * How many items in mediaItems should be previews. Uses the first N items from left to right.
   */
  previewMediaCount?: number | null;
  /**
   * Price to unlock message content (0 for free)
   */
  price?: number | null;
  /**
   * Release form participants
   */
  releaseForms?: ReleaseFormSelection;
  /**
   * Reply to an existing chat message
   */
  replyToMessageId?: string | null;
  /**
   * When to publish the post (omit for immediate). Use ISO 8601 with timezone, e.g. 2026-05-25T12:00:00.000Z, or epoch milliseconds.
   */
  scheduledDate?: string | number | (unknown | null);
  /**
   * Text content. Supports markdown by default. See [Text Formatting Guide](/guides/how-to/text-formatting).
   */
  text?: string;
  /**
   * Users to tag
   */
  userTags?: Array<number>;
};

export type Promotion = {
  canClaim: boolean;
  claimsCount: number;
  createdAt: string;
  days: number;
  finished: boolean;
  finishedAt: string;
  id: number;
  price?: number;
  related: boolean;
  subscribeCount: number;
  text: string;
  type: string;
};

export type PromotionPage = {
  items: Array<Promotion>;
  page: CursorPage;
};

export type QueueItem = {
  createdDateTime?: string;
  /**
   * The scheduled item. Typed fields describe `type: "chat"` (mass message) entities; other types pass through unchanged.
   */
  entity?: QueueItemEntity;
  /**
   * Schedule ID (`scheduleId`, used by `PUT /queue/schedules/:scheduleId/publish`). For chat schedules this is not the mass message ID; use `entity.queueId`.
   */
  id: number | string;
  publishDateTime?: string | null;
  /**
   * Schedule type: `chat`, `post`, `stream` or `story`.
   */
  type?: string;
};

export type QueueItemEntity = {
  /**
   * Whether the queued message can still be cancelled.
   */
  canUnsendQueue?: boolean;
  /**
   * The `excludeUserLists` entries with their names, present only when OnlyFans returns list names.
   */
  excludeUserListDetails?: Array<{
    /**
     * List ID.
     */
    id: number | string;
    /**
     * List name, when OnlyFans returns it.
     */
    name?: string;
  }>;
  /**
   * IDs of the user lists excluded from the message (upstream `excludedLists`). Send as `excludeUserLists` when rebuilding the message. Absent when no list is excluded.
   */
  excludeUserLists?: Array<number | string>;
  /**
   * ID of the scheduled entity (the chat message ID for `type: "chat"`, the post ID for `type: "post"`).
   */
  id?: number;
  isFree?: boolean;
  isFromQueue?: boolean;
  lockedText?: boolean;
  /**
   * Media attached to the scheduled item.
   */
  media?: Array<MediaAsset>;
  mediaCount?: number;
  /**
   * Upstream preview media references; their count is the `previewMediaCount`.
   */
  previews?: Array<unknown | null>;
  /**
   * Unlock price in dollars (0 when free).
   */
  price?: number | string;
  /**
   * For `type: "chat"`: the mass message queue ID. Use it as `massMessageId` / `queueMessageId` (it is not the schedule `id`).
   */
  queueId?: number;
  /**
   * Message text without HTML formatting.
   */
  rawText?: string;
  /**
   * When the message is scheduled to send.
   */
  scheduledAt?: string | null;
  /**
   * Opaque upstream recipient rule data. Its format is not documented; do not rely on it to rebuild recipients.
   */
  sentRulesExtra?: string;
  /**
   * Opaque upstream recipient rule type. Its format is not documented; do not rely on it to rebuild recipients.
   */
  sentRulesType?: string;
  /**
   * Only fans who subscribed after this date receive the message (upstream `scheduledSubscribedOn`). Send as `subscribedAfterDate` when rebuilding the message. Absent when not set.
   */
  subscribedAfterDate?: string;
  /**
   * Formatted (HTML) message text.
   */
  text?: string;
  /**
   * Seconds left in which the queued message can still be cancelled.
   */
  unsendSecondsQueue?: number;
  /**
   * Individual recipient user IDs as returned by OnlyFans.
   */
  userIds?: Array<number | string>;
  /**
   * The `userLists` entries with their names, present only when OnlyFans returns list names.
   */
  userListDetails?: Array<{
    /**
     * List ID.
     */
    id: number | string;
    /**
     * List name, when OnlyFans returns it.
     */
    name?: string;
  }>;
  /**
   * IDs of the user lists the message is sent to (upstream `userLists`). Send as `userLists` when rebuilding the message. Absent when the message does not target lists.
   */
  userLists?: Array<number | string>;
};

export type QueueItemList = {
  items: Array<QueueItem>;
  syncInProcess?: boolean;
};

/**
 * Queued mass message. Fields needed to rebuild a `PUT /chats/mass-messages/:massMessageId` body: `text` (send with `isMarkdown: false` to keep its HTML), `media[].id` (`mediaItems`), `previewMediaCount`, `price`, `lockedText` (`isLockedText`), `scheduledDate`, `userIds`, `userLists`, `excludeUserLists`, `subscribedAfterDate`. Delivery counters (`total`, `pending`, `isDone`, `isCanceled`) are not returned by this endpoint; they are only returned by create and update. Recipients are returned as `userIds`, `userLists`, `excludeUserLists` and `subscribedAfterDate` (the same names as the `PUT /chats/mass-messages/:massMessageId` request), so they can be sent back unchanged on update. Each is absent when the message does not use it (for example `userLists` when the message targets only `userIds`). `userTags` and the request-shaped `releaseForms` (`users`/`partners`/`guests`) are not returned; keep your own copy if you set them.
 */
export type QueuedMassMessage = {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  /**
   * Whether the queued mass message can still be cancelled with `DELETE /queue/messages/:queueMessageId`.
   */
  canUnsend?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  /**
   * The id of the fan whose chat this message is in, whoever sent it. Present on chat list and thread messages.
   */
  chatUserId?: number;
  createdAt?: string;
  /**
   * The `excludeUserLists` entries with their names, present only when OnlyFans returns list names.
   */
  excludeUserListDetails?: Array<{
    /**
     * List ID.
     */
    id: number | string;
    /**
     * List name, when OnlyFans returns it.
     */
    name?: string;
  }>;
  /**
   * IDs of the user lists excluded from the message (upstream `excludedLists`). Send as `excludeUserLists` when rebuilding the message. Absent when no list is excluded.
   */
  excludeUserLists?: Array<number | string>;
  id?: number | string;
  isFree?: boolean;
  /**
   * Whether the message was created by a mass message queue.
   */
  isFromQueue?: boolean;
  /**
   * True when the tip went to a fundraising goal.
   */
  isFundRaisingTip?: boolean;
  isLiked?: boolean;
  isMarkdownDisabled?: boolean;
  isNew?: boolean;
  isOpened?: boolean;
  isPinned?: boolean;
  /**
   * True when the message is a tip. Its amount is `tipAmount`.
   */
  isTip?: boolean;
  lockedText?: boolean;
  /**
   * Mass message queue ID. This is the same value as `id` returned by `POST /chats/mass-messages`, `:massMessageId` in `/chats/mass-messages/:massMessageId` and `/analytics/mass-messages/:massMessageId/buyers`, and `:queueMessageId` in `/queue/messages/:queueMessageId`. It is not the `scheduleId` (`QueueItem.id`) used by `/queue/schedules`.
   */
  massMessageId?: number;
  media?: Array<MediaAsset>;
  mediaReady?: boolean;
  mediaTotal?: number;
  previewIds?: Array<unknown | null>;
  /**
   * Number of preview media items (length of the upstream preview list). Send this as `previewMediaCount` when rebuilding the message, with the preview media first in `mediaItems`.
   */
  previewMediaCount?: number;
  /**
   * Unlock price in dollars (0 when free). Send as `price` when rebuilding the message.
   */
  price?: number | string;
  /**
   * Same value as `massMessageId`.
   */
  queueId?: number;
  /**
   * Message text as stored by OnlyFans without HTML formatting. `text` holds the formatted HTML.
   */
  rawText?: string;
  /**
   * Release forms attached to the message, in OnlyFans' own list format. This is not the request's `releaseForms` object (`users`/`partners`/`guests`) and its item shape is not documented yet, so do not send it back as-is.
   */
  releaseForms?: Array<unknown | null>;
  /**
   * When the message is scheduled to send (ISO timestamp), or null when it is not scheduled. Send as `scheduledDate` when rebuilding the message.
   */
  scheduledDate?: string | null;
  sender?: ChatUserRef;
  /**
   * Only fans who subscribed after this date receive the message (upstream `scheduledSubscribedOn`). Send as `subscribedAfterDate` when rebuilding the message. Absent when not set.
   */
  subscribedAfterDate?: string;
  text?: string;
  /**
   * The tip amount in US dollars when the message is a tip (`isTip` or `isFundRaisingTip` is true); null when it is not a tip.
   */
  tipAmount?: number | null;
  /**
   * The note the fan wrote with a tip (may be empty).
   */
  tipText?: string;
  /**
   * Seconds left in which the queued mass message can still be cancelled.
   */
  unsendSeconds?: number;
  /**
   * Individual recipient user IDs as returned by OnlyFans. May be empty when the message targets lists. Send as `userIds` when rebuilding the message.
   */
  userIds?: Array<number | string>;
  /**
   * The `userLists` entries with their names, present only when OnlyFans returns list names.
   */
  userListDetails?: Array<{
    /**
     * List ID.
     */
    id: number | string;
    /**
     * List name, when OnlyFans returns it.
     */
    name?: string;
  }>;
  /**
   * IDs of the user lists the message is sent to (upstream `userLists`). Send as `userLists` when rebuilding the message. Absent when the message does not target lists.
   */
  userLists?: Array<number | string>;
};

export type RealtimeChatMessageLikedData = {
  id: number;
  isLiked: true;
  /**
   * User id of the chat partner (the fan) whose chat the message is in, when the event source identifies it. OnlyFans like frames carry only the message id, so Live events (and Sandbox simulated ones) omit it; find the chat by the message id.
   */
  withUserId?: number;
};

export type RealtimeChatMessageLikedEnvelope = {
  authorizationId: string;
  data: RealtimeChatMessageLikedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.chat_message.liked";
};

export type RealtimeChatMessageReceivedData = {
  id: number;
  /**
   * User id of the chat partner: the fan whose chat the message is in, the userId of /v3/access/chats/{userId}/messages. Taken from the message's chat (OnlyFans chatUserId), so it is the fan also on a message the connected account sent; otherwise from the sender. Omitted when OnlyFans identifies neither, or when the only value is the connected account itself.
   */
  withUserId?: number;
};

export type RealtimeChatMessageReceivedEnvelope = {
  authorizationId: string;
  data: RealtimeChatMessageReceivedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.chat_message.received";
};

export type RealtimeChatMessageUnlikedData = {
  id: number;
  isLiked: false;
  /**
   * User id of the chat partner (the fan) whose chat the message is in, when the event source identifies it. OnlyFans like frames carry only the message id, so Live events (and Sandbox simulated ones) omit it; find the chat by the message id.
   */
  withUserId?: number;
};

export type RealtimeChatMessageUnlikedEnvelope = {
  authorizationId: string;
  data: RealtimeChatMessageUnlikedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.chat_message.unliked";
};

export type RealtimeChatTypingUpdatedData = {
  /**
   * User id of the chat partner who is typing (the fan, for a creator account), the userId of /v3/access/chats/{userId} routes. It is not a chat or message id.
   */
  id: number;
};

export type RealtimeChatTypingUpdatedEnvelope = {
  authorizationId: string;
  data: RealtimeChatTypingUpdatedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.chat_typing.updated";
};

export type RealtimeInboxCountsUpdatedData = {
  chatMessagesCount: number;
  countPriorityChat: number;
  unreadTips: number;
};

export type RealtimeInboxCountsUpdatedEnvelope = {
  authorizationId: string;
  data: RealtimeInboxCountsUpdatedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.inbox_counts.updated";
};

export type RealtimePostFundraisingUpdatedData = {
  id: number;
};

export type RealtimePostFundraisingUpdatedEnvelope = {
  authorizationId: string;
  data: RealtimePostFundraisingUpdatedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.post_fundraising.updated";
};

export type RealtimePostPublishedData = {
  authorId: number;
  id: number;
};

export type RealtimePostPublishedEnvelope = {
  authorizationId: string;
  data: RealtimePostPublishedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.post.published";
};

export type RealtimeStoriesUpdatedData = {
  id: number;
  userId: number;
};

export type RealtimeStoriesUpdatedEnvelope = {
  authorizationId: string;
  data: RealtimeStoriesUpdatedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.stories.updated";
};

export type RealtimeSystemMessageReceivedData = {
  hasSystemNotifications: boolean;
  id: number;
  type: string;
};

export type RealtimeSystemMessageReceivedEnvelope = {
  authorizationId: string;
  data: RealtimeSystemMessageReceivedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.system_message.received";
};

export type RealtimeSystemMessagesUpdatedData = {
  hasSystemNotifications: boolean;
  notificationsCount: number;
};

export type RealtimeSystemMessagesUpdatedEnvelope = {
  authorizationId: string;
  data: RealtimeSystemMessagesUpdatedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.system_messages.updated";
};

export type RealtimeToastsReceivedData = {
  items: Array<{
    id: number;
    type: string;
  }>;
};

export type RealtimeToastsReceivedEnvelope = {
  authorizationId: string;
  data: RealtimeToastsReceivedData;
  environment: "sandbox" | "test" | "live";
  eventId: string;
  externalOauthClientId: string;
  integrationId: string;
  linkedAccountId: string;
  occurredAt: string;
  order: number;
  schemaVersion: "1";
  test: boolean;
  type: "realtime.toasts.received";
};

export type RealtimeWebhookEventEnvelope = RealtimeChatTypingUpdatedEnvelope | RealtimeStoriesUpdatedEnvelope | RealtimeChatMessageReceivedEnvelope | RealtimeInboxCountsUpdatedEnvelope | RealtimeSystemMessagesUpdatedEnvelope | RealtimeSystemMessageReceivedEnvelope | RealtimeChatMessageLikedEnvelope | RealtimeChatMessageUnlikedEnvelope | RealtimeToastsReceivedEnvelope | RealtimePostFundraisingUpdatedEnvelope | RealtimePostPublishedEnvelope | LifecycleAuthorizationGrantedEnvelope | LifecycleAuthorizationUpdatedEnvelope | LifecycleAuthorizationRevokedEnvelope | LifecycleLinkedAccountExpiredEnvelope | LifecycleLinkedAccountReconnectedEnvelope | LifecycleLinkedAccountDisconnectedEnvelope;

export type ReleaseForm = {
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: ReleaseFormUser;
};

export type ReleaseFormSelection = {
  /**
   * Guests to add to release form
   */
  guests?: Array<number>;
  /**
   * Partners to add to release form
   */
  partners?: Array<number>;
  /**
   * Users to add to release form
   */
  users?: Array<number>;
};

export type ReleaseFormUser = {
  avatar?: string | null;
  avatarThumbs?: Record<string, string> | null;
  displayName?: string | null;
  id: number;
  isFromGuest?: boolean;
  isVerified?: boolean;
  ivStatus?: string;
  name: string;
  username: string;
};

/**
 * A query, path or JSON body parameter failed validation.
 */
export type RequestValidationError = {
  error: {
    issues: Array<{
      code: string;
      message: string;
      path: Array<string | number>;
    }>;
    name: "ZodError";
  };
  success: false;
};

export type RuntimeError = {
  /**
   * `vault_plus_quality_not_in_plan`: the qualities your Developer plan includes.
   */
  allowed_qualities?: {
    image_qualities: Array<"thumb" | "preview" | "full">;
    video_qualities: Array<"preview" | "720p" | "1080p" | "source">;
  };
  /**
   * Upstream failure detail (Vault+ `502`).
   */
  details?: string;
  /**
   * Stable error code. Each error response lists the codes its status can carry. `missing_scope` means the access token lacks the scope; `additional_consent_required` means the token has it but the linked account's current consent no longer covers it. Both recover with `request_additional_consent`.
   */
  error: string;
  /**
   * Human-readable detail, when available.
   */
  message?: string;
  /**
   * `vault_plus_quality_not_in_plan`: the requested qualities your Developer plan does not include.
   */
  not_allowed_qualities?: {
    image_qualities: Array<"thumb" | "preview" | "full">;
    video_qualities: Array<"preview" | "720p" | "1080p" | "source">;
  };
  /**
   * Absent on `invalid_request` and other errors with no recovery action.
   */
  recovery?: {
    /**
     * What to do before retrying.
     */
    action: "obtain_external_oauth_token" | "retry" | "retry_after_reset" | "restart_authorization" | "request_additional_consent" | "grant_linked_account" | "select_linked_account" | "reconnect_linked_account" | "list_linked_accounts" | "complete_integration_approval" | "contact_integration_owner" | "update_developer_plan" | "enable_vault_plus" | "enable_linked_account_vault_plus" | "correct_request" | "check_request" | "check_resource" | "do_not_repeat" | "restart_upload";
  };
  requestId: string;
};

export type Story = {
  canLike?: boolean;
  createdAt?: string | null;
  hasPost?: boolean;
  id: number;
  isLiked?: boolean;
  isReady: boolean;
  isWatched?: boolean;
  media: Array<MediaAsset>;
  question?: unknown | null;
  user?: StoryUser;
  userId: number;
  viewers?: Array<StoryViewer>;
};

export type StoryHighlight = {
  cover: string;
  coverStoryId: number;
  createdAt: string;
  id: number;
  stories: Array<Story>;
  storiesCount: number;
  title: string;
  userId: number;
};

export type StoryUser = {
  avatar?: string | null;
  avatarThumbs?: Record<string, string> | null;
  displayName?: string | null;
  id: number;
  isActive?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean | null;
  name: string;
  username: string;
};

export type StoryViewer = {
  avatar?: string | null;
  avatarThumbs?: Record<string, string> | null;
  canCommentStory?: boolean;
  canLookStory?: boolean;
  displayName?: string | null;
  hasNotViewedStory?: boolean;
  id: number;
  isStoryBlockedUser?: boolean;
  isStoryLiked?: boolean;
  isVerified?: boolean | null;
  name?: string | null;
  username?: string | null;
};

export type StoryViewerPage = {
  items: Array<StoryViewer>;
  page: CursorPage;
};

export type Subscriber = {
  avatar: string | null;
  avatarThumbs: AvatarThumbs | null;
  capabilities: UserCapabilities;
  displayName: string;
  id: number;
  isBlocked: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: string | null;
  lists: Array<UserListReference>;
  name: string;
  spending: SubscriberSpending;
  subscription: SubscriberSubscription;
  username: string;
};

export type SubscriberPage = {
  items: Array<Subscriber>;
  page: CursorPage;
};

export type SubscriberSpending = {
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  messages: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  posts: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  streams: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  subscriptions: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  tips: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  total: number;
};

export type SubscriberSubscription = {
  discountFinishedAt: string | null;
  discountPercent: number | null;
  discountPeriod: number | null;
  discountStartedAt: string | null;
  expiresAt: string | null;
  history: Array<SubscriptionHistoryItem>;
  isActive: boolean;
  isExpired: boolean;
  price: number | null;
  regularPrice: number | null;
  renewedAt: string | null;
  subscribedAt: string | null;
};

export type SubscriptionHistoryItem = {
  action: string;
  discount: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  price: number;
  regularPrice: number;
  startDate: string;
  type: string;
};

export type TopCampaign = {
  campaignCode: number;
  campaignName: string;
  countSubscribers: number;
  countTransitions: number;
  createdAt: string;
  endDate: string;
  id: number;
};

export type TopPost = {
  author?: PostAuthor;
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  favoritesCount: number;
  hasVoting?: boolean;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<MediaAsset>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  stats?: ContentStats;
  text: string;
  tipsAmount: string;
  voting?: {
    finishedAt: string;
    options: Array<{
      count?: number;
      id: number;
      isWinner?: boolean;
      percent?: number;
      text?: string;
    }>;
    total: number;
  };
  votingType?: number;
};

export type TopPromotion = {
  canClaim: boolean;
  claimsCount: number;
  createdAt: string;
  finishedAt: string;
  hasRelatedPromo: boolean;
  id: number;
  isFinished: boolean;
  message: string;
  price: number;
  rawMessage: string;
  subscribeCounts: number | null;
  subscribeDays: number;
  type: string;
};

export type TopStory = {
  canDelete: boolean;
  canvasHeight: number;
  canvasWidth: number;
  commentsCount: number;
  createdAt: string;
  hasPost: boolean;
  id: number;
  isHighlightCover: boolean;
  isLastInHighlight: boolean;
  isReady: boolean;
  isWatched: boolean;
  likesCount: number;
  media: Array<MediaAsset>;
  post?: {
    author?: PostAuthor;
    coordinateParams?: {
      angle: number;
      height: number;
      left: number;
      scale: number;
      top: number;
      width: number;
    };
    id: number;
  };
  question?: {
    entity: {
      createdAt: string;
      id: number;
      text: string;
    };
    positions: {
      angle: number;
      color: string;
      height: number;
      left: number;
      top: number;
      width: number;
      x: number | null;
      y: number | null;
      zIndex: number;
    };
    type: string;
  };
  releaseForms: Array<ReleaseForm>;
  texts: Array<{
    position: {
      angle: number;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    text: string;
  }>;
  tipsAmount: string;
  tipsAmountRaw: number;
  tipsCount: number;
  userId: number;
  viewers: Array<{
    avatar?: string | null;
    avatarThumbs?: Record<string, string> | null;
    canCommentStory: boolean;
    canLookStory: boolean;
    displayName?: string | null;
    hasNotViewedStory: boolean;
    id: number;
    isStoryBlockedUser: boolean;
    isStoryLiked: boolean;
    isVerified: boolean;
    name: string;
    username: string;
  }>;
  viewersCount: number;
};

export type TopStream = {
  canAddToPosts?: boolean;
  commentsCount?: number;
  description?: string;
  duration?: number;
  id: number | string;
  isActive?: boolean;
  isFinished?: boolean;
  likesCount?: number;
  media?: MediaAsset | null;
  price?: number;
  purchaseAmount?: number;
  rawDescription?: string;
  startedAt?: string;
  stats?: ContentStats;
  thumbUrl?: string | null;
  tipsCount?: number;
  tipsSum?: number | string;
  viewsCount?: number;
};

export type TopTrialLink = {
  claimCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
};

export type TrackingLink = {
  campaignCode?: number;
  campaignName?: string;
  id?: number;
  isDeleted?: boolean;
  name?: string;
  sharedWith?: UserSummary | null;
  user?: UserSummary;
};

export type Transaction = {
  amounts: TransactionAmounts;
  createdAt: string;
  currency: string;
  description: string | null;
  id: string;
  payoutPendingDays: number | null;
  status: string | null;
  type: string | null;
  user: TransactionUser | null;
};

export type TransactionAmounts = {
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  fee: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  gross: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  net: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  tax: number;
  /**
   * Amount in USD major units (dollars), not cents. For example, 12.50 means $12.50.
   */
  vat: number;
};

export type TransactionPage = {
  items: Array<Transaction>;
  page: CursorPage;
};

export type TransactionUser = {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};

export type TrialLink = {
  claimCount?: number;
  clickCount?: number;
  createdAt: string;
  days: number;
  expiredAt: string | null;
  finished: boolean;
  id: number;
  name: string;
  sharedWith?: UserSummary | null;
  subscribeCount?: number;
  url: string;
  user?: UserSummary | null;
};

export type TrialLinkPage = {
  items: Array<TrialLink>;
  page: CursorPage;
};

export type UploadInitResponse = {
  completeUrl?: string;
  expiresAt: string;
  partSize: number;
  parts: Array<{
    byteRange: {
      end: number;
      start: number;
    };
    partNumber: number;
    uploadUrl: string;
  }>;
  status: "needs_upload";
  totalParts: number;
  uploadId: string;
  uploadType: "single" | "multipart";
} | {
  media: MediaAsset;
  status: "already_exists";
};

export type UserCapabilities = {
  canBlock: boolean;
  canReceiveMessages: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canSendTrial: boolean;
  canUnsubscribe: boolean;
};

export type UserListReference = {
  id: string | number;
  name: string;
};

export type UserSummary = {
  avatar?: string | null;
  avatarThumbs?: Record<string, string> | null;
  displayName?: string | null;
  id?: number;
  isVerified?: boolean | null;
  name?: string | null;
  username?: string | null;
};

export type VaultList = {
  canDelete: boolean;
  canUpdate: boolean;
  hasMedia: boolean;
  id: number;
  medias: Array<{
    type: MediaType | null;
    url?: string;
  }>;
  name: string;
  type: "custom" | "messages" | "posts" | "stories" | "streams" | "media_stickers";
};

export type VaultMediaItem = {
  canView: boolean;
  convertedToVideo: boolean;
  counters?: {
    likesCount: number;
    tipsTotal: number;
  };
  /**
   * When OnlyFans created the media, or `null` when OnlyFans does not report it (bookmarked posts, story media).
   */
  createdAt: string | null;
  duration?: number;
  error: boolean;
  hasCustomPreview?: boolean;
  hasPosts?: boolean;
  id: number;
  /**
   * Vault lists and whether each one contains this media item.
   */
  listStates?: Array<{
    canAddMedia?: boolean;
    hasMedia?: boolean;
    id: number;
    name: string;
    type: string;
  }>;
  lists?: Array<VaultMediaListReference>;
  playback?: {
    expiresAt: string;
    licenseServers: Record<string, string>;
    manifestUrl: string;
    mimeType: "application/dash+xml";
    renewUrl: string;
    retainUrl?: string;
  };
  ready: boolean;
  releaseForms: Array<ReleaseForm>;
  sizes?: Record<string, MediaAssetSize>;
  type: MediaType;
  urls?: Record<string, string>;
  /**
   * Video URL by quality (`240`, `720`, ...). Qualities OnlyFans has not produced are omitted.
   */
  videoSources?: Record<string, string>;
};

export type VaultMediaListReference = {
  id: number;
  name: string;
  type: string;
};

export type VaultMediaPage = {
  items: Array<VaultMediaItem>;
  page: CursorPage;
};

export type VaultPlusBatchMediaRequest = {
  mediaIds: Array<string>;
};

export type VaultPlusConnectionMediaDeleteResult = {
  freedBytes: number;
  purgedCount: number;
  success: boolean;
};

export type VaultPlusConnectionStatus = {
  connectionId: string;
  pendingCount: number;
  storedCount: number;
  totalSizeBytes: number;
};

export type VaultPlusError401 = RuntimeError & {
  /**
   * Stable error code: `authorization_required` (`restart_authorization`), `external_oauth_admission_required` (`obtain_external_oauth_token`), `external_oauth_bearer_required` (`obtain_external_oauth_token`), `grant_revoked_or_expired` (`restart_authorization`), `invalid_token` (`obtain_external_oauth_token`), `linked_account_reconnect_required` (`reconnect_linked_account`).
   */
  error?: "authorization_required" | "external_oauth_admission_required" | "external_oauth_bearer_required" | "grant_revoked_or_expired" | "invalid_token" | "linked_account_reconnect_required";
};

export type VaultPlusError403 = RuntimeError & {
  /**
   * Stable error code: `additional_consent_required` (`request_additional_consent`), `client_deleted` (`contact_integration_owner`), `integration_not_approved` (`complete_integration_approval`), `integration_suspended` (`contact_integration_owner`), `linked_account_not_granted` (`grant_linked_account`), `linked_account_required` (`select_linked_account`), `linked_account_vault_plus_disabled` (`enable_linked_account_vault_plus`), `missing_scope` (`request_additional_consent`), `security_suspended` (`contact_integration_owner`), `subscription_required` (`update_developer_plan`), `vault_plus_disabled` (`enable_vault_plus`).
   */
  error?: "additional_consent_required" | "client_deleted" | "integration_not_approved" | "integration_suspended" | "linked_account_not_granted" | "linked_account_required" | "linked_account_vault_plus_disabled" | "missing_scope" | "security_suspended" | "subscription_required" | "vault_plus_disabled";
};

export type VaultPlusError404 = RuntimeError & {
  /**
   * Stable error code: `List not found`, `Media not found`.
   */
  error?: "List not found" | "Media not found";
};

export type VaultPlusError429 = RuntimeError & {
  /**
   * Stable error code: `quota_exhausted` (`retry_after_reset`), `rate_limited` (`retry`).
   */
  error?: "quota_exhausted" | "rate_limited";
};

export type VaultPlusError502 = RuntimeError & {
  /**
   * Stable error code: `Failed to fetch live OnlyFans vault list`.
   */
  error?: "Failed to fetch live OnlyFans vault list";
};

export type VaultPlusError503 = RuntimeError & {
  /**
   * Stable error code: `authorization_temporarily_unavailable` (`retry`), `vault_plus_unavailable` (`retry`).
   */
  error?: "authorization_temporarily_unavailable" | "vault_plus_unavailable";
};

export type VaultPlusIntegrationStats = {
  connectionsWithVaultPlus: number;
  totalConnections: number;
  totalMediaCount: number;
  totalStorageBytes: number;
};

export type VaultPlusListAddResult = {
  listId: string;
  queued: boolean;
  queuedItems: number;
  seen: number;
  skippedExisting: number;
};

export type VaultPlusListMediaItem = {
  duration: number | null;
  firstAddedAt: string | null;
  lastAddedAt: string | null;
  lastSeenAt: string | null;
  lastSyncedAt: string | null;
  media: Record<string, unknown | null>;
  mediaId: string;
  ofMediaId: string | null;
  status: string;
  type: string | null;
};

export type VaultPlusListSummary = {
  lastAddedAt: string | null;
  lastSeenAt: string | null;
  lastSyncedAt: string | null;
  listId: string;
  mediaCount: number;
};

export type VaultPlusListSyncResult = {
  addedItems: number;
  adoptedItems: number;
  listId: string;
  removedItems: number;
  seen: number;
  synced: boolean;
  unchangedItems: number;
  updatedItems: number;
};

export type VaultPlusMediaDeleteResult = {
  freedBytes: number;
  mediaId: string;
  success: boolean;
};

export type VaultPlusMediaItem = {
  duration: number | null;
  id: string;
  media: Record<string, VaultPlusMediaVariant>;
  type: "image" | "video" | "audio";
};

export type VaultPlusMediaList = {
  items: Array<VaultPlusMediaItem>;
  nextCursor?: string;
};

export type VaultPlusMediaVariant = {
  accessCount: number;
  contentType: string;
  createdAt: number;
  expiresAt: number;
  lastAccessedAt: number;
  playback?: {
    expiresAt: string;
    licenseServers: Record<string, string>;
    manifestUrl: string;
    mimeType: "application/dash+xml";
    renewUrl: string;
    retainUrl?: string;
  };
  quality: string;
  sizeBytes: number;
  source: "vault" | "messages" | "posts" | "stories";
  status: "edge_only" | "pending" | "storing" | "stored" | "removed";
  storedAt: number | null;
  url: string;
};
