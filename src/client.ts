/* eslint-disable */
/**
 * OFAuth API Client
 * Nested namespace structure for easy navigation
 */

import { OFAuthConfig, request, PaginationOptions, proxy, ProxyRequestOptions } from './runtime';

// Response and Request Body Types
export interface AccountConnectionsListResponse {
  list: Array<{
  status: 'active' | 'expired' | 'awaiting_2fa';
  id: string;
  userData: {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
};
  permissions: Array<string>;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
  clientReferenceId: string | null;
  imported: boolean;
  lastCheckedAt: string | null;
}>;
  hasMore: boolean;
}

export interface AccountConnectionsListItem {
  status: 'active' | 'expired' | 'awaiting_2fa';
  id: string;
  userData: {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
};
  permissions: Array<string>;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
  clientReferenceId: string | null;
  imported: boolean;
  lastCheckedAt: string | null;
}

export interface AccountConnectionsGetSettingsResponse {
  connectionId: string;
  vaultPlus: {
  enabled: boolean;
  settingsOverrides: {
  autoCacheVault?: boolean;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  minAccessCountVault?: number;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  cacheAudio?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
  retentionDays?: number;
  accessExpiryDays?: number;
  presignedUrlTtlSeconds?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
} | null;
  stats: {
  vaultPlusEnabled: boolean;
  totalStorageBytes: number;
  storageLimitBytes: number;
  mediaCount: number;
  storedCount: number;
  storageUsagePercent: number;
};
};
}

export interface AccountConnectionsUpdateSettingsRequest {
  vaultPlus?: {
  enabled?: boolean;
  settings?: {
  autoCacheVault?: boolean;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  minAccessCountVault?: number;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  cacheAudio?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
  retentionDays?: number;
  accessExpiryDays?: number;
  presignedUrlTtlSeconds?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
} | null;
};
}

export interface AccountConnectionsUpdateSettingsResponse {
  settings: {
  connectionId: string;
  vaultPlus: {
  enabled: boolean;
  settingsOverrides: {
  autoCacheVault?: boolean;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  minAccessCountVault?: number;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  cacheAudio?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
  retentionDays?: number;
  accessExpiryDays?: number;
  presignedUrlTtlSeconds?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
} | null;
  stats: {
  vaultPlusEnabled: boolean;
  totalStorageBytes: number;
  storageLimitBytes: number;
  mediaCount: number;
  storedCount: number;
  storageUsagePercent: number;
};
};
};
  purgeResult?: {
  purgedCount: number;
  freedBytes: number;
};
}

export interface AccountConnectionsCreateImportRequest {
  cookie: string;
  userAgent: string;
  permissions?: Array<string>;
  clientReferenceId?: string | null;
}

export interface AccountConnectionsCreateImportResponse {
  status: 'active' | 'expired' | 'awaiting_2fa';
  id: string;
  userData: {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
};
  permissions: Array<string>;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
  clientReferenceId: string | null;
  imported: boolean;
  lastCheckedAt: string | null;
}

export interface AccountConnectionsUpdateImportRequest {
  cookie: string;
  userAgent: string;
}

export interface AccountConnectionsUpdateImportResponse {
  status: 'active' | 'expired' | 'awaiting_2fa';
  id: string;
  userData: {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
};
  permissions: Array<string>;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
  clientReferenceId: string | null;
  imported: boolean;
  lastCheckedAt: string | null;
}

export interface AccountWhoamiResponse {
  id: string;
  name: string | null;
  permissions: Array<string>;
}

export interface AccountGetSettingsResponse {
  vaultPlus: {
  autoEnableForNewConnections: boolean;
  defaultSettings: {
  autoCacheVault: boolean;
  autoCacheMessages: boolean;
  autoCachePosts: boolean;
  autoCacheStories: boolean;
  minAccessCountVault: number;
  minAccessCountMessages: number;
  minAccessCountPosts: number;
  minAccessCountStories: number;
  cacheImages: boolean;
  cacheVideos: boolean;
  cacheAudio: boolean;
  imageQualities: Array<string>;
  videoQualities: Array<string>;
  retentionDays: number;
  accessExpiryDays: number;
  presignedUrlTtlSeconds: number;
  storageLimitBytes: number;
  storageLimitPurgeStrategy: string;
};
};
}

export interface AccountUpdateSettingsRequest {
  vaultPlus?: {
  autoEnableForNewConnections?: boolean;
  applyToExistingConnections?: boolean;
  defaultSettings?: {
  autoCacheVault?: boolean;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  minAccessCountVault?: number;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  cacheAudio?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
  retentionDays?: number;
  accessExpiryDays?: number;
  presignedUrlTtlSeconds?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
};
};
}

export interface AccountUpdateSettingsResponse {
  settings: {
  vaultPlus: {
  autoEnableForNewConnections: boolean;
  defaultSettings: {
  autoCacheVault: boolean;
  autoCacheMessages: boolean;
  autoCachePosts: boolean;
  autoCacheStories: boolean;
  minAccessCountVault: number;
  minAccessCountMessages: number;
  minAccessCountPosts: number;
  minAccessCountStories: number;
  cacheImages: boolean;
  cacheVideos: boolean;
  cacheAudio: boolean;
  imageQualities: Array<string>;
  videoQualities: Array<string>;
  retentionDays: number;
  accessExpiryDays: number;
  presignedUrlTtlSeconds: number;
  storageLimitBytes: number;
  storageLimitPurgeStrategy: string;
};
};
};
  broadcastResult?: {
  affectedConnections: number;
  purgeResults: Array<{
  connectionId: string;
  purgedCount: number;
  freedBytes: number;
}>;
};
}

export interface AccessSelfGetResponseOption0 {
  id: number;
  username: string;
  name: string;
  isAuth: boolean;
  isVerified: boolean;
  avatar: string | null;
  subscribersCount: number | null;
  postsCount: number;
  photosCount: number;
  videosCount: number;
}

export interface AccessSelfGetResponseOption1 {
  isAuth: boolean;
}

export interface AccessSelfUpdateRequest {
  name?: string;
  about?: string;
}

export interface AccessSelfUpdateResponse {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  about?: string | null;
  isMarkdownDisabledForAbout?: boolean;
  website?: string | null;
  wishlist?: string | null;
  location?: string | null;
  header?: string | null;
  headerSize?: {
  width: number;
  height: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  subscribersCount?: number | null;
  postsCount?: number;
  archivedPostsCount?: number;
  privateArchivedPostsCount?: number;
  photosCount?: number;
  videosCount?: number;
  audiosCount?: number;
  mediasCount?: number;
  favoritesCount?: number;
  favoritedCount?: number;
  joinDate?: string;
  lastSeen?: string | null;
  subscribedBy?: boolean;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  subscribePrice?: number;
  currentSubscribePrice?: number | null;
  canAddSubscriber?: boolean;
  tipsEnabled?: boolean;
  tipsTextEnabled?: boolean;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsMax?: number;
  canLookStory?: boolean;
  canCommentStory?: boolean;
  hasNotViewedStory?: boolean;
  hasStories?: boolean;
  isRestricted?: boolean;
  canRestrict?: boolean;
  isBlocked?: boolean;
  canReport?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  canReceiveChatMessage?: boolean;
  canChat?: boolean;
  showPostsInFeed?: boolean;
  hasPinnedPosts?: boolean;
  hasLabels?: boolean;
  isPrivateRestriction?: boolean;
  showSubscribersCount?: boolean;
  showMediaCount?: boolean;
  isReferrerAllowed?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  isAdultContent?: boolean;
  canTrialSend?: boolean;
  isFriend?: boolean;
  hasScheduledStream?: boolean;
  hasStream?: boolean;
  canPayInternal?: boolean;
}

export interface AccessSelfListNotificationsResponse {
  list: Array<{
  id: number;
  type: string;
  subType: string | null;
  createdAt: string;
  isRead: boolean;
  text: string;
  replacePairs: Record<string, string> | null;
  canGoToProfile: boolean;
  userId: number | null;
}>;
  hasMore: boolean;
}

export interface AccessSelfListNotificationsItem {
  id: number;
  type: string;
  subType: string | null;
  createdAt: string;
  isRead: boolean;
  text: string;
  replacePairs: Record<string, string> | null;
  canGoToProfile: boolean;
  userId: number | null;
}

export interface AccessSelfListReleaseFormsResponse {
  list: Array<{
  id: number;
  type: string;
  name: string;
  partnerId: number | null;
  code: string | null;
  status: string | null;
  createdAt: string | null;
  approvedAt: string | null;
  lastChangedAt: string | null;
  userName: string | null;
  hasUser: boolean;
  isHidden: boolean;
}>;
  hasMore: boolean;
}

export interface AccessSelfListReleaseFormsItem {
  id: number;
  type: string;
  name: string;
  partnerId: number | null;
  code: string | null;
  status: string | null;
  createdAt: string | null;
  approvedAt: string | null;
  lastChangedAt: string | null;
  userName: string | null;
  hasUser: boolean;
  isHidden: boolean;
}

export interface AccessSelfListTaggedFriendUsersResponse {
  list: Array<{
  id: number;
  type: string;
  name: string;
  user: {
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string | null;
  isHidden: boolean;
};
}>;
  hasMore: boolean;
}

export interface AccessSelfListTaggedFriendUsersItem {
  id: number;
  type: string;
  name: string;
  user: {
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string | null;
  isHidden: boolean;
};
}

export interface AccessEarningsGetChartResponse {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  gross?: number;
  delta?: number;
}

export interface AccessEarningsListTransactionsResponse {
  list: Array<{
  id: string;
  type: string | null;
  createdAt: string;
  amounts: {
  gross: number;
  net: number;
  fee: number;
  vat: number;
  tax: number;
};
  currency: string;
  description: string | null;
  status: string | null;
  payoutPendingDays: number | null;
  user: {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
};
}>;
  hasMore: boolean;
  nextMarker: number | null;
}

export interface AccessEarningsListTransactionsItem {
  id: string;
  type: string | null;
  createdAt: string;
  amounts: {
  gross: number;
  net: number;
  fee: number;
  vat: number;
  tax: number;
};
  currency: string;
  description: string | null;
  status: string | null;
  payoutPendingDays: number | null;
  user: {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
};
}

export interface AccessEarningsListChargebacksResponse {
  list: Array<{
  id: number;
  createdAt: string;
  paymentType: string | null;
  payment: {
  id: string | null;
  createdAt: string | null;
  amounts: {
  gross: number;
  net: number;
  fee: number;
  vat: number;
  tax: number;
};
  currency: string | null;
  description: string | null;
  status: string | null;
  user: {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
};
};
}>;
  hasMore: boolean;
  nextMarker: number | null;
}

export interface AccessEarningsListChargebacksItem {
  id: number;
  createdAt: string;
  paymentType: string | null;
  payment: {
  id: string | null;
  createdAt: string | null;
  amounts: {
  gross: number;
  net: number;
  fee: number;
  vat: number;
  tax: number;
};
  currency: string | null;
  description: string | null;
  status: string | null;
  user: {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
};
};
}

export interface AccessAnalyticsPostsGetResponse {
  isAvailable: boolean;
  hasStats: boolean;
  hasVideo?: boolean;
  lookCount: number;
  uniqueLookCount: number;
  uniqueLookChart: Array<{
  date: string;
  count: number;
}>;
  lookChart: Array<{
  date: string;
  count: number;
}>;
  lookDuration: number;
  lookDurationAverage: number;
  likeCount: number;
  likeChart: Array<{
  date: string;
  count: number;
}>;
  commentCount: number;
  commentChart: Array<{
  date: string;
  count: number;
}>;
  tipCount: number;
  tipChart: Array<{
  date: string;
  count: number;
}>;
  tipSum: number;
  purchasedCount: number;
  purchasedSumm: number;
  tipSumChart: Array<{
  date: string;
  count: number;
}>;
  purchasesChart: Array<{
  date: string;
  count: number;
}>;
}

export interface AccessAnalyticsPostsGetChartResponseValue {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
}

export interface AccessAnalyticsPostsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  text: string;
  isFavorite: boolean;
  canComment: boolean;
  favoritesCount: number;
  isMediaReady: boolean;
  rawText: string;
  stats?: {
  isAvailable: boolean;
  hasStats: boolean;
  hasVideo?: boolean;
  lookCount: number;
  uniqueLookCount: number;
  uniqueLookChart: Array<{
  date: string;
  count: number;
}>;
  lookChart: Array<{
  date: string;
  count: number;
}>;
  lookDuration: number;
  lookDurationAverage: number;
  likeCount: number;
  likeChart: Array<{
  date: string;
  count: number;
}>;
  commentCount: number;
  commentChart: Array<{
  date: string;
  count: number;
}>;
  tipCount: number;
  tipChart: Array<{
  date: string;
  count: number;
}>;
  tipSum: number;
  purchasedCount: number;
  purchasedSumm: number;
};
  hasVoting?: boolean;
  votingType?: number;
  voting?: {
  finishedAt: string;
  options: Array<{
  id: number;
  text?: string;
  count?: number;
  percent?: number;
  isWinner?: boolean;
}>;
  total: number;
};
}>;
}

export interface AccessAnalyticsStreamsGetChartResponseValue {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
}

export interface AccessAnalyticsStreamsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  text: string;
  isFavorite: boolean;
  canComment: boolean;
  favoritesCount: number;
  isMediaReady: boolean;
  rawText: string;
  stats?: {
  isAvailable: boolean;
  hasStats: boolean;
  hasVideo?: boolean;
  lookCount: number;
  uniqueLookCount: number;
  uniqueLookChart: Array<{
  date: string;
  count: number;
}>;
  lookChart: Array<{
  date: string;
  count: number;
}>;
  lookDuration: number;
  lookDurationAverage: number;
  likeCount: number;
  likeChart: Array<{
  date: string;
  count: number;
}>;
  commentCount: number;
  commentChart: Array<{
  date: string;
  count: number;
}>;
  tipCount: number;
  tipChart: Array<{
  date: string;
  count: number;
}>;
  tipSum: number;
  purchasedCount: number;
  purchasedSumm: number;
};
}>;
}

export interface AccessAnalyticsStoriesGetChartResponseValue {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
}

export interface AccessAnalyticsStoriesGetTopResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  userId: number;
  isReady: boolean;
  hasPost: boolean;
  isWatched: boolean;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  createdAt: string;
  canvasHeight: number;
  canvasWidth: number;
  question?: {
  entity: {
  id: number;
  text: string;
  createdAt: string;
};
  type: string;
  positions: {
  zIndex: number;
  x: number | null;
  y: number | null;
  top: number;
  left: number;
  width: number;
  height: number;
  angle: number;
  color: string;
};
};
  viewersCount: number;
  viewers: Array<{
  id: number;
  name: string;
  username: string;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  isVerified: boolean;
  canLookStory: boolean;
  canCommentStory: boolean;
  hasNotViewedStory: boolean;
  isStoryLiked: boolean;
  isStoryBlockedUser: boolean;
}>;
  commentsCount: number;
  canDelete: boolean;
  isHighlightCover: boolean;
  isLastInHighlight: boolean;
  tipsAmount: string;
  tipsAmountRaw: number;
  tipsCount: number;
  likesCount: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  post?: {
  id: number;
  author?: {
  id: number;
  _view: string;
};
  coordinateParams?: {
  top: number;
  left: number;
  angle: number;
  scale: number;
  width: number;
  height: number;
};
};
  texts: Array<{
  text: string;
  position: {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};
}>;
}>;
}

export interface AccessAnalyticsMassMessagesGetChartResponse {
  group_messages: {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
};
  group_messages_purchases: {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
};
  direct_messages: {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
};
  direct_messages_purchases: {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
};
}

export interface AccessAnalyticsMassMessagesGetSentResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  date: string;
  responseType?: string;
  text: string;
  rawText?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isMediaReady?: boolean;
  mediaCount?: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  previews: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isTip?: boolean;
  isReportedByMe?: boolean;
  viewedCount?: number;
  sentCount?: number;
  isCanceled?: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  template?: string;
  canUnsend?: boolean;
  unsendSeconds?: number;
  price?: string;
  purchasedCount?: number;
  canSendMessageToBuyers?: boolean;
}>;
}

