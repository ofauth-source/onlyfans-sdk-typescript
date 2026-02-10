/* eslint-disable */
/**
 * OFAuth API Client
 * Nested namespace structure for easy navigation
 */

import { OFAuthConfig, request, PaginationOptions, proxy, ProxyRequestOptions } from './runtime';

// Response and Request Body Types
export interface AccessAnalyticsCampaignsGetChartResponseValue {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsCampaignsGetTopResponse {
  hasMore: boolean;
  list: Array<{
  campaignCode: number;
  campaignName: string;
  countSubscribers: number;
  countTransitions: number;
  createdAt: string;
  endDate: string;
  id: number;
}>;
}

export interface AccessAnalyticsCampaignsGetTopItem {
  campaignCode: number;
  campaignName: string;
  countSubscribers: number;
  countTransitions: number;
  createdAt: string;
  endDate: string;
  id: number;
}

export interface AccessAnalyticsEarningsListChargebacksResponse {
  hasMore: boolean;
  list: Array<{
  createdAt: string;
  id: number;
  payment: {
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string | null;
  currency: string | null;
  description: string | null;
  id: string | null;
  status: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
};
  paymentType: string | null;
}>;
  nextMarker: number | null;
}

export interface AccessAnalyticsEarningsListChargebacksItem {
  createdAt: string;
  id: number;
  payment: {
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string | null;
  currency: string | null;
  description: string | null;
  id: string | null;
  status: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
};
  paymentType: string | null;
}

export interface AccessAnalyticsEarningsGetChartResponse {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta?: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsEarningsListTransactionsResponse {
  hasMore: boolean;
  list: Array<{
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string;
  currency: string;
  description: string | null;
  id: string;
  payoutPendingDays: number | null;
  status: string | null;
  type: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
}>;
  nextMarker: number | null;
}

export interface AccessAnalyticsEarningsListTransactionsItem {
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string;
  currency: string;
  description: string | null;
  id: string;
  payoutPendingDays: number | null;
  status: string | null;
  type: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
}

export interface AccessAnalyticsMassMessagesListBuyersResponse {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  nextMarker?: number | null;
}

export interface AccessAnalyticsMassMessagesListBuyersItem {
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}

export interface AccessAnalyticsMassMessagesGetChartResponse {
  messages: {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
};
  purchases: {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
};
}

export interface AccessAnalyticsMassMessagesGetPurchasedResponse {
  hasMore: boolean;
  items: Array<{
  canSendMessageToBuyers?: boolean;
  canUnsend?: boolean;
  date: string;
  giphyId?: string | null;
  id: number;
  isCanceled?: boolean;
  isFree?: boolean;
  isMediaReady?: boolean;
  isReportedByMe?: boolean;
  isTip?: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  price?: string;
  purchasedCount?: number;
  rawText?: string;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  responseType?: string;
  sentCount?: number;
  template?: string;
  text: string;
  unsendSeconds?: number;
  viewedCount?: number;
}>;
}

export interface AccessAnalyticsPostsGetResponse {
  commentChart: Array<{
  count: number;
  date: string;
}>;
  commentCount: number;
  hasStats: boolean;
  hasVideo?: boolean;
  isAvailable: boolean;
  likeChart: Array<{
  count: number;
  date: string;
}>;
  likeCount: number;
  lookChart: Array<{
  count: number;
  date: string;
}>;
  lookCount: number;
  lookDuration: number;
  lookDurationAverage: number;
  purchasedCount: number;
  purchasedSumm: number;
  purchasesChart: Array<{
  count: number;
  date: string;
}>;
  tipChart: Array<{
  count: number;
  date: string;
}>;
  tipCount: number;
  tipSum: number;
  tipSumChart: Array<{
  count: number;
  date: string;
}>;
  uniqueLookChart: Array<{
  count: number;
  date: string;
}>;
  uniqueLookCount: number;
}

export interface AccessAnalyticsPostsGetChartResponseValue {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsPostsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  author?: {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  stats?: {
  commentChart: Array<{
  count: number;
  date: string;
}>;
  commentCount: number;
  hasStats: boolean;
  hasVideo?: boolean;
  isAvailable: boolean;
  likeChart: Array<{
  count: number;
  date: string;
}>;
  likeCount: number;
  lookChart: Array<{
  count: number;
  date: string;
}>;
  lookCount: number;
  lookDuration: number;
  lookDurationAverage: number;
  purchasedCount: number;
  purchasedSumm: number;
  tipChart: Array<{
  count: number;
  date: string;
}>;
  tipCount: number;
  tipSum: number;
  uniqueLookChart: Array<{
  count: number;
  date: string;
}>;
  uniqueLookCount: number;
};
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
}>;
}

export interface AccessAnalyticsPromotionsGetChartResponseValue {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsPromotionsGetTopResponse {
  hasMore: boolean;
  items: Array<{
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
}>;
}

export interface AccessAnalyticsStoriesGetChartResponseValue {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsStoriesGetTopResponse {
  hasMore: boolean;
  items: Array<{
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  post?: {
  author?: {
  _view: string;
  id: number;
};
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
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
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
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  canCommentStory: boolean;
  canLookStory: boolean;
  hasNotViewedStory: boolean;
  id: number;
  isStoryBlockedUser: boolean;
  isStoryLiked: boolean;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  viewersCount: number;
}>;
}

export interface AccessAnalyticsStreamsGetChartResponseValue {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsStreamsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  author?: {
  _view: string;
  id: number;
};
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  favoritesCount: number;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  stats?: {
  commentChart: Array<{
  count: number;
  date: string;
}>;
  commentCount: number;
  hasStats: boolean;
  hasVideo?: boolean;
  isAvailable: boolean;
  likeChart: Array<{
  count: number;
  date: string;
}>;
  likeCount: number;
  lookChart: Array<{
  count: number;
  date: string;
}>;
  lookCount: number;
  lookDuration: number;
  lookDurationAverage: number;
  purchasedCount: number;
  purchasedSumm: number;
  tipChart: Array<{
  count: number;
  date: string;
}>;
  tipCount: number;
  tipSum: number;
  uniqueLookChart: Array<{
  count: number;
  date: string;
}>;
  uniqueLookCount: number;
};
  text: string;
  tipsAmount: string;
}>;
}

export interface AccessAnalyticsTrialsGetChartResponseValue {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta: number;
  gross?: number;
  total: number;
}

export interface AccessAnalyticsTrialsGetTopResponse {
  hasMore: boolean;
  items: Array<{
  claimCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
}>;
}

export interface AccessAnalyticsVisitorCountriesGetChartResponse {
  chart: {
  duration: Array<{
  count: number;
  date: string;
}>;
  visitors: Array<{
  count: number;
  date: string;
}>;
};
  hasStats: boolean;
  isAvailable: boolean;
  total: {
  current: string;
  delta: number;
};
}

export interface AccessAnalyticsVisitorCountriesGetTopResponse {
  hasStats: boolean;
  isAvailable: boolean;
  topCountries: {
  hasMore: boolean;
  rows: Array<{
  countryCode: string;
  countryName: string;
  rank: number;
  viewsCount: {
  guests: number;
  subscribers: number;
  total: number;
  users: number;
};
}>;
  totals: {
  guests: string;
  subscribers: number;
  total: number;
  users: string;
};
};
}

export interface AccessChatsListResponse {
  hasMore: boolean;
  list: Array<{
  canGoToProfile?: boolean;
  canNotSendReason?: boolean | string;
  canSendMessage?: boolean;
  countPinnedMessages?: number;
  hasPurchasedFeed?: boolean;
  hasUnreadTips?: boolean;
  isMutedNotifications?: boolean;
  lastMessage?: {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
};
  lastReadMessageId?: number;
  unreadMessagesCount?: number;
  withUser: {
  _view: string;
  id: number;
};
}>;
  nextOffset?: number;
}

export interface AccessChatsListItem {
  canGoToProfile?: boolean;
  canNotSendReason?: boolean | string;
  canSendMessage?: boolean;
  countPinnedMessages?: number;
  hasPurchasedFeed?: boolean;
  hasUnreadTips?: boolean;
  isMutedNotifications?: boolean;
  lastMessage?: {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
};
  lastReadMessageId?: number;
  unreadMessagesCount?: number;
  withUser: {
  _view: string;
  id: number;
};
}

export interface AccessChatsListMediaResponse {
  hasMore: boolean;
  list: Array<{
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
}>;
}

export interface AccessChatsListMediaItem {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
}

export interface AccessChatsListMessagesResponse {
  hasMore: boolean;
  list: Array<{
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
}>;
}

export interface AccessChatsListMessagesItem {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
}

export interface AccessChatsCreateMessagesRequest {
  isForwardedMessage?: boolean | null;
  isLockedText?: boolean | null;
  isMarkdown?: boolean | null;
  mediaItems?: Array<number | string>;
  previewMediaCount?: number | null;
  price?: number | null;
  releaseForms?: {
  guests?: Array<number>;
  partners?: Array<number>;
  users?: Array<number>;
};
  text?: string;
  userTags?: Array<number>;
}

export interface AccessChatsCreateMessagesResponse {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
}

export interface AccessChatsDeleteMessagesRequest {
  withUserId: string | number;
}

export interface AccessChatsDeleteMessagesResponse {
  queue?: {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canSendMessageToBuyers?: boolean;
  canUnsend?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  date?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
  giphyId?: string | null;
  hasError?: boolean;
  id: number;
  isCanceled?: boolean;
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  mediaTypes?: {
  audio?: number;
  gif?: number;
  photo?: number;
  video?: number;
};
  previews: Array<number>;
  price?: string;
  purchasedCount?: number;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  sentCount?: number;
  text: string;
  textCropped?: string;
  unsendSeconds?: number;
  unsendSecondsQueue?: number;
  viewedCount?: number;
};
  success: boolean;
}

export interface AccessEarningsListChargebacksResponse {
  hasMore: boolean;
  list: Array<{
  createdAt: string;
  id: number;
  payment: {
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string | null;
  currency: string | null;
  description: string | null;
  id: string | null;
  status: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
};
  paymentType: string | null;
}>;
  nextMarker: number | null;
}

export interface AccessEarningsListChargebacksItem {
  createdAt: string;
  id: number;
  payment: {
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string | null;
  currency: string | null;
  description: string | null;
  id: string | null;
  status: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
};
  paymentType: string | null;
}

export interface AccessEarningsGetChartResponse {
  chart: Array<{
  count: number;
  date: string;
}>;
  delta?: number;
  gross?: number;
  total: number;
}

export interface AccessEarningsListTransactionsResponse {
  hasMore: boolean;
  list: Array<{
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string;
  currency: string;
  description: string | null;
  id: string;
  payoutPendingDays: number | null;
  status: string | null;
  type: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
}>;
  nextMarker: number | null;
}

export interface AccessEarningsListTransactionsItem {
  amounts: {
  fee: number;
  gross: number;
  net: number;
  tax: number;
  vat: number;
};
  createdAt: string;
  currency: string;
  description: string | null;
  id: string;
  payoutPendingDays: number | null;
  status: string | null;
  type: string | null;
  user: {
  avatar: string | null;
  id: number;
  name: string;
  username: string;
};
}

export interface AccessPromotionsTrackingLinksListResponse {
  hasMore: boolean;
  list: Array<{
  id: number;
  name: string;
}>;
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

export interface AccessPromotionsTrackingLinksListClaimersResponse {
  hasMore?: boolean;
  list: Array<any | null>;
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

export interface AccessPromotionsTrialLinksListResponseOption0 {
  hasMore: boolean;
  list: Array<{
  claimCounts: number;
  clicksCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  sharedWith?: string | null;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
  user?: any | null;
}>;
}

export interface AccessPromotionsTrialLinksListResponseOption1Item {
  claimCounts: number;
  clicksCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  sharedWith?: string | null;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
  user?: any | null;
}

export interface AccessPromotionsTrialLinksCreateRequest {
  expiredAt?: string;
  subscribeCounts?: number;
  subscribeDays: number;
  trialLinkName: string;
}

export interface AccessPromotionsTrialLinksCreateResponse {
  claimCounts: number;
  clicksCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  sharedWith?: string | null;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
  user?: any | null;
}

export interface AccessPromotionsTrialLinksGetResponse {
  claimCounts: number;
  clicksCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  sharedWith?: string | null;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
  user?: any | null;
}

export interface AccessPromotionsTrialLinksReplaceRequest {
  expiredAt?: string;
  subscribeCounts?: number;
  subscribeDays?: number;
  trialLinkName?: string;
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
  subscribeCounts: number;
  subscribeDays: number;
  type: string;
}

export interface AccessPromotionsListResponseOption1 {
  hasMore: boolean;
  list: Array<{
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
  subscribeCounts: number;
  subscribeDays: number;
  type: string;
}>;
}

export interface AccessPromotionsCreateRequest {
  discount: number;
  finishDays: number;
  message: string;
  subscribeCounts: number;
  subscribeDays: number;
  type: Array<string>;
}

export interface AccessPromotionsCreateResponseOption0Item {
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
  subscribeCounts: number;
  subscribeDays: number;
  type: string;
}

export interface AccessPromotionsCreateResponseOption1 {
  hasMore: boolean;
  list: Array<{
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
  subscribeCounts: number;
  subscribeDays: number;
  type: string;
}>;
}

export interface AccessPromotionsReplaceRequest {
  discount?: number;
  finishDays?: number;
  message?: string;
  subscribeCounts?: number;
  subscribeDays?: number;
  type?: Array<string>;
}

export interface AccessPromotionsReplaceResponse {
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
  subscribeCounts: number;
  subscribeDays: number;
  type: string;
}

export interface AccessPromotionsDeleteResponse {
  success: boolean;
}

export interface AccessPromotionsCreateStopResponse {
  success: boolean;
}

export interface AccessPromotionsListBundlesResponseOption0Item {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
}

export interface AccessPromotionsListBundlesResponseOption1 {
  hasMore: boolean;
  list: Array<{
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
}>;
}

export interface AccessPromotionsCreateBundlesRequest {
  discount: number;
  duration: number;
}

export interface AccessPromotionsCreateBundlesResponse {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
}

export interface AccessPromotionsGetBundlesResponse {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
}

export interface AccessPromotionsReplaceBundlesRequest {
  discount?: number;
  duration?: number;
}

export interface AccessPromotionsReplaceBundlesResponse {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
}

export interface AccessPromotionsDeleteBundlesResponse {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
}

export interface AccessSelfGetResponseOption0 {
  avatar: string | null;
  id: number;
  isAuth: boolean;
  isVerified: boolean;
  name: string;
  photosCount: number;
  postsCount: number;
  subscribersCount: number | null;
  username: string;
  videosCount: number;
}

export interface AccessSelfGetResponseOption1 {
  isAuth: boolean;
}

export interface AccessSelfUpdateRequest {
  about?: string;
  name?: string;
}

export interface AccessSelfUpdateResponse {
  about?: string | null;
  archivedPostsCount?: number;
  audiosCount?: number;
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canAddSubscriber?: boolean;
  canChat?: boolean;
  canCommentStory?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  canLookStory?: boolean;
  canPayInternal?: boolean;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  favoritedCount?: number;
  favoritesCount?: number;
  hasLabels?: boolean;
  hasNotViewedStory?: boolean;
  hasPinnedPosts?: boolean;
  hasScheduledStream?: boolean;
  hasStories?: boolean;
  hasStream?: boolean;
  header?: string | null;
  headerSize?: {
  height: number;
  width: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  id: number;
  isAdultContent?: boolean;
  isBlocked?: boolean;
  isFriend?: boolean;
  isMarkdownDisabledForAbout?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isPrivateRestriction?: boolean;
  isRealPerformer?: boolean;
  isReferrerAllowed?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  joinDate?: string;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  location?: string | null;
  mediasCount?: number;
  name: string;
  notice?: string;
  photosCount?: number;
  postsCount?: number;
  privateArchivedPostsCount?: number;
  showMediaCount?: boolean;
  showPostsInFeed?: boolean;
  showSubscribersCount?: boolean;
  subscribePrice?: number;
  subscribedBy?: boolean;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  subscribersCount?: number | null;
  tipsEnabled?: boolean;
  tipsMax?: number;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsTextEnabled?: boolean;
  username: string;
  videosCount?: number;
  website?: string | null;
  wishlist?: string | null;
}

export interface AccessSelfListNotificationsResponse {
  hasMore: boolean;
  list: Array<{
  canGoToProfile: boolean;
  createdAt: string;
  id: number;
  isRead: boolean;
  replacePairs: Record<string, string> | null;
  subType: string | null;
  text: string;
  type: string;
  userId: number | null;
}>;
}

export interface AccessSelfListNotificationsItem {
  canGoToProfile: boolean;
  createdAt: string;
  id: number;
  isRead: boolean;
  replacePairs: Record<string, string> | null;
  subType: string | null;
  text: string;
  type: string;
  userId: number | null;
}

export interface AccessSelfListReleaseFormsResponse {
  hasMore: boolean;
  list: Array<{
  approvedAt: string | null;
  code: string | null;
  createdAt: string | null;
  hasUser: boolean;
  id: number;
  isHidden: boolean;
  lastChangedAt: string | null;
  name: string;
  partnerId: number | null;
  status: string | null;
  type: string;
  userName: string | null;
}>;
}

export interface AccessSelfListReleaseFormsItem {
  approvedAt: string | null;
  code: string | null;
  createdAt: string | null;
  hasUser: boolean;
  id: number;
  isHidden: boolean;
  lastChangedAt: string | null;
  name: string;
  partnerId: number | null;
  status: string | null;
  type: string;
  userName: string | null;
}

export interface AccessSelfListTaggedFriendUsersResponse {
  hasMore: boolean;
  list: Array<{
  id: number;
  name: string;
  type: string;
  user: {
  avatar: string | null;
  id: number;
  isHidden: boolean;
  isVerified: boolean;
  name: string;
  username: string;
};
}>;
}

export interface AccessSelfListTaggedFriendUsersItem {
  id: number;
  name: string;
  type: string;
  user: {
  avatar: string | null;
  id: number;
  isHidden: boolean;
  isVerified: boolean;
  name: string;
  username: string;
};
}

export interface AccessSubscribersListResponse {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs: {
  c144: string;
  c50: string;
} | null;
  capabilities: {
  canBlock: boolean;
  canReceiveMessages: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canSendTrial: boolean;
  canUnsubscribe: boolean;
};
  displayName: string;
  id: number;
  isBlocked: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: string | null;
  lists: Array<{
  id: string | number;
  name: string;
}>;
  name: string;
  spending: {
  messages: number;
  posts: number;
  streams: number;
  subscriptions: number;
  tips: number;
  total: number;
};
  subscription: {
  discountFinishedAt: string | null;
  discountPercent: number | null;
  discountPeriod: number | null;
  discountStartedAt: string | null;
  expiresAt: string | null;
  history: Array<{
  action: string;
  discount: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  price: number;
  regularPrice: number;
  startDate: string;
  type: string;
}>;
  isActive: boolean;
  isExpired: boolean;
  price: number | null;
  regularPrice: number | null;
  renewedAt: string | null;
  subscribedAt: string | null;
};
  username: string;
}>;
}

export interface AccessSubscribersListItem {
  avatar: string | null;
  avatarThumbs: {
  c144: string;
  c50: string;
} | null;
  capabilities: {
  canBlock: boolean;
  canReceiveMessages: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canSendTrial: boolean;
  canUnsubscribe: boolean;
};
  displayName: string;
  id: number;
  isBlocked: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: string | null;
  lists: Array<{
  id: string | number;
  name: string;
}>;
  name: string;
  spending: {
  messages: number;
  posts: number;
  streams: number;
  subscriptions: number;
  tips: number;
  total: number;
};
  subscription: {
  discountFinishedAt: string | null;
  discountPercent: number | null;
  discountPeriod: number | null;
  discountStartedAt: string | null;
  expiresAt: string | null;
  history: Array<{
  action: string;
  discount: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  price: number;
  regularPrice: number;
  startDate: string;
  type: string;
}>;
  isActive: boolean;
  isExpired: boolean;
  price: number | null;
  regularPrice: number | null;
  renewedAt: string | null;
  subscribedAt: string | null;
};
  username: string;
}

export interface AccessSubscribersSetCustomNameRequest {
  displayName: string;
}

export interface AccessSubscribersSetDiscountRequest {
  discount: number;
  period: number;
}

export interface AccessSubscribersSetNoteRequest {
  notice: string;
}

export interface AccessSubscriptionsListResponse {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  expiredAt: string | null;
  id: number;
  isActive: boolean;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  messagesSumm?: number;
  name: string;
  postsSumm?: number;
  renewedAt: string | null;
  streamsSumm?: number;
  subscribedAt: string;
  subscribesSumm?: number;
  subscriptionPrice: number;
  tipsSumm?: number;
  totalSumm?: number;
  username: string;
}>;
}

export interface AccessSubscriptionsListItem {
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  expiredAt: string | null;
  id: number;
  isActive: boolean;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  messagesSumm?: number;
  name: string;
  postsSumm?: number;
  renewedAt: string | null;
  streamsSumm?: number;
  subscribedAt: string;
  subscribesSumm?: number;
  subscriptionPrice: number;
  tipsSumm?: number;
  totalSumm?: number;
  username: string;
}

export interface AccessSubscriptionsGetHistoryResponse {
  hasMore: boolean;
  list: Array<{
  expireDate: string;
  price: number;
  subscribeDate: string;
}>;
}

export interface AccessSubscriptionsGetCountResponse {
  bookmarks: number;
  subscribers: {
  active: number;
  activeOnline: number;
  all: number;
  blocked: number;
  expired: number;
  muted: number;
  restricted: number;
};
  subscriptions: {
  active: number;
  all: number;
  attention: number;
  blocked: number;
  expired: number;
  muted: number;
  restricted: number;
};
}

export interface AccessUploadsReplaceResponse {
  media?: {
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
};
  mediaUploadId: string;
}

export interface AccessUploadsReplacePartsResponse {
  etag: string;
  mediaUploadId: string;
  partNumber: number;
}

export interface AccessUploadsCheckRequest {
  etag: string;
  size: number;
}

export interface AccessUploadsCheckResponse {
  exists: boolean;
  media?: {
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
};
}

export interface AccessUploadsCompleteRequest {
  mediaUploadId: string;
}

export interface AccessUploadsCompleteResponse {
  media?: {
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
};
  mediaUploadId: string;
}

export interface AccessUploadsInitRequest {
  contentType: string;
  filename: string;
  size: number;
  vaultUpload?: {
  mode?: 'message';
  userId?: string | null;
};
}

export interface AccessUploadsInitResponse {
  mediaUploadId: string;
}

export interface AccessUsersListsCreateRequest {
  listIds: Array<number>;
}

export interface AccessUsersListsCreateResponse {
  errors?: Array<{
  error: string;
  listId: number;
}>;
  success: Array<{
  listId: number;
  success: boolean;
}>;
}

export interface AccessUsersListsListResponse {
  hasMore: boolean;
  list: Array<{
  canAddUsers?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canPinnedToChat?: boolean;
  canPinnedToFeed?: boolean;
  canUpdate?: boolean;
  direction?: string;
  id: string | number;
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name: string;
  order?: string;
  postsCount?: number;
  sortList: Array<{
  direction: string;
  order: string;
}>;
  type: string;
  users: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  usersCount?: number;
}>;
  order?: string;
  sort?: string;
}

export interface AccessUsersListsListItem {
  canAddUsers?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canPinnedToChat?: boolean;
  canPinnedToFeed?: boolean;
  canUpdate?: boolean;
  direction?: string;
  id: string | number;
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name: string;
  order?: string;
  postsCount?: number;
  sortList: Array<{
  direction: string;
  order: string;
}>;
  type: string;
  users: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  usersCount?: number;
}

export interface AccessUsersListsCreate2Request {
  name: string;
}

export interface AccessUsersListsCreate2Response {
  canAddUsers?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canPinnedToChat?: boolean;
  canPinnedToFeed?: boolean;
  canUpdate?: boolean;
  direction?: string;
  id: string | number;
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name: string;
  order?: string;
  postsCount?: number;
  sortList: Array<{
  direction: string;
  order: string;
}>;
  type: string;
  users: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  usersCount?: number;
}

export interface AccessUsersListsGetResponse {
  canAddUsers?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canPinnedToChat?: boolean;
  canPinnedToFeed?: boolean;
  canUpdate?: boolean;
  direction?: string;
  id: string | number;
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name: string;
  order?: string;
  postsCount?: number;
  sortList: Array<{
  direction: string;
  order: string;
}>;
  type: string;
  users: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  usersCount?: number;
}

export interface AccessUsersListsUpdateRequest {
  name: string;
}

export interface AccessUsersListsUpdateResponse {
  canAddUsers?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canPinnedToChat?: boolean;
  canPinnedToFeed?: boolean;
  canUpdate?: boolean;
  direction?: string;
  id: string | number;
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name: string;
  order?: string;
  postsCount?: number;
  sortList: Array<{
  direction: string;
  order: string;
}>;
  type: string;
  users: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  usersCount?: number;
}

export interface AccessUsersListsListUsersResponse {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  nextOffset?: number;
}

export interface AccessUsersListsListUsersItem {
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}

export interface AccessUsersListsCreateUsersResponseOption0 {
  list: {
  canAddUsers?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canPinnedToChat?: boolean;
  canPinnedToFeed?: boolean;
  canUpdate?: boolean;
  direction?: string;
  id: string | number;
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name: string;
  order?: string;
  postsCount?: number;
  sortList: Array<{
  direction: string;
  order: string;
}>;
  type: string;
  users: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  usersCount?: number;
};
  userState: {
  canAddUser?: boolean;
  cannotAddUserReason?: string | null;
  hasUser: boolean;
  id: string | number;
  name: string;
  type: string;
};
}

export interface AccessUsersListsDeleteUsersResponseOption0 {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  id: number;
  isVerified: boolean;
  name: string;
  username: string;
}>;
  nextOffset?: number;
}

export interface AccessUsersGetResponseOption0 {
  about?: string | null;
  archivedPostsCount?: number;
  audiosCount?: number;
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canAddSubscriber?: boolean;
  canChat?: boolean;
  canCommentStory?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  canLookStory?: boolean;
  canPayInternal?: boolean;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  favoritedCount?: number;
  favoritesCount?: number;
  hasLabels?: boolean;
  hasNotViewedStory?: boolean;
  hasPinnedPosts?: boolean;
  hasScheduledStream?: boolean;
  hasStories?: boolean;
  hasStream?: boolean;
  header?: string | null;
  headerSize?: {
  height: number;
  width: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  id: number;
  isAdultContent?: boolean;
  isBlocked?: boolean;
  isFriend?: boolean;
  isMarkdownDisabledForAbout?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isPrivateRestriction?: boolean;
  isRealPerformer?: boolean;
  isReferrerAllowed?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  joinDate?: string;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  location?: string | null;
  mediasCount?: number;
  name: string;
  notice?: string;
  photosCount?: number;
  postsCount?: number;
  privateArchivedPostsCount?: number;
  showMediaCount?: boolean;
  showPostsInFeed?: boolean;
  showSubscribersCount?: boolean;
  subscribePrice?: number;
  subscribedBy?: boolean;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  subscribersCount?: number | null;
  tipsEnabled?: boolean;
  tipsMax?: number;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsTextEnabled?: boolean;
  username: string;
  videosCount?: number;
  website?: string | null;
  wishlist?: string | null;
}

export interface AccessUsersListPostsResponse {
  counters: {
  archivedPostsCount: number;
  audiosCount: number;
  mediasCount: number;
  photosCount: number;
  postsCount: number;
  privateArchivedPostsCount: number;
  streamsCount: number;
  videosCount: number;
};
  hasMore: boolean;
  headMarker: string;
  list: Array<{
  author?: {
  _view: string;
  id: number;
};
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  favoritesCount: number;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  text: string;
  tipsAmount: string;
}>;
  tailMarker: string;
}

export interface AccessUsersGetRestrictResponse {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  hideChat?: boolean;
  id: number;
  isBlocked?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  name: string;
  notice?: string;
  subscribedBy?: boolean | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  username: string;
}>;
}

export interface AccessUsersGetRestrictItem {
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  hideChat?: boolean;
  id: number;
  isBlocked?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  name: string;
  notice?: string;
  subscribedBy?: boolean | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  username: string;
}

export interface AccessUsersGetBlockedResponse {
  hasMore: boolean;
  list: Array<{
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  hideChat?: boolean;
  id: number;
  isBlocked?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  name: string;
  notice?: string;
  subscribedBy?: boolean | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  username: string;
}>;
}

export interface AccessUsersGetBlockedItem {
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  hideChat?: boolean;
  id: number;
  isBlocked?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isRealPerformer?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  name: string;
  notice?: string;
  subscribedBy?: boolean | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  username: string;
}

export interface AccessUsersGetListResponse {
  users: Array<{
  about?: string | null;
  archivedPostsCount?: number;
  audiosCount?: number;
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canAddSubscriber?: boolean;
  canChat?: boolean;
  canCommentStory?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  canLookStory?: boolean;
  canPayInternal?: boolean;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  favoritedCount?: number;
  favoritesCount?: number;
  hasLabels?: boolean;
  hasNotViewedStory?: boolean;
  hasPinnedPosts?: boolean;
  hasScheduledStream?: boolean;
  hasStories?: boolean;
  hasStream?: boolean;
  header?: string | null;
  headerSize?: {
  height: number;
  width: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  id: number;
  isAdultContent?: boolean;
  isBlocked?: boolean;
  isFriend?: boolean;
  isMarkdownDisabledForAbout?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isPrivateRestriction?: boolean;
  isRealPerformer?: boolean;
  isReferrerAllowed?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  joinDate?: string;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  location?: string | null;
  mediasCount?: number;
  name: string;
  notice?: string;
  photosCount?: number;
  postsCount?: number;
  privateArchivedPostsCount?: number;
  showMediaCount?: boolean;
  showPostsInFeed?: boolean;
  showSubscribersCount?: boolean;
  subscribePrice?: number;
  subscribedBy?: boolean;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  subscribersCount?: number | null;
  tipsEnabled?: boolean;
  tipsMax?: number;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsTextEnabled?: boolean;
  username: string;
  videosCount?: number;
  website?: string | null;
  wishlist?: string | null;
}>;
}

export interface AccessUsersSearchResponseOption0Item {
  about?: string | null;
  archivedPostsCount?: number;
  audiosCount?: number;
  avatar: string | null;
  avatarThumbs?: {
  c144: string;
  c50: string;
} | null;
  canAddSubscriber?: boolean;
  canChat?: boolean;
  canCommentStory?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  canLookStory?: boolean;
  canPayInternal?: boolean;
  canReceiveChatMessage?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  currentSubscribePrice?: number | null;
  displayName?: string;
  favoritedCount?: number;
  favoritesCount?: number;
  hasLabels?: boolean;
  hasNotViewedStory?: boolean;
  hasPinnedPosts?: boolean;
  hasScheduledStream?: boolean;
  hasStories?: boolean;
  hasStream?: boolean;
  header?: string | null;
  headerSize?: {
  height: number;
  width: number;
} | null;
  headerThumbs?: {
  w480: string;
  w760: string;
} | null;
  id: number;
  isAdultContent?: boolean;
  isBlocked?: boolean;
  isFriend?: boolean;
  isMarkdownDisabledForAbout?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isPrivateRestriction?: boolean;
  isRealPerformer?: boolean;
  isReferrerAllowed?: boolean;
  isRestricted?: boolean;
  isVerified: boolean;
  joinDate?: string;
  lastSeen?: string | null;
  lists: Array<{
  id: string | number;
  name: string;
  type: string;
}>;
  location?: string | null;
  mediasCount?: number;
  name: string;
  notice?: string;
  photosCount?: number;
  postsCount?: number;
  privateArchivedPostsCount?: number;
  showMediaCount?: boolean;
  showPostsInFeed?: boolean;
  showSubscribersCount?: boolean;
  subscribePrice?: number;
  subscribedBy?: boolean;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  newPrice: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  showPostsInFeed: boolean;
  status: string | null;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  unsubscribeReason: string;
};
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string | null;
  subscribedIsExpiredNow?: boolean | null;
  subscribedOn?: boolean;
  subscribedOnData?: {
  discountFinishedAt: string | null;
  discountPercent: number;
  discountPeriod: number;
  discountStartedAt: string | null;
  duration: string;
  expiredAt: string;
  hasActivePaidSubscriptions: boolean;
  isMuted: boolean;
  messagesSumm: number;
  newPrice: number;
  postsSumm: number;
  price: number;
  regularPrice: number;
  renewedAt: string | null;
  status: string | null;
  streamsSumm: number;
  subscribeAt: string;
  subscribePrice: number;
  subscribes: Array<{
  action: string;
  cancelDate: string | null;
  date: string;
  discount: number;
  duration: number;
  earningId: number;
  expireDate: string;
  id: number;
  isCurrent: boolean;
  offerEnd: string | null;
  offerStart: string | null;
  price: number;
  regularPrice: number;
  startDate: string;
  subscriberId: number;
  type: string;
  userId: number;
}>;
  subscribesSumm: number;
  tipsSumm: number;
  totalSumm: number;
  unsubscribeReason: string;
};
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  subscribersCount?: number | null;
  tipsEnabled?: boolean;
  tipsMax?: number;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsTextEnabled?: boolean;
  username: string;
  videosCount?: number;
  website?: string | null;
  wishlist?: string | null;
}

export interface AccessVaultListsListResponse {
  all: {
  audiosCount: number;
  gifsCount: number;
  medias: Array<{
  type: any | null;
}>;
  photosCount: number;
  videosCount: number;
};
  canCreateVaultLists: boolean;
  hasMore: boolean;
  list: Array<{
  canDelete: boolean;
  canUpdate: boolean;
  hasMedia: boolean;
  id: number;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
  name: string;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
}>;
  order: string;
  sort: string;
}

export interface AccessVaultListsListItem {
  canDelete: boolean;
  canUpdate: boolean;
  hasMedia: boolean;
  id: number;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
  name: string;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
}

export interface AccessVaultListsCreateRequest {
  name: string;
}

export interface AccessVaultListsCreateResponse {
  canDelete: boolean;
  canUpdate: boolean;
  hasMedia: boolean;
  id: number;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
  name: string;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
}

export interface AccessVaultListsUpdateRequest {
  clearMedia?: boolean | null;
  name: string;
}

export interface AccessVaultListsUpdateResponse {
  canDelete: boolean;
  canUpdate: boolean;
  hasMedia: boolean;
  id: number;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
  name: string;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
}

export interface AccessVaultListsListMediaResponse {
  hasMore: boolean;
  list: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  hasPosts?: boolean;
  id: number;
  isReady: boolean;
  lists: Array<{
  id: number;
  name: string;
  type: string;
}>;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
}

export interface AccessVaultListsListMediaItem {
  canView: boolean;
  convertedToVideo: boolean;
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  hasPosts?: boolean;
  id: number;
  isReady: boolean;
  lists: Array<{
  id: number;
  name: string;
  type: string;
}>;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}

export interface AccessVaultListsCreateMediaRequest {
  mediaIds: Array<number>;
}

export interface AccessVaultListsCreateMediaResponse {
  canDelete: boolean;
  canUpdate: boolean;
  hasMedia: boolean;
  id: number;
  medias: Array<{
  type: 'photo' | 'video' | 'gif' | 'audio' | null;
  url?: string;
}>;
  name: string;
  type: 'custom' | 'messages' | 'posts' | 'stories' | 'streams' | 'media_stickers';
}

export interface AccessVaultListMediaResponse {
  hasMore: boolean;
  list: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  hasPosts?: boolean;
  id: number;
  isReady: boolean;
  lists: Array<{
  id: number;
  name: string;
  type: string;
}>;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
}

export interface AccessVaultListMediaItem {
  canView: boolean;
  convertedToVideo: boolean;
  counters: {
  likesCount: number;
  tipsSumm: number;
};
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  hasPosts?: boolean;
  id: number;
  isReady: boolean;
  lists: Array<{
  id: number;
  name: string;
  type: string;
}>;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}

export interface AccessListMassMessagesResponse {
  hasMore: boolean;
  list: Array<{
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canSendMessageToBuyers?: boolean;
  canUnsend?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  date?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
  giphyId?: string | null;
  hasError?: boolean;
  id: number;
  isCanceled?: boolean;
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  mediaTypes?: {
  audio?: number;
  gif?: number;
  photo?: number;
  video?: number;
};
  previews: Array<number>;
  price?: string;
  purchasedCount?: number;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  sentCount?: number;
  text: string;
  textCropped?: string;
  unsendSeconds?: number;
  unsendSecondsQueue?: number;
  viewedCount?: number;
}>;
}

export interface AccessListMassMessagesItem {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canSendMessageToBuyers?: boolean;
  canUnsend?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  date?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
  giphyId?: string | null;
  hasError?: boolean;
  id: number;
  isCanceled?: boolean;
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  mediaTypes?: {
  audio?: number;
  gif?: number;
  photo?: number;
  video?: number;
};
  previews: Array<number>;
  price?: string;
  purchasedCount?: number;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  sentCount?: number;
  text: string;
  textCropped?: string;
  unsendSeconds?: number;
  unsendSecondsQueue?: number;
  viewedCount?: number;
}

export interface AccessCreateMassMessagesRequest {
  excludeUserLists?: Array<number | string>;
  isForwardedMessage?: boolean | null;
  isLockedText?: boolean | null;
  isMarkdown?: boolean | null;
  mediaItems?: Array<number | string>;
  previewMediaCount?: number | null;
  price?: number | null;
  releaseForms?: {
  guests?: Array<number>;
  partners?: Array<number>;
  users?: Array<number>;
};
  scheduledDate?: string | any | null;
  subscribedAfterDate?: string | any | null;
  text?: string;
  userIds?: Array<number | string>;
  userLists?: Array<number | string>;
  userTags?: Array<number>;
}

export interface AccessCreateMassMessagesResponse {
  canUnsend?: boolean;
  date: string;
  hasError?: boolean;
  id: number;
  isCanceled?: boolean;
  isCouplePeopleMedia?: boolean;
  isDone?: boolean;
  isReady?: boolean;
  pending?: number;
  total?: number;
  unsendSeconds?: number;
}

export interface AccessGetMassMessagesResponse {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  previews: Array<number>;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  text: string;
  unsendSecondsQueue?: number;
}

export interface AccessReplaceMassMessagesRequest {
  excludeUserLists?: Array<number | string>;
  isForwardedMessage?: boolean | null;
  isLockedText?: boolean | null;
  isMarkdown?: boolean | null;
  mediaItems?: Array<number | string>;
  previewMediaCount?: number | null;
  price?: number | null;
  releaseForms?: {
  guests?: Array<number>;
  partners?: Array<number>;
  users?: Array<number>;
};
  scheduledDate?: string | any | null;
  subscribedAfterDate?: string | any | null;
  text?: string;
  userIds?: Array<number | string>;
  userLists?: Array<number | string>;
  userTags?: Array<number>;
}

export interface AccessReplaceMassMessagesResponse {
  canUnsend?: boolean;
  date: string;
  hasError?: boolean;
  id: number;
  isCanceled?: boolean;
  isCouplePeopleMedia?: boolean;
  isDone?: boolean;
  isReady?: boolean;
  pending?: number;
  total?: number;
  unsendSeconds?: number;
}

export interface AccessDeleteMassMessagesResponse {
  queue?: {
  canBePinned?: boolean;
  canPurchase?: boolean;
  canPurchaseReason?: string;
  canReport?: boolean;
  canSendMessageToBuyers?: boolean;
  canUnsend?: boolean;
  canUnsendQueue?: boolean;
  cancelSeconds?: number;
  changedAt?: string;
  createdAt?: string;
  date?: string;
  fromUser: {
  id: number;
  name: string;
} | {
  _view: string;
  id: number;
};
  giphyId?: string | null;
  hasError?: boolean;
  id: number;
  isCanceled?: boolean;
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
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount?: number;
  mediaTypes?: {
  audio?: number;
  gif?: number;
  photo?: number;
  video?: number;
};
  previews: Array<number>;
  price?: string;
  purchasedCount?: number;
  queueId?: number;
  releaseForms?: any | null;
  responseType?: string;
  sentCount?: number;
  text: string;
  textCropped?: string;
  unsendSeconds?: number;
  unsendSecondsQueue?: number;
  viewedCount?: number;
};
  success: boolean;
}

export interface AccessListPostsResponse {
  counters: {
  archivedPostsCount: number;
  audiosCount: number;
  mediasCount: number;
  photosCount: number;
  postsCount: number;
  privateArchivedPostsCount: number;
  streamsCount: number;
  videosCount: number;
};
  hasMore: boolean;
  headMarker: string;
  list: Array<{
  author?: {
  _view: string;
  id: number;
};
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  favoritesCount: number;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  text: string;
  tipsAmount: string;
}>;
  tailMarker: string;
}

export interface AccessCreatePostsRequest {
  expireAfter?: number;
  fundRaisingTargetAmount?: number;
  fundRaisingTipsPresets?: Array<number>;
  isLockedText?: boolean | null;
  isMarkdown?: boolean | null;
  mediaItems?: Array<number | string>;
  previewMediaCount?: number | null;
  price?: number | null;
  releaseForms?: {
  guests?: Array<number>;
  partners?: Array<number>;
  users?: Array<number>;
};
  scheduledDate?: string;
  text?: string;
  userTags?: Array<number>;
}

export interface AccessCreatePostsResponse {
  author?: {
  _view: string;
  id: number;
};
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  favoritesCount: number;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  text: string;
  tipsAmount: string;
}

export interface AccessGetPostsResponseOption0 {
  author?: {
  _view: string;
  id: number;
};
  canDelete: boolean;
  canEdit: boolean;
  canEditMedia: boolean;
  canEditSchedule: boolean;
  canEditText: boolean;
  canEditVote: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  id: number;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  preview: Array<number>;
  price?: number;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  responseType: string;
  tipsAmount: string;
}

export interface AccessReplacePostsRequest {
  expireAfter?: number;
  fundRaisingTargetAmount?: number;
  fundRaisingTipsPresets?: Array<number>;
  isLockedText?: boolean | null;
  isMarkdown?: boolean | null;
  mediaItems?: Array<number | string>;
  previewMediaCount?: number | null;
  price?: number | null;
  releaseForms?: {
  guests?: Array<number>;
  partners?: Array<number>;
  users?: Array<number>;
};
  scheduledDate?: string;
  text?: string;
  userTags?: Array<number>;
}

export interface AccessReplacePostsResponse {
  author?: {
  _view: string;
  id: number;
};
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  favoritesCount: number;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  media: Array<{
  canView: boolean;
  convertedToVideo: boolean;
  createdAt: string;
  duration?: number;
  files?: {
  full: {
  height?: number;
  size?: number;
  sources: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  url: string;
  width?: number;
};
  preview?: {
  height?: number;
  options: Array<{
  height?: number;
  type?: string;
  url: string;
  width?: number;
}>;
  size?: number;
  url: string;
  width?: number;
};
  squarePreview?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
  thumb?: {
  height?: number;
  size?: number;
  url: string;
  width?: number;
};
};
  hasCustomPreview?: boolean;
  hasError: boolean;
  id: number;
  isReady: boolean;
  releaseForms: Array<{
  id: number;
  name: string;
  partnerSource: string;
  type: string;
  user?: {
  avatar: string;
  avatarThumbs: {
  c144: string;
  c50: string;
};
  id: number;
  isFromGuest: boolean;
  isVerified: boolean;
  ivStatus: string;
  name: string;
  username: string;
  view: string;
};
}>;
  type: 'photo' | 'video' | 'gif' | 'audio';
  videoSources?: {
  '240'?: string | null;
  '720'?: string | null;
};
}>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  text: string;
  tipsAmount: string;
}

export interface AccountConnectionsListResponse {
  hasMore: boolean;
  list: Array<{
  clientReferenceId: string | null;
  createdAt: string;
  expiredAt: string | null;
  id: string;
  imported: boolean;
  lastCheckedAt: string | null;
  permissions: Array<string>;
  status: 'active' | 'expired' | 'awaiting_2fa';
  updatedAt: string;
  userData: {
  avatar: string | null;
  id: string;
  name: string;
  username: string;
};
}>;
}

export interface AccountConnectionsListItem {
  clientReferenceId: string | null;
  createdAt: string;
  expiredAt: string | null;
  id: string;
  imported: boolean;
  lastCheckedAt: string | null;
  permissions: Array<string>;
  status: 'active' | 'expired' | 'awaiting_2fa';
  updatedAt: string;
  userData: {
  avatar: string | null;
  id: string;
  name: string;
  username: string;
};
}

export interface AccountConnectionsCreateImportRequest {
  clientReferenceId?: string | null;
  cookie: string;
  permissions?: Array<string>;
  userAgent: string;
}

export interface AccountConnectionsCreateImportResponse {
  clientReferenceId: string | null;
  createdAt: string;
  expiredAt: string | null;
  id: string;
  imported: boolean;
  lastCheckedAt: string | null;
  permissions: Array<string>;
  status: 'active' | 'expired' | 'awaiting_2fa';
  updatedAt: string;
  userData: {
  avatar: string | null;
  id: string;
  name: string;
  username: string;
};
}

export interface AccountConnectionsUpdateImportRequest {
  cookie: string;
  userAgent: string;
}

export interface AccountConnectionsUpdateImportResponse {
  clientReferenceId: string | null;
  createdAt: string;
  expiredAt: string | null;
  id: string;
  imported: boolean;
  lastCheckedAt: string | null;
  permissions: Array<string>;
  status: 'active' | 'expired' | 'awaiting_2fa';
  updatedAt: string;
  userData: {
  avatar: string | null;
  id: string;
  name: string;
  username: string;
};
}

export interface AccountConnectionsGetSettingsResponse {
  connectionId: string;
  vaultPlus: {
  enabled: boolean;
  settingsOverrides: {
  accessExpiryDays?: number;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  autoCacheVault?: boolean;
  cacheAudio?: boolean;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  minAccessCountVault?: number;
  presignedUrlTtlSeconds?: number;
  retentionDays?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
} | null;
  stats: {
  mediaCount: number;
  storageLimitBytes: number;
  storageUsagePercent: number;
  storedCount: number;
  totalStorageBytes: number;
  vaultPlusEnabled: boolean;
};
};
}

export interface AccountConnectionsUpdateSettingsRequest {
  vaultPlus?: {
  enabled?: boolean;
  settings?: {
  accessExpiryDays?: number;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  autoCacheVault?: boolean;
  cacheAudio?: boolean;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  minAccessCountVault?: number;
  presignedUrlTtlSeconds?: number;
  retentionDays?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
} | null;
};
}

export interface AccountConnectionsUpdateSettingsResponse {
  purgeResult?: {
  freedBytes: number;
  purgedCount: number;
};
  settings: {
  connectionId: string;
  vaultPlus: {
  enabled: boolean;
  settingsOverrides: {
  accessExpiryDays?: number;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  autoCacheVault?: boolean;
  cacheAudio?: boolean;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  minAccessCountVault?: number;
  presignedUrlTtlSeconds?: number;
  retentionDays?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
} | null;
  stats: {
  mediaCount: number;
  storageLimitBytes: number;
  storageUsagePercent: number;
  storedCount: number;
  totalStorageBytes: number;
  vaultPlusEnabled: boolean;
};
};
};
}

export interface AccountGetSettingsResponse {
  vaultPlus: {
  autoEnableForNewConnections: boolean;
  defaultSettings: {
  accessExpiryDays: number;
  autoCacheMessages: boolean;
  autoCachePosts: boolean;
  autoCacheStories: boolean;
  autoCacheVault: boolean;
  cacheAudio: boolean;
  cacheImages: boolean;
  cacheVideos: boolean;
  imageQualities: Array<string>;
  minAccessCountMessages: number;
  minAccessCountPosts: number;
  minAccessCountStories: number;
  minAccessCountVault: number;
  presignedUrlTtlSeconds: number;
  retentionDays: number;
  storageLimitBytes: number;
  storageLimitPurgeStrategy: string;
  videoQualities: Array<string>;
};
};
}

export interface AccountUpdateSettingsRequest {
  vaultPlus?: {
  applyToExistingConnections?: boolean;
  autoEnableForNewConnections?: boolean;
  defaultSettings?: {
  accessExpiryDays?: number;
  autoCacheMessages?: boolean;
  autoCachePosts?: boolean;
  autoCacheStories?: boolean;
  autoCacheVault?: boolean;
  cacheAudio?: boolean;
  cacheImages?: boolean;
  cacheVideos?: boolean;
  imageQualities?: Array<'thumb' | 'preview' | 'full'>;
  minAccessCountMessages?: number;
  minAccessCountPosts?: number;
  minAccessCountStories?: number;
  minAccessCountVault?: number;
  presignedUrlTtlSeconds?: number;
  retentionDays?: number;
  storageLimitBytes?: number;
  storageLimitPurgeStrategy?: 'purge_oldest' | 'purge_largest' | 'purge_smallest' | 'block_new';
  videoQualities?: Array<'preview' | '720p' | '1080p' | 'source'>;
};
};
}

export interface AccountUpdateSettingsResponse {
  broadcastResult?: {
  affectedConnections: number;
  purgeResults: Array<{
  connectionId: string;
  freedBytes: number;
  purgedCount: number;
}>;
};
  settings: {
  vaultPlus: {
  autoEnableForNewConnections: boolean;
  defaultSettings: {
  accessExpiryDays: number;
  autoCacheMessages: boolean;
  autoCachePosts: boolean;
  autoCacheStories: boolean;
  autoCacheVault: boolean;
  cacheAudio: boolean;
  cacheImages: boolean;
  cacheVideos: boolean;
  imageQualities: Array<string>;
  minAccessCountMessages: number;
  minAccessCountPosts: number;
  minAccessCountStories: number;
  minAccessCountVault: number;
  presignedUrlTtlSeconds: number;
  retentionDays: number;
  storageLimitBytes: number;
  storageLimitPurgeStrategy: string;
  videoQualities: Array<string>;
};
};
};
}

export interface AccountWhoamiResponse {
  id: string;
  name: string | null;
  permissions: Array<string>;
}

export interface DynamicRulesListResponse {
  is_current: boolean;
  is_early_access: boolean;
  is_public: boolean;
  rules: {
  app_token: string;
  checksum_constant: number;
  checksum_indexes: Array<number>;
  end: string;
  format: string;
  prefix: string;
  revision: string;
  start: string;
  static_param: string;
  suffix: string;
};
}

export interface DynamicRulesSignRequest {
  endpoint: string;
  time?: number | string;
  'user-id'?: number | string;
}

export interface DynamicRulesSignResponse {
  is_early_access: boolean;
  is_public: boolean;
  signed: {
  'app-token': string;
  sign: string;
  time: string;
  'user-id'?: string;
};
}

export interface DynamicRulesGetStatusResponse {
  access_granted: boolean;
  early_access_revision: string;
  is_current: boolean;
  is_early_access: boolean;
  is_public: boolean;
  public_revision: string;
  revision: string;
}

export interface LinkGetResponse {
  data?: {
  twoFactorState: {
  faceCode?: {
  requestAttemptsLeft: number;
  requestAttemptsLimit: number;
};
  options: Array<'phone' | 'app' | 'face' | 'forceFace'>;
  phoneCode?: {
  checkAttemptsLeft?: number;
  checkAttemptsLimit?: number;
  expirationDate?: string;
  expirationSeconds?: number;
  lastSentDate?: string;
  requestAttemptsLeft: number;
  requestAttemptsLimit: number;
};
  phoneLast4?: string;
};
} | {
  id: string;
  session: {
  cookie: string;
  'user-agent': string;
  'user-id': string;
  'x-bc': string;
};
  userData: {
  avatar: string;
  id: string;
  name: string;
  username: string;
};
};
  status: 'initialized' | 'pending' | 'awaiting_2fa' | 'denied' | 'completed' | 'invalid_credentials' | 'failed' | 'not_found';
}

export interface LinkInitRequest {
  clientReferenceId?: string;
  connectionId?: string;
  geolocation?: {
  city?: string;
  country: string;
  state?: string;
};
  redirectUrl?: string;
}

export interface LinkInitResponse {
  expiresAt: string;
  url: string;
}

export interface VaultPlusStoreCreateListResponse {
  estimatedItems?: number;
  listId: string;
  queued: boolean;
}

export interface VaultPlusStoreGetStatsResponse {
  connectionsWithVaultPlus: number;
  totalConnections: number;
  totalMediaCount: number;
  totalStorageBytes: number;
}

export interface VaultPlusStoreGetStatusResponse {
  connectionId: string;
  pendingCount: number;
  storedCount: number;
  totalMedia: number;
  totalSizeBytes: number;
}

export interface VaultPlusGetResponse {
  duration: number | null;
  id: string;
  media: Record<string, {
  accessCount: number;
  contentType: string;
  createdAt: number;
  expiresAt: number;
  id: string;
  lastAccessedAt: number;
  quality: string;
  sizeBytes: number;
  source: 'vault' | 'messages' | 'posts' | 'stories';
  status: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  storedAt: number | null;
  url: string;
}>;
  type: 'image' | 'video' | 'audio';
}

export interface VaultPlusDeleteResponse {
  freedBytes: number;
  mediaId: string;
  success: boolean;
}

export interface VaultPlusCreateBatchRequest {
  mediaIds: Array<string>;
}

export interface VaultPlusCreateBatchResponse {
  items: Array<{
  duration: number | null;
  id: string;
  media: Record<string, {
  accessCount: number;
  contentType: string;
  createdAt: number;
  expiresAt: number;
  id: string;
  lastAccessedAt: number;
  quality: string;
  sizeBytes: number;
  source: 'vault' | 'messages' | 'posts' | 'stories';
  status: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  storedAt: number | null;
  url: string;
}>;
  type: 'image' | 'video' | 'audio';
}>;
}

export interface VaultPlusGetListResponse {
  items: Array<{
  duration: number | null;
  id: string;
  media: Record<string, {
  accessCount: number;
  contentType: string;
  createdAt: number;
  expiresAt: number;
  id: string;
  lastAccessedAt: number;
  quality: string;
  sizeBytes: number;
  source: 'vault' | 'messages' | 'posts' | 'stories';
  status: 'edge_only' | 'pending' | 'storing' | 'stored' | 'removed';
  storedAt: number | null;
  url: string;
}>;
  type: 'image' | 'video' | 'audio';
}>;
  nextCursor?: string;
}

export interface VaultPlusPurgeResponse {
  freedBytes: number;
  purgedCount: number;
  success: boolean;
}

// Parameter interfaces
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

export interface AccessAnalyticsEarningsListChargebacksParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Pagination marker from previous response */
  marker?: string;
}

export interface AccessAnalyticsEarningsGetChartParams {
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

export interface AccessAnalyticsEarningsListTransactionsParams {
  /** Start date for transactions */
  startDate?: string;
  /** Pagination marker from previous response */
  marker?: string;
  /** Transaction type filter */
  type?: 'subscribes' | 'chat_messages' | 'post' | 'stream' | 'tips';
  /** Tips source filter (when type=tips) */
  tipsSource?: 'chat' | 'post_all' | 'profile' | 'story' | 'stream';
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

export interface AccessAnalyticsMassMessagesGetChartParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Include total count in response */
  withTotal?: boolean;
}

export interface AccessAnalyticsMassMessagesGetPurchasedParams {
  /** Number of items to return (1-100, default: 20) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
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

export interface AccessChatsListMessagesParams {
  /** userId */
  userId: string;
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Search/filter text */
  query?: string;
  /** ID of the last message from previous page. Used for cursor pagination. */
  id?: string;
  /** Include this message ID as the first message in the results. Used to retrieve messages from e.g. the Search Chat Messages endpoint IDs. */
  firstId?: string;
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

export interface AccessEarningsListChargebacksParams {
  /** Start of date range (ISO 8601) */
  startDate?: string | any;
  /** End of date range (ISO 8601) */
  endDate?: string | any;
  /** Pagination marker from previous response */
  marker?: string;
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

export interface AccessPromotionsTrackingLinksListClaimersParams {
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

export interface AccessPromotionsCreateStopParams {
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

export interface AccessSubscribersListParams {
  /** Search/filter text */
  query?: string;
  /** Advanced filters */
  filter?: {
  'duration'?: string;
  'online'?: '0' | '1' | 'true' | 'false';
  'promoId'?: string;
  'tips'?: string;
  'total_spent'?: string;
  'trial_id'?: string;
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

export interface AccessSubscribersSetCustomNameParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Request body */
  body?: AccessSubscribersSetCustomNameRequest;
}

export interface AccessSubscribersSetDiscountParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Request body */
  body?: AccessSubscribersSetDiscountRequest;
}

export interface AccessSubscribersSetNoteParams {
  /** User ID (numeric or username) */
  userId?: string;
  /** Request body */
  body?: AccessSubscribersSetNoteRequest;
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

export interface AccessUploadsReplaceParams {
  /** Upload session ID */
  mediaUploadId: string;
}

export interface AccessUploadsReplacePartsParams {
  /** Upload session ID from init */
  mediaUploadId: string;
  /** Part number for multipart upload (starts at 1) */
  partNumber: number;
}

export interface AccessUploadsCheckParams {
  /** Request body */
  body?: AccessUploadsCheckRequest;
}

export interface AccessUploadsCompleteParams {
  /** Request body */
  body?: AccessUploadsCompleteRequest;
}

export interface AccessUploadsInitParams {
  /** Request body */
  body?: AccessUploadsInitRequest;
}

export interface AccessUsersListsCreateParams {
  /** userId */
  userId: string;
  /** Request body */
  body?: AccessUsersListsCreateRequest;
}

export interface AccessUsersListsListParams {
  /** Number of items to return (1-100, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Search/filter text */
  query?: string;
}

export interface AccessUsersListsCreate2Params {
  /** Request body */
  body?: AccessUsersListsCreate2Request;
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

export interface AccessUsersRestrictParams {
  /** User ID (numeric or username) */
  userId?: string;
}

export interface AccessUsersRestrict2Params {
  /** User ID (numeric or username) */
  userId?: string;
}

export interface AccessUsersGetRestrictParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
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

export interface AccessListMassMessagesParams {
  /** Number of items to return (1-20, default: 10) */
  limit?: number;
  /** Number of items to skip (default: 0) */
  offset?: number;
  /** Filter by message status */
  type?: 'sent' | 'unsent' | 'scheduled';
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

export interface AccountConnectionsDeleteParams {
  /** connectionId */
  connectionId: string;
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

export interface AccountUpdateSettingsParams {
  /** Request body */
  body?: AccountUpdateSettingsRequest;
}

export interface DynamicRulesSignParams {
  /** Request body */
  body?: DynamicRulesSignRequest;
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

class AccessAnalyticsEarningsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Chargebacks
     */
    listChargebacks(params: AccessAnalyticsEarningsListChargebacksParams): Promise<AccessAnalyticsEarningsListChargebacksResponse> {
      return request<AccessAnalyticsEarningsListChargebacksResponse>(this._config, {
        path: '/v2/access/analytics/earnings/chargebacks',
        method: 'GET',
        query: {
          'startDate': params.startDate,
          'endDate': params.endDate,
          'marker': params.marker,
        },
      });
    }
	