export interface AccessAnalyticsMassMessagesGetPurchasedResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  date: string;
  responseType?: string;
  text: string;
  rawText?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isMediaReady?: boolean;
  mediaCount?: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  previews: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isTip?: boolean;
  isReportedByMe?: boolean;
  viewedCount?: number;
  sentCount?: number;
  isCanceled?: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  template?: string;
  canUnsend?: boolean;
  unsendSeconds?: number;
  price?: string;
  purchasedCount?: number;
  canSendMessageToBuyers?: boolean;
}>;
}

export interface AccessAnalyticsMassMessagesListBuyersResponse {
  list: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
  hasMore: boolean;
  nextMarker?: number | null;
}

export interface AccessAnalyticsMassMessagesListBuyersItem {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}

export interface AccessAnalyticsPromotionsGetChartResponseValue {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
}

export interface AccessAnalyticsPromotionsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  message: string;
  rawMessage: string;
  hasRelatedPromo: boolean;
  price: number;
  type: string;
  canClaim: boolean;
  claimsCount: number;
  subscribeCounts: number | null;
  subscribeDays: number;
  createdAt: string;
  finishedAt: string;
  isFinished: boolean;
}>;
}

export interface AccessAnalyticsTrialsGetChartResponseValue {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
}

export interface AccessAnalyticsTrialsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  id: number;
  trialLinkName: string;
  url: string;
  subscribeDays: number;
  subscribeCounts: number;
  claimCounts: number;
  expiredAt: string | null;
  createdAt: string;
  isFinished: boolean;
}>;
}

export interface AccessAnalyticsCampaignsGetChartResponseValue {
  chart: Array<{
  date: string;
  count: number;
}>;
  total: number;
  delta: number;
  gross?: number;
}

export interface AccessAnalyticsCampaignsGetTopResponse {
  hasMore: boolean;
  list: Array<{
  id: number;
  countSubscribers: number;
  countTransitions: number;
  campaignCode: number;
  campaignName: string;
  createdAt: string;
  endDate: string;
}>;
}

export interface AccessAnalyticsCampaignsGetTopItem {
  id: number;
  countSubscribers: number;
  countTransitions: number;
  campaignCode: number;
  campaignName: string;
  createdAt: string;
  endDate: string;
}

export interface AccessAnalyticsVisitorCountriesGetChartResponse {
  isAvailable: boolean;
  chart: {
  visitors: Array<{
  date: string;
  count: number;
}>;
  duration: Array<{
  date: string;
  count: number;
}>;
};
  total: {
  current: string;
  delta: number;
};
  hasStats: boolean;
}

export interface AccessAnalyticsVisitorCountriesGetTopResponse {
  isAvailable: boolean;
  hasStats: boolean;
  topCountries: {
  hasMore: boolean;
  totals: {
  total: number;
  guests: string;
  users: string;
  subscribers: number;
};
  rows: Array<{
  rank: number;
  countryName: string;
  countryCode: string;
  viewsCount: {
  total: number;
  guests: number;
  users: number;
  subscribers: number;
};
}>;
};
}

export interface AccessUsersListsListResponse {
  list: Array<{
  id: string | number;
  type: string;
  name: string;
  usersCount?: number;
  postsCount?: number;
  order?: string;
  direction?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canAddUsers?: boolean;
  canPinnedToFeed?: boolean;
  isPinnedToFeed?: boolean;
  canPinnedToChat?: boolean;
  isPinnedToChat?: boolean;
  sortList: Array<{
  order: string;
  direction: string;
}>;
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
}>;
  hasMore: boolean;
  order?: string;
  sort?: string;
}

export interface AccessUsersListsListItem {
  id: string | number;
  type: string;
  name: string;
  usersCount?: number;
  postsCount?: number;
  order?: string;
  direction?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canAddUsers?: boolean;
  canPinnedToFeed?: boolean;
  isPinnedToFeed?: boolean;
  canPinnedToChat?: boolean;
  isPinnedToChat?: boolean;
  sortList: Array<{
  order: string;
  direction: string;
}>;
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
}

export interface AccessUsersListsCreateRequest {
  name: string;
}

export interface AccessUsersListsCreateResponse {
  id: string | number;
  type: string;
  name: string;
  usersCount?: number;
  postsCount?: number;
  order?: string;
  direction?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canAddUsers?: boolean;
  canPinnedToFeed?: boolean;
  isPinnedToFeed?: boolean;
  canPinnedToChat?: boolean;
  isPinnedToChat?: boolean;
  sortList: Array<{
  order: string;
  direction: string;
}>;
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
}

export interface AccessUsersListsGetResponse {
  id: string | number;
  type: string;
  name: string;
  usersCount?: number;
  postsCount?: number;
  order?: string;
  direction?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canAddUsers?: boolean;
  canPinnedToFeed?: boolean;
  isPinnedToFeed?: boolean;
  canPinnedToChat?: boolean;
  isPinnedToChat?: boolean;
  sortList: Array<{
  order: string;
  direction: string;
}>;
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
}

export interface AccessUsersListsUpdateRequest {
  name: string;
}

export interface AccessUsersListsUpdateResponse {
  id: string | number;
  type: string;
  name: string;
  usersCount?: number;
  postsCount?: number;
  order?: string;
  direction?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canAddUsers?: boolean;
  canPinnedToFeed?: boolean;
  isPinnedToFeed?: boolean;
  canPinnedToChat?: boolean;
  isPinnedToChat?: boolean;
  sortList: Array<{
  order: string;
  direction: string;
}>;
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
}

export interface AccessUsersListsCreate2Request {
  listIds: Array<number>;
}

export interface AccessUsersListsCreate2Response {
  success: Array<{
  listId: number;
  success: boolean;
}>;
  errors?: Array<{
  listId: number;
  error: string;
}>;
}

export interface AccessUsersListsListUsersResponse {
  list: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
  hasMore: boolean;
  nextOffset?: number;
}

export interface AccessUsersListsListUsersItem {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}

export interface AccessUsersListsCreateUsersResponseOption0 {
  list: {
  id: string | number;
  type: string;
  name: string;
  usersCount?: number;
  postsCount?: number;
  order?: string;
  direction?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canAddUsers?: boolean;
  canPinnedToFeed?: boolean;
  isPinnedToFeed?: boolean;
  canPinnedToChat?: boolean;
  isPinnedToChat?: boolean;
  sortList: Array<{
  order: string;
  direction: string;
}>;
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
};
  userState: {
  id: string | number;
  type: string;
  name: string;
  hasUser: boolean;
  canAddUser?: boolean;
  cannotAddUserReason?: string | null;
};
}

export interface AccessUsersListsDeleteUsersResponseOption0 {
  list: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
}>;
  hasMore: boolean;
  nextOffset?: number;
}

export interface AccessUsersGetResponseOption0 {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  about?: string | null;
  isMarkdownDisabledForAbout?: boolean;
  website?: string | null;
  wishlist?: string | null;
  location?: string | null;
  header?: string | null;
  headerSize?: {
  width: number;
  height: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  subscribersCount?: number | null;
  postsCount?: number;
  archivedPostsCount?: number;
  privateArchivedPostsCount?: number;
  photosCount?: number;
  videosCount?: number;
  audiosCount?: number;
  mediasCount?: number;
  favoritesCount?: number;
  favoritedCount?: number;
  joinDate?: string;
  lastSeen?: string | null;
  subscribedBy?: boolean;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  subscribePrice?: number;
  currentSubscribePrice?: number | null;
  canAddSubscriber?: boolean;
  tipsEnabled?: boolean;
  tipsTextEnabled?: boolean;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsMax?: number;
  canLookStory?: boolean;
  canCommentStory?: boolean;
  hasNotViewedStory?: boolean;
  hasStories?: boolean;
  isRestricted?: boolean;
  canRestrict?: boolean;
  isBlocked?: boolean;
  canReport?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  canReceiveChatMessage?: boolean;
  canChat?: boolean;
  showPostsInFeed?: boolean;
  hasPinnedPosts?: boolean;
  hasLabels?: boolean;
  isPrivateRestriction?: boolean;
  showSubscribersCount?: boolean;
  showMediaCount?: boolean;
  isReferrerAllowed?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  isAdultContent?: boolean;
  canTrialSend?: boolean;
  isFriend?: boolean;
  hasScheduledStream?: boolean;
  hasStream?: boolean;
  canPayInternal?: boolean;
}

export interface AccessUsersListPostsResponse {
  list: Array<{
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  text: string;
  isFavorite: boolean;
  canComment: boolean;
  favoritesCount: number;
  isMediaReady: boolean;
  rawText: string;
}>;
  hasMore: boolean;
  headMarker: string;
  tailMarker: string;
  counters: {
  audiosCount: number;
  photosCount: number;
  videosCount: number;
  mediasCount: number;
  postsCount: number;
  streamsCount: number;
  archivedPostsCount: number;
  privateArchivedPostsCount: number;
};
}

export interface AccessUsersGetRestrictResponse {
  list: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  isRestricted?: boolean;
  canRestrict?: boolean;
  subscribedBy?: boolean | null;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean;
  currentSubscribePrice?: number | null;
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  canReport?: boolean;
  canReceiveChatMessage?: boolean;
  hideChat?: boolean;
  lastSeen?: string | null;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  canTrialSend?: boolean;
  isBlocked?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
}>;
  hasMore: boolean;
}

export interface AccessUsersGetRestrictItem {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  isRestricted?: boolean;
  canRestrict?: boolean;
  subscribedBy?: boolean | null;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean;
  currentSubscribePrice?: number | null;
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  canReport?: boolean;
  canReceiveChatMessage?: boolean;
  hideChat?: boolean;
  lastSeen?: string | null;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  canTrialSend?: boolean;
  isBlocked?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
}

export interface AccessUsersGetBlockedResponse {
  list: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  isRestricted?: boolean;
  canRestrict?: boolean;
  subscribedBy?: boolean | null;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean;
  currentSubscribePrice?: number | null;
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  canReport?: boolean;
  canReceiveChatMessage?: boolean;
  hideChat?: boolean;
  lastSeen?: string | null;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  canTrialSend?: boolean;
  isBlocked?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
}>;
  hasMore: boolean;
}

export interface AccessUsersGetBlockedItem {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  isRestricted?: boolean;
  canRestrict?: boolean;
  subscribedBy?: boolean | null;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean;
  currentSubscribePrice?: number | null;
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  canReport?: boolean;
  canReceiveChatMessage?: boolean;
  hideChat?: boolean;
  lastSeen?: string | null;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  canTrialSend?: boolean;
  isBlocked?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
}

export interface AccessUsersGetListResponse {
  users: Array<{
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  about?: string | null;
  isMarkdownDisabledForAbout?: boolean;
  website?: string | null;
  wishlist?: string | null;
  location?: string | null;
  header?: string | null;
  headerSize?: {
  width: number;
  height: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  subscribersCount?: number | null;
  postsCount?: number;
  archivedPostsCount?: number;
  privateArchivedPostsCount?: number;
  photosCount?: number;
  videosCount?: number;
  audiosCount?: number;
  mediasCount?: number;
  favoritesCount?: number;
  favoritedCount?: number;
  joinDate?: string;
  lastSeen?: string | null;
  subscribedBy?: boolean;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  subscribePrice?: number;
  currentSubscribePrice?: number | null;
  canAddSubscriber?: boolean;
  tipsEnabled?: boolean;
  tipsTextEnabled?: boolean;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsMax?: number;
  canLookStory?: boolean;
  canCommentStory?: boolean;
  hasNotViewedStory?: boolean;
  hasStories?: boolean;
  isRestricted?: boolean;
  canRestrict?: boolean;
  isBlocked?: boolean;
  canReport?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  canReceiveChatMessage?: boolean;
  canChat?: boolean;
  showPostsInFeed?: boolean;
  hasPinnedPosts?: boolean;
  hasLabels?: boolean;
  isPrivateRestriction?: boolean;
  showSubscribersCount?: boolean;
  showMediaCount?: boolean;
  isReferrerAllowed?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  isAdultContent?: boolean;
  canTrialSend?: boolean;
  isFriend?: boolean;
  hasScheduledStream?: boolean;
  hasStream?: boolean;
  canPayInternal?: boolean;
}>;
}

export interface AccessUsersSearchResponseOption0Item {
  id: number;
  username: string;
  name: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  displayName?: string;
  notice?: string;
  about?: string | null;
  isMarkdownDisabledForAbout?: boolean;
  website?: string | null;
  wishlist?: string | null;
  location?: string | null;
  header?: string | null;
  headerSize?: {
  width: number;
  height: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  subscribersCount?: number | null;
  postsCount?: number;
  archivedPostsCount?: number;
  privateArchivedPostsCount?: number;
  photosCount?: number;
  videosCount?: number;
  audiosCount?: number;
  mediasCount?: number;
  favoritesCount?: number;
  favoritedCount?: number;
  joinDate?: string;
  lastSeen?: string | null;
  subscribedBy?: boolean;
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedByData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  showPostsInFeed: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
};
  subscribedOn?: boolean;
  subscribedOnExpiredNow?: boolean;
  subscribedOnDuration?: string;
  subscribedOnData?: {
  price: number;
  newPrice: number;
  regularPrice: number;
  subscribePrice: number;
  discountPercent: number;
  discountPeriod: number;
  subscribeAt: string;
  expiredAt: string;
  renewedAt: string | null;
  discountFinishedAt: string | null;
  discountStartedAt: string | null;
  status: string | null;
  isMuted: boolean;
  unsubscribeReason: string;
  duration: string;
  hasActivePaidSubscriptions: boolean;
  subscribes: Array<{
  id: number;
  userId: number;
  subscriberId: number;
  date: string;
  duration: number;
  startDate: string;
  expireDate: string;
  cancelDate: string | null;
  price: number;
  regularPrice: number;
  discount: number;
  earningId: number;
  action: string;
  type: string;
  offerStart: string | null;
  offerEnd: string | null;
  isCurrent: boolean;
}>;
  tipsSumm: number;
  subscribesSumm: number;
  messagesSumm: number;
  postsSumm: number;
  streamsSumm: number;
  totalSumm: number;
};
  subscribePrice?: number;
  currentSubscribePrice?: number | null;
  canAddSubscriber?: boolean;
  tipsEnabled?: boolean;
  tipsTextEnabled?: boolean;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsMax?: number;
  canLookStory?: boolean;
  canCommentStory?: boolean;
  hasNotViewedStory?: boolean;
  hasStories?: boolean;
  isRestricted?: boolean;
  canRestrict?: boolean;
  isBlocked?: boolean;
  canReport?: boolean;
  canUnsubscribe?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  canReceiveChatMessage?: boolean;
  canChat?: boolean;
  showPostsInFeed?: boolean;
  hasPinnedPosts?: boolean;
  hasLabels?: boolean;
  isPrivateRestriction?: boolean;
  showSubscribersCount?: boolean;
  showMediaCount?: boolean;
  isReferrerAllowed?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  isAdultContent?: boolean;
  canTrialSend?: boolean;
  isFriend?: boolean;
  hasScheduledStream?: boolean;
  hasStream?: boolean;
  canPayInternal?: boolean;
}

export interface AccessChatsListResponse {
  list: Array<{
  withUser: {
  id: number;
  _view: string;
};
  canNotSendReason?: boolean | string;
  canSendMessage?: boolean;
  canGoToProfile?: boolean;
  unreadMessagesCount?: number;
  hasUnreadTips?: boolean;
  isMutedNotifications?: boolean;
  lastMessage?: {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
};
  lastReadMessageId?: number;
  hasPurchasedFeed?: boolean;
  countPinnedMessages?: number;
}>;
  hasMore: boolean;
  nextOffset?: number;
}

export interface AccessChatsListItem {
  withUser: {
  id: number;
  _view: string;
};
  canNotSendReason?: boolean | string;
  canSendMessage?: boolean;
  canGoToProfile?: boolean;
  unreadMessagesCount?: number;
  hasUnreadTips?: boolean;
  isMutedNotifications?: boolean;
  lastMessage?: {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
};
  lastReadMessageId?: number;
  hasPurchasedFeed?: boolean;
  countPinnedMessages?: number;
}

export interface AccessChatsListMessagesResponse {
  list: Array<{
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
}>;
  hasMore: boolean;
}

export interface AccessChatsListMessagesItem {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
}

export interface AccessChatsCreateMessagesRequest {
  isForwardedMessage?: boolean | null;
  text?: string;
  mediaItems?: Array<number | string>;
  isLockedText?: boolean | null;
  price?: number | null;
  previewMediaCount?: number | null;
  releaseForms?: {
  users?: Array<number>;
  partners?: Array<number>;
  guests?: Array<number>;
};
  userTags?: Array<number>;
  isMarkdown?: boolean | null;
}

export interface AccessChatsCreateMessagesResponse {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
}

export interface AccessChatsDeleteMessagesRequest {
  withUserId: string | number;
}

export interface AccessChatsDeleteMessagesResponse {
  success: boolean;
  queue?: {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
  date?: string;
  textCropped?: string;
  sentCount?: number;
  viewedCount?: number;
  canUnsend?: boolean;
  unsendSeconds?: number;
  isCanceled?: boolean;
  mediaTypes?: {
  video?: number;
  photo?: number;
  gif?: number;
  audio?: number;
};
  hasError?: boolean;
  price?: string;
  purchasedCount?: number;
  canSendMessageToBuyers?: boolean;
};
}

export interface AccessChatsListMediaResponse {
  list: Array<{
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
}>;
  hasMore: boolean;
}

export interface AccessChatsListMediaItem {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
}

export interface AccessSubscribersListResponse {
  list: Array<{
  id: number;
  name: string;
  username: string;
  displayName: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs: {
  c50: string;
  c144: string;
} | null;
  lastSeen: string | null;
  subscription: {
  isActive: boolean;
  isExpired: boolean;
  subscribedAt: string | null;
  expiresAt: string | null;
  renewedAt: string | null;
  price: number | null;
  regularPrice: number | null;
  discountPercent: number | null;
  discountPeriod: number | null;
  discountStartedAt: string | null;
  discountFinishedAt: string | null;
  history: Array<{
  id: number;
  startDate: string;
  expireDate: string;
  price: number;
  regularPrice: number;
  discount: number;
  type: string;
  action: string;
  isCurrent: boolean;
}>;
};
  spending: {
  total: number;
  tips: number;
  subscriptions: number;
  messages: number;
  posts: number;
  streams: number;
};
  isRestricted: boolean;
  isBlocked: boolean;
  capabilities: {
  canRestrict: boolean;
  canBlock: boolean;
  canReport: boolean;
  canUnsubscribe: boolean;
  canReceiveMessages: boolean;
  canSendTrial: boolean;
};
  lists: Array<{
  id: string | number;
  name: string;
}>;
}>;
  hasMore: boolean;
}

export interface AccessSubscribersListItem {
  id: number;
  name: string;
  username: string;
  displayName: string;
  isVerified: boolean;
  avatar: string | null;
  avatarThumbs: {
  c50: string;
  c144: string;
} | null;
  lastSeen: string | null;
  subscription: {
  isActive: boolean;
  isExpired: boolean;
  subscribedAt: string | null;
  expiresAt: string | null;
  renewedAt: string | null;
  price: number | null;
  regularPrice: number | null;
  discountPercent: number | null;
  discountPeriod: number | null;
  discountStartedAt: string | null;
  discountFinishedAt: string | null;
  history: Array<{
  id: number;
  startDate: string;
  expireDate: string;
  price: number;
  regularPrice: number;
  discount: number;
  type: string;
  action: string;
  isCurrent: boolean;
}>;
};
  spending: {
  total: number;
  tips: number;
  subscriptions: number;
  messages: number;
  posts: number;
  streams: number;
};
  isRestricted: boolean;
  isBlocked: boolean;
  capabilities: {
  canRestrict: boolean;
  canBlock: boolean;
  canReport: boolean;
  canUnsubscribe: boolean;
  canReceiveMessages: boolean;
  canSendTrial: boolean;
};
  lists: Array<{
  id: string | number;
  name: string;
}>;
}

export interface AccessSubscribersSetNoteRequest {
  notice: string;
}

export interface AccessSubscribersSetDiscountRequest {
  discount: number;
  period: number;
}

export interface AccessSubscribersSetCustomNameRequest {
  displayName: string;
}

export interface AccessSubscriptionsListResponse {
  list: Array<{
  id: number;
  username: string;
  name: string;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  subscribedAt: string;
  expiredAt: string | null;
  renewedAt: string | null;
  isActive: boolean;
  subscriptionPrice: number;
  tipsSumm?: number;
  subscribesSumm?: number;
  messagesSumm?: number;
  postsSumm?: number;
  streamsSumm?: number;
  totalSumm?: number;
}>;
  hasMore: boolean;
}

export interface AccessSubscriptionsListItem {
  id: number;
  username: string;
  name: string;
  avatar: string | null;
  avatarThumbs?: {
  c50: string;
  c144: string;
} | null;
  lists: Array<{
  id: string | number;
  type: string;
  name: string;
}>;
  subscribedAt: string;
  expiredAt: string | null;
  renewedAt: string | null;
  isActive: boolean;
  subscriptionPrice: number;
  tipsSumm?: number;
  subscribesSumm?: number;
  messagesSumm?: number;
  postsSumm?: number;
  streamsSumm?: number;
  totalSumm?: number;
}

export interface AccessSubscriptionsGetCountResponse {
  subscriptions: {
  active: number;
  muted: number;
  restricted: number;
  expired: number;
  blocked: number;
  attention: number;
  all: number;
};
  subscribers: {
  active: number;
  muted: number;
  restricted: number;
  expired: number;
  blocked: number;
  all: number;
  activeOnline: number;
};
  bookmarks: number;
}

export interface AccessSubscriptionsGetHistoryResponse {
  list: Array<{
  subscribeDate: string;
  expireDate: string;
  price: number;
}>;
  hasMore: boolean;
}

export interface AccessPromotionsTrackingLinksListResponse {
  list: Array<{
  id: number;
  name: string;
}>;
  hasMore: boolean;
}

export interface AccessPromotionsTrackingLinksListItem {
  id: number;
  name: string;
}

export interface AccessPromotionsTrackingLinksCreateRequest {
  name: string;
}

export interface AccessPromotionsTrackingLinksCreateResponseOption0Item {
  id: number;
  name: string;
}

export interface AccessPromotionsTrackingLinksCreateResponseOption1 {
  id: number;
  name: string;
}

export interface AccessPromotionsTrackingLinksGetResponse {
  id: number;
  name: string;
}

export interface AccessPromotionsTrackingLinksReplaceRequest {
  name?: string;
}

export interface AccessPromotionsTrackingLinksReplaceResponse {
  id: number;
  name: string;
}

export interface AccessPromotionsTrackingLinksDeleteResponse {
  success: boolean;
}

export interface AccessPromotionsTrackingLinksCreateShareAccessRequest {
  campaignId: number;
  userId: number;
}

export interface AccessPromotionsTrackingLinksCreateShareAccessResponse {
  success: boolean;
}

export interface AccessPromotionsTrackingLinksDeleteShareAccessRequest {
  campaignId: number;
  userId: number;
}

export interface AccessPromotionsTrackingLinksDeleteShareAccessResponse {
  success: boolean;
}

export interface AccessPromotionsTrackingLinksListClaimersResponse {
  list: Array<any | null>;
  hasMore?: boolean;
}

export interface AccessPromotionsTrialLinksListResponseOption0 {
  list: Array<{
  id: number;
  trialLinkName: string;
  url: string;
  subscribeDays: number;
  subscribeCounts: number;
  claimCounts: number;
  clicksCounts: number;
  expiredAt: string | null;
  createdAt: string;
  isFinished: boolean;
  user?: any | null;
  sharedWith?: string | null;
}>;
  hasMore: boolean;
}

export interface AccessPromotionsTrialLinksListResponseOption1Item {
  id: number;
  trialLinkName: string;
  url: string;
  subscribeDays: number;
  subscribeCounts: number;
  claimCounts: number;
  clicksCounts: number;
  expiredAt: string | null;
  createdAt: string;
  isFinished: boolean;
  user?: any | null;
  sharedWith?: string | null;
}

export interface AccessPromotionsTrialLinksCreateRequest {
  trialLinkName: string;
  subscribeDays: number;
  subscribeCounts?: number;
  expiredAt?: string;
}

export interface AccessPromotionsTrialLinksCreateResponse {
  id: number;
  trialLinkName: string;
  url: string;
  subscribeDays: number;
  subscribeCounts: number;
  claimCounts: number;
  clicksCounts: number;
  expiredAt: string | null;
  createdAt: string;
  isFinished: boolean;
  user?: any | null;
  sharedWith?: string | null;
}

export interface AccessPromotionsTrialLinksGetResponse {
  id: number;
  trialLinkName: string;
  url: string;
  subscribeDays: number;
  subscribeCounts: number;
  claimCounts: number;
  clicksCounts: number;
  expiredAt: string | null;
  createdAt: string;
  isFinished: boolean;
  user?: any | null;
  sharedWith?: string | null;
}

export interface AccessPromotionsTrialLinksReplaceRequest {
  trialLinkName?: string;
  subscribeDays?: number;
  subscribeCounts?: number;
  expiredAt?: string;
}

export interface AccessPromotionsTrialLinksReplaceResponse {
  success: boolean;
}

export interface AccessPromotionsTrialLinksDeleteResponse {
  success: boolean;
}

export interface AccessPromotionsTrialLinksCreateShareAccessRequest {
  trialId: number;
  userId: number;
}

export interface AccessPromotionsTrialLinksCreateShareAccessResponse {
  success: boolean;
}

export interface AccessPromotionsTrialLinksDeleteShareAccessRequest {
  trialId: number;
  userId: number;
}

export interface AccessPromotionsTrialLinksDeleteShareAccessResponse {
  success: boolean;
}

export interface AccessPromotionsListResponseOption0Item {
  id: number;
  message: string;
  rawMessage: string;
  hasRelatedPromo: boolean;
  price: number;
  type: string;
  canClaim: boolean;
  claimsCount: number;
  subscribeCounts: number;
  subscribeDays: number;
  createdAt: string;
  finishedAt: string;
  isFinished: boolean;
}

export interface AccessPromotionsListResponseOption1 {
  list: Array<{
  id: number;
  message: string;
  rawMessage: string;
  hasRelatedPromo: boolean;
  price: number;
  type: string;
  canClaim: boolean;
  claimsCount: number;
  subscribeCounts: number;
  subscribeDays: number;
  createdAt: string;
  finishedAt: string;
  isFinished: boolean;
}>;
  hasMore: boolean;
}

export interface AccessPromotionsCreateRequest {
  discount: number;
  message: string;
  finishDays: number;
  subscribeCounts: number;
  subscribeDays: number;
  type: Array<string>;
}

export interface AccessPromotionsCreateResponseOption0Item {
  id: number;
  message: string;
  rawMessage: string;
  hasRelatedPromo: boolean;
  price: number;
  type: string;
  canClaim: boolean;
  claimsCount: number;
  subscribeCounts: number;
  subscribeDays: number;
  createdAt: string;
  finishedAt: string;
  isFinished: boolean;
}

export interface AccessPromotionsCreateResponseOption1 {
  list: Array<{
  id: number;
  message: string;
  rawMessage: string;
  hasRelatedPromo: boolean;
  price: number;
  type: string;
  canClaim: boolean;
  claimsCount: number;
  subscribeCounts: number;
  subscribeDays: number;
  createdAt: string;
  finishedAt: string;
  isFinished: boolean;
}>;
  hasMore: boolean;
}

export interface AccessPromotionsReplaceRequest {
  discount?: number;
  message?: string;
  finishDays?: number;
  subscribeCounts?: number;
  subscribeDays?: number;
  type?: Array<string>;
}

export interface AccessPromotionsReplaceResponse {
  id: number;
  message: string;
  rawMessage: string;
  hasRelatedPromo: boolean;
  price: number;
  type: string;
  canClaim: boolean;
  claimsCount: number;
  subscribeCounts: number;
  subscribeDays: number;
  createdAt: string;
  finishedAt: string;
  isFinished: boolean;
}

export interface AccessPromotionsDeleteResponse {
  success: boolean;
}

export interface AccessPromotionsListBundlesResponseOption0Item {
  id: number;
  discount: number;
  duration: number;
  price: number;
  canBuy: boolean;
}

export interface AccessPromotionsListBundlesResponseOption1 {
  list: Array<{
  id: number;
  discount: number;
  duration: number;
  price: number;
  canBuy: boolean;
}>;
  hasMore: boolean;
}

export interface AccessPromotionsCreateBundlesRequest {
  discount: number;
  duration: number;
}

export interface AccessPromotionsCreateBundlesResponse {
  id: number;
  discount: number;
  duration: number;
  price: number;
  canBuy: boolean;
}

export interface AccessPromotionsGetBundlesResponse {
  id: number;
  discount: number;
  duration: number;
  price: number;
  canBuy: boolean;
}

export interface AccessPromotionsReplaceBundlesRequest {
  discount?: number;
  duration?: number;
}

export interface AccessPromotionsReplaceBundlesResponse {
  id: number;
  discount: number;
  duration: number;
  price: number;
  canBuy: boolean;
}

export interface AccessPromotionsDeleteBundlesResponse {
  id: number;
  discount: number;
  duration: number;
  price: number;
  canBuy: boolean;
}

export interface AccessPromotionsCreateStopResponse {
  success: boolean;
}

export interface AccessVaultListsListResponse {
  list: Array<{
  id: number;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
  name: string;
  hasMedia: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
}>;
  all: {
  videosCount: number;
  photosCount: number;
  gifsCount: number;
  audiosCount: number;
  medias: Array<{
  type: any | null;
}>;
};
  hasMore: boolean;
  canCreateVaultLists: boolean;
  order: string;
  sort: string;
}

export interface AccessVaultListsListItem {
  id: number;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
  name: string;
  hasMedia: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
}

export interface AccessVaultListsCreateRequest {
  name: string;
}

export interface AccessVaultListsCreateResponse {
  id: number;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
  name: string;
  hasMedia: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
}

export interface AccessVaultListsUpdateRequest {
  name: string;
  clearMedia?: boolean | null;
}

export interface AccessVaultListsUpdateResponse {
  id: number;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
  name: string;
  hasMedia: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
}

export interface AccessVaultListsListMediaResponse {
  list: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  hasPosts?: boolean;
  lists: Array<{
  id: number;
  type: string;
  name: string;
}>;
}>;
  hasMore: boolean;
}

export interface AccessVaultListsListMediaItem {
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  hasPosts?: boolean;
  lists: Array<{
  id: number;
  type: string;
  name: string;
}>;
}

export interface AccessVaultListsCreateMediaRequest {
  mediaIds: Array<number>;
}

export interface AccessVaultListsCreateMediaResponse {
  id: number;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
  name: string;
  hasMedia: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
}

export interface AccessVaultListMediaResponse {
  list: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  hasPosts?: boolean;
  lists: Array<{
  id: number;
  type: string;
  name: string;
}>;
}>;
  hasMore: boolean;
}

export interface AccessVaultListMediaItem {
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  hasPosts?: boolean;
  lists: Array<{
  id: number;
  type: string;
  name: string;
}>;
}

export interface AccessUploadsReplaceResponse {
  mediaUploadId: string;
  media?: {
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
};
}

export interface AccessUploadsCheckRequest {
  etag: string;
  size: number;
}

export interface AccessUploadsCheckResponse {
  exists: boolean;
  media?: {
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
};
}

export interface AccessUploadsInitRequest {
  filename: string;
  size: number;
  contentType: string;
  vaultUpload?: {
  mode?: 'message';
  userId?: string | null;
};
}

export interface AccessUploadsInitResponse {
  mediaUploadId: string;
}

export interface AccessUploadsReplacePartsResponse {
  mediaUploadId: string;
  partNumber: number;
  etag: string;
}

export interface AccessUploadsCompleteRequest {
  mediaUploadId: string;
}

export interface AccessUploadsCompleteResponse {
  mediaUploadId: string;
  media?: {
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
};
}

export interface AccessListPostsResponse {
  list: Array<{
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  text: string;
  isFavorite: boolean;
  canComment: boolean;
  favoritesCount: number;
  isMediaReady: boolean;
  rawText: string;
}>;
  hasMore: boolean;
  headMarker: string;
  tailMarker: string;
  counters: {
  audiosCount: number;
  photosCount: number;
  videosCount: number;
  mediasCount: number;
  postsCount: number;
  streamsCount: number;
  archivedPostsCount: number;
  privateArchivedPostsCount: number;
};
}