	    /**
	     * Chargebacks
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateChargebacks(params: Omit<AccessAnalyticsEarningsListChargebacksParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessAnalyticsEarningsListChargebacksItem, void, unknown> {
      let marker: string | undefined;
      let fetched = 0;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listChargebacks({
          ...params,
          marker,
        } as AccessAnalyticsEarningsListChargebacksParams);
        
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
     * Earnings chart
     */
    getChart(params: AccessAnalyticsEarningsGetChartParams): Promise<AccessAnalyticsEarningsGetChartResponse> {
      return request<AccessAnalyticsEarningsGetChartResponse>(this._config, {
        path: '/v2/access/analytics/earnings/chart',
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
     * Transactions
     */
    listTransactions(params: AccessAnalyticsEarningsListTransactionsParams): Promise<AccessAnalyticsEarningsListTransactionsResponse> {
      return request<AccessAnalyticsEarningsListTransactionsResponse>(this._config, {
        path: '/v2/access/analytics/earnings/transactions',
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
	     * Transactions
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateTransactions(params: Omit<AccessAnalyticsEarningsListTransactionsParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessAnalyticsEarningsListTransactionsItem, void, unknown> {
      let marker: string | undefined;
      let fetched = 0;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listTransactions({
          ...params,
          marker,
        } as AccessAnalyticsEarningsListTransactionsParams);
        
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

class AccessAnalyticsMassMessagesNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
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

  readonly campaigns: AccessAnalyticsCampaignsNamespace;
  readonly earnings: AccessAnalyticsEarningsNamespace;
  readonly massMessages: AccessAnalyticsMassMessagesNamespace;
  readonly posts: AccessAnalyticsPostsNamespace;
  readonly promotions: AccessAnalyticsPromotionsNamespace;
  readonly stories: AccessAnalyticsStoriesNamespace;
  readonly streams: AccessAnalyticsStreamsNamespace;
  readonly trials: AccessAnalyticsTrialsNamespace;
  readonly visitorCountries: AccessAnalyticsVisitorCountriesNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.campaigns = new AccessAnalyticsCampaignsNamespace(config);
    this.earnings = new AccessAnalyticsEarningsNamespace(config);
    this.massMessages = new AccessAnalyticsMassMessagesNamespace(config);
    this.posts = new AccessAnalyticsPostsNamespace(config);
    this.promotions = new AccessAnalyticsPromotionsNamespace(config);
    this.stories = new AccessAnalyticsStoriesNamespace(config);
    this.streams = new AccessAnalyticsStreamsNamespace(config);
    this.trials = new AccessAnalyticsTrialsNamespace(config);
    this.visitorCountries = new AccessAnalyticsVisitorCountriesNamespace(config);
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
          'id': params.id,
          'first_id': params.firstId,
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
}

class AccessEarningsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
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
     * Get tracking link claimers
     */
    listClaimers(params: AccessPromotionsTrackingLinksListClaimersParams): Promise<AccessPromotionsTrackingLinksListClaimersResponse> {
      return request<AccessPromotionsTrackingLinksListClaimersResponse>(this._config, {
        path: `/v2/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}/claimers`,
        method: 'GET',
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
     * Stop promotion
     */
    createStop(params: AccessPromotionsCreateStopParams): Promise<AccessPromotionsCreateStopResponse> {
      return request<AccessPromotionsCreateStopResponse>(this._config, {
        path: `/v2/access/promotions/${encodeURIComponent(String(params.promotionId))}/stop`,
        method: 'POST',
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
     * Set custom name for subscriber
     */
    setCustomName(params: AccessSubscribersSetCustomNameParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/subscribers/${encodeURIComponent(String(params.userId))}/custom-name`,
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
     * Update subscriber note
     */
    setNote(params: AccessSubscribersSetNoteParams): Promise<Record<string, any>> {
      return request<Record<string, any>>(this._config, {
        path: `/v2/access/subscribers/${encodeURIComponent(String(params.userId))}/note`,
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

    /**
     * Get subscription counts
     */
    getCount(): Promise<AccessSubscriptionsGetCountResponse> {
      return request<AccessSubscriptionsGetCountResponse>(this._config, {
        path: '/v2/access/subscriptions/count',
        method: 'GET',
      });
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
     * Upload chunk to managed media upload
     */
    replaceParts(params: AccessUploadsReplacePartsParams): Promise<AccessUploadsReplacePartsResponse> {
      return request<AccessUploadsReplacePartsResponse>(this._config, {
        path: `/v2/access/uploads/${encodeURIComponent(String(params.mediaUploadId))}/parts/${encodeURIComponent(String(params.partNumber))}`,
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
     * Finalize media upload
     */
    complete(params: AccessUploadsCompleteParams): Promise<AccessUploadsCompleteResponse> {
      return request<AccessUploadsCompleteResponse>(this._config, {
        path: '/v2/access/uploads/complete',
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
}

class AccessUsersListsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
  }

    /**
     * Add user to multiple lists
     */
    create(params: AccessUsersListsCreateParams): Promise<AccessUsersListsCreateResponse> {
      return request<AccessUsersListsCreateResponse>(this._config, {
        path: `/v2/access/users/${encodeURIComponent(String(params.userId))}/lists`,
        method: 'POST',
        body: params.body,
      });
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
    create2(params: AccessUsersListsCreate2Params): Promise<AccessUsersListsCreate2Response> {
      return request<AccessUsersListsCreate2Response>(this._config, {
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

class AccessNamespace {
  private _config: OFAuthConfig;

  readonly analytics: AccessAnalyticsNamespace;
  readonly chats: AccessChatsNamespace;
  readonly earnings: AccessEarningsNamespace;
  readonly promotions: AccessPromotionsNamespace;
  readonly self: AccessSelfNamespace;
  readonly subscribers: AccessSubscribersNamespace;
  readonly subscriptions: AccessSubscriptionsNamespace;
  readonly uploads: AccessUploadsNamespace;
  readonly users: AccessUsersNamespace;
  readonly vault: AccessVaultNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.analytics = new AccessAnalyticsNamespace(config);
    this.chats = new AccessChatsNamespace(config);
    this.earnings = new AccessEarningsNamespace(config);
    this.promotions = new AccessPromotionsNamespace(config);
    this.self = new AccessSelfNamespace(config);
    this.subscribers = new AccessSubscribersNamespace(config);
    this.subscriptions = new AccessSubscriptionsNamespace(config);
    this.uploads = new AccessUploadsNamespace(config);
    this.users = new AccessUsersNamespace(config);
    this.vault = new AccessVaultNamespace(config);
  }

    /**
     * List mass messages
     */
    listMassMessages(params: AccessListMassMessagesParams): Promise<AccessListMassMessagesResponse> {
      return request<AccessListMassMessagesResponse>(this._config, {
        path: '/v2/access/mass-messages',
        method: 'GET',
        query: {
          'limit': params.limit,
          'offset': params.offset,
          'type': params.type,
        },
      });
    }
	
	    /**
	     * List mass messages
     * 
     * Returns an async iterator that automatically paginates through all results.
     */
    async *iterateMassMessages(params: Omit<AccessListMassMessagesParams, 'limit' | 'offset' | 'marker'> & PaginationOptions): AsyncGenerator<AccessListMassMessagesItem, void, unknown> {
      let offset = 0;
      let fetched = 0;
      const limit = params?.pageSize ?? 20;
      const maxItems = params?.maxItems ?? Infinity;
      
      while (fetched < maxItems) {
        const response = await this.listMassMessages({
          ...params,
          limit: Math.min(limit, maxItems - fetched),
          offset,
        } as AccessListMassMessagesParams);
        
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
}

class AccountConnectionsNamespace {
  private _config: OFAuthConfig;

  constructor(config: OFAuthConfig) {
    this._config = config;
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
     * Disconnect connection
     */
    delete(params: AccountConnectionsDeleteParams): Promise<unknown> {
      return request<unknown>(this._config, {
        path: `/v2/account/connections/${encodeURIComponent(String(params.connectionId))}`,
        method: 'DELETE',
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
}

class AccountNamespace {
  private _config: OFAuthConfig;

  readonly connections: AccountConnectionsNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.connections = new AccountConnectionsNamespace(config);
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

    /**
     * Whoami
     */
    whoami(): Promise<AccountWhoamiResponse> {
      return request<AccountWhoamiResponse>(this._config, {
        path: '/v2/account/whoami',
        method: 'GET',
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
     * Get organization vault stats
     */
    getStats(): Promise<VaultPlusStoreGetStatsResponse> {
      return request<VaultPlusStoreGetStatsResponse>(this._config, {
        path: '/v2/vault-plus/store/stats',
        method: 'GET',
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

  readonly access: AccessNamespace;
  readonly account: AccountNamespace;
  readonly dynamicRules: DynamicRulesNamespace;
  readonly link: LinkNamespace;
  readonly vaultPlus: VaultPlusNamespace;

  constructor(config: OFAuthConfig) {
    this._config = config;
    this.access = new AccessNamespace(config);
    this.account = new AccountNamespace(config);
    this.dynamicRules = new DynamicRulesNamespace(config);
    this.link = new LinkNamespace(config);
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