export interface AccessCreatePostsRequest {
  text?: string;
  mediaItems?: Array<number | string>;
  isLockedText?: boolean | null;
  price?: number | null;
  previewMediaCount?: number | null;
  releaseForms?: {
  users?: Array<number>;
  partners?: Array<number>;
  guests?: Array<number>;
};
  userTags?: Array<number>;
  isMarkdown?: boolean | null;
  scheduledDate?: string;
  fundRaisingTargetAmount?: number;
  fundRaisingTipsPresets?: Array<number>;
  expireAfter?: number;
}

export interface AccessCreatePostsResponse {
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  text: string;
  isFavorite: boolean;
  canComment: boolean;
  favoritesCount: number;
  isMediaReady: boolean;
  rawText: string;
}

export interface AccessGetPostsResponseOption0 {
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  isMediaReady: boolean;
  price?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  canEditText: boolean;
  canEditMedia: boolean;
  canEditSchedule: boolean;
  canEditVote: boolean;
  preview: Array<number>;
}

export interface AccessReplacePostsRequest {
  text?: string;
  mediaItems?: Array<number | string>;
  isLockedText?: boolean | null;
  price?: number | null;
  previewMediaCount?: number | null;
  releaseForms?: {
  users?: Array<number>;
  partners?: Array<number>;
  guests?: Array<number>;
};
  userTags?: Array<number>;
  isMarkdown?: boolean | null;
  scheduledDate?: string;
  fundRaisingTargetAmount?: number;
  fundRaisingTipsPresets?: Array<number>;
  expireAfter?: number;
}

export interface AccessReplacePostsResponse {
  id: number;
  canDelete: boolean;
  canEdit: boolean;
  mediaCount: number;
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  canViewMedia: boolean;
  author?: {
  id: number;
  _view: string;
};
  responseType: string;
  postedAt: string;
  postedAtPrecise: string;
  isMarkdownDisabled: boolean;
  isOpened: boolean;
  canToggleFavorite: boolean;
  tipsAmount: string;
  text: string;
  isFavorite: boolean;
  canComment: boolean;
  favoritesCount: number;
  isMediaReady: boolean;
  rawText: string;
}

export interface AccessCreateMassMessagesRequest {
  isForwardedMessage?: boolean | null;
  text?: string;
  mediaItems?: Array<number | string>;
  isLockedText?: boolean | null;
  price?: number | null;
  previewMediaCount?: number | null;
  releaseForms?: {
  users?: Array<number>;
  partners?: Array<number>;
  guests?: Array<number>;
};
  userTags?: Array<number>;
  isMarkdown?: boolean | null;
  scheduledDate?: string | any | null;
  userIds?: Array<number | string>;
  userLists?: Array<number | string>;
  subscribedAfterDate?: string | any | null;
  excludeUserLists?: Array<number | string>;
}

export interface AccessCreateMassMessagesResponse {
  id: number;
  date: string;
  isReady?: boolean;
  isDone?: boolean;
  total?: number;
  pending?: number;
  canUnsend?: boolean;
  unsendSeconds?: number;
  hasError?: boolean;
  isCanceled?: boolean;
  isCouplePeopleMedia?: boolean;
}

export interface AccessGetMassMessagesResponse {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
}

export interface AccessReplaceMassMessagesRequest {
  isForwardedMessage?: boolean | null;
  text?: string;
  mediaItems?: Array<number | string>;
  isLockedText?: boolean | null;
  price?: number | null;
  previewMediaCount?: number | null;
  releaseForms?: {
  users?: Array<number>;
  partners?: Array<number>;
  guests?: Array<number>;
};
  userTags?: Array<number>;
  isMarkdown?: boolean | null;
  scheduledDate?: string | any | null;
  userIds?: Array<number | string>;
  userLists?: Array<number | string>;
  subscribedAfterDate?: string | any | null;
  excludeUserLists?: Array<number | string>;
}

export interface AccessReplaceMassMessagesResponse {
  id: number;
  date: string;
  isReady?: boolean;
  isDone?: boolean;
  total?: number;
  pending?: number;
  canUnsend?: boolean;
  unsendSeconds?: number;
  hasError?: boolean;
  isCanceled?: boolean;
  isCouplePeopleMedia?: boolean;
}

export interface AccessDeleteMassMessagesResponse {
  success: boolean;
  queue?: {
  id: number;
  text: string;
  fromUser: {
  id: number;
  name: string;
} | {
  id: number;
  _view: string;
};
  media: Array<{
  id: number;
  type: 'photo' | 'video' | 'gif' | 'audio';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  isReady: boolean;
  duration?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  view: string;
  id: number;
  name: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  avatarThumbs: {
  c50: string;
  c144: string;
};
  ivStatus: string;
  isFromGuest: boolean;
};
}>;
  hasCustomPreview?: boolean;
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
  files?: {
  full: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  sources: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  thumb?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
  preview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  options: Array<{
  url: string;
  width?: number;
  height?: number;
  type?: string;
}>;
};
  squarePreview?: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};
};
}>;
  isMediaReady?: boolean;
  mediaCount?: number;
  previews: Array<number>;
  lockedText?: boolean;
  responseType?: string;
  giphyId?: string | null;
  isFree?: boolean;
  isTip?: boolean;
  isReportedByMe?: boolean;
  isCouplePeopleMedia?: boolean;
  queueId?: number;
  isMarkdownDisabled?: boolean;
  releaseForms?: any | null;
  isFromQueue?: boolean;
  canUnsendQueue?: boolean;
  unsendSecondsQueue?: number;
  isOpened?: boolean;
  isNew?: boolean;
  createdAt?: string;
  changedAt?: string;
  cancelSeconds?: number;
  isLiked?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canBePinned?: boolean;
  isPinned?: boolean;
  date?: string;
  textCropped?: string;
  sentCount?: number;
  viewedCount?: number;
  canUnsend?: boolean;
  unsendSeconds?: number;
  isCanceled?: boolean;
  mediaTypes?: {
  video?: number;
  photo?: number;
  gif?: number;
  audio?: number;
};
  hasError?: boolean;
  price?: string;
  purchasedCount?: number;
  canSendMessageToBuyers?: boolean;
};
}

export interface LinkGetResponse {
  status: 'initialized' | 'pending' | 'awaiting_2fa' | 'denied' | 'completed' | 'invalid_credentials' | 'failed' | 'not_found';
  data?: {
  twoFactorState: {
  options: Array<'phone' | 'app' | 'face' | 'forceFace'>;
  phoneCode?: {
  requestAttemptsLimit: number;
  requestAttemptsLeft: number;
  checkAttemptsLimit?: number;
  checkAttemptsLeft?: number;
  expirationDate?: string;
  expirationSeconds?: number;
  lastSentDate?: string;
};
  faceCode?: {
  requestAttemptsLimit: number;
  requestAttemptsLeft: number;
};
  phoneLast4?: string;
};
} | {
  id: string;
  session: {
  'user-id': string;
  'user-agent': string;
  cookie: string;
  'x-bc': string;
};
  userData: {
  id: string;
  name: string;
  username: string;
  avatar: string;
};
};
}

export interface LinkInitRequest {
  redirectUrl?: string;
  clientReferenceId?: string;
  connectionId?: string;
  geolocation?: {
  country: string;
  state?: string;
  city?: string;
};
}

export interface LinkInitResponse {
  url: string;
  expiresAt: string;
}

export interface DynamicRulesListResponse {
  rules: {
  static_param: string;
  format: string;
  start: string;
  end: string;
  prefix: string;
  suffix: string;
  checksum_constant: number;
  checksum_indexes: Array<number>;
  app_token: string;
  revision: string;
};
  is_current: boolean;
  is_public: boolean;
  is_early_access: boolean;
}

export interface DynamicRulesSignRequest {
  endpoint: string;
  time?: number | string;
  'user-id'?: number | string;
}

export interface DynamicRulesSignResponse {
  signed: {
  sign: string;
  time: string;
  'user-id'?: string;
  'app-token': string;
};
  is_public: boolean;
  is_early_access: boolean;
}

export interface DynamicRulesGetStatusResponse {
  revision: string;
  early_access_revision: string;
  public_revision: string;
  is_current: boolean;
  is_early_access: boolean;
  is_public: boolean;
  access_granted: boolean;
}

export interface VaultPlusStoreCreateListResponse {
  queued: boolean;
  listId: string;
  estimatedItems?: number;
}

export interface VaultPlusStoreGetStatusResponse {
  connectionId: string;
  totalMedia: number;
  storedCount: number;
  pendingCount: number;
  totalSizeBytes: number;
}

export interface VaultPlusStoreGetStatsResponse {
  totalConnections: number;
  connectionsWithVaultPlus: number;
  totalStorageBytes: number;
  totalMediaCount: number;
}

export interface VaultPlusGetResponse {
  id: string;
  type: 'image' | 'video' | 'audio';
  duration: number | null;
  media: Record<string, {
  id: string;
  status: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  quality: string;
  sizeBytes: number;
  contentType: string;
  source: 'vault' | 'messages' | 'posts' | 'stories';
  accessCount: number;
  createdAt: number;
  expiresAt: number;
  storedAt: number | null;
  lastAccessedAt: number;
  url: string;
}>;
}

export interface VaultPlusDeleteResponse {
  success: boolean;
  mediaId: string;
  freedBytes: number;
}

export interface VaultPlusCreateBatchRequest {
  mediaIds: Array<string>;
}

export interface VaultPlusCreateBatchResponse {
  items: Array<{
  id: string;
  type: 'image' | 'video' | 'audio';
  duration: number | null;
  media: Record<string, {
  id: string;
  status: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  quality: string;
  sizeBytes: number;
  contentType: string;
  source: 'vault' | 'messages' | 'posts' | 'stories';
  accessCount: number;
  createdAt: number;
  expiresAt: number;
  storedAt: number | null;
  lastAccessedAt: number;
  url: string;
}>;
}>;
}

export interface VaultPlusGetListResponse {
  items: Array<{
  id: string;
  type: 'image' | 'video' | 'audio';
  duration: number | null;
  media: Record<string, {
  id: string;
  status: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  quality: string;
  sizeBytes: number;
  contentType: string;
  source: 'vault' | 'messages' | 'posts' | 'stories';
  accessCount: number;
  createdAt: number;
  expiresAt: number;
  storedAt: number | null;
  lastAccessedAt: number;
  url: string;
}>;
}>;
  nextCursor?: string;
}

export interface VaultPlusPurgeResponse {
  success: boolean;
  purgedCount: number;
  freedBytes: number;
}

// Parameter interfaces
export interface AccountConnectionsDeleteParams {
  /** connectionId */
  connectionId: string;
}

export interface AccountConnectionsListParams {
  /** status */
  status?: 'active' | 'expired' | 'awaiting_2fa';
  /** imported */
  imported?: 'true' | 'false';
  /** limit */
  limit?: number;
  /** offset */
  offset?: number;
}

export interface AccountConnectionsInvalidateParams {
  /** connectionId */
  connectionId: string;
}

export interface AccountConnectionsGetSettingsParams {
  /** connectionId */
  connectionId: string;
}

export interface AccountConnectionsUpdateSettingsParams {
  /** connectionId */
  connectionId: string;
  /** Request body */
  body?: AccountConnectionsUpdateSettingsRequest;
}

export interface AccountConnectionsCreateImportParams {
  /** Request body */
  body?: AccountConnectionsCreateImportRequest;
}

export interface AccountConnectionsUpdateImportParams {
  /** connectionId */
  connectionId: string;
  /** Request body */
  body?: AccountConnectionsUpdateImportRequest;
}

export interface AccountUpdateSettingsParams {
  /** Request body */
  body?: AccountUpdateSettingsRequest;
}

export interface AccessSelfUpdateParams {
  /** Request body */
  body?: AccessSelfUpdateRequest;
}

export interface AccessSelfListNotificationsParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Filter by notification type */
  type?: 'subscribed' | 'purchases' | 'tip' | 'post' | 'commented' | 'mentioned' | 'favorited' | 'message';
  /** Filter notifications related to this user */
  relatedUsername?: string;
}

export interface AccessSelfListReleaseFormsParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Filter: all forms or only pending */
  filter?: 'all' | 'pending';
  /** Sort by date or name */
  sortBy?: 'date' | 'name';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Search/filter text */
  search?: string;
}

export interface AccessSelfListTaggedFriendUsersParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Filter: all forms or only pending */
  filter?: 'all' | 'pending';
  /** Sort by date or name */
  sortBy?: 'date' | 'name';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Search/filter text */
  search?: string;
}

export interface AccessEarningsGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Earnings type to chart */
  by?: 'total' | 'messages' | 'tips' | 'stream' | 'post' | 'subscribes' | 'tips_profile' | 'tips_post' | 'tips_chat' | 'tips_stream' | 'tips_story' | 'ref';
  /** Include total in response */
  withTotal?: boolean;
  /** Include monthly totals */
  monthlyTotal?: boolean;
}

export interface AccessEarningsListTransactionsParams {
  /** Start date for transactions */
  startDate?: string;
  /** Pagination marker from previous response */
  marker?: string;
  /** Transaction type filter */
  type?: 'subscribes' | 'chat_messages' | 'post' | 'stream' | 'tips';
  /** Tips source filter (when type=tips) */
  tipsSource?: 'chat' | 'post_all' | 'profile' | 'story' | 'stream';
}

export interface AccessEarningsListChargebacksParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Pagination marker from previous response */
  marker?: string;
}

export interface AccessAnalyticsPostsGetParams {
  /** OnlyFans post ID */
  postId?: string;
}

export interface AccessAnalyticsPostsGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
  /** Metric to chart */
  by?: 'purchases' | 'posts' | 'tips' | 'views' | 'likes' | 'comments';
}

export interface AccessAnalyticsPostsGetTopParams {
  /** Metric to rank by */
  by?: 'purchases' | 'tips' | 'views' | 'likes' | 'comments';
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Number of items to return (1-20, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessAnalyticsStreamsGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
  /** Metric to chart */
  by?: 'purchases' | 'duration' | 'tips' | 'views' | 'likes' | 'comments';
}

export interface AccessAnalyticsStreamsGetTopParams {
  /** Metric to rank by */
  by?: 'purchases' | 'duration' | 'tips' | 'views' | 'likes' | 'comments';
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Number of items to return (1-20, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessAnalyticsStoriesGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
  /** Metric to chart */
  by?: 'tips' | 'stories' | 'views' | 'likes' | 'comments';
}

export interface AccessAnalyticsStoriesGetTopParams {
  /** Metric to rank by */
  by?: 'tips' | 'views' | 'likes' | 'comments';
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Number of items to return (1-20, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessAnalyticsMassMessagesGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
}

export interface AccessAnalyticsMassMessagesGetSentParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Max number of items to return */
  limit?: number;
}

export interface AccessAnalyticsMassMessagesGetPurchasedParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessAnalyticsMassMessagesListBuyersParams {
  /** Mass message ID */
  massMessageId?: string;
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Pagination marker from previous response */
  marker?: number;
}

export interface AccessAnalyticsPromotionsGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
}

export interface AccessAnalyticsPromotionsGetTopParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
}

export interface AccessAnalyticsTrialsGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
}

export interface AccessAnalyticsTrialsGetTopParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
}

export interface AccessAnalyticsCampaignsGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
}

export interface AccessAnalyticsCampaignsGetTopParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
}

export interface AccessAnalyticsVisitorCountriesGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Visitor metric to chart */
  by?: 'guests' | 'total' | 'users';
}

export interface AccessAnalyticsVisitorCountriesGetTopParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Visitor metric to rank by */
  by?: 'guests' | 'total' | 'users';
}

export interface AccessUsersListsListParams {
  /** Number of items to return (1-100, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Search/filter text */
  query?: string;
}

export interface AccessUsersListsCreateParams {
  /** Request body */
  body?: AccessUsersListsCreateRequest;
}

export interface AccessUsersListsGetParams {
  /** listId */
  listId: string;
}

export interface AccessUsersListsUpdateParams {
  /** listId */
  listId: string;
  /** Request body */
  body?: AccessUsersListsUpdateRequest;
}

export interface AccessUsersListsDeleteParams {
  /** listId */
  listId: string;
}

export interface AccessUsersListsCreate2Params {
  /** userId */
  userId: string;
  /** Request body */
  body?: AccessUsersListsCreate2Request;
}

export interface AccessUsersListsListUsersParams {
  /** listId */
  listId: string;
  /** Number of items to return (1-100, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessUsersListsCreateUsersParams {
  /** listId */
  listId: string;
  /** userId */
  userId: string;
}

export interface AccessUsersListsDeleteUsersParams {
  /** listId */
  listId: string;
  /** userId */
  userId: string;
}

export interface AccessUsersGetParams {
  /** User ID (numeric or username) */
  userId?: string;
}

export interface AccessUsersListPostsParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Number of posts to return (1-10) */
  limit?: number;
  /** Sort posts by: publish_date, tips, or favorites_count */
  sortBy?: 'publish_date' | 'tips' | 'favorites_count';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Include pinned posts */
  pinned?: boolean;
  /** Include engagement counts */
  includePostCounts?: boolean;
  /** Pagination cursor: get posts before this time */
  beforePublishTime?: string;
}

export interface AccessUsersGetRestrictParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessUsersRestrictParams {
  /** User ID (numeric or username) */
  userId?: string;
}

export interface AccessUsersRestrict2Params {
  /** User ID (numeric or username) */
  userId?: string;
}

export interface AccessUsersGetBlockedParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessUsersGetListParams {
  /** User IDs to fetch (comma-separated string or array) */
  userIds: Array<string> | string;
}

export interface AccessUsersSearchParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Search/filter text */
  query?: string;
}

export interface AccessChatsListParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Sort order: recent (newest first) or old (oldest first) */
  order?: 'recent' | 'old';
  /** Filter chats by type */
  filter?: 'priority' | 'who_tipped' | 'unread';
  /** Search/filter text */
  query?: string;
  /** Filter to specific user list */
  userListId?: number;
}

export interface AccessChatsListMessagesParams {
  /** userId */
  userId: string;
  /** Number of messages to return (max 10) */
  limit?: number;
  /** Number of messages to skip (for pagination) */
  offset?: number;
  /** Search/filter text */
  query?: string;
  /** ID of the last message from previous page. Used for cursor pagination. */
  lastId?: string;
  /** Include this message ID as the first message in the results. Used to retrieve messages from e.g. the Search Chat Messages endpoint IDs. */
  firstId?: string;
  /** Include user data in the response */
  includeUsers?: boolean;
}

export interface AccessChatsCreateMessagesParams {
  /** userId */
  userId: string;
  /** Request body */
  body?: AccessChatsCreateMessagesRequest;
}

export interface AccessChatsDeleteMessagesParams {
  /** userId */
  userId: string;
  /** messageId */
  messageId: string;
  /** Request body */
  body?: AccessChatsDeleteMessagesRequest;
}

export interface AccessChatsListMediaParams {
  /** userId */
  userId: string;
  /** Number of items to return (1-100, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Users to skip */
  skipUsers?: string;
  /** Pagination cursor */
  lastId?: string;
  /** Filter by opened status */
  opened?: '0' | '1' | 'true' | 'false';
  /** Filter by media type */
  type?: 'photos' | 'videos' | 'audios';
}

export interface AccessSubscribersListParams {
  /** Search/filter text */
  query?: string;
  /** Advanced filters */
  filter?: {
  'promoId'?: string;
  'trial_id'?: string;
  'duration'?: string;
  'tips'?: string;
  'total_spent'?: string;
  'online'?: '0' | '1' | 'true' | 'false';
};
  /** Subscriber type filter */
  type?: 'all' | 'active' | 'expired' | 'latest';
  /** Filter subscribers from this date (for type=latest) */
  startDate?: string;
  /** Filter subscribers until this date (for type=latest) */
  endDate?: string;
  /** Sub-filter for latest: total, new subscribers, or renewals only */
  latestType?: 'total' | 'new' | 'renewals';
  /** Number of items to return (1-100, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessSubscribersSetNoteParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Request body */
  body?: AccessSubscribersSetNoteRequest;
}

export interface AccessSubscribersSetDiscountParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Request body */
  body?: AccessSubscribersSetDiscountRequest;
}

export interface AccessSubscribersSetCustomNameParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Request body */
  body?: AccessSubscribersSetCustomNameRequest;
}

export interface AccessSubscriptionsListParams {
  /** Number of subscriptions to return (1-50) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Search/filter text */
  query?: string;
  /** Advanced filters */
  filter?: {
  'online'?: '0' | '1' | 'true' | 'false';
  'paid'?: '0' | '1' | 'true' | 'false';
};
  /** Subscription status filter */
  type?: 'all' | 'active' | 'expired';
}

export interface AccessSubscriptionsGetHistoryParams {
  /** Subscription ID */
  subscriptionId?: string;
  /** Include all history (not just recent) */
  all?: '0' | '1' | 'true' | 'false';
}

export interface AccessPromotionsTrackingLinksListParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Pagination token */
  pagination?: number;
  /** Include deleted tracking links (0 or 1) */
  withDeleted?: number;
  /** Sort deleted items */
  sortingDeleted?: string;
  /** Include statistics */
  stats?: 'true' | 'false';
}

export interface AccessPromotionsTrackingLinksCreateParams {
  /** Request body */
  body?: AccessPromotionsTrackingLinksCreateRequest;
}

export interface AccessPromotionsTrackingLinksGetParams {
  /** Tracking link ID */
  trackingLinkId?: string;
}

export interface AccessPromotionsTrackingLinksReplaceParams {
  /** Tracking link ID */
  trackingLinkId?: string;
  /** Request body */
  body?: AccessPromotionsTrackingLinksReplaceRequest;
}

export interface AccessPromotionsTrackingLinksDeleteParams {
  /** Tracking link ID */
  trackingLinkId?: string;
}

export interface AccessPromotionsTrackingLinksCreateShareAccessParams {
  /** Request body */
  body?: AccessPromotionsTrackingLinksCreateShareAccessRequest;
}

export interface AccessPromotionsTrackingLinksDeleteShareAccessParams {
  /** Request body */
  body?: AccessPromotionsTrackingLinksDeleteShareAccessRequest;
}

export interface AccessPromotionsTrackingLinksListClaimersParams {
  /** Tracking link ID */
  trackingLinkId?: string;
}

export interface AccessPromotionsTrialLinksListParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessPromotionsTrialLinksCreateParams {
  /** Request body */
  body?: AccessPromotionsTrialLinksCreateRequest;
}

export interface AccessPromotionsTrialLinksGetParams {
  /** Trial link ID */
  trialLinkId?: string;
}

export interface AccessPromotionsTrialLinksReplaceParams {
  /** Trial link ID */
  trialLinkId?: string;
  /** Request body */
  body?: AccessPromotionsTrialLinksReplaceRequest;
}

export interface AccessPromotionsTrialLinksDeleteParams {
  /** Trial link ID */
  trialLinkId?: string;
}

export interface AccessPromotionsTrialLinksCreateShareAccessParams {
  /** Request body */
  body?: AccessPromotionsTrialLinksCreateShareAccessRequest;
}

export interface AccessPromotionsTrialLinksDeleteShareAccessParams {
  /** Request body */
  body?: AccessPromotionsTrialLinksDeleteShareAccessRequest;
}

export interface AccessPromotionsListParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessPromotionsCreateParams {
  /** Request body */
  body?: AccessPromotionsCreateRequest;
}

export interface AccessPromotionsReplaceParams {
  /** Promotion ID */
  promotionId?: string;
  /** Request body */
  body?: AccessPromotionsReplaceRequest;
}

export interface AccessPromotionsDeleteParams {
  /** Promotion ID */
  promotionId?: string;
}

export interface AccessPromotionsListBundlesParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
}

export interface AccessPromotionsCreateBundlesParams {
  /** Request body */
  body?: AccessPromotionsCreateBundlesRequest;
}

export interface AccessPromotionsGetBundlesParams {
  /** Bundle ID */
  bundleId?: string;
}

export interface AccessPromotionsReplaceBundlesParams {
  /** Bundle ID */
  bundleId?: string;
  /** Request body */
  body?: AccessPromotionsReplaceBundlesRequest;
}

export interface AccessPromotionsDeleteBundlesParams {
  /** Bundle ID */
  bundleId?: string;
}

export interface AccessPromotionsCreateStopParams {
  /** Promotion ID */
  promotionId?: string;
}

export interface AccessVaultListsListParams {
  /** Number of items to return (1-40, default: 24) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Search/filter text */
  query?: string;
}

export interface AccessVaultListsCreateParams {
  /** Request body */
  body?: AccessVaultListsCreateRequest;
}

export interface AccessVaultListsUpdateParams {
  /** listId */
  listId?: number;
  /** Request body */
  body?: AccessVaultListsUpdateRequest;
}

export interface AccessVaultListsDeleteParams {
  /** listId */
  listId?: number;
}

export interface AccessVaultListsListMediaParams {
  /** listId */
  listId?: number;
  /** Number of items to return (1-40, default: 24) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Sort media by: recent, most-liked, or highest-tips */
  sortBy?: 'recent' | 'most-liked' | 'highest-tips';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Search/filter text */
  query?: string;
  /** Filter by media type */
  mediaType?: 'photo' | 'video' | 'audio' | 'gif';
}

export interface AccessVaultListsCreateMediaParams {
  /** listId */
  listId?: number;
  /** Request body */
  body?: AccessVaultListsCreateMediaRequest;
}

export interface AccessVaultListMediaParams {
  /** Number of items to return (1-40, default: 24) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Sort media by: recent, most-liked, or highest-tips */
  sortBy?: 'recent' | 'most-liked' | 'highest-tips';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Filter to specific vault list */
  listId?: number;
  /** Search/filter text */
  query?: string;
  /** Filter by media type */
  mediaType?: 'photo' | 'video' | 'audio' | 'gif';
}

export interface AccessUploadsReplaceParams {
  /** Upload session ID */
  mediaUploadId: string;
}

export interface AccessUploadsCheckParams {
  /** Request body */
  body?: AccessUploadsCheckRequest;
}

export interface AccessUploadsInitParams {
  /** Request body */
  body?: AccessUploadsInitRequest;
}

export interface AccessUploadsReplacePartsParams {
  /** Upload session ID from init */
  mediaUploadId: string;
  /** Part number for multipart upload (starts at 1) */
  partNumber: number;
}

export interface AccessUploadsCompleteParams {
  /** Request body */
  body?: AccessUploadsCompleteRequest;
}

export interface AccessListPostsParams {
  /** Number of posts to return (1-10) */
  limit?: number;
  /** Sort posts by: publish_date, tips, or favorites_count */
  sortBy?: 'publish_date' | 'tips' | 'favorites_count';
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Include pinned posts */
  pinned?: boolean;
  /** Include engagement counts */
  includePostCounts?: boolean;
  /** Pagination cursor: get posts before this time */
  beforePublishTime?: string;
}

export interface AccessCreatePostsParams {
  /** Request body */
  body?: AccessCreatePostsRequest;
}

export interface AccessGetPostsParams {
  /** OnlyFans post ID */
  postId?: string;
}

export interface AccessReplacePostsParams {
  /** OnlyFans post ID */
  postId?: string;
  /** Request body */
  body?: AccessReplacePostsRequest;
}

export interface AccessDeletePostsParams {
  /** OnlyFans post ID */
  postId?: string;
}

export interface AccessCreateMassMessagesParams {
  /** Request body */
  body?: AccessCreateMassMessagesRequest;
}

export interface AccessGetMassMessagesParams {
  /** massMessageId */
  massMessageId: string;
}

export interface AccessReplaceMassMessagesParams {
  /** massMessageId */
  massMessageId: string;
  /** Request body */
  body?: AccessReplaceMassMessagesRequest;
}

export interface AccessDeleteMassMessagesParams {
  /** massMessageId */
  massMessageId: string;
}

export interface LinkGetParams {
  /** clientSecret */
  clientSecret: string;
}

export interface LinkDeleteParams {
  /** clientSecret */
  clientSecret: string;
}

export interface LinkInitParams {
  /** Request body */
  body: LinkInitRequest;
}

export interface DynamicRulesSignParams {
  /** Request body */
  body?: DynamicRulesSignRequest;
}

export interface VaultPlusStoreCreateListParams {
  /** Connection ID */
  connectionId: string;
  /** listId */
  listId: string;
}

export interface VaultPlusStoreGetStatusParams {
  /** Connection ID */
  connectionId: string;
}

export interface VaultPlusGetParams {
  /** Connection ID */
  connectionId: string;
  /** mediaId */
  mediaId: string;
}

export interface VaultPlusDeleteParams {
  /** Connection ID */
  connectionId: string;
  /** mediaId */
  mediaId: string;
}

export interface VaultPlusCreateBatchParams {
  /** Connection ID */
  connectionId: string;
  /** Request body */
  body?: VaultPlusCreateBatchRequest;
}

export interface VaultPlusGetListParams {
  /** Connection ID */
  connectionId: string;
  /** status */
  status?: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  /** source */
  source?: 'vault' | 'messages' | 'posts' | 'stories';
  /** contentType */
  contentType?: string;
  /** limit */
  limit?: number;
  /** cursor */
  cursor?: string;
}

export interface VaultPlusPurgeParams {
  /** Connection ID */
  connectionId: string;
}


// Namespace classes
class AccountConnectionsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Disconnect connection
     */
    delete(params: AccountConnectionsDeleteParams): Promise<unknown> {
      return request<unknown>(this._config, {
        path: `/v2/account/connections/${encodeURIComponent(String(params.connectionId))}`,
        method: 'DELETE',
      });
    }

    /**
     * List connections
     */
    list(params: AccountConnectionsListParams): Promise<AccountConnectionsListResponse> {
      return request<AccountConnectionsListResponse>(this._config, {
        path: '/v2/account/connections',
        method: 'GET',
        query: {
          'status': params.status,
          'imported': params.imported,
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
	
	    /**
	     * List connections
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccountConnectionsListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccountConnectionsListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccountConnectionsListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Invalidate connection
     */
    invalidate(params: AccountConnectionsInvalidateParams): Promise<unknown> {
      return request<unknown>(this._config, {
        path: `/v2/account/connections/${encodeURIComponent(String(params.connectionId))}/invalidate`,
        method: 'POST',
      });
    }

    /**
     * Get connection settings
     */
    getSettings(params: AccountConnectionsGetSettingsParams): Promise<AccountConnectionsGetSettingsResponse> {
      return request<AccountConnectionsGetSettingsResponse>(this._config, {
        path: `/v2/account/connections/${encodeURIComponent(String(params.connectionId))}/settings`,
        method: 'GET',
      });
    }

    /**
     * Update connection settings
     */
    updateSettings(params: AccountConnectionsUpdateSettingsParams): Promise<AccountConnectionsUpdateSettingsResponse> {
      return request<AccountConnectionsUpdateSettingsResponse>(this._config, {
        path: `/v2/account/connections/${encodeURIComponent(String(params.connectionId))}/settings`,
        method: 'PATCH',
        body: params.body,
      });
    }

    /**
     * Import connection
     */
    createImport(params: AccountConnectionsCreateImportParams): Promise<AccountConnectionsCreateImportResponse> {
      return request<AccountConnectionsCreateImportResponse>(this._config, {
        path: '/v2/account/connections/import',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Update imported connection session
     */
    updateImport(params: AccountConnectionsUpdateImportParams): Promise<AccountConnectionsUpdateImportResponse> {
      return request<AccountConnectionsUpdateImportResponse>(this._config, {
        path: `/v2/account/connections/import/${encodeURIComponent(String(params.connectionId))}`,
        method: 'PATCH',
        body: params.body,
      });
    }
}

class AccountNamespace {
  private _config: OFAuthConfig;

  readonly connections: AccountConnectionsNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.connections = new AccountConnectionsNamespace(config);
  }

    /**
     * Whoami
     */
    whoami(): Promise<AccountWhoamiResponse> {
      return request<AccountWhoamiResponse>(this._config, {
        path: '/v2/account/whoami',
        method: 'GET',
      });
    }

    /**
     * Get organization settings
     */
    getSettings(): Promise<AccountGetSettingsResponse> {
      return request<AccountGetSettingsResponse>(this._config, {
        path: '/v2/account/settings',
        method: 'GET',
      });
    }

    /**
     * Update organization settings
     */
    updateSettings(params: AccountUpdateSettingsParams): Promise<AccountUpdateSettingsResponse> {
      return request<AccountUpdateSettingsResponse>(this._config, {
        path: '/v2/account/settings',
        method: 'PATCH',
        body: params.body,
      });
    }
}

class AccessSelfNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Get current user
     */
    get(): Promise<AccessSelfGetResponseOption0 | AccessSelfGetResponseOption1> {
      return request<AccessSelfGetResponseOption0 | AccessSelfGetResponseOption1>(this._config, {
        path: '/v2/access/self',
        method: 'GET',
      });
    }

    /**
     * Update current user profile
     */
    update(params: AccessSelfUpdateParams): Promise<AccessSelfUpdateResponse> {
      return request<AccessSelfUpdateResponse>(this._config, {
        path: '/v2/access/self',
        method: 'PATCH',
        body: params.body,
      });
    }

    /**
     * List notifications
     */
    listNotifications(params: AccessSelfListNotificationsParams): Promise<AccessSelfListNotificationsResponse> {
      return request<AccessSelfListNotificationsResponse>(this._config, {
        path: '/v2/access/self/notifications',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'type': params.type,
          'relatedUsername': params.relatedUsername,
        },
      });
    }
	
	    /**
	     * List notifications
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateNotifications(params: Omit<AccessSelfListNotificationsParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessSelfListNotificationsItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listNotifications({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessSelfListNotificationsParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * List release forms
     */
    listReleaseForms(params: AccessSelfListReleaseFormsParams): Promise<AccessSelfListReleaseFormsResponse> {
      return request<AccessSelfListReleaseFormsResponse>(this._config, {
        path: '/v2/access/self/release-forms',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'filter': params.filter,
          'sortBy': params.sortBy,
          'sortDirection': params.sortDirection,
          'search': params.search,
        },
      });
    }
	
	    /**
	     * List release forms
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateReleaseForms(params: Omit<AccessSelfListReleaseFormsParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessSelfListReleaseFormsItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listReleaseForms({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessSelfListReleaseFormsParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * List tagged friend users
     */
    listTaggedFriendUsers(params: AccessSelfListTaggedFriendUsersParams): Promise<AccessSelfListTaggedFriendUsersResponse> {
      return request<AccessSelfListTaggedFriendUsersResponse>(this._config, {
        path: '/v2/access/self/tagged-friend-users',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'filter': params.filter,
          'sortBy': params.sortBy,
          'sortDirection': params.sortDirection,
          'search': params.search,
        },
      });
    }
	
	    /**
	     * List tagged friend users
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateTaggedFriendUsers(params: Omit<AccessSelfListTaggedFriendUsersParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessSelfListTaggedFriendUsersItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listTaggedFriendUsers({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessSelfListTaggedFriendUsersParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }
}

class AccessEarningsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Get earnings chart
     */
    getChart(params: AccessEarningsGetChartParams): Promise<AccessEarningsGetChartResponse> {
      return request<AccessEarningsGetChartResponse>(this._config, {
        path: '/v2/access/earnings/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'by': params.by,
          'withTotal': params.withTotal,
          'monthlyTotal': params.monthlyTotal,
        },
      });
    }

    /**
     * List transactions
     */
    listTransactions(params: AccessEarningsListTransactionsParams): Promise<AccessEarningsListTransactionsResponse> {
      return request<AccessEarningsListTransactionsResponse>(this._config, {
        path: '/v2/access/earnings/transactions',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'marker': params.marker,
          'type': params.type,
          'tipsSource': params.tipsSource,
        },
      });
    }
	
	    /**
	     * List transactions
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateTransactions(params: Omit<AccessEarningsListTransactionsParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessEarningsListTransactionsItem, void, unknown> {
      let marker: string | undefined;
      let fetched = 0;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listTransactions({
          ...params,
          marker,
        } as AccessEarningsListTransactionsParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        marker = response.nextMarker == null ? undefined : String(response.nextMarker);
	      }
	    }

    /**
     * List chargebacks
     */
    listChargebacks(params: AccessEarningsListChargebacksParams): Promise<AccessEarningsListChargebacksResponse> {
      return request<AccessEarningsListChargebacksResponse>(this._config, {
        path: '/v2/access/earnings/chargebacks',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'marker': params.marker,
        },
      });
    }
	
	    /**
	     * List chargebacks
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateChargebacks(params: Omit<AccessEarningsListChargebacksParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessEarningsListChargebacksItem, void, unknown> {
      let marker: string | undefined;
      let fetched = 0;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listChargebacks({
          ...params,
          marker,
        } as AccessEarningsListChargebacksParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        marker = response.nextMarker == null ? undefined : String(response.nextMarker);
	      }
	    }
}

class AccessAnalyticsPostsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Post stats
     */
    get(params: AccessAnalyticsPostsGetParams): Promise<AccessAnalyticsPostsGetResponse> {
      return request<AccessAnalyticsPostsGetResponse>(this._config, {
        path: `/v2/access/analytics/posts/${encodeURIComponent(String(params.postId))}`,
        method: 'GET',
      });
    }

    /**
     * Posts chart
     */
    getChart(params: AccessAnalyticsPostsGetChartParams): Promise<Record<string, AccessAnalyticsPostsGetChartResponseValue>> {
      return request<Record<string, AccessAnalyticsPostsGetChartResponseValue>>(this._config, {
        path: '/v2/access/analytics/posts/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
          'by': params.by,
        },
      });
    }

    /**
     * Top posts
     */
    getTop(params: AccessAnalyticsPostsGetTopParams): Promise<AccessAnalyticsPostsGetTopResponse> {
      return request<AccessAnalyticsPostsGetTopResponse>(this._config, {
        path: '/v2/access/analytics/posts/top',
        method: 'GET',
        query: {
          'by': params.by,
          'startDate': params.startDate,
          'endDate': params.endDate,
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
}

class AccessAnalyticsStreamsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Streams chart
     */
    getChart(params: AccessAnalyticsStreamsGetChartParams): Promise<Record<string, AccessAnalyticsStreamsGetChartResponseValue>> {
      return request<Record<string, AccessAnalyticsStreamsGetChartResponseValue>>(this._config, {
        path: '/v2/access/analytics/streams/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
          'by': params.by,
        },
      });
    }

    /**
     * Top streams
     */
    getTop(params: AccessAnalyticsStreamsGetTopParams): Promise<AccessAnalyticsStreamsGetTopResponse> {
      return request<AccessAnalyticsStreamsGetTopResponse>(this._config, {
        path: '/v2/access/analytics/streams/top',
        method: 'GET',
        query: {
          'by': params.by,
          'startDate': params.startDate,
          'endDate': params.endDate,
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
}

class AccessAnalyticsStoriesNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Stories chart
     */
    getChart(params: AccessAnalyticsStoriesGetChartParams): Promise<Record<string, AccessAnalyticsStoriesGetChartResponseValue>> {
      return request<Record<string, AccessAnalyticsStoriesGetChartResponseValue>>(this._config, {
        path: '/v2/access/analytics/stories/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
          'by': params.by,
        },
      });
    }

    /**
     * Top stories
     */
    getTop(params: AccessAnalyticsStoriesGetTopParams): Promise<AccessAnalyticsStoriesGetTopResponse> {
      return request<AccessAnalyticsStoriesGetTopResponse>(this._config, {
        path: '/v2/access/analytics/stories/top',
        method: 'GET',
        query: {
          'by': params.by,
          'startDate': params.startDate,
          'endDate': params.endDate,
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
}

class AccessAnalyticsMassMessagesNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Mass messages chart
     */
    getChart(params: AccessAnalyticsMassMessagesGetChartParams): Promise<AccessAnalyticsMassMessagesGetChartResponse> {
      return request<AccessAnalyticsMassMessagesGetChartResponse>(this._config, {
        path: '/v2/access/analytics/mass-messages/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
        },
      });
    }

    /**
     * Sent mass messages
     */
    getSent(params: AccessAnalyticsMassMessagesGetSentParams): Promise<AccessAnalyticsMassMessagesGetSentResponse> {
      return request<AccessAnalyticsMassMessagesGetSentResponse>(this._config, {
        path: '/v2/access/analytics/mass-messages/sent',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'limit': params.limit,
        },
      });
    }

    /**
     * Mass messages purchased
     */
    getPurchased(params: AccessAnalyticsMassMessagesGetPurchasedParams): Promise<AccessAnalyticsMassMessagesGetPurchasedResponse> {
      return request<AccessAnalyticsMassMessagesGetPurchasedResponse>(this._config, {
        path: '/v2/access/analytics/mass-messages/purchased',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }

    /**
     * Mass message buyers
     */
    listBuyers(params: AccessAnalyticsMassMessagesListBuyersParams): Promise<AccessAnalyticsMassMessagesListBuyersResponse> {
      return request<AccessAnalyticsMassMessagesListBuyersResponse>(this._config, {
        path: `/v2/access/analytics/mass-messages/${encodeURIComponent(String(params.massMessageId))}/buyers`,
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'marker': params.marker,
        },
      });
    }
	
	    /**
	     * Mass message buyers
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateBuyers(params: Omit<AccessAnalyticsMassMessagesListBuyersParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessAnalyticsMassMessagesListBuyersItem, void, unknown> {
      let marker: string | undefined;
      let fetched = 0;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listBuyers({
          ...params,
          marker,
        } as AccessAnalyticsMassMessagesListBuyersParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        marker = response.nextMarker == null ? undefined : String(response.nextMarker);
	      }
	    }
}

class AccessAnalyticsPromotionsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Promotions chart
     */
    getChart(params: AccessAnalyticsPromotionsGetChartParams): Promise<Record<string, AccessAnalyticsPromotionsGetChartResponseValue>> {
      return request<Record<string, AccessAnalyticsPromotionsGetChartResponseValue>>(this._config, {
        path: '/v2/access/analytics/promotions/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
        },
      });
    }

    /**
     * Top promotions
     */
    getTop(params: AccessAnalyticsPromotionsGetTopParams): Promise<AccessAnalyticsPromotionsGetTopResponse> {
      return request<AccessAnalyticsPromotionsGetTopResponse>(this._config, {
        path: '/v2/access/analytics/promotions/top',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'startDate': params.startDate,
          'endDate': params.endDate,
        },
      });
    }
}

class AccessAnalyticsTrialsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Trials chart
     */
    getChart(params: AccessAnalyticsTrialsGetChartParams): Promise<Record<string, AccessAnalyticsTrialsGetChartResponseValue>> {
      return request<Record<string, AccessAnalyticsTrialsGetChartResponseValue>>(this._config, {
        path: '/v2/access/analytics/trials/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
        },
      });
    }

    /**
     * Top trials
     */
    getTop(params: AccessAnalyticsTrialsGetTopParams): Promise<AccessAnalyticsTrialsGetTopResponse> {
      return request<AccessAnalyticsTrialsGetTopResponse>(this._config, {
        path: '/v2/access/analytics/trials/top',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'startDate': params.startDate,
          'endDate': params.endDate,
        },
      });
    }
}

class AccessAnalyticsCampaignsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Campaigns chart
     */
    getChart(params: AccessAnalyticsCampaignsGetChartParams): Promise<Record<string, AccessAnalyticsCampaignsGetChartResponseValue>> {
      return request<Record<string, AccessAnalyticsCampaignsGetChartResponseValue>>(this._config, {
        path: '/v2/access/analytics/campaigns/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'withTotal': params.withTotal,
        },
      });
    }

    /**
     * Top campaigns
     */
    getTop(params: AccessAnalyticsCampaignsGetTopParams): Promise<AccessAnalyticsCampaignsGetTopResponse> {
      return request<AccessAnalyticsCampaignsGetTopResponse>(this._config, {
        path: '/v2/access/analytics/campaigns/top',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'startDate': params.startDate,
          'endDate': params.endDate,
        },
      });
    }
	
	    /**
	     * Top campaigns
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateTop(params: Omit<AccessAnalyticsCampaignsGetTopParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessAnalyticsCampaignsGetTopItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.getTop({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessAnalyticsCampaignsGetTopParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }
}

class AccessAnalyticsVisitorCountriesNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Visitor countries chart
     */
    getChart(params: AccessAnalyticsVisitorCountriesGetChartParams): Promise<AccessAnalyticsVisitorCountriesGetChartResponse> {
      return request<AccessAnalyticsVisitorCountriesGetChartResponse>(this._config, {
        path: '/v2/access/analytics/visitor-countries/chart',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'by': params.by,
        },
      });
    }

    /**
     * Top visitor countries
     */
    getTop(params: AccessAnalyticsVisitorCountriesGetTopParams): Promise<AccessAnalyticsVisitorCountriesGetTopResponse> {
      return request<AccessAnalyticsVisitorCountriesGetTopResponse>(this._config, {
        path: '/v2/access/analytics/visitor-countries/top',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'by': params.by,
        },
      });
    }
}

class AccessAnalyticsNamespace {
  private _config: OFAuthConfig;

  readonly posts: AccessAnalyticsPostsNamespace;
  readonly streams: AccessAnalyticsStreamsNamespace;
  readonly stories: AccessAnalyticsStoriesNamespace;
  readonly massMessages: AccessAnalyticsMassMessagesNamespace;
  readonly promotions: AccessAnalyticsPromotionsNamespace;
  readonly trials: AccessAnalyticsTrialsNamespace;
  readonly campaigns: AccessAnalyticsCampaignsNamespace;
  readonly visitorCountries: AccessAnalyticsVisitorCountriesNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.posts = new AccessAnalyticsPostsNamespace(config);
    this.streams = new AccessAnalyticsStreamsNamespace(config);
    this.stories = new AccessAnalyticsStoriesNamespace(config);
    this.massMessages = new AccessAnalyticsMassMessagesNamespace(config);
    this.promotions = new AccessAnalyticsPromotionsNamespace(config);
    this.trials = new AccessAnalyticsTrialsNamespace(config);
    this.campaigns = new AccessAnalyticsCampaignsNamespace(config);
    this.visitorCountries = new AccessAnalyticsVisitorCountriesNamespace(config);
  }
}

class AccessUsersListsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * List user lists
     */
    list(params: AccessUsersListsListParams): Promise<AccessUsersListsListResponse> {
      return request<AccessUsersListsListResponse>(this._config, {
        path: '/v2/access/users/lists',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'query': params.query,
        },
      });
    }
	
	    /**
	     * List user lists
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccessUsersListsListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessUsersListsListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessUsersListsListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Create user list
     */
    create(params: AccessUsersListsCreateParams): Promise<AccessUsersListsCreateResponse> {
      return request<AccessUsersListsCreateResponse>(this._config, {
        path: '/v2/access/users/lists',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get user list
     */
    get(params: AccessUsersListsGetParams): Promise<AccessUsersListsGetResponse> {
      return request<AccessUsersListsGetResponse>(this._config, {
        path: `/v2/access/users/lists/${encodeURIComponent(String(params.listId))}`,
        method: 'GET',
      });
    }

    /**
     * Update user list
     */
    update(params: AccessUsersListsUpdateParams): Promise<AccessUsersListsUpdateResponse> {
      return request<AccessUsersListsUpdateResponse>(this._config, {
        path: `/v2/access/users/lists/${encodeURIComponent(String(params.listId))}`,
        method: 'PATCH',
        body: params.body,
      });
    }

    /**
     * Delete user list
     */
    delete(params: AccessUsersListsDeleteParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/users/lists/${encodeURIComponent(String(params.listId))}`,
        method: 'DELETE',
      });
    }

    /**
     * Add user to multiple lists
     */
    create2(params: AccessUsersListsCreate2Params): Promise<AccessUsersListsCreate2Response> {
      return request<AccessUsersListsCreate2Response>(this._config, {
        path: `/v2/access/users/${encodeURIComponent(String(params.userId))}/lists`,
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * List users in user list
     */
    listUsers(params: AccessUsersListsListUsersParams): Promise<AccessUsersListsListUsersResponse> {
      return request<AccessUsersListsListUsersResponse>(this._config, {
        path: `/v2/access/users/lists/${encodeURIComponent(String(params.listId))}/users`,
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
	
	    /**
	     * List users in user list
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateUsers(params: Omit<AccessUsersListsListUsersParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessUsersListsListUsersItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listUsers({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessUsersListsListUsersParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Add user to list
     */
    createUsers(params: AccessUsersListsCreateUsersParams): Promise<AccessUsersListsCreateUsersResponseOption0 | Record<string, any>> {
      return request<AccessUsersListsCreateUsersResponseOption0 | Record<string, any>>(this._config, {
        path: `/v2/access/users/lists/${encodeURIComponent(String(params.listId))}/users/${encodeURIComponent(String(params.userId))}`,
        method: 'POST',
      });
    }

    /**
     * Remove user from user list
     */
    deleteUsers(params: AccessUsersListsDeleteUsersParams): Promise<AccessUsersListsDeleteUsersResponseOption0 | Record<string, any>> {
      return request<AccessUsersListsDeleteUsersResponseOption0 | Record<string, any>>(this._config, {
        path: `/v2/access/users/lists/${encodeURIComponent(String(params.listId))}/users/${encodeURIComponent(String(params.userId))}`,
        method: 'DELETE',
      });
    }
}

class AccessUsersNamespace {
  private _config: OFAuthConfig;

  readonly lists: AccessUsersListsNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.lists = new AccessUsersListsNamespace(config);
  }

    /**
     * Get user
     */
    get(params: AccessUsersGetParams): Promise<AccessUsersGetResponseOption0 | Record<string, any>> {
      return request<AccessUsersGetResponseOption0 | Record<string, any>>(this._config, {
        path: `/v2/access/users/${encodeURIComponent(String(params.userId))}`,
        method: 'GET',
      });
    }

    /**
     * List user posts
     */
    listPosts(params: AccessUsersListPostsParams): Promise<AccessUsersListPostsResponse> {
      return request<AccessUsersListPostsResponse>(this._config, {
        path: `/v2/access/users/${encodeURIComponent(String(params.userId))}/posts`,
        method: 'GET',
        query: {
          'limit': params.limit,
          'sortBy': params.sortBy,
          'sortDirection': params.sortDirection,
          'pinned': params.pinned,
          'includePostCounts': params.includePostCounts,
          'beforePublishTime': params.beforePublishTime,
        },
      });
    }

    /**
     * List restricted users
     */
    getRestrict(params: AccessUsersGetRestrictParams): Promise<AccessUsersGetRestrictResponse> {
      return request<AccessUsersGetRestrictResponse>(this._config, {
        path: '/v2/access/users/restrict',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
	
	    /**
	     * List restricted users
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateRestrict(params: Omit<AccessUsersGetRestrictParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessUsersGetRestrictItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.getRestrict({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessUsersGetRestrictParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Restrict user
     */
    restrict(params: AccessUsersRestrictParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/users/${encodeURIComponent(String(params.userId))}/restrict`,
        method: 'POST',
      });
    }

    /**
     * Unrestrict user
     */
    restrict2(params: AccessUsersRestrict2Params): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/users/${encodeURIComponent(String(params.userId))}/restrict`,
        method: 'DELETE',
      });
    }

    /**
     * List blocked users
     */
    getBlocked(params: AccessUsersGetBlockedParams): Promise<AccessUsersGetBlockedResponse> {
      return request<AccessUsersGetBlockedResponse>(this._config, {
        path: '/v2/access/users/blocked',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
	
	    /**
	     * List blocked users
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateBlocked(params: Omit<AccessUsersGetBlockedParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessUsersGetBlockedItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.getBlocked({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessUsersGetBlockedParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * List users by IDs
     */
    getList(params: AccessUsersGetListParams): Promise<AccessUsersGetListResponse> {
      return request<AccessUsersGetListResponse>(this._config, {
        path: '/v2/access/users/list',
        method: 'GET',
        query: {
          'userIds': params.userIds,
        },
      });
    }

    /**
     * Search performers
     */
    search(params: AccessUsersSearchParams): Promise<Array<AccessUsersSearchResponseOption0Item> | Record<string, any>> {
      return request<Array<AccessUsersSearchResponseOption0Item> | Record<string, any>>(this._config, {
        path: '/v2/access/users/search',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'query': params.query,
        },
      });
    }
}

class AccessChatsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Chats list
     */
    list(params: AccessChatsListParams): Promise<AccessChatsListResponse> {
      return request<AccessChatsListResponse>(this._config, {
        path: '/v2/access/chats',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'order': params.order,
          'filter': params.filter,
          'query': params.query,
          'userListId': params.userListId,
        },
      });
    }
	
	    /**
	     * Chats list
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccessChatsListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessChatsListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessChatsListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Chat messages
     */
    listMessages(params: AccessChatsListMessagesParams): Promise<AccessChatsListMessagesResponse> {
      return request<AccessChatsListMessagesResponse>(this._config, {
        path: `/v2/access/chats/${encodeURIComponent(String(params.userId))}/messages`,
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'query': params.query,
          'last_id': params.lastId,
          'first_id': params.firstId,
          'include_users': params.includeUsers,
        },
      });
    }
	
	    /**
	     * Chat messages
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateMessages(params: Omit<AccessChatsListMessagesParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessChatsListMessagesItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listMessages({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessChatsListMessagesParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Send chat message
     */
    createMessages(params: AccessChatsCreateMessagesParams): Promise<AccessChatsCreateMessagesResponse> {
      return request<AccessChatsCreateMessagesResponse>(this._config, {
        path: `/v2/access/chats/${encodeURIComponent(String(params.userId))}/messages`,
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Unsend chat message
     */
    deleteMessages(params: AccessChatsDeleteMessagesParams): Promise<AccessChatsDeleteMessagesResponse> {
      return request<AccessChatsDeleteMessagesResponse>(this._config, {
        path: `/v2/access/chats/${encodeURIComponent(String(params.userId))}/messages/${encodeURIComponent(String(params.messageId))}`,
        method: 'DELETE',
        body: params.body,
      });
    }

    /**
     * Get chat media
     */
    listMedia(params: AccessChatsListMediaParams): Promise<AccessChatsListMediaResponse> {
      return request<AccessChatsListMediaResponse>(this._config, {
        path: `/v2/access/chats/${encodeURIComponent(String(params.userId))}/media`,
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'skip_users': params.skipUsers,
          'last_id': params.lastId,
          'opened': params.opened,
          'type': params.type,
        },
      });
    }
	
	    /**
	     * Get chat media
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateMedia(params: Omit<AccessChatsListMediaParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessChatsListMediaItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listMedia({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessChatsListMediaParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }
}

class AccessSubscribersNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * List subscribers
     */
    list(params: AccessSubscribersListParams): Promise<AccessSubscribersListResponse> {
      return request<AccessSubscribersListResponse>(this._config, {
        path: '/v2/access/subscribers',
        method: 'GET',
        query: {
          'query': params.query,
          'filter': params.filter,
          'type': params.type,
          'startDate': params.startDate,
          'endDate': params.endDate,
          'latestType': params.latestType,
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }
	
	    /**
	     * List subscribers
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccessSubscribersListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessSubscribersListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessSubscribersListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Update subscriber note
     */
    setNote(params: AccessSubscribersSetNoteParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/subscribers/${encodeURIComponent(String(params.userId))}/note`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Apply discount to subscriber
     */
    setDiscount(params: AccessSubscribersSetDiscountParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/subscribers/${encodeURIComponent(String(params.userId))}/discount`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Set custom name for subscriber
     */
    setCustomName(params: AccessSubscribersSetCustomNameParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/subscribers/${encodeURIComponent(String(params.userId))}/custom-name`,
        method: 'PUT',
        body: params.body,
      });
    }
}

class AccessSubscriptionsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * List subscriptions
     */
    list(params: AccessSubscriptionsListParams): Promise<AccessSubscriptionsListResponse> {
      return request<AccessSubscriptionsListResponse>(this._config, {
        path: '/v2/access/subscriptions',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'query': params.query,
          'filter': params.filter,
          'type': params.type,
        },
      });
    }
	
	    /**
	     * List subscriptions
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccessSubscriptionsListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessSubscriptionsListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessSubscriptionsListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Get subscription counts
     */
    getCount(): Promise<AccessSubscriptionsGetCountResponse> {
      return request<AccessSubscriptionsGetCountResponse>(this._config, {
        path: '/v2/access/subscriptions/count',
        method: 'GET',
      });
    }

    /**
     * Get subscription history
     */
    getHistory(params: AccessSubscriptionsGetHistoryParams): Promise<AccessSubscriptionsGetHistoryResponse> {
      return request<AccessSubscriptionsGetHistoryResponse>(this._config, {
        path: `/v2/access/subscriptions/${encodeURIComponent(String(params.subscriptionId))}/history`,
        method: 'GET',
        query: {
          'all': params.all,
        },
      });
    }
}

class AccessPromotionsTrackingLinksNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * List tracking links
     */
    list(params: AccessPromotionsTrackingLinksListParams): Promise<AccessPromotionsTrackingLinksListResponse> {
      return request<AccessPromotionsTrackingLinksListResponse>(this._config, {
        path: '/v2/access/promotions/tracking-links',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'pagination': params.pagination,
          'with_deleted': params.withDeleted,
          'sorting_deleted': params.sortingDeleted,
          'stats': params.stats,
        },
      });
    }
	
	    /**
	     * List tracking links
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccessPromotionsTrackingLinksListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessPromotionsTrackingLinksListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessPromotionsTrackingLinksListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Create tracking link
     */
    create(params: AccessPromotionsTrackingLinksCreateParams): Promise<Array<AccessPromotionsTrackingLinksCreateResponseOption0Item> | AccessPromotionsTrackingLinksCreateResponseOption1> {
      return request<Array<AccessPromotionsTrackingLinksCreateResponseOption0Item> | AccessPromotionsTrackingLinksCreateResponseOption1>(this._config, {
        path: '/v2/access/promotions/tracking-links',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get tracking link
     */
    get(params: AccessPromotionsTrackingLinksGetParams): Promise<AccessPromotionsTrackingLinksGetResponse> {
      return request<AccessPromotionsTrackingLinksGetResponse>(this._config, {
        path: `/v2/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}`,
        method: 'GET',
      });
    }

    /**
     * Update tracking link
     */
    replace(params: AccessPromotionsTrackingLinksReplaceParams): Promise<AccessPromotionsTrackingLinksReplaceResponse> {
      return request<AccessPromotionsTrackingLinksReplaceResponse>(this._config, {
        path: `/v2/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Delete tracking link
     */
    delete(params: AccessPromotionsTrackingLinksDeleteParams): Promise<AccessPromotionsTrackingLinksDeleteResponse> {
      return request<AccessPromotionsTrackingLinksDeleteResponse>(this._config, {
        path: `/v2/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}`,
        method: 'DELETE',
      });
    }

    /**
     * Share tracking link access
     */
    createShareAccess(params: AccessPromotionsTrackingLinksCreateShareAccessParams): Promise<AccessPromotionsTrackingLinksCreateShareAccessResponse> {
      return request<AccessPromotionsTrackingLinksCreateShareAccessResponse>(this._config, {
        path: '/v2/access/promotions/tracking-links/share-access',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Revoke tracking link access
     */
    deleteShareAccess(params: AccessPromotionsTrackingLinksDeleteShareAccessParams): Promise<AccessPromotionsTrackingLinksDeleteShareAccessResponse> {
      return request<AccessPromotionsTrackingLinksDeleteShareAccessResponse>(this._config, {
        path: '/v2/access/promotions/tracking-links/share-access',
        method: 'DELETE',
        body: params.body,
      });
    }

    /**
     * Get tracking link claimers
     */
    listClaimers(params: AccessPromotionsTrackingLinksListClaimersParams): Promise<AccessPromotionsTrackingLinksListClaimersResponse> {
      return request<AccessPromotionsTrackingLinksListClaimersResponse>(this._config, {
        path: `/v2/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}/claimers`,
        method: 'GET',
      });
    }
}

class AccessPromotionsTrialLinksNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * List trial links
     */
    list(params: AccessPromotionsTrialLinksListParams): Promise<AccessPromotionsTrialLinksListResponseOption0 | Array<AccessPromotionsTrialLinksListResponseOption1Item>> {
      return request<AccessPromotionsTrialLinksListResponseOption0 | Array<AccessPromotionsTrialLinksListResponseOption1Item>>(this._config, {
        path: '/v2/access/promotions/trial-links',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }

    /**
     * Create trial link
     */
    create(params: AccessPromotionsTrialLinksCreateParams): Promise<AccessPromotionsTrialLinksCreateResponse> {
      return request<AccessPromotionsTrialLinksCreateResponse>(this._config, {
        path: '/v2/access/promotions/trial-links',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get trial link
     */
    get(params: AccessPromotionsTrialLinksGetParams): Promise<AccessPromotionsTrialLinksGetResponse> {
      return request<AccessPromotionsTrialLinksGetResponse>(this._config, {
        path: `/v2/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}`,
        method: 'GET',
      });
    }

    /**
     * Update trial link
     */
    replace(params: AccessPromotionsTrialLinksReplaceParams): Promise<AccessPromotionsTrialLinksReplaceResponse> {
      return request<AccessPromotionsTrialLinksReplaceResponse>(this._config, {
        path: `/v2/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Delete trial link
     */
    delete(params: AccessPromotionsTrialLinksDeleteParams): Promise<AccessPromotionsTrialLinksDeleteResponse> {
      return request<AccessPromotionsTrialLinksDeleteResponse>(this._config, {
        path: `/v2/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}`,
        method: 'DELETE',
      });
    }

    /**
     * Share trial link access
     */
    createShareAccess(params: AccessPromotionsTrialLinksCreateShareAccessParams): Promise<AccessPromotionsTrialLinksCreateShareAccessResponse> {
      return request<AccessPromotionsTrialLinksCreateShareAccessResponse>(this._config, {
        path: '/v2/access/promotions/trial-links/share-access',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Revoke trial link access
     */
    deleteShareAccess(params: AccessPromotionsTrialLinksDeleteShareAccessParams): Promise<AccessPromotionsTrialLinksDeleteShareAccessResponse> {
      return request<AccessPromotionsTrialLinksDeleteShareAccessResponse>(this._config, {
        path: '/v2/access/promotions/trial-links/share-access',
        method: 'DELETE',
        body: params.body,
      });
    }
}

class AccessPromotionsNamespace {
  private _config: OFAuthConfig;

  readonly trackingLinks: AccessPromotionsTrackingLinksNamespace;
  readonly trialLinks: AccessPromotionsTrialLinksNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.trackingLinks = new AccessPromotionsTrackingLinksNamespace(config);
    this.trialLinks = new AccessPromotionsTrialLinksNamespace(config);
  }

    /**
     * List promotions
     */
    list(params: AccessPromotionsListParams): Promise<Array<AccessPromotionsListResponseOption0Item> | AccessPromotionsListResponseOption1> {
      return request<Array<AccessPromotionsListResponseOption0Item> | AccessPromotionsListResponseOption1>(this._config, {
        path: '/v2/access/promotions',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }

    /**
     * Create promotion
     */
    create(params: AccessPromotionsCreateParams): Promise<Array<AccessPromotionsCreateResponseOption0Item> | AccessPromotionsCreateResponseOption1> {
      return request<Array<AccessPromotionsCreateResponseOption0Item> | AccessPromotionsCreateResponseOption1>(this._config, {
        path: '/v2/access/promotions',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Update promotion
     */
    replace(params: AccessPromotionsReplaceParams): Promise<AccessPromotionsReplaceResponse> {
      return request<AccessPromotionsReplaceResponse>(this._config, {
        path: `/v2/access/promotions/${encodeURIComponent(String(params.promotionId))}`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Delete promotion
     */
    delete(params: AccessPromotionsDeleteParams): Promise<AccessPromotionsDeleteResponse> {
      return request<AccessPromotionsDeleteResponse>(this._config, {
        path: `/v2/access/promotions/${encodeURIComponent(String(params.promotionId))}`,
        method: 'DELETE',
      });
    }

    /**
     * List bundles
     */
    listBundles(params: AccessPromotionsListBundlesParams): Promise<Array<AccessPromotionsListBundlesResponseOption0Item> | AccessPromotionsListBundlesResponseOption1> {
      return request<Array<AccessPromotionsListBundlesResponseOption0Item> | AccessPromotionsListBundlesResponseOption1>(this._config, {
        path: '/v2/access/promotions/bundles',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
        },
      });
    }

    /**
     * Create bundle
     */
    createBundles(params: AccessPromotionsCreateBundlesParams): Promise<AccessPromotionsCreateBundlesResponse> {
      return request<AccessPromotionsCreateBundlesResponse>(this._config, {
        path: '/v2/access/promotions/bundles',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get bundle
     */
    getBundles(params: AccessPromotionsGetBundlesParams): Promise<AccessPromotionsGetBundlesResponse> {
      return request<AccessPromotionsGetBundlesResponse>(this._config, {
        path: `/v2/access/promotions/bundles/${encodeURIComponent(String(params.bundleId))}`,
        method: 'GET',
      });
    }

    /**
     * Update bundle
     */
    replaceBundles(params: AccessPromotionsReplaceBundlesParams): Promise<AccessPromotionsReplaceBundlesResponse> {
      return request<AccessPromotionsReplaceBundlesResponse>(this._config, {
        path: `/v2/access/promotions/bundles/${encodeURIComponent(String(params.bundleId))}`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Delete bundle
     */
    deleteBundles(params: AccessPromotionsDeleteBundlesParams): Promise<AccessPromotionsDeleteBundlesResponse> {
      return request<AccessPromotionsDeleteBundlesResponse>(this._config, {
        path: `/v2/access/promotions/bundles/${encodeURIComponent(String(params.bundleId))}`,
        method: 'DELETE',
      });
    }

    /**
     * Stop promotion
     */
    createStop(params: AccessPromotionsCreateStopParams): Promise<AccessPromotionsCreateStopResponse> {
      return request<AccessPromotionsCreateStopResponse>(this._config, {
        path: `/v2/access/promotions/${encodeURIComponent(String(params.promotionId))}/stop`,
        method: 'POST',
      });
    }
}

class AccessVaultListsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * List vault folders
     */
    list(params: AccessVaultListsListParams): Promise<AccessVaultListsListResponse> {
      return request<AccessVaultListsListResponse>(this._config, {
        path: '/v2/access/vault/lists',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'query': params.query,
        },
      });
    }
	
	    /**
	     * List vault folders
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterate(params: Omit<AccessVaultListsListParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessVaultListsListItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.list({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessVaultListsListParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Create vault list
     */
    create(params: AccessVaultListsCreateParams): Promise<AccessVaultListsCreateResponse> {
      return request<AccessVaultListsCreateResponse>(this._config, {
        path: '/v2/access/vault/lists',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Update vault list
     */
    update(params: AccessVaultListsUpdateParams): Promise<AccessVaultListsUpdateResponse> {
      return request<AccessVaultListsUpdateResponse>(this._config, {
        path: `/v2/access/vault/lists/${encodeURIComponent(String(params.listId))}`,
        method: 'PATCH',
        body: params.body,
      });
    }

    /**
     * Delete vault list
     */
    delete(params: AccessVaultListsDeleteParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/vault/lists/${encodeURIComponent(String(params.listId))}`,
        method: 'DELETE',
      });
    }

    /**
     * List media in vault list
     */
    listMedia(params: AccessVaultListsListMediaParams): Promise<AccessVaultListsListMediaResponse> {
      return request<AccessVaultListsListMediaResponse>(this._config, {
        path: `/v2/access/vault/lists/${encodeURIComponent(String(params.listId))}/media`,
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'sortBy': params.sortBy,
          'sortDirection': params.sortDirection,
          'query': params.query,
          'mediaType': params.mediaType,
        },
      });
    }
	
	    /**
	     * List media in vault list
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateMedia(params: Omit<AccessVaultListsListMediaParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessVaultListsListMediaItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listMedia({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessVaultListsListMediaParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }

    /**
     * Add media to vault list
     */
    createMedia(params: AccessVaultListsCreateMediaParams): Promise<AccessVaultListsCreateMediaResponse> {
      return request<AccessVaultListsCreateMediaResponse>(this._config, {
        path: `/v2/access/vault/lists/${encodeURIComponent(String(params.listId))}/media`,
        method: 'POST',
        body: params.body,
      });
    }
}

class AccessVaultNamespace {
  private _config: OFAuthConfig;

  readonly lists: AccessVaultListsNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.lists = new AccessVaultListsNamespace(config);
  }

    /**
     * List vault media
     */
    listMedia(params: AccessVaultListMediaParams): Promise<AccessVaultListMediaResponse> {
      return request<AccessVaultListMediaResponse>(this._config, {
        path: '/v2/access/vault/media',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'sortBy': params.sortBy,
          'sortDirection': params.sortDirection,
          'listId': params.listId,
          'query': params.query,
          'mediaType': params.mediaType,
        },
      });
    }
	
	    /**
	     * List vault media
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateMedia(params: Omit<AccessVaultListMediaParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessVaultListMediaItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listMedia({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessVaultListMediaParams);
        
        for (const item of response.list) {
          if (fetched >= maxItems) return;
          yield item;
          fetched++;
	        }
	        
	        if (!response.hasMore) return;
	        const nextOffset = (response as { nextOffset?: number | string | null }).nextOffset;
	        offset =
	          typeof nextOffset === 'number'
	            ? nextOffset
	            : typeof nextOffset === 'string' && nextOffset.trim() !== '' && Number.isFinite(Number(nextOffset))
	              ? Number(nextOffset)
	              : offset + response.list.length;
	      }
	    }
}

class AccessUploadsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Upload single-part media and finalize (No need to call /complete after upload if using this endpoint)
     */
    replace(params: AccessUploadsReplaceParams): Promise<AccessUploadsReplaceResponse> {
      return request<AccessUploadsReplaceResponse>(this._config, {
        path: `/v2/access/uploads/${encodeURIComponent(String(params.mediaUploadId))}`,
        method: 'PUT',
      });
    }

    /**
     * Check if media already exists in vault
     */
    check(params: AccessUploadsCheckParams): Promise<AccessUploadsCheckResponse> {
      return request<AccessUploadsCheckResponse>(this._config, {
        path: '/v2/access/uploads/check',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Initialize media upload
     */
    init(params: AccessUploadsInitParams): Promise<AccessUploadsInitResponse> {
      return request<AccessUploadsInitResponse>(this._config, {
        path: '/v2/access/uploads/init',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Upload chunk to managed media upload
     */
    replaceParts(params: AccessUploadsReplacePartsParams): Promise<AccessUploadsReplacePartsResponse> {
      return request<AccessUploadsReplacePartsResponse>(this._config, {
        path: `/v2/access/uploads/${encodeURIComponent(String(params.mediaUploadId))}/parts/${encodeURIComponent(String(params.partNumber))}`,
        method: 'PUT',
      });
    }

    /**
     * Finalize media upload
     */
    complete(params: AccessUploadsCompleteParams): Promise<AccessUploadsCompleteResponse> {
      return request<AccessUploadsCompleteResponse>(this._config, {
        path: '/v2/access/uploads/complete',
        method: 'POST',
        body: params.body,
      });
    }
}

class AccessNamespace {
  private _config: OFAuthConfig;

  readonly self: AccessSelfNamespace;
  readonly earnings: AccessEarningsNamespace;
  readonly analytics: AccessAnalyticsNamespace;
  readonly users: AccessUsersNamespace;
  readonly chats: AccessChatsNamespace;
  readonly subscribers: AccessSubscribersNamespace;
  readonly subscriptions: AccessSubscriptionsNamespace;
  readonly promotions: AccessPromotionsNamespace;
  readonly vault: AccessVaultNamespace;
  readonly uploads: AccessUploadsNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.self = new AccessSelfNamespace(config);
    this.earnings = new AccessEarningsNamespace(config);
    this.analytics = new AccessAnalyticsNamespace(config);
    this.users = new AccessUsersNamespace(config);
    this.chats = new AccessChatsNamespace(config);
    this.subscribers = new AccessSubscribersNamespace(config);
    this.subscriptions = new AccessSubscriptionsNamespace(config);
    this.promotions = new AccessPromotionsNamespace(config);
    this.vault = new AccessVaultNamespace(config);
    this.uploads = new AccessUploadsNamespace(config);
  }

    /**
     * List own posts
     */
    listPosts(params: AccessListPostsParams): Promise<AccessListPostsResponse> {
      return request<AccessListPostsResponse>(this._config, {
        path: '/v2/access/posts',
        method: 'GET',
        query: {
          'limit': params.limit,
          'sortBy': params.sortBy,
          'sortDirection': params.sortDirection,
          'pinned': params.pinned,
          'includePostCounts': params.includePostCounts,
          'beforePublishTime': params.beforePublishTime,
        },
      });
    }

    /**
     * Create post
     */
    createPosts(params: AccessCreatePostsParams): Promise<AccessCreatePostsResponse> {
      return request<AccessCreatePostsResponse>(this._config, {
        path: '/v2/access/posts',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get post
     */
    getPosts(params: AccessGetPostsParams): Promise<AccessGetPostsResponseOption0 | any | null> {
      return request<AccessGetPostsResponseOption0 | any | null>(this._config, {
        path: `/v2/access/posts/${encodeURIComponent(String(params.postId))}`,
        method: 'GET',
      });
    }

    /**
     * Edit post
     */
    replacePosts(params: AccessReplacePostsParams): Promise<AccessReplacePostsResponse> {
      return request<AccessReplacePostsResponse>(this._config, {
        path: `/v2/access/posts/${encodeURIComponent(String(params.postId))}`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Delete post
     */
    deletePosts(params: AccessDeletePostsParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/posts/${encodeURIComponent(String(params.postId))}`,
        method: 'DELETE',
      });
    }

    /**
     * Create mass message
     */
    createMassMessages(params: AccessCreateMassMessagesParams): Promise<AccessCreateMassMessagesResponse> {
      return request<AccessCreateMassMessagesResponse>(this._config, {
        path: '/v2/access/mass-messages',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get mass message
     */
    getMassMessages(params: AccessGetMassMessagesParams): Promise<AccessGetMassMessagesResponse> {
      return request<AccessGetMassMessagesResponse>(this._config, {
        path: `/v2/access/mass-messages/${encodeURIComponent(String(params.massMessageId))}`,
        method: 'GET',
      });
    }

    /**
     * Update mass message
     */
    replaceMassMessages(params: AccessReplaceMassMessagesParams): Promise<AccessReplaceMassMessagesResponse> {
      return request<AccessReplaceMassMessagesResponse>(this._config, {
        path: `/v2/access/mass-messages/${encodeURIComponent(String(params.massMessageId))}`,
        method: 'PUT',
        body: params.body,
      });
    }

    /**
     * Delete mass message
     */
    deleteMassMessages(params: AccessDeleteMassMessagesParams): Promise<AccessDeleteMassMessagesResponse> {
      return request<AccessDeleteMassMessagesResponse>(this._config, {
        path: `/v2/access/mass-messages/${encodeURIComponent(String(params.massMessageId))}`,
        method: 'DELETE',
      });
    }
}

class LinkNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Get login status
     */
    get(params: LinkGetParams): Promise<LinkGetResponse> {
      return request<LinkGetResponse>(this._config, {
        path: `/v2/link/${encodeURIComponent(String(params.clientSecret))}`,
        method: 'GET',
      });
    }

    /**
     * Delete login session
     */
    delete(params: LinkDeleteParams): Promise<unknown> {
      return request<unknown>(this._config, {
        path: `/v2/link/${encodeURIComponent(String(params.clientSecret))}`,
        method: 'DELETE',
      });
    }

    /**
     * Initialize a Link session
     */
    init(params: LinkInitParams): Promise<LinkInitResponse> {
      return request<LinkInitResponse>(this._config, {
        path: '/v2/link/init',
        method: 'POST',
        body: params.body,
      });
    }
}

class DynamicRulesNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Get dynamic rules
     */
    list(): Promise<DynamicRulesListResponse> {
      return request<DynamicRulesListResponse>(this._config, {
        path: '/v2/dynamic-rules',
        method: 'GET',
      });
    }

    /**
     * Generate sign headers for a request
     */
    sign(params: DynamicRulesSignParams): Promise<DynamicRulesSignResponse> {
      return request<DynamicRulesSignResponse>(this._config, {
        path: '/v2/dynamic-rules/sign',
        method: 'POST',
        body: params.body,
      });
    }

    /**
     * Get dynamic rules status
     */
    getStatus(): Promise<DynamicRulesGetStatusResponse> {
      return request<DynamicRulesGetStatusResponse>(this._config, {
        path: '/v2/dynamic-rules/status',
        method: 'GET',
      });
    }
}

class VaultPlusStoreNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Store all media from a vault list
     */
    createList(params: VaultPlusStoreCreateListParams): Promise<VaultPlusStoreCreateListResponse> {
      return request<VaultPlusStoreCreateListResponse>(this._config, {
        path: `/v2/vault-plus/store/list/${encodeURIComponent(String(params.listId))}`,
        method: 'POST',
        connectionId: params.connectionId,
      });
    }

    /**
     * Get storage status for a connection
     */
    getStatus(params: VaultPlusStoreGetStatusParams): Promise<VaultPlusStoreGetStatusResponse> {
      return request<VaultPlusStoreGetStatusResponse>(this._config, {
        path: '/v2/vault-plus/store/status',
        method: 'GET',
        connectionId: params.connectionId,
      });
    }

    /**
     * Get organization vault stats
     */
    getStats(): Promise<VaultPlusStoreGetStatsResponse> {
      return request<VaultPlusStoreGetStatsResponse>(this._config, {
        path: '/v2/vault-plus/store/stats',
        method: 'GET',
      });
    }
}

class VaultPlusNamespace {
  private _config: OFAuthConfig;

  readonly store: VaultPlusStoreNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.store = new VaultPlusStoreNamespace(config);
  }

    /**
     * Get media item with all quality variants
     */
    get(params: VaultPlusGetParams): Promise<VaultPlusGetResponse> {
      return request<VaultPlusGetResponse>(this._config, {
        path: `/v2/vault-plus/${encodeURIComponent(String(params.mediaId))}`,
        method: 'GET',
        connectionId: params.connectionId,
      });
    }

    /**
     * Delete a stored media item
     */
    delete(params: VaultPlusDeleteParams): Promise<VaultPlusDeleteResponse> {
      return request<VaultPlusDeleteResponse>(this._config, {
        path: `/v2/vault-plus/${encodeURIComponent(String(params.mediaId))}`,
        method: 'DELETE',
        connectionId: params.connectionId,
      });
    }

    /**
     * Get multiple media items with all quality variants
     */
    createBatch(params: VaultPlusCreateBatchParams): Promise<VaultPlusCreateBatchResponse> {
      return request<VaultPlusCreateBatchResponse>(this._config, {
        path: '/v2/vault-plus/batch',
        method: 'POST',
        body: params.body,
        connectionId: params.connectionId,
      });
    }

    /**
     * List stored media for a connection
     */
    getList(params: VaultPlusGetListParams): Promise<VaultPlusGetListResponse> {
      return request<VaultPlusGetListResponse>(this._config, {
        path: '/v2/vault-plus/list',
        method: 'GET',
        query: {
          'status': params.status,
          'source': params.source,
          'contentType': params.contentType,
          'limit': params.limit,
          'cursor': params.cursor,
        },
        connectionId: params.connectionId,
      });
    }

    /**
     * Remove all stored media for a connection
     */
    purge(params: VaultPlusPurgeParams): Promise<VaultPlusPurgeResponse> {
      return request<VaultPlusPurgeResponse>(this._config, {
        path: '/v2/vault-plus/purge',
        method: 'DELETE',
        connectionId: params.connectionId,
      });
    }
}

class OFAuthClient {
  private _config: OFAuthConfig;

  readonly account: AccountNamespace;
  readonly access: AccessNamespace;
  readonly link: LinkNamespace;
  readonly dynamicRules: DynamicRulesNamespace;
  readonly vaultPlus: VaultPlusNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.account = new AccountNamespace(config);
    this.access = new AccessNamespace(config);
    this.link = new LinkNamespace(config);
    this.dynamicRules = new DynamicRulesNamespace(config);
    this.vaultPlus = new VaultPlusNamespace(config);
  }

    /**
     * Make a proxied request to the OnlyFans API
     */
    proxy<T = any>(opts: ProxyRequestOptions): Promise<T> {
      return proxy<T>(this._config, opts);
    }
}

/**
 * Create a new OFAuth API client
 */
export function createOFAuthClient(config: OFAuthConfig): OFAuthClient {
  return new OFAuthClient(config);
}

export { OFAuthClient };
