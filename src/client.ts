/* eslint-disable */
/**
 * OFAuth V3 API client. Generated from the OpenAPI spec; do not edit.
 */

import { DEFAULT_API_URL, OFAuthError, paginate, rejectBrowserAccessToken, request } from './runtime';
import type { OFAuthConfig, PaginationOptions, RequestOptions } from './runtime';
import { ClientRealtimeConnection, realtimeUrlFor } from './realtime-connection';
import type { CreateRealtimeStreamUrlParams, RealtimeClient, RealtimeConnection, RealtimeOptions, RealtimeStreamUrl } from './realtime';
import { uploadMedia } from './uploads';
import type { UploadMediaOptions, UploadMediaResult } from './uploads';
import type {
  AccessError400,
  AccessError401,
  AccessError403,
  AccessError404,
  AccessError409,
  AccessError429,
  AccessError503,
  AccessHandlerError,
  AvatarThumbs,
  Bundle,
  Chargeback,
  ChargebackPage,
  ChargebackPayment,
  ChartPoint,
  Chat,
  ChatPage,
  ChatUser,
  ChatUserRef,
  ContentStats,
  CursorPage,
  EarningsChart,
  EarningsChartSection,
  LifecycleAuthorizationGrantedData,
  LifecycleAuthorizationGrantedEnvelope,
  LifecycleAuthorizationRevokedData,
  LifecycleAuthorizationRevokedEnvelope,
  LifecycleAuthorizationUpdatedData,
  LifecycleAuthorizationUpdatedEnvelope,
  LifecycleLinkedAccountDisconnectedData,
  LifecycleLinkedAccountDisconnectedEnvelope,
  LifecycleLinkedAccountExpiredData,
  LifecycleLinkedAccountExpiredEnvelope,
  LifecycleLinkedAccountReconnectedData,
  LifecycleLinkedAccountReconnectedEnvelope,
  LifecycleWebhookEventEnvelope,
  LinkAuthorization,
  LinkAuthorizationError,
  LinkAuthorizationServerMetadata,
  LinkOAuthError,
  LinkRuntimeError,
  LinkTokenResponse,
  LinkUserInfo,
  LinkedAccount,
  LinkedAccountReconnectError400,
  LinkedAccountReconnectError409,
  LinkedAccountReconnectJourney,
  LinkedAccountReconnectRequest,
  LinkedAccountSettings,
  LinkedAccountSettingsUpdate,
  LinkedAccountSettingsUpdateError403,
  LinkedAccountSettingsUpdateError409,
  LinkedAccountsError400,
  LinkedAccountsError401,
  LinkedAccountsError403,
  LinkedAccountsError404,
  LinkedAccountsError429,
  LinkedAccountsError503,
  LinkedAccountsPage,
  MassMessageDetails,
  MassMessageRequest,
  MediaAsset,
  MediaAssetSize,
  MediaType,
  Message,
  MessageContent,
  MessagePage,
  Post,
  PostAuthor,
  PostPage,
  PostRequest,
  Promotion,
  PromotionPage,
  QueueItem,
  QueueItemEntity,
  QueueItemList,
  QueuedMassMessage,
  RealtimeChatMessageLikedData,
  RealtimeChatMessageLikedEnvelope,
  RealtimeChatMessageReceivedData,
  RealtimeChatMessageReceivedEnvelope,
  RealtimeChatMessageUnlikedData,
  RealtimeChatMessageUnlikedEnvelope,
  RealtimeChatTypingUpdatedData,
  RealtimeChatTypingUpdatedEnvelope,
  RealtimeInboxCountsUpdatedData,
  RealtimeInboxCountsUpdatedEnvelope,
  RealtimePostFundraisingUpdatedData,
  RealtimePostFundraisingUpdatedEnvelope,
  RealtimePostPublishedData,
  RealtimePostPublishedEnvelope,
  RealtimeStoriesUpdatedData,
  RealtimeStoriesUpdatedEnvelope,
  RealtimeSystemMessageReceivedData,
  RealtimeSystemMessageReceivedEnvelope,
  RealtimeSystemMessagesUpdatedData,
  RealtimeSystemMessagesUpdatedEnvelope,
  RealtimeToastsReceivedData,
  RealtimeToastsReceivedEnvelope,
  RealtimeWebhookEventEnvelope,
  ReleaseForm,
  ReleaseFormSelection,
  ReleaseFormUser,
  RequestValidationError,
  RuntimeError,
  Story,
  StoryHighlight,
  StoryUser,
  StoryViewer,
  StoryViewerPage,
  Subscriber,
  SubscriberPage,
  SubscriberSpending,
  SubscriberSubscription,
  SubscriptionHistoryItem,
  TopCampaign,
  TopPost,
  TopPromotion,
  TopStory,
  TopStream,
  TopTrialLink,
  TrackingLink,
  Transaction,
  TransactionAmounts,
  TransactionPage,
  TransactionUser,
  TrialLink,
  TrialLinkPage,
  UploadInitResponse,
  UserCapabilities,
  UserListReference,
  UserSummary,
  VaultList,
  VaultMediaItem,
  VaultMediaListReference,
  VaultMediaPage,
  VaultPlusBatchMediaRequest,
  VaultPlusConnectionMediaDeleteResult,
  VaultPlusConnectionStatus,
  VaultPlusError401,
  VaultPlusError403,
  VaultPlusError404,
  VaultPlusError429,
  VaultPlusError502,
  VaultPlusError503,
  VaultPlusIntegrationStats,
  VaultPlusListAddResult,
  VaultPlusListMediaItem,
  VaultPlusListSummary,
  VaultPlusListSyncResult,
  VaultPlusMediaDeleteResult,
  VaultPlusMediaItem,
  VaultPlusMediaList,
  VaultPlusMediaVariant,
} from './models';

// Operation params, bodies, and responses
export type AccessAnalyticsMassMessagesListBuyersResponse = {
  items: Array<{
    avatar: string | null;
    avatarThumbs?: Record<string, string> | null;
    displayName?: string | null;
    id: number;
    isVerified: boolean;
    name: string;
    username: string;
  }>;
  page: CursorPage;
};

export interface AccessAnalyticsMassMessagesListBuyersParams {
  /**
   * Mass message ID
   */
  massMessageId: string | number;
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsMassMessagesListBuyersItem = NonNullable<AccessAnalyticsMassMessagesListBuyersResponse["items"]>[number];

export type AccessAnalyticsMassMessagesListSentResponse = {
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
    media: Array<MediaAsset>;
    mediaCount?: number;
    previews: Array<MediaAsset | number>;
    price?: string;
    purchasedCount?: number;
    rawText?: string;
    releaseForms?: Array<ReleaseForm>;
    responseType?: string;
    sentCount?: number;
    template?: string;
    text: string;
    unsendSeconds?: number;
    viewedCount?: number;
  }>;
  page: CursorPage;
};

export interface AccessAnalyticsMassMessagesListSentParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Pagination cursor from the previous response. For this endpoint, the cursor is the oldest returned item date and maps to upstream endDate.
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsMassMessagesListSentItem = NonNullable<AccessAnalyticsMassMessagesListSentResponse["items"]>[number];

export type AccessAnalyticsPostsRankingsListViewsResponse = {
  items: Array<TopPost>;
};

export interface AccessAnalyticsPostsRankingsListViewsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsPostsGetResponse = {
  commentChart: Array<{
    count: number;
    date: string;
  }>;
  commentCount: number;
  hasAudio: boolean;
  hasStats: boolean;
  hasVideo: boolean;
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
  videoPlayCount: number;
  videoPlayDuration: number;
  videoPlayDurationAverage: number;
};

export interface AccessAnalyticsPostsGetParams {
  /**
   * OnlyFans post ID
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsPostsListTopResponse = {
  items: Array<TopPost>;
};

export interface AccessAnalyticsPostsListTopParams {
  /**
   * Metric to rank by
   */
  by?: "purchases" | "tips" | "views" | "likes" | "comments";
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileMessagesListDirectResponse = {
  items: Array<{
    date?: string;
    id?: number;
    media?: Array<MediaAsset>;
    previews?: Array<MediaAsset | number>;
  }>;
  page: CursorPage;
};

export interface AccessAnalyticsProfileMessagesListDirectParams {
  /**
   * Start of the date window. Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: string;
  /**
   * End of the date window. Move this backward to request an older analytics window.
   */
  endDate?: string;
  /**
   * Pagination cursor from the previous response. For this endpoint, the cursor is the oldest returned item date and maps to upstream endDate.
   */
  cursor?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileMessagesListDirectItem = NonNullable<AccessAnalyticsProfileMessagesListDirectResponse["items"]>[number];

export type AccessAnalyticsProfileTopGetFansResponse = Record<string, UserSummary | null>;

export interface AccessAnalyticsProfileTopGetFansParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileTopGetMessagesResponse = {
  purchases: {
    canSendMessageToBuyers: boolean;
    canUnsend: boolean;
    date: string;
    giphyId: unknown;
    id: number;
    isCanceled: boolean;
    isFree: boolean;
    isMediaReady: boolean;
    isReportedByMe: boolean;
    isTip: boolean;
    media: Array<MediaAsset>;
    mediaCount: number;
    previews: Array<number>;
    price: string;
    purchasedCount: number;
    rawText: string;
    responseType: string;
    sentCount: number;
    template: string;
    text: string;
    unsendSeconds: number;
    viewedCount: number;
  };
};

export interface AccessAnalyticsProfileTopGetMessagesParams {
  /**
   * Start of the date window. Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: string;
  /**
   * End of the date window. Move this backward to request an older analytics window.
   */
  endDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileTopGetPostsResponse = Record<string, {
  author?: PostAuthor;
  media?: Array<MediaAsset>;
  releaseForms?: Array<ReleaseForm>;
} | null>;

export interface AccessAnalyticsProfileTopGetPostsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileTopGetStoriesResponse = Record<string, {
  media?: Array<MediaAsset>;
  post?: {
    author?: PostAuthor;
  };
  releaseForms?: Array<ReleaseForm>;
  user?: StoryUser;
  viewers?: Array<StoryViewer>;
} | null>;

export interface AccessAnalyticsProfileTopGetStoriesParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileTopGetStreamsResponse = {
  comments: unknown;
  likes: unknown;
  purchases: unknown;
  tips: unknown;
  views: unknown;
};

export interface AccessAnalyticsProfileTopGetStreamsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileViewsGetQrResponse = {
  count: number;
};

export interface AccessAnalyticsProfileViewsGetQrParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileGetOverviewResponse = {
  earning: {
    gross: number;
    total: number;
  };
  massMessages: {
    chartData: Array<{
      count: number;
      date: string;
    }>;
    count: {
      delta: number;
      total: number;
    };
    earnings: {
      delta: number;
      gross: number;
      total: number;
    };
    hasStatistic: boolean;
    views: {
      delta: number;
      total: number;
    };
  };
  posts: {
    chartData: Array<{
      count: number;
      date: string;
    }>;
    count: {
      total: number;
    };
    earnings: {
      gross: number;
      total: number;
    };
    hasStatistic: boolean;
    views: {
      total: number;
    };
  };
  streams: {
    chartData: Array<{
      count: number;
      date: string;
    }>;
    count: {
      total: string;
    };
    earnings: {
      gross: number;
      total: number;
    };
    hasStatistic: boolean;
    views: {
      total: number;
    };
  };
  visitors: {
    chartData: Array<{
      count: number;
      date: string;
    }>;
    earnings: {
      gross: number;
      total: number;
    };
    hasStatistic: boolean;
    subscriptions: {
      new: {
        total: number;
      };
      renew: {
        total: number;
      };
    };
    visitors: {
      total: number;
    };
  };
};

export interface AccessAnalyticsProfileGetOverviewParams {
  /**
   * Start of the date window. Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: string;
  /**
   * End of the date window. Move this backward to request an older analytics window.
   */
  endDate?: string;
  /**
   * Overview grouping key. Downloaded source passes UI state through; observed values include messages, trials, and fans, but the set is not source-proven closed.
   */
  by?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsProfileGetTodayActivityResponse = {
  chats: number;
  posts: number;
  stories: number;
  streams: number;
};

export interface AccessAnalyticsProfileGetTodayActivityParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsPromotionsListTopResponse = {
  items: Array<TopPromotion>;
};

export interface AccessAnalyticsPromotionsListTopParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsStoriesListTopResponse = {
  items: Array<TopStory>;
};

export interface AccessAnalyticsStoriesListTopParams {
  /**
   * Metric to rank by
   */
  by?: "tips" | "views";
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsStreamsListTopResponse = {
  items: Array<TopStream>;
};

export interface AccessAnalyticsStreamsListTopParams {
  /**
   * Metric to rank by
   */
  by?: "purchases" | "duration" | "tips" | "views" | "likes" | "comments";
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementMessagesGetResponse = {
  direct_messages: {
    chart: Array<ChartPoint>;
    delta: number;
    gross?: number;
    total: number;
  };
  direct_messages_purchases: {
    chart: Array<ChartPoint>;
    delta: number;
    gross?: number;
    total: number;
  };
  group_messages: {
    chart: Array<ChartPoint>;
    delta: number;
    gross?: number;
    total: number;
  };
  group_messages_purchases: {
    chart: Array<ChartPoint>;
    delta: number;
    gross?: number;
    total: number;
  };
};

export interface AccessAnalyticsTimeseriesEngagementMessagesGetParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementMessagesGetDirectPurchasesResponse = {
  group_messages: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    delta: number;
    total: number;
  };
  group_messages_purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    delta: number;
    total: number;
  };
  messages: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementMessagesGetDirectPurchasesParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementMessagesGetSentResponse = {
  group_messages: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    delta: number;
    total: number;
  };
  group_messages_purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    delta: number;
    total: number;
  };
  messages: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementMessagesGetSentParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementPostsGetResponse = {
  comments: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  likes: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  posts: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  tips: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  views: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementPostsGetParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Metric to chart
   */
  by?: "purchases" | "posts" | "tips" | "views" | "likes" | "comments";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementPostsGetCountResponse = {
  comments: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  likes: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  posts: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  tips: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  views: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementPostsGetCountParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementPostsGetViewsResponse = {
  comments: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  likes: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  posts: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  tips: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  views: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementPostsGetViewsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementGetStoriesResponse = {
  stories: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  tips: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementGetStoriesParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Metric to chart
   */
  by?: "tips" | "stories" | "views" | "likes" | "comments";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesEngagementGetStreamsResponse = {
  duration: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
  purchases: {
    chart: Array<{
      count: number;
      date: string;
    }>;
  };
};

export interface AccessAnalyticsTimeseriesEngagementGetStreamsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total count in response
   */
  withTotal?: boolean;
  /**
   * Metric to chart
   */
  by?: "purchases" | "duration" | "tips" | "views" | "likes" | "comments";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesGetPromotionsResponse = {
  claims: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    total: number;
  };
  offers: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    total: number;
  };
};

export interface AccessAnalyticsTimeseriesGetPromotionsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesGetSubscribersResponse = {
  delta: number;
  earnings: Array<{
    count: number;
    date: string;
  }>;
  subscribers: number;
  subscribes: Array<{
    count: number;
    date: string;
  }>;
  total: number;
};

export interface AccessAnalyticsTimeseriesGetSubscribersParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesGetTrackingLinksResponse = {
  claims: Array<{
    count: number;
    date: string;
  }>;
  clicks: Array<{
    count: number;
    date: string;
  }>;
  delta: number;
  total: number;
};

export interface AccessAnalyticsTimeseriesGetTrackingLinksParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesGetTrialLinksResponse = {
  claims: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    total: number;
  };
  offers: {
    chart: Array<{
      count: number;
      date: string;
    }>;
    total: number;
  };
};

export interface AccessAnalyticsTimeseriesGetTrialLinksParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTimeseriesGetVisitorCountriesResponse = {
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
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  topDomains: {
    hasMore: boolean;
    rows: Array<{
      domain: string;
      rank: number;
      viewsCount: {
        guests: number;
        subscribers: number;
        total: number;
        users: number;
      };
    }>;
    totals: {
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  topDurationUsers: {
    totals: {
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  total: {
    current: string;
    delta: number;
  };
};

export interface AccessAnalyticsTimeseriesGetVisitorCountriesParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Visitor metric to chart
   */
  by?: "guests" | "total" | "users";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTrackingLinksListRankingsResponse = {
  items: Array<TopCampaign>;
};

export interface AccessAnalyticsTrackingLinksListRankingsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTrafficCountriesRankingsGetTotalResponse = {
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
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  topDomains: {
    hasMore: boolean;
    rows: Array<{
      domain: string;
      rank: number;
      viewsCount: {
        guests: number;
        subscribers: number;
        total: number;
        users: number;
      };
    }>;
    totals: {
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  topDurationUsers: {
    totals: {
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  total: {
    current: string;
    delta: number;
  };
};

export interface AccessAnalyticsTrafficCountriesRankingsGetTotalParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsTrialLinksListTopResponse = {
  items: Array<TopTrialLink>;
};

export interface AccessAnalyticsTrialLinksListTopParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessAnalyticsVisitorCountriesGetTopResponse = {
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
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  topDomains: {
    hasMore: boolean;
    rows: Array<{
      domain: string;
      rank: number;
      viewsCount: {
        guests: number;
        subscribers: number;
        total: number;
        users: number;
      };
    }>;
    totals: {
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  topDurationUsers: {
    totals: {
      guests: number;
      subscribers: number;
      total: number;
      users: number;
    };
  };
  total: {
    current: string;
    delta: number;
  };
};

export interface AccessAnalyticsVisitorCountriesGetTopParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Visitor metric to rank by
   */
  by?: "guests" | "total" | "users";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMassMessagesCreateResponse = {
  canUnsend?: boolean;
  date: string;
  hasError?: boolean;
  /**
   * Mass message queue ID. This is the same value as `id` returned by `POST /chats/mass-messages`, `:massMessageId` in `/chats/mass-messages/:massMessageId` and `/analytics/mass-messages/:massMessageId/buyers`, and `:queueMessageId` in `/queue/messages/:queueMessageId`. It is not the `scheduleId` (`QueueItem.id`) used by `/queue/schedules`.
   */
  id: number;
  isCanceled?: boolean;
  isCouplePeopleMedia?: boolean;
  isDone?: boolean;
  isReady?: boolean;
  pending?: number;
  total?: number;
  unsendSeconds?: number;
};

export type AccessChatsMassMessagesCreateBody = MassMessageRequest;

export interface AccessChatsMassMessagesCreateParams {
  /**
   * Request body
   */
  body: AccessChatsMassMessagesCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMassMessagesGetResponse = MassMessageDetails;

export interface AccessChatsMassMessagesGetParams {
  /**
   * Mass message queue ID: the `id` returned by `POST /chats/mass-messages` (same value as `queueMessageId`).
   */
  massMessageId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMassMessagesUpdateResponse = {
  canUnsend: boolean;
  date: string;
  hasError: boolean;
  id: number;
  isCanceled: boolean;
  isCouplePeopleMedia: boolean;
  isDone: boolean;
  isReady: boolean;
  pending: number;
  total: number;
  unsendSeconds: number;
};

export type AccessChatsMassMessagesUpdateBody = MassMessageRequest;

export interface AccessChatsMassMessagesUpdateParams {
  /**
   * massMessageId
   */
  massMessageId: string | number;
  /**
   * Request body
   */
  body: AccessChatsMassMessagesUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMediaListResponse = MessagePage;

export interface AccessChatsMediaListParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Number of items to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Filter by opened status
   */
  opened?: "0" | "1" | "true" | "false";
  /**
   * Filter by sender user ID
   */
  senderUserId?: string | null;
  /**
   * Filter by purchase state
   */
  purchased?: number | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMediaListItem = NonNullable<AccessChatsMediaListResponse["items"]>[number];

export type AccessChatsMediaListAudiosResponse = MessagePage;

export interface AccessChatsMediaListAudiosParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Number of items to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMediaListAudiosItem = NonNullable<AccessChatsMediaListAudiosResponse["items"]>[number];

export type AccessChatsMediaListPhotosResponse = MessagePage;

export interface AccessChatsMediaListPhotosParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Number of items to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMediaListPhotosItem = NonNullable<AccessChatsMediaListPhotosResponse["items"]>[number];

export type AccessChatsMediaListVideosResponse = MessagePage;

export interface AccessChatsMediaListVideosParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Number of items to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMediaListVideosItem = NonNullable<AccessChatsMediaListVideosResponse["items"]>[number];

export type AccessChatsMessagesTemplatesDeleteReplyOnSubscribeResponse = {
  success: boolean;
};

export interface AccessChatsMessagesTemplatesDeleteReplyOnSubscribeParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesTemplatesListResponse = {
  items: Array<{
    createdAt?: string | null;
    displayText?: string | null;
    giphyId?: unknown | null;
    id?: string | null;
    isActive?: boolean | null;
    isCouplePeopleMedia?: boolean | null;
    isMarkdownDisabled?: boolean | null;
    isMediaReady?: boolean | null;
    lockedText?: boolean | null;
    media?: Array<MediaAsset>;
    mediaCount?: number | null;
    previews?: Array<number | null>;
    price?: number | null;
    releaseForms?: Array<unknown | null>;
    template?: "reply_on_subscribe" | null;
    text?: string | null;
  }>;
};

export interface AccessChatsMessagesTemplatesListParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesTemplatesSetReplyOnSubscribeResponse = {
  createdAt: string;
  displayText: string;
  giphyId: unknown;
  id: string;
  isActive: boolean;
  isCouplePeopleMedia: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  lockedText: boolean;
  media: Array<MediaAsset>;
  mediaCount: number;
  previews: Array<number>;
  price: number;
  releaseForms: Array<unknown>;
  template: string;
  text: string;
};

export type AccessChatsMessagesTemplatesSetReplyOnSubscribeBody = MessageContent;

export interface AccessChatsMessagesTemplatesSetReplyOnSubscribeParams {
  /**
   * Request body
   */
  body: AccessChatsMessagesTemplatesSetReplyOnSubscribeBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesLikeResponse = {
  isLiked: boolean;
  success: boolean;
};

export type AccessChatsMessagesLikeBody = {
  withUserId?: string | number;
};

export interface AccessChatsMessagesLikeParams {
  /**
   * messageId
   */
  messageId: string | number;
  /**
   * Request body
   */
  body: AccessChatsMessagesLikeBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesListResponse = MessagePage;

export interface AccessChatsMessagesListParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Number of messages to return (max 10)
   */
  limit?: number;
  /**
   * Message cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Message filter
   */
  filter?: "pinned";
  /**
   * Message sort order
   */
  order?: "desc";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesListItem = NonNullable<AccessChatsMessagesListResponse["items"]>[number];

export type AccessChatsMessagesPinForUserResponse = {
  success: boolean;
};

export interface AccessChatsMessagesPinForUserParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * messageId
   */
  messageId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesSendResponse = {
  canBePinned: boolean;
  canPurchase: boolean;
  canPurchaseReason: string;
  canReport: boolean;
  cancelSeconds: number;
  changedAt: string;
  createdAt: string;
  fromUser: {
    id: number;
  };
  giphyId: unknown;
  id: number;
  isCouplePeopleMedia: boolean;
  isFree: boolean;
  isFromQueue: boolean;
  isFundRaisingTip: boolean;
  isLiked: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isNew: boolean;
  isOpened: boolean;
  isPinned: boolean;
  isReportedByMe: boolean;
  isTip: boolean;
  lockedText: boolean;
  media: Array<MediaAsset>;
  mediaCount: number;
  previews: Array<number>;
  price: number;
  queueId: number;
  releaseForms: Array<unknown>;
  responseType: string;
  story?: null | {
    id: number;
    media: Array<MediaAsset>;
    question: unknown;
    userId: number;
  };
  text: string;
  tipAmount: null | number;
  tipText: string;
};

export type AccessChatsMessagesSendBody = MessageContent;

export interface AccessChatsMessagesSendParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Request body
   */
  body: AccessChatsMessagesSendBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesUnlikeResponse = {
  isLiked: boolean;
  success: boolean;
};

export type AccessChatsMessagesUnlikeBody = {
  withUserId?: string | number;
};

export interface AccessChatsMessagesUnlikeParams {
  /**
   * messageId
   */
  messageId: string | number;
  /**
   * Request body
   */
  body: AccessChatsMessagesUnlikeBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesUnpinAllResponse = {
  success: boolean;
};

export interface AccessChatsMessagesUnpinAllParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesUnpinForUserResponse = {
  success: boolean;
};

export interface AccessChatsMessagesUnpinForUserParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * messageId
   */
  messageId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMessagesUnsendResponse = {
  success: boolean;
};

export type AccessChatsMessagesUnsendBody = {
  withUserId: string | number;
};

export interface AccessChatsMessagesUnsendParams {
  /**
   * messageId
   */
  messageId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Request body
   */
  body: AccessChatsMessagesUnsendBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsDeleteResponse = {
  success: boolean;
};

export interface AccessChatsDeleteParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsHideResponse = {
  success: boolean;
};

export interface AccessChatsHideParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsListResponse = ChatPage;

export interface AccessChatsListParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Sort order: recent (newest first) or old (oldest first)
   */
  order?: "recent" | "old";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Only include chats from this user list.
   */
  listId?: number;
  /**
   * Return each chat's `user` and its `lastMessage.sender` with their profile (name, username, avatar, ...). Off by default: then OnlyFans returns users as `{ id }` references, as its web app reads chat lists.
   */
  includeUsers?: "true" | "false" | "1" | "0";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsListItem = NonNullable<AccessChatsListResponse["items"]>[number];

export type AccessChatsListPriorityResponse = ChatPage;

export interface AccessChatsListPriorityParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Sort order: recent (newest first) or old (oldest first)
   */
  order?: "recent" | "old";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Only include chats from this user list.
   */
  listId?: number;
  /**
   * Return each chat's `user` and its `lastMessage.sender` with their profile (name, username, avatar, ...). Off by default: then OnlyFans returns users as `{ id }` references, as its web app reads chat lists.
   */
  includeUsers?: "true" | "false" | "1" | "0";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsListPriorityItem = NonNullable<AccessChatsListPriorityResponse["items"]>[number];

export type AccessChatsListUnreadResponse = ChatPage;

export interface AccessChatsListUnreadParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Sort order: recent (newest first) or old (oldest first)
   */
  order?: "recent" | "old";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Only include chats from this user list.
   */
  listId?: number;
  /**
   * Return each chat's `user` and its `lastMessage.sender` with their profile (name, username, avatar, ...). Off by default: then OnlyFans returns users as `{ id }` references, as its web app reads chat lists.
   */
  includeUsers?: "true" | "false" | "1" | "0";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsListUnreadItem = NonNullable<AccessChatsListUnreadResponse["items"]>[number];

export type AccessChatsListWithTipsResponse = ChatPage;

export interface AccessChatsListWithTipsParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous page.
   */
  cursor?: string | null;
  /**
   * Sort order: recent (newest first) or old (oldest first)
   */
  order?: "recent" | "old";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Only include chats from this user list.
   */
  listId?: number;
  /**
   * Return each chat's `user` and its `lastMessage.sender` with their profile (name, username, avatar, ...). Off by default: then OnlyFans returns users as `{ id }` references, as its web app reads chat lists.
   */
  includeUsers?: "true" | "false" | "1" | "0";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsListWithTipsItem = NonNullable<AccessChatsListWithTipsResponse["items"]>[number];

export type AccessChatsMarkAllAsReadResponse = {
  success: boolean;
};

export interface AccessChatsMarkAllAsReadParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsMuteResponse = {
  success: boolean;
};

export interface AccessChatsMuteParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessChatsUnmuteResponse = {
  success: boolean;
};

export interface AccessChatsUnmuteParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Earnings type to chart
   */
  by?: "total" | "messages" | "tips" | "stream" | "post" | "subscribes" | "tips_profile" | "tips_post" | "tips_chat" | "tips_stream" | "tips_story" | "ref";
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetMessagesResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetMessagesParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetPostsResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetPostsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetProfileTipsResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetProfileTipsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetStreamsResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetStreamsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetSubscriptionsResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetSubscriptionsParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTimeseriesGetTotalResponse = EarningsChart;

export interface AccessFinancesEarningsTimeseriesGetTotalParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Include total in response
   */
  withTotal?: boolean;
  /**
   * Include monthly totals
   */
  monthlyTotal?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTransactionsListResponse = TransactionPage;

export interface AccessFinancesEarningsTransactionsListParams {
  /**
   * Number of transactions to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Start date for transactions
   */
  startDate?: string | null;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Transaction type filter
   */
  type?: "subscribes" | "chat_messages" | "post" | "stream" | "tips";
  /**
   * Tips source filter (when type=tips)
   */
  tipsSource?: "chat" | "post_all" | "profile" | "story" | "stream";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTransactionsListItem = NonNullable<AccessFinancesEarningsTransactionsListResponse["items"]>[number];

export type AccessFinancesEarningsTransactionsListMessagesResponse = TransactionPage;

export interface AccessFinancesEarningsTransactionsListMessagesParams {
  /**
   * Number of transactions to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Start date for transactions
   */
  startDate?: string | null;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTransactionsListMessagesItem = NonNullable<AccessFinancesEarningsTransactionsListMessagesResponse["items"]>[number];

export type AccessFinancesEarningsTransactionsListTipsResponse = TransactionPage;

export interface AccessFinancesEarningsTransactionsListTipsParams {
  /**
   * Number of transactions to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Start date for transactions
   */
  startDate?: string | null;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Tips source filter (when type=tips)
   */
  tipsSource?: "chat" | "post_all" | "profile" | "story" | "stream";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsTransactionsListTipsItem = NonNullable<AccessFinancesEarningsTransactionsListTipsResponse["items"]>[number];

export type AccessFinancesEarningsListChargebacksResponse = ChargebackPage;

export interface AccessFinancesEarningsListChargebacksParams {
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Number of chargebacks to return
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesEarningsListChargebacksItem = NonNullable<AccessFinancesEarningsListChargebacksResponse["items"]>[number];

export type AccessFinancesPayoutsChargebacksGetRatioResponse = {
  chargebacksRatio: number;
};

export interface AccessFinancesPayoutsChargebacksGetRatioParams {
  startDate?: string;
  endDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesPayoutsGetBalancesResponse = {
  currency: string;
  manualPayoutPendingDays: number;
  maxPayoutSumm: number;
  minPayoutSumm: number;
  payoutAvailable: number;
  payoutPending: number;
  withdrawalPeriod: string;
  withdrawalPeriodOptions: Array<{
    code: string;
    name: string;
  }>;
};

export interface AccessFinancesPayoutsGetBalancesParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesPayoutsGetCheckReceiveResponse = {
  canReceiveManualPayout: boolean;
  isVerifiedReason: boolean;
  needUpdateBanking: boolean;
};

export interface AccessFinancesPayoutsGetCheckReceiveParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesPayoutsListRequestsResponse = {
  items: Array<{
    amount?: number | null;
    createdAt?: string | null;
    currency?: string | null;
    invoiceId?: string | null;
    rejectReason?: unknown | null;
    state?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessFinancesPayoutsListRequestsParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string;
  startDate?: string;
  endDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesPayoutsListRequestsItem = NonNullable<AccessFinancesPayoutsListRequestsResponse["items"]>[number];

export type AccessFinancesPayoutsListStatsResponse = {
  list: {
    months: Record<string, {
      chat_messages: Array<{
        gross: number;
        net: number;
        time: number;
      }>;
      subscribes: Array<{
        gross: number;
        net: number;
        time: number;
      }>;
      tips: Array<{
        gross: number;
        net: number;
        time: number;
      }>;
      total_gross: number;
      total_net: number;
    }>;
    total: {
      all: {
        total_gross: number;
        total_net: number;
      };
      chat_messages: {
        total_gross: number;
        total_net: number;
      };
      subscribes: {
        total_gross: number;
        total_net: number;
      };
      tips: {
        total_gross: number;
        total_net: number;
      };
    };
  };
};

export interface AccessFinancesPayoutsListStatsParams {
  startDate?: string;
  endDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesReferralsGetBalanceResponse = {
  referralEarnings: number;
};

export interface AccessFinancesReferralsGetBalanceParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesReferralsListResponse = {
  items: Array<Record<string, unknown>>;
  page: CursorPage;
};

export interface AccessFinancesReferralsListParams {
  startDate?: string;
  endDate?: string;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string;
  onlyPerformers?: boolean | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesReferralsListItem = NonNullable<AccessFinancesReferralsListResponse["items"]>[number];

export type AccessFinancesReferralsListPayoutRequestsResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessFinancesReferralsListPayoutRequestsParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string;
  startDate?: string;
  endDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesReferralsListPayoutRequestsItem = NonNullable<AccessFinancesReferralsListPayoutRequestsResponse["items"]>[number];

export type AccessFinancesReferralsListTimeseriesResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessFinancesReferralsListTimeseriesParams {
  startDate?: string;
  endDate?: string;
  /**
   * Boolean value (true/false, 1/0)
   */
  withTotal?: boolean;
  /**
   * Boolean value (true/false, 1/0)
   */
  withChart?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessFinancesTimeseriesListChargebacksResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessFinancesTimeseriesListChargebacksParams {
  startDate?: string;
  endDate?: string;
  /**
   * Boolean value (true/false, 1/0)
   */
  withTotal?: boolean;
  /**
   * Boolean value (true/false, 1/0)
   */
  withChart?: boolean;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersAddResponse = {
  list: {
    canAddUsers: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canPinnedToChat: boolean;
    canPinnedToFeed: boolean;
    canUpdate: boolean;
    direction: string;
    id: string;
    isPinnedToChat: boolean;
    isPinnedToFeed: boolean;
    name: string;
    order: string;
    postsCount: number;
    sortList: Array<unknown>;
    type: string;
    users: Array<{
      avatar: null | string;
      avatarThumbs: null | {
        c144: string;
        c50: string;
      };
      id: number;
      isActive: boolean;
      isDeleted: boolean;
      isVerified: boolean;
      name: string;
      username: string;
    }>;
    usersCount: number;
  };
  userState: {
    canAddUser: boolean;
    cannotAddUserReason: string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  };
};

export interface AccessListsUsersAddParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersAddToListsResponse = {
  friends: Array<number>;
};

export type AccessListsUsersAddToListsBody = {
  friends?: Array<number | null>;
};

export interface AccessListsUsersAddToListsParams {
  /**
   * Request body
   */
  body: AccessListsUsersAddToListsBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersClearResponse = {
  canAddUsers: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canPinnedToChat: boolean;
  canPinnedToFeed: boolean;
  canUpdate: boolean;
  direction: string;
  id: string;
  isPinnedToChat: boolean;
  isPinnedToFeed: boolean;
  name: string;
  order: string;
  postsCount: number;
  sortList: {
    direction: string;
    order: string;
  };
  type: string;
  users: Array<unknown>;
  usersCount: number;
};

export interface AccessListsUsersClearParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersListResponse = {
  items: Array<{
    avatar?: (unknown | null) | string;
    avatarThumbs?: (unknown | null) | {
      c144?: string | null;
      c50?: string | null;
    } | (Array<unknown | null>);
    canAddSubscriber?: boolean | null;
    canCommentStory?: boolean | null;
    canEarn?: boolean | null;
    canLookStory?: boolean | null;
    canPayInternal?: boolean | null;
    canReceiveChatMessage?: boolean | null;
    canReport?: boolean | null;
    canRestrict?: boolean | null;
    canTrialSend?: boolean | null;
    canUnsubscribe?: boolean | null;
    currentSubscribePrice?: (unknown | null) | number;
    displayName?: string | null;
    hasNotViewedStory?: boolean | null;
    hasScheduledStream?: boolean | null;
    hasStories?: boolean | null;
    hasStream?: boolean | null;
    header?: (unknown | null) | string;
    headerSize?: (unknown | null) | {
      height?: number | null;
      width?: number | null;
    } | (Array<unknown | null>);
    headerThumbs?: (unknown | null) | {
      w480?: string | null;
      w760?: string | null;
    } | (Array<unknown | null>);
    hideChat?: boolean | null;
    id?: number | null;
    isActive?: boolean | null;
    isBlocked?: boolean | null;
    isPaywallRequired?: boolean | null;
    isPendingAutoprolong?: boolean | null;
    isPerformer?: boolean | null;
    isRealPerformer?: boolean | null;
    isRestricted?: boolean | null;
    isVerified?: boolean | null;
    lastSeen?: (unknown | null) | string;
    listsStates?: Array<{
      canAddUser?: boolean | null;
      cannotAddUserReason?: (unknown | null) | string;
      hasUser?: boolean | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    notice?: string | null;
    promoOffers?: Array<{
      createdAt?: string | null;
      expiredAt?: string | null;
      finishedAt?: string | null;
      id?: number | null;
      subscribeDays?: number | null;
      subscriberId?: string | null;
      userId?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    subscribePrice?: number | null;
    subscribedBy?: boolean | (unknown | null);
    subscribedByAutoprolong?: boolean | (unknown | null);
    subscribedByData?: (unknown | null) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPostsAfterExpireCount?: number | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      showPostsInFeed?: boolean | null;
      status?: string | (unknown | null);
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      showPostsInFeed?: boolean | null;
      status?: string | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | (unknown | null);
        offerStart?: string | (unknown | null);
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      showPostsInFeed?: boolean | null;
      status?: string | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      showPostsInFeed?: boolean | null;
      status?: (unknown | null) | string;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPostsAfterExpireCount?: number | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      showPostsInFeed?: boolean | null;
      status?: string | (unknown | null);
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | (unknown | null);
        offerStart?: string | (unknown | null);
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPostsAfterExpireCount?: number | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      showPostsInFeed?: boolean | null;
      status?: (unknown | null) | string;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | null;
      showPostsInFeed?: boolean | null;
      status?: string | (unknown | null);
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | (unknown | null);
        offerStart?: string | (unknown | null);
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>);
    subscribedByExpire?: boolean | (unknown | null);
    subscribedByExpireDate?: (unknown | null) | string;
    subscribedIsExpiredNow?: boolean | (unknown | null);
    subscribedOn?: boolean | (unknown | null);
    subscribedOnData?: {
      discountFinishedAt?: (unknown | null) | string;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: (unknown | null) | string;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      lastActivity?: string | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      recommendations?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subscribedOnDuration?: string | null;
    subscribedOnExpiredNow?: boolean | null;
    subscriptionBundles?: Array<{
      canBuy?: boolean | null;
      discount?: number | null;
      duration?: number | null;
      id?: number | null;
      price?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    tipsEnabled?: boolean | null;
    tipsMax?: number | null;
    tipsMin?: number | null;
    tipsMinInternal?: number | null;
    tipsTextEnabled?: boolean | null;
    username?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessListsUsersListParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Number of items to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Field to include or sort by
   */
  field?: "expire_date" | "last_activity" | "subscribe_date";
  /**
   * Sort order
   */
  order?: "asc" | "desc";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersListItem = NonNullable<AccessListsUsersListResponse["items"]>[number];

export type AccessListsUsersListPinnedResponse = {
  items: Array<{
    avatar?: string | (unknown | null);
    avatarThumbs?: unknown | null;
    canAddSubscriber?: boolean | null;
    canCommentStory?: boolean | null;
    canEarn?: boolean | null;
    canLookStory?: boolean | null;
    canPayInternal?: boolean | null;
    canReceiveChatMessage?: boolean | null;
    canReport?: boolean | null;
    canRestrict?: boolean | null;
    canTrialSend?: boolean | null;
    canUnsubscribe?: boolean | null;
    currentSubscribePrice?: number | null;
    displayName?: string | null;
    hasNotViewedStory?: boolean | null;
    hasScheduledStream?: boolean | null;
    hasStories?: boolean | null;
    hasStream?: boolean | null;
    header?: string | (unknown | null);
    headerSize?: unknown | null;
    headerThumbs?: unknown | null;
    hideChat?: boolean | null;
    id?: number | null;
    isActive?: boolean | null;
    isBlocked?: boolean | null;
    isPaywallRequired?: boolean | null;
    isPendingAutoprolong?: boolean | null;
    isPerformer?: boolean | null;
    isRealPerformer?: boolean | null;
    isRestricted?: boolean | null;
    isVerified?: boolean | null;
    lastSeen?: string | (unknown | null);
    listsStates?: Array<{
      canAddUser?: boolean | null;
      cannotAddUserReason?: (unknown | null) | string;
      hasUser?: boolean | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    notice?: string | null;
    promoOffers?: Array<unknown | null>;
    subscribePrice?: number | null;
    subscribedBy?: boolean | null;
    subscribedByAutoprolong?: boolean | null;
    subscribedByData?: {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      showPostsInFeed?: boolean | null;
      status?: string | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subscribedByExpire?: boolean | null;
    subscribedByExpireDate?: string | null;
    subscribedIsExpiredNow?: boolean | null;
    subscribedOn?: boolean | null;
    subscribedOnData?: {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      lastActivity?: string | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      recommendations?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | null;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subscribedOnDuration?: string | null;
    subscribedOnExpiredNow?: boolean | null;
    subscriptionBundles?: Array<{
      canBuy?: boolean | null;
      discount?: number | null;
      duration?: number | null;
      id?: number | null;
      price?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    tipsEnabled?: boolean | null;
    tipsMax?: number | null;
    tipsMin?: number | null;
    tipsMinInternal?: number | null;
    tipsTextEnabled?: boolean | null;
    username?: string | null;
  }>;
};

export interface AccessListsUsersListPinnedParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersPinResponse = {
  success: boolean;
};

export interface AccessListsUsersPinParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUsersRemoveResponse = {
  list: {
    canAddUsers: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canPinnedToChat: boolean;
    canPinnedToFeed: boolean;
    canUpdate: boolean;
    direction: string;
    id: string;
    isPinnedToChat: boolean;
    isPinnedToFeed: boolean;
    name: string;
    order: string;
    postsCount: number;
    sortList: {
      direction: string;
      order: string;
    };
    type: string;
    users: Array<unknown>;
    usersCount: number;
  };
  userState: {
    canAddUser: boolean;
    cannotAddUserReason: string | null;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  };
};

export interface AccessListsUsersRemoveParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsCreateResponse = {
  canAddUsers: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canPinnedToChat: boolean;
  canPinnedToFeed: boolean;
  canUpdate: boolean;
  direction: string;
  id: string;
  isPinnedToChat: boolean;
  isPinnedToFeed: boolean;
  name: string;
  order: string;
  postsCount: number;
  sortList: Array<unknown>;
  type: string;
  users: Array<unknown>;
  usersCount: number;
};

export type AccessListsCreateBody = {
  name: string;
};

export interface AccessListsCreateParams {
  /**
   * Request body
   */
  body: AccessListsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsDeleteResponse = {
  success: boolean;
};

export interface AccessListsDeleteParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsGetResponse = {
  canAddUsers: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canPinnedToChat: boolean;
  canPinnedToFeed: boolean;
  canUpdate: boolean;
  direction: string;
  id: string;
  isPinnedToChat: boolean;
  isPinnedToFeed: boolean;
  name: string;
  order: string;
  postsCount: number;
  sortList: {
    direction: string;
    order: string;
  };
  type: string;
  users: Array<{
    avatar: null | string;
    avatarThumbs: null | {
      c144: string;
      c50: string;
    };
    displayName: string;
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    name: string;
    username: string;
  }>;
  usersCount: number;
};

export interface AccessListsGetParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsGetFansResponse = {
  canAddUsers: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canPinnedToChat: boolean;
  canPinnedToFeed: boolean;
  canUpdate: boolean;
  direction: string;
  id: string;
  isPinnedToChat: boolean;
  isPinnedToFeed: boolean;
  name: string;
  order: string;
  postsCount: number;
  sortList: {
    activity: {
      direction: string;
      order: string;
    };
    all: {
      direction: string;
      order: string;
    };
    expired: {
      direction: string;
      order: string;
    };
  };
  type: string;
  users: Array<{
    avatar: null | string;
    avatarThumbs: null | {
      c144: string;
      c50: string;
    };
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    name: string;
    username: string;
  }>;
  usersCount: number;
};

export interface AccessListsGetFansParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsGetFollowingResponse = {
  canAddUsers: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canPinnedToChat: boolean;
  canPinnedToFeed: boolean;
  canUpdate: boolean;
  direction: string;
  id: string;
  isPinnedToChat: boolean;
  isPinnedToFeed: boolean;
  name: string;
  order: string;
  postsCount: number;
  sortList: Array<unknown>;
  type: string;
  users: Array<{
    avatar: null | string;
    avatarThumbs: null | {
      c144: string;
      c50: string;
    };
    displayName: string;
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    name: string;
    username: string;
  }>;
  usersCount: number;
};

export interface AccessListsGetFollowingParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsListResponse = {
  items: Array<{
    canAddUsers?: boolean | null;
    canDelete?: boolean | null;
    canManageUsers?: boolean | null;
    canPinnedToChat?: boolean | null;
    canPinnedToFeed?: boolean | null;
    canUpdate?: boolean | null;
    direction?: string | null;
    id?: string | null;
    isPinnedToChat?: boolean | null;
    isPinnedToFeed?: boolean | null;
    name?: string | null;
    order?: string | null;
    postsCount?: number | null;
    sortList?: {
      activity?: {
        direction?: string | null;
        order?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      all?: {
        direction?: string | null;
        order?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      direction?: string | null;
      expired?: {
        direction?: string | null;
        order?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      order?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    type?: string | null;
    users?: Array<{
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    usersCount?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessListsListParams {
  /**
   * Number of items to return (1-100, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * List filter
   */
  filter?: "locked" | "paid" | "pinned" | "priority" | "unread" | "who_tipped";
  /**
   * Only include chat lists
   */
  isChat?: boolean | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsListItem = NonNullable<AccessListsListResponse["items"]>[number];

export type AccessListsListPostsResponse = {
  items: Array<{
    author?: {
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    canReport?: boolean | null;
    canToggleFavorite?: boolean | null;
    canViewMedia?: boolean | null;
    canVote?: boolean | null;
    commentsCount?: number | null;
    expiredAt?: string | null;
    favoritesCount?: number | null;
    hasVoting?: boolean | null;
    id?: number | null;
    isMarkdownDisabled?: boolean | null;
    isMediaReady?: boolean | null;
    isOpened?: boolean | null;
    media?: Array<MediaAsset>;
    postedAt?: string | null;
    postedAtPrecise?: string | null;
    responseType?: string | null;
    text?: string | null;
    tipsAmount?: string | null;
    voting?: {
      finishedAt?: string | null;
      options?: Array<{
        count?: number | (unknown | null);
        id?: number | null;
        isVoted?: boolean | null;
        name?: string | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      total?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    votingType?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessListsListPostsParams {
  /**
   * listId
   */
  listId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsListPostsItem = NonNullable<AccessListsListPostsResponse["items"]>[number];

export type AccessListsSortResponse = {
  success: boolean;
};

export type AccessListsSortBody = {
  customOrder?: Array<string>;
  order?: "asc" | "desc";
  sort?: "people" | "custom" | "name" | "recent";
};

export interface AccessListsSortParams {
  /**
   * Request body
   */
  body: AccessListsSortBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsSortItemsResponse = {
  canAddFriends: boolean;
  success: boolean;
};

export type AccessListsSortItemsBody = {
  direction?: "asc" | "desc";
  order?: "default" | "recent" | "subscribe_date" | "expire_date" | "is_expired";
  type?: "all" | "active" | "expired" | "attention";
};

export interface AccessListsSortItemsParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Request body
   */
  body: AccessListsSortItemsBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListsUpdateResponse = {
  canAddUsers: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canPinnedToChat: boolean;
  canPinnedToFeed: boolean;
  canUpdate: boolean;
  direction: string;
  id: string;
  isPinnedToChat: boolean;
  isPinnedToFeed: boolean;
  name: string;
  order: string;
  postsCount: number;
  sortList: {
    direction: string;
    order: string;
  };
  type: string;
  users: Array<{
    avatar: null | string;
    avatarThumbs: null | {
      c144: string;
      c50: string;
    };
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    name: string;
    username: string;
  }>;
  usersCount: number;
};

export type AccessListsUpdateBody = {
  isPinnedToChat?: boolean;
  isPinnedToFeed?: boolean;
  name?: string;
};

export interface AccessListsUpdateParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Request body
   */
  body: AccessListsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessNotificationsGetCountResponse = {
  all: number;
  commented: number;
  deactivated_media: number;
  favorited: number;
  mentioned: number;
  message: number;
  purchases: number;
  subscribed: number;
  system: number;
  tags: number;
  tip: number;
};

export interface AccessNotificationsGetCountParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessNotificationsListResponse = {
  items: Array<{
    canGoToProfile?: boolean | null;
    createdAt?: string | null;
    id?: number | null;
    isRead?: boolean | null;
    replacePairs?: {
      "{PRICE}"?: string | null;
      "{SUBSCRIBER_LINK}"?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subType?: string | null;
    text?: string | null;
    type?: string | null;
    user?: {
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
  }>;
  page: CursorPage;
};

export interface AccessNotificationsListParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string;
  /**
   * Filter by notification type
   */
  type?: "all" | "subscribed" | "purchases" | "tip" | "commented" | "deactivated_media" | "mentioned" | "memories" | "favorited" | "message" | "tags";
  /**
   * Filter notifications related to this user
   */
  relatedUsername?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessNotificationsListItem = NonNullable<AccessNotificationsListResponse["items"]>[number];

export type AccessNotificationsMarkReadResponse = {
  counters: {
    all: number;
    commented: number;
    deactivated_media: number;
    favorited: number;
    mentioned: number;
    message: number;
    purchases: number;
    subscribed: number;
    system: number;
    tags: number;
    tip: number;
  };
  hasSystemNotifications: boolean;
  success: boolean;
};

export interface AccessNotificationsMarkReadParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksCategoriesAddPostResponse = {
  bookmarkCategory: {
    id: number;
    lastActivity: string;
    name: string;
    postCount: number;
    posts: Array<{
      canViewMedia: boolean;
      media?: Array<MediaAsset>;
      postId: number;
      type: string;
      url: string;
    }>;
  };
  bookmarkCategoryPost: {
    categoryId: number;
    id: number;
    postId: number;
    postUserId: number;
    publishDate: string;
    userId: number;
  };
  success: boolean;
};

export interface AccessPostsBookmarksCategoriesAddPostParams {
  /**
   * categoryId
   */
  categoryId: string | number;
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksCategoriesCreateResponse = {
  id: number;
  lastActivity: string;
  name: string;
  postCount: number;
  posts: Array<unknown>;
};

export type AccessPostsBookmarksCategoriesCreateBody = {
  name: string;
};

export interface AccessPostsBookmarksCategoriesCreateParams {
  /**
   * Request body
   */
  body: AccessPostsBookmarksCategoriesCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksCategoriesDeleteResponse = {
  success: boolean;
};

export interface AccessPostsBookmarksCategoriesDeleteParams {
  /**
   * categoryId
   */
  categoryId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksCategoriesListResponse = {
  items: Array<{
    hasPost?: boolean | null;
    id?: number | null;
    lastActivity?: string | null;
    name?: string | null;
    postCount?: number | null;
    posts?: Array<{
      canViewMedia?: boolean | null;
      media?: Array<MediaAsset>;
      postId?: number | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
  }>;
  page: CursorPage;
};

export interface AccessPostsBookmarksCategoriesListParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  query?: string;
  chatGroupId?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksCategoriesListItem = NonNullable<AccessPostsBookmarksCategoriesListResponse["items"]>[number];

export type AccessPostsBookmarksCategoriesRemovePostResponse = {
  id: number;
  lastActivity: string;
  name: string;
  postCount: number;
  posts: Array<unknown>;
};

export interface AccessPostsBookmarksCategoriesRemovePostParams {
  /**
   * categoryId
   */
  categoryId: string | number;
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksAddResponse = {
  success: boolean;
};

export interface AccessPostsBookmarksAddParams {
  /**
   * bookmarkId
   */
  bookmarkId: string | number;
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksListResponse = {
  items: Array<{
    author?: {
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    canComment?: boolean | null;
    canDelete?: boolean | null;
    canEdit?: boolean | null;
    canToggleFavorite?: boolean | null;
    canViewMedia?: boolean | null;
    expiredAt?: string | null;
    favoritesCount?: number | null;
    hasLockedVoting?: boolean | null;
    hasUrl?: boolean | null;
    hasVoting?: boolean | null;
    id?: number | null;
    isAddedToBookmarks?: boolean | null;
    isMarkdownDisabled?: boolean | null;
    isMediaReady?: boolean | null;
    isOpened?: boolean | null;
    linkedUsers?: Array<{
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    media?: Array<MediaAsset>;
    mediaCount?: number | null;
    mentionedUsers?: Array<{
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    postedAt?: string | null;
    postedAtPrecise?: string | null;
    promotionContent?: Array<{
      login?: string | null;
      type?: string | null;
      userId?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    rawText?: string | null;
    responseType?: string | null;
    text?: string | null;
    tipsAmount?: string | null;
    tweetSend?: boolean | null;
    voting?: {
      finishedAt?: string | null;
      options?: Array<{
        count?: number | null;
        id?: number | null;
        isCorrect?: boolean | null;
        isVoted?: boolean | null;
        name?: string | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      total?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    votingType?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessPostsBookmarksListParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Bookmark entity type. Downloaded source passes UI state through to entity_type; the value set is not source-proven closed.
   */
  entityType?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksListItem = NonNullable<AccessPostsBookmarksListResponse["items"]>[number];

export type AccessPostsBookmarksListByCategoryResponse = {
  items: Array<{
    author?: {
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    canComment?: boolean | null;
    canDelete?: boolean | null;
    canEdit?: boolean | null;
    canToggleFavorite?: boolean | null;
    canViewMedia?: boolean | null;
    expiredAt?: string | null;
    hasLockedVoting?: boolean | null;
    hasVoting?: boolean | null;
    id?: number | null;
    isAddedToBookmarks?: boolean | null;
    isMarkdownDisabled?: boolean | null;
    isMediaReady?: boolean | null;
    isOpened?: boolean | null;
    media?: Array<MediaAsset>;
    postedAt?: string | null;
    postedAtPrecise?: string | null;
    rawText?: string | null;
    responseType?: string | null;
    text?: string | null;
    tipsAmount?: string | null;
    tweetSend?: boolean | null;
    voting?: {
      finishedAt?: string | null;
      options?: Array<{
        count?: number | null;
        id?: number | null;
        isCorrect?: boolean | null;
        isVoted?: boolean | null;
        name?: string | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      total?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    votingType?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessPostsBookmarksListByCategoryParams {
  /**
   * bookmarkType
   */
  bookmarkType: string | number;
  /**
   * categoryId
   */
  categoryId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksListByCategoryItem = NonNullable<AccessPostsBookmarksListByCategoryResponse["items"]>[number];

export type AccessPostsBookmarksListByTypeResponse = {
  items: Array<{
    author?: {
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    canComment?: boolean | null;
    canDelete?: boolean | null;
    canEdit?: boolean | null;
    canToggleFavorite?: boolean | null;
    canViewMedia?: boolean | null;
    expiredAt?: string | null;
    favoritesCount?: number | null;
    hasLockedVoting?: boolean | null;
    hasUrl?: boolean | null;
    hasVoting?: boolean | null;
    id?: number | null;
    isAddedToBookmarks?: boolean | null;
    isMarkdownDisabled?: boolean | null;
    isMediaReady?: boolean | null;
    isOpened?: boolean | null;
    linkedUsers?: Array<{
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    media?: Array<MediaAsset>;
    mediaCount?: number | null;
    mentionedUsers?: Array<{
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    postedAt?: string | null;
    postedAtPrecise?: string | null;
    promotionContent?: Array<{
      login?: string | null;
      type?: string | null;
      userId?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    rawText?: string | null;
    responseType?: string | null;
    text?: string | null;
    tipsAmount?: string | null;
    tweetSend?: boolean | null;
    voting?: {
      finishedAt?: string | null;
      options?: Array<{
        count?: number | null;
        id?: number | null;
        isCorrect?: boolean | null;
        isVoted?: boolean | null;
        name?: string | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      total?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    votingType?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessPostsBookmarksListByTypeParams {
  /**
   * bookmarkType
   */
  bookmarkType: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Bookmark date filter
   */
  filter?: "date_last_1_month" | "date_last_1_week" | "date_last_3_months";
  /**
   * Bookmark sort order
   */
  order?: "favorites_count_asc" | "favorites_count_desc" | "publish_date_asc" | "tips_summ_asc" | "tips_summ_desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsBookmarksListByTypeItem = NonNullable<AccessPostsBookmarksListByTypeResponse["items"]>[number];

export type AccessPostsBookmarksRemoveResponse = {
  success: boolean;
};

export interface AccessPostsBookmarksRemoveParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsCreateResponse = {
  author?: PostAuthor;
  changedAt?: string;
  id?: number;
  isLiked?: boolean;
  isPinned?: boolean;
  likesCount?: number;
  postedAt?: string;
  text?: string;
};

export type AccessPostsCommentsCreateBody = {
  answerTo?: number | null;
  giphyId?: string | null;
  text: string;
};

export interface AccessPostsCommentsCreateParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Request body
   */
  body: AccessPostsCommentsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsDeleteResponse = {
  success: boolean;
};

export interface AccessPostsCommentsDeleteParams {
  /**
   * commentId
   */
  commentId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsLikeResponse = {
  isLiked: boolean;
  likesCount: number;
  success: boolean;
};

export interface AccessPostsCommentsLikeParams {
  /**
   * commentId
   */
  commentId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsListResponse = {
  items: Array<{
    author?: {
      id?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    canLike?: boolean | null;
    changedAt?: string | null;
    giphyId?: unknown | null;
    id?: number | null;
    isLiked?: boolean | null;
    isLikedByAuthor?: boolean | null;
    isPinned?: boolean | null;
    likesCount?: number | null;
    postedAt?: string | null;
    text?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessPostsCommentsListParams {
  /**
   * postId
   */
  postId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsListItem = NonNullable<AccessPostsCommentsListResponse["items"]>[number];

export type AccessPostsCommentsPinResponse = {
  success: boolean;
};

export interface AccessPostsCommentsPinParams {
  /**
   * commentId
   */
  commentId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsUnlikeResponse = {
  isLiked: boolean;
  likesCount: number;
  success: boolean;
};

export interface AccessPostsCommentsUnlikeParams {
  /**
   * commentId
   */
  commentId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCommentsUnpinResponse = {
  success: boolean;
};

export interface AccessPostsCommentsUnpinParams {
  /**
   * commentId
   */
  commentId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsFavoritesAddResponse = {
  favoritesCount: number;
  id: number;
  isFavorite: boolean;
};

export interface AccessPostsFavoritesAddParams {
  /**
   * authorId
   */
  authorId: string | number;
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsFundRaisingContributorsGetCountResponse = {
  count: number;
};

export interface AccessPostsFundRaisingContributorsGetCountParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsVotersListByOptionResponse = {
  items: Array<UserSummary>;
  page: CursorPage;
};

export interface AccessPostsVotersListByOptionParams {
  /**
   * optionId
   */
  optionId: string | number;
  /**
   * postId
   */
  postId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsVotersListByOptionItem = NonNullable<AccessPostsVotersListByOptionResponse["items"]>[number];

export type AccessPostsArchiveResponse = {
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
  labelStates: Array<{
    id: number | string;
    isClearInProgress: boolean;
    name: string;
    posts: Array<{
      canViewMedia: boolean;
      media?: Array<MediaAsset>;
      postId: number;
      type: string;
      url: string;
    }>;
    postsCount: number;
    type: string;
  }>;
};

export interface AccessPostsArchiveParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsCreateResponse = {
  author?: PostAuthor;
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
  media: Array<MediaAsset>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  text: string;
  tipsAmount: string;
};

export type AccessPostsCreateBody = PostRequest;

export interface AccessPostsCreateParams {
  /**
   * Request body
   */
  body: AccessPostsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsDeleteResponse = {
  counters: {
    archivedPostsCount: number;
    audiosCount: number;
    mediasCount: number;
    photosCount: number;
    postsCount: number;
    streamsCount: number;
    videosCount: number;
  };
  success: boolean;
};

export interface AccessPostsDeleteParams {
  /**
   * OnlyFans post ID
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsGetResponse = {
  author: {
    id: number;
  };
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canEditExpire: boolean;
  canEditMedia: boolean;
  canEditSchedule: boolean;
  canEditText: boolean;
  canEditVote: boolean;
  canReport: boolean;
  canToggleFavorite: boolean;
  canViewMedia: boolean;
  commentsCount: number;
  expiredAt: string;
  favoritesCount: number;
  fundRaising: {
    presets: Array<string>;
    target: number;
    targetProgress: number;
  };
  hasLockedVoting: boolean;
  hasVoting: boolean;
  id: number;
  isFavorite: boolean;
  isMarkdownDisabled: boolean;
  isMediaReady: boolean;
  isOpened: boolean;
  isPublishedWithPeriod: boolean;
  labelStates: Array<{
    id: number;
    isClearInProgress: boolean;
    name: string;
    postsCount: number;
    type: string;
  }>;
  media: Array<MediaAsset>;
  mediaCount: number;
  postedAt: string;
  postedAtPrecise: string;
  rawText: string;
  responseType: string;
  text: string;
  tipsAmount: string;
  tweetSend: boolean;
  voting: {
    finishedAt: string;
    options: Array<{
      count: number;
      id: number;
      isCorrect: boolean;
      isVoted: boolean;
      name: string;
    }>;
    total: number;
  };
  votingType: number;
};

export interface AccessPostsGetParams {
  /**
   * OnlyFans post ID
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListResponse = PostPage;

export interface AccessPostsListParams {
  /**
   * Number of posts to return (1-50)
   */
  limit?: number;
  /**
   * Filter to posts with media. Use any for all media posts, or photo/video for a specific media type.
   */
  media?: "any" | "photo" | "video";
  /**
   * Sort posts by: publish_date, tips, or favorites_count
   */
  sortBy?: "publish_date" | "tips" | "favorites_count";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Include pinned posts
   */
  pinned?: boolean;
  /**
   * Only include posts viewable by the authenticated account
   */
  onlyCanView?: boolean;
  /**
   * Publish time cursor from the previous response. Also accepts ISO datetime, seconds, or seconds.fraction.
   */
  cursor?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListItem = NonNullable<AccessPostsListResponse["items"]>[number];

export type AccessPostsListBuyersResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessPostsListBuyersParams {
  /**
   * postId
   */
  postId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListBuyersItem = NonNullable<AccessPostsListBuyersResponse["items"]>[number];

export type AccessPostsListFavoritesResponse = {
  items: Array<UserSummary>;
  page: CursorPage;
};

export interface AccessPostsListFavoritesParams {
  /**
   * postId
   */
  postId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListFavoritesItem = NonNullable<AccessPostsListFavoritesResponse["items"]>[number];

export type AccessPostsListTaggedFriendUsersResponse = {
  items: Array<{
    date?: string | null;
    hiddenForRf?: boolean | null;
    id?: number | null;
    name?: string | null;
    token?: string | null;
    type?: string | null;
    user?: {
      avatar?: string | null;
      avatarThumbs?: {
        c144?: string | null;
        c50?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      id?: number | null;
      isActive?: boolean | null;
      isDeleted?: boolean | null;
      isVerified?: boolean | null;
      name?: string | null;
      username?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
  }>;
  page: CursorPage;
};

export interface AccessPostsListTaggedFriendUsersParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Filter: all forms or only pending
   */
  filter?: "all" | "pending";
  /**
   * Release form source filter
   */
  source?: string;
  /**
   * Sort by date or name
   */
  sortBy?: "date" | "name";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Search/filter text
   */
  search?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListTaggedFriendUsersItem = NonNullable<AccessPostsListTaggedFriendUsersResponse["items"]>[number];

export type AccessPostsListTipsResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessPostsListTipsParams {
  /**
   * postId
   */
  postId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListTipsItem = NonNullable<AccessPostsListTipsResponse["items"]>[number];

export type AccessPostsListVotersResponse = {
  items: Array<UserSummary>;
  page: CursorPage;
};

export interface AccessPostsListVotersParams {
  /**
   * postId
   */
  postId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsListVotersItem = NonNullable<AccessPostsListVotersResponse["items"]>[number];

export type AccessPostsPinResponse = {
  success: boolean;
};

export interface AccessPostsPinParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsUnarchiveResponse = {
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
  labelStates: Array<{
    id: number | string;
    isClearInProgress: boolean;
    name: string;
    posts: Array<{
      canViewMedia: boolean;
      media?: Array<MediaAsset>;
      postId: number;
      type: string;
      url: string;
    }>;
    postsCount: number;
    type: string;
  }>;
};

export interface AccessPostsUnarchiveParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsUpdateResponse = Post;

export type AccessPostsUpdateBody = PostRequest;

export interface AccessPostsUpdateParams {
  /**
   * OnlyFans post ID
   */
  postId: string | number;
  /**
   * Request body
   */
  body: AccessPostsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPostsVoteResponse = {
  success: boolean;
};

export type AccessPostsVoteBody = {
  optionId: number | null;
};

export interface AccessPostsVoteParams {
  /**
   * postId
   */
  postId: string | number;
  /**
   * Request body
   */
  body: AccessPostsVoteBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileLinksDeleteResponse = {
  success: boolean;
};

export interface AccessProfileLinksDeleteParams {
  /**
   * linkId
   */
  linkId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileLinksListResponse = {
  items: Array<{
    description?: string | null;
    id?: number | null;
    image?: {
      height?: number | null;
      src?: string | null;
      thumbs?: {
        c144?: string | null;
        c50?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      width?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    sort?: number | null;
    title?: string | null;
    url?: string | null;
  }>;
};

export interface AccessProfileLinksListParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileLinksUpdateResponse = {
  items: Array<{
    description?: string | null;
    id?: number | null;
    image?: {
      height?: number | null;
      src?: string | null;
      thumbs?: {
        c144?: string | null;
        c50?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      width?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    sort?: number | null;
    title?: string | null;
    url?: string | null;
  }>;
};

export type AccessProfileLinksUpdateBody = {
  link?: string;
};

export interface AccessProfileLinksUpdateParams {
  /**
   * Request body
   */
  body: AccessProfileLinksUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileSocialButtonsDeleteResponse = {
  success: boolean;
};

export interface AccessProfileSocialButtonsDeleteParams {
  /**
   * buttonId
   */
  buttonId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileSocialButtonsListResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessProfileSocialButtonsListParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileSocialButtonsUpdateResponse = {
  items: Array<{
    clicks?: number | null;
    id?: number | null;
    isValid?: boolean | null;
    label?: string | null;
    link?: string | null;
    socialMedia?: string | null;
    sort?: number | null;
    url?: string | null;
    username?: string | null;
  }>;
};

export type AccessProfileSocialButtonsUpdateBody = {
  label?: string;
  link?: string;
  socialMedia?: string;
  username?: string;
};

export interface AccessProfileSocialButtonsUpdateParams {
  /**
   * Request body
   */
  body: AccessProfileSocialButtonsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileGetResponse = {
  about: string | null;
  avatar: string | null;
  avatarThumbs: Record<string, string> | null;
  firstPublishedPostDate: string | null;
  hasWatermarkPhoto: boolean | null;
  hasWatermarkVideo: boolean | null;
  header: string | null;
  headerThumbs: Record<string, string> | null;
  id: number | null;
  isAdultContent: boolean | null;
  isPerformer: boolean | null;
  isRealPerformer: boolean | null;
  isVerified: boolean | null;
  joinDate: string | null;
  location: string | null;
  name: string | null;
  showMediaCount: boolean | null;
  showPostsInFeed: boolean | null;
  showSubscribersCount: boolean | null;
  username: string | null;
  watermarkPosition: string | null;
  watermarkText: string | null;
  website: string | null;
  wishlist: string | null;
};

export interface AccessProfileGetParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileGetCapabilitiesResponse = {
  canAddCard: boolean | null;
  canAddStory: boolean | null;
  canChangeContentPrice: boolean | null;
  canChat: boolean | null;
  canCreateFundRaising: boolean | null;
  canCreateLists: boolean | null;
  canCreatePromotion: boolean | null;
  canCreateTrial: boolean | null;
  canEarn: boolean | null;
  canMakeExpirePosts: boolean | null;
  canPayInternal: boolean | null;
  canPinPost: boolean | null;
  canReceiveChatMessage: boolean | null;
  canReceiveManualPayout: boolean | null;
  canReceiveStripePayout: boolean | null;
  canSendChatToAll: boolean | null;
  canStreaming: boolean | null;
  canUploadAvatarHeader: boolean | null;
  canUploadMedia: boolean | null;
  enabledImageEditorForChat: boolean | null;
  isCreditsEnabled: boolean | null;
  isScheduledStreamsAllowed: boolean | null;
  paidFeed: boolean | null;
  tipsEnabled: boolean | null;
  tipsTextEnabled: boolean | null;
};

export interface AccessProfileGetCapabilitiesParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileGetCountsResponse = {
  archivedPostsCount: number | null;
  audiosCount: number | null;
  bookmarks: number | null;
  chatMessagesCount: number | null;
  countPinnedChat: number | null;
  countPriorityChat: number | null;
  favoritedCount: number | null;
  favoritesCount: number | null;
  mediasCount: number | null;
  newTagsCount: number | null;
  notificationsCount: number | null;
  photosCount: number | null;
  pinnedPostsCount: number | null;
  postsCount: number | null;
  privateArchivedPostsCount: number | null;
  subscribers: {
    active: number;
    activeOnline: number;
    all: number;
    blocked: number;
    expired: number;
    muted: number;
    restricted: number;
  } | null;
  subscribersCount: number | null;
  subscribesCount: number | null;
  subscriptions: {
    active: number;
    all: number;
    attention: number;
    blocked: number;
    expired: number;
    muted: number;
    restricted: number;
  } | null;
  unreadTips: number | null;
  videosCount: number | null;
};

export interface AccessProfileGetCountsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileUpdateResponse = {
  success: boolean;
};

export type AccessProfileUpdateBody = {
  /**
   * Profile bio/description
   */
  about?: string | null;
  /**
   * Disable Markdown rendering for the profile bio
   */
  isMarkdownDisabledForAbout?: boolean;
  /**
   * Allow referrer attribution for the profile
   */
  isReferrerAllowed?: boolean;
  /**
   * Profile location
   */
  location?: string | null;
  /**
   * Display name
   */
  name?: string;
  /**
   * Show media count on the profile
   */
  showMediaCount?: boolean;
  /**
   * Show posts in the creator feed
   */
  showPostsInFeed?: boolean;
  /**
   * Show subscriber count on the profile
   */
  showSubscribersCount?: boolean;
  /**
   * Enable tips on the profile
   */
  tipsEnabled?: boolean;
  /**
   * Maximum tip amount
   */
  tipsMax?: number;
  /**
   * Minimum tip amount
   */
  tipsMin?: number;
  /**
   * Allow text with tips
   */
  tipsTextEnabled?: boolean;
  /**
   * Profile website URL
   */
  website?: string | null;
  /**
   * Profile wishlist URL
   */
  wishlist?: string | null;
};

export interface AccessProfileUpdateParams {
  /**
   * Request body
   */
  body: AccessProfileUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessProfileValidateResponse = {
  success: boolean;
};

export type AccessProfileValidateBody = {
  about?: string;
};

export interface AccessProfileValidateParams {
  /**
   * Request body
   */
  body: AccessProfileValidateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsBundlesCreateResponse = Bundle;

export type AccessPromotionsBundlesCreateBody = {
  /**
   * Bundle discount percentage, 0-50 in 5% increments
   */
  discount: number;
  /**
   * Bundle duration in months: 3, 6, or 12 months.
   */
  duration: 3 | 6 | 12;
};

export interface AccessPromotionsBundlesCreateParams {
  /**
   * Request body
   */
  body: AccessPromotionsBundlesCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsBundlesDeleteResponse = {
  canBuy: boolean;
  discount: number;
  duration: number;
  id: number;
  price: number;
};

export interface AccessPromotionsBundlesDeleteParams {
  /**
   * Bundle ID
   */
  bundleId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsBundlesGetResponse = Bundle;

export interface AccessPromotionsBundlesGetParams {
  /**
   * Bundle ID
   */
  bundleId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsBundlesListResponse = {
  items: Array<Bundle>;
};

export interface AccessPromotionsBundlesListParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksCreateResponse = Array<TrackingLink> | TrackingLink;

export type AccessPromotionsTrackingLinksCreateBody = {
  /**
   * Name for the tracking link
   */
  name: string;
};

export interface AccessPromotionsTrackingLinksCreateParams {
  /**
   * Request body
   */
  body: AccessPromotionsTrackingLinksCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksDeleteResponse = {
  success: boolean;
};

export interface AccessPromotionsTrackingLinksDeleteParams {
  /**
   * Tracking link ID
   */
  trackingLinkId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksListResponse = {
  items: Array<TrackingLink>;
  page: CursorPage;
};

export interface AccessPromotionsTrackingLinksListParams {
  /**
   * Number of items to return (1-100, default: 20)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Field to return or sort by
   */
  field?: "clicks_count" | "name" | "shared" | "subscribers_counts";
  /**
   * Include deleted tracking links (0 or 1)
   */
  includeDeleted?: number | null;
  /**
   * Sort direction or expression
   */
  sort?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksListItem = NonNullable<AccessPromotionsTrackingLinksListResponse["items"]>[number];

export type AccessPromotionsTrackingLinksListClaimedUsersResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessPromotionsTrackingLinksListClaimedUsersParams {
  /**
   * trackingLinkId
   */
  trackingLinkId: string | number;
  /**
   * Number of items to return (1-100, default: 20)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksListClaimedUsersItem = NonNullable<AccessPromotionsTrackingLinksListClaimedUsersResponse["items"]>[number];

export type AccessPromotionsTrackingLinksListSharedWithMeResponse = {
  items: Array<{
    campaignCode?: number;
    campaignName?: string;
    id?: number;
    isDeleted?: boolean;
    sharedWith?: UserSummary | null;
    user?: UserSummary;
  }>;
  page: CursorPage;
};

export interface AccessPromotionsTrackingLinksListSharedWithMeParams {
  /**
   * trackingLinkId
   */
  trackingLinkId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  field?: "shared";
  sort?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksListSharedWithMeItem = NonNullable<AccessPromotionsTrackingLinksListSharedWithMeResponse["items"]>[number];

export type AccessPromotionsTrackingLinksShareResponse = {
  success: boolean;
};

export interface AccessPromotionsTrackingLinksShareParams {
  /**
   * trackingLinkId
   */
  trackingLinkId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrackingLinksUnshareResponse = {
  success: boolean;
};

export interface AccessPromotionsTrackingLinksUnshareParams {
  /**
   * trackingLinkId
   */
  trackingLinkId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrialLinksCreateResponse = (Array<{
  claimCounts: number;
  clicksCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  sharedWith?: UserSummary | null;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
  user?: UserSummary;
}>) | {
  claimCounts: number;
  clicksCounts: number;
  createdAt: string;
  expiredAt: string | null;
  id: number;
  isFinished: boolean;
  sharedWith?: UserSummary | null;
  subscribeCounts: number;
  subscribeDays: number;
  trialLinkName: string;
  url: string;
  user?: UserSummary;
};

export type AccessPromotionsTrialLinksCreateBody = {
  /**
   * Trial duration in days. 30 means 1 month. Compact strings are accepted: 1m, 3m, 6m, 12m.
   */
  durationDays: 1 | 3 | 7 | 14 | 30 | 90 | 180 | 360;
  /**
   * Trial link name
   */
  name: string;
  offer: {
    /**
     * Days until the trial link expires. Use 0 for no expiration.
     */
    expirationDays: number | null;
    /**
     * Maximum number of claims. Use 0 for no limit.
     */
    limit: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 50 | 100;
  };
};

export interface AccessPromotionsTrialLinksCreateParams {
  /**
   * Request body
   */
  body: AccessPromotionsTrialLinksCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrialLinksDeactivateResponse = {
  success: boolean;
};

export interface AccessPromotionsTrialLinksDeactivateParams {
  /**
   * trialLinkId
   */
  trialLinkId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrialLinksListResponse = TrialLinkPage;

export interface AccessPromotionsTrialLinksListParams {
  /**
   * Number of items to return (1-100, default: 20)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Field to return or sort by
   */
  field?: "claims_count" | "clicks_count" | "create_date" | "expire_date" | "shared" | "subscribe_counts" | "subscribe_days";
  /**
   * Sort direction or expression
   */
  sort?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrialLinksListItem = NonNullable<AccessPromotionsTrialLinksListResponse["items"]>[number];

export type AccessPromotionsTrialLinksListSharedWithMeResponse = {
  items: Array<{
    claimCounts?: number;
    clicksCounts?: number;
    createdAt?: string;
    expiredAt?: string | null;
    id?: number;
    isFinished?: boolean;
    sharedWith?: UserSummary | null;
    subscribeCounts?: number;
    subscribeDays?: number;
    trialLinkName?: string;
    url?: string;
    user?: UserSummary;
  }>;
  page: CursorPage;
};

export interface AccessPromotionsTrialLinksListSharedWithMeParams {
  /**
   * trialLinkId
   */
  trialLinkId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrialLinksListSharedWithMeItem = NonNullable<AccessPromotionsTrialLinksListSharedWithMeResponse["items"]>[number];

export type AccessPromotionsTrialLinksShareResponse = {
  success: boolean;
};

export interface AccessPromotionsTrialLinksShareParams {
  /**
   * trialLinkId
   */
  trialLinkId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsTrialLinksUnshareResponse = {
  success: boolean;
};

export interface AccessPromotionsTrialLinksUnshareParams {
  /**
   * trialLinkId
   */
  trialLinkId: string | number;
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsCreateResponse = PromotionPage;

export type AccessPromotionsCreateBody = {
  discount: {
    /**
     * Free trial duration in days once accepted.
     */
    durationDays: number;
    type: "free_trial";
  } | {
    /**
     * First month discount percentage.
     */
    percent: number;
    type: "first_month_discount";
  };
  /**
   * Promotion message
   */
  message: string;
  offer: {
    /**
     * Days until the offer expires. Use 0 for no expiration.
     */
    expirationDays: number;
    /**
     * Maximum number of subscribers who can claim the offer. Use 0 for no limit.
     */
    limit: number;
  };
  /**
   * Audience for the promotion: all_subscribers targets new and expired subscribers, new_subscribers targets only new subscribers, expired_subscribers targets only expired subscribers.
   */
  targetAudience: "new_subscribers" | "expired_subscribers" | "all_subscribers";
};

export interface AccessPromotionsCreateParams {
  /**
   * Request body
   */
  body: AccessPromotionsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsDeleteResponse = {
  success: boolean;
};

export interface AccessPromotionsDeleteParams {
  /**
   * Promotion ID
   */
  promotionId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsEndResponse = {
  success: boolean;
};

export interface AccessPromotionsEndParams {
  /**
   * promotionId
   */
  promotionId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsGetOffersResponse = {
  claimedOffersCount: number;
  offers: Array<{
    createdAt: string;
    expiredAt: string;
    finishedAt: string;
    id: number;
    subscribeDays: number;
    subscriberId: string;
    userId: string;
  }>;
  unclaimedOffersCount: number;
  users: Record<string, {
    id: number;
  }>;
};

export interface AccessPromotionsGetOffersParams {
  sort?: "asc" | "desc";
  field?: "create_date" | "expire_date" | "finish_date" | "is_finished" | "subscribe_days";
  durationMonths?: number;
  isInactive?: "true" | "false" | "1" | "0";
  isOnline?: "true" | "false" | "1" | "0";
  hasRecommenders?: "true" | "false" | "1" | "0";
  tipAmount?: number | null;
  totalSpent?: number | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsHideOffersResponse = {
  success: boolean;
};

export interface AccessPromotionsHideOffersParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsListResponse = PromotionPage;

export interface AccessPromotionsListParams {
  /**
   * Number of items to return (1-100, default: 20)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Start of the date window (ISO 8601). Keep this as the lower bound when requesting older analytics windows.
   */
  startDate?: (string | null) | string | (unknown | null);
  /**
   * End of the date window (ISO 8601). Move this backward to request an older analytics window.
   */
  endDate?: (string | null) | string | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessPromotionsListItem = NonNullable<AccessPromotionsListResponse["items"]>[number];

export type AccessQueueSavedListPostsResponse = QueueItemList;

export interface AccessQueueSavedListPostsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueSchedulesSavedForLaterListChatsResponse = QueueItemList;

export interface AccessQueueSchedulesSavedForLaterListChatsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueSchedulesSavedForLaterListPostsResponse = QueueItemList;

export interface AccessQueueSchedulesSavedForLaterListPostsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueSchedulesListResponse = QueueItemList;

export interface AccessQueueSchedulesListParams {
  timeZone?: string;
  publishDate?: string;
  publishDateEnd?: string;
  type?: ("chat" | "post" | "story" | "stream") | (Array<"chat" | "post" | "story" | "stream">);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueSchedulesListCountersResponse = {
  list: Record<string, {
    chat?: number;
    post?: number;
    story?: number;
    stream?: number;
  }>;
  syncInProcess: boolean;
};

export interface AccessQueueSchedulesListCountersParams {
  timeZone?: string;
  publishDate?: string;
  publishDateEnd?: string;
  type?: ("chat" | "post" | "story" | "stream") | (Array<"chat" | "post" | "story" | "stream">);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueSchedulesPublishResponse = {
  success: boolean;
};

export interface AccessQueueSchedulesPublishParams {
  /**
   * scheduleId
   */
  scheduleId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueDeleteMessageResponse = {
  queue: {
    canUnsend: boolean;
    date: string;
    giphyId: unknown;
    hasError: boolean;
    id: number;
    isCanceled: boolean;
    isFree: boolean;
    mediaTypes: null | Record<string, number>;
    releaseForms: Array<unknown>;
    sentCount: number;
    text: string;
    textCropped: string;
    unsendSeconds: number;
    viewedCount: number;
  };
  success: boolean;
};

export interface AccessQueueDeleteMessageParams {
  /**
   * Mass message queue ID: the `id` returned by `POST /chats/mass-messages` (same value as `massMessageId`). Not a `scheduleId`.
   */
  queueMessageId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueGetMessageResponse = QueuedMassMessage;

export interface AccessQueueGetMessageParams {
  /**
   * Mass message queue ID: the `id` returned by `POST /chats/mass-messages` (same value as `massMessageId`). Not a `scheduleId`.
   */
  queueMessageId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueListPostsResponse = PostPage;

export interface AccessQueueListPostsParams {
  /**
   * Number of posts to return (1-50)
   */
  limit?: number;
  /**
   * Filter to posts with media. Use any for all media posts, or photo/video for a specific media type.
   */
  media?: "any" | "photo" | "video";
  /**
   * Sort posts by: publish_date, tips, or favorites_count
   */
  sortBy?: "publish_date" | "tips" | "favorites_count";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Include pinned posts
   */
  pinned?: boolean;
  /**
   * Publish time cursor from the previous response. Also accepts ISO datetime, seconds, or seconds.fraction.
   */
  cursor?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessQueueListPostsItem = NonNullable<AccessQueueListPostsResponse["items"]>[number];

export type AccessReleaseFormsCreateLinkResponse = {
  approvedAt: string | null;
  code: string;
  createdAt: string;
  id: number;
  name: string;
  signature: string;
  signed: Array<unknown | null>;
  signersCount: number;
  type: string;
  user?: unknown | null;
};

export type AccessReleaseFormsCreateLinkBody = {
  name: string;
};

export interface AccessReleaseFormsCreateLinkParams {
  /**
   * Request body
   */
  body: AccessReleaseFormsCreateLinkBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessReleaseFormsListResponse = {
  items: Array<{
    approve_date?: unknown | null;
    code?: string | null;
    date?: string | null;
    hasUser?: boolean | null;
    hiddenForRf?: boolean | null;
    id?: number | null;
    last_changed?: string | null;
    name?: string | null;
    signature?: string | null;
    status?: string | null;
    type?: string | null;
    user_name?: (unknown | null) | string;
    user_partner_id?: (unknown | null) | number;
  }>;
  page: CursorPage;
};

export interface AccessReleaseFormsListParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Filter: all forms or only pending
   */
  filter?: "all" | "pending";
  /**
   * Release form source filter
   */
  source?: string;
  /**
   * Sort by date or name
   */
  sortBy?: "date" | "name";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Search/filter text
   */
  search?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessReleaseFormsListItem = NonNullable<AccessReleaseFormsListResponse["items"]>[number];

export type AccessReleaseFormsToggleVisibilityResponse = {
  entityId: number;
  entityType: string;
  isHidden: boolean;
  success: boolean;
};

export type AccessReleaseFormsToggleVisibilityBody = {
  /**
   * Release-form entity type. Downloaded source passes row type through; observed values include link, document, user, and guest, but the set is not source-proven closed.
   */
  entityType: string;
};

export interface AccessReleaseFormsToggleVisibilityParams {
  /**
   * releaseFormId
   */
  releaseFormId: string | number;
  /**
   * Request body
   */
  body: AccessReleaseFormsToggleVisibilityBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessReleaseFormsUpdateResponse = {
  id: number;
  name: string;
  success: boolean;
};

export type AccessReleaseFormsUpdateBody = {
  name: string;
};

export interface AccessReleaseFormsUpdateParams {
  /**
   * releaseFormId
   */
  releaseFormId: string | number;
  /**
   * Request body
   */
  body: AccessReleaseFormsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSettingsGetResponse = {
  activityHubAllowed: boolean;
  activityHubTokens: Array<unknown>;
  appOtp: boolean;
  avatarHeaderConverterUpload: boolean;
  blockedCountries: Array<string>;
  blockedIps: Array<unknown>;
  blockedStates: Array<unknown>;
  bundleMaxPrice: number;
  canAcceptMessageOnlyFromFriends: boolean;
  canAddPhone: boolean;
  canAddSubscriberByBundle: {
    discounts: Record<string, string>;
    durations: Record<string, string>;
  };
  canMakeProfileLinks: boolean;
  canSocialsConnect: boolean;
  changeEmailStep: unknown;
  changelogUpdates: number;
  coStreamingRequestFrom: string;
  commentsOnlyForPayers: boolean;
  confirmEmailSentAt: string;
  creatorsCommentsOnlyForFriends: boolean;
  disableSubscribesOffers: boolean;
  faceOtp: boolean;
  forceFaceOtp: boolean;
  hasPaidPosts: boolean;
  hasPassword: boolean;
  hideAfterMassMessages: boolean;
  importantSubscriptionNotifications: boolean;
  isAutoFollowBack: boolean;
  isCoStreamingAllowed: boolean;
  isDeleteInitiated: boolean;
  isDrmEnabled: boolean;
  isEmailNotificationsEnabled: boolean;
  isMonthlyNewsletters: boolean;
  isOldLoginRedirect: boolean;
  isOpenseaConnected: boolean;
  isOtpAppConnected: boolean;
  isPrivate: boolean;
  isSuggestionsOptOut: boolean;
  isTelegramConnected: boolean;
  lastSubscriptionExpiredAt: unknown;
  lifeTimeEmailCode: unknown;
  muteTagsInChats: boolean;
  muteTagsInPosts: boolean;
  muteTagsInStories: boolean;
  muteTagsInStreams: boolean;
  notifyOnAllMentions: boolean;
  phoneLast4: unknown;
  phoneOtp: boolean;
  recommenderReward: null | string;
  replyOnSubscribe: boolean;
  requireFaceIdForPayoutUpdate: boolean;
  sendAwardsTop1: boolean;
  sendAwardsTop5: boolean;
  shouldReceiveLessNotifications: boolean;
  showFriendsToSubscribers: boolean;
  showFullTextInEmailNotify: boolean;
  showPostsTips: boolean;
  showSubscribesOffers: boolean;
  socialsConnects: Array<{
    accountId: string;
    date: string;
    id: number;
    name: string;
    provider: string;
  }>;
  streamingMuxDirectKey: string;
  streamingMuxKey: unknown;
  streamingMuxKeyExpiredAt: unknown;
  streamingMuxServer: null | string;
  streamingObsKey: null | string;
  streamingObsServer: null | string;
  streamingRtmpKey: string;
  streamingRtmpServer: string;
  strongOtp: boolean;
  unfollowAutoFollowBack: boolean;
};

export interface AccessSettingsGetParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSettingsReplaceResponse = {
  success: boolean;
};

export type AccessSettingsReplaceBody = {
  blockedCountries?: Array<string>;
  blockedStates?: Array<string | number>;
};

export interface AccessSettingsReplaceParams {
  /**
   * settingId
   */
  settingId: string | number;
  /**
   * Request body
   */
  body: AccessSettingsReplaceBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSettingsUpdateResponse = {
  init: {
    upload: {
      geoUploadArgs: {
        isDelay: boolean;
        needThumbs: boolean;
        preset: string;
        preset_png: string;
        preset_public: string;
        protected_preset: string;
      };
    };
  };
  success: boolean;
};

export type AccessSettingsUpdateBody = {
  coStreamingRequestFrom?: string;
  isAutoFollowBack?: boolean;
  isDrmEnabled?: boolean;
  isPrivate?: boolean;
  isSuggestionsOptOut?: boolean;
  isWantComments?: boolean;
  phoneOtp?: boolean;
  requireFaceIdForPayoutUpdate?: boolean;
  showFriendsToSubscribers?: boolean;
  showMediaCount?: boolean;
  showPostsTips?: boolean;
  showSubscribersCount?: boolean;
  showSubscribesOffers?: boolean;
  unfollowAutoFollowBack?: boolean;
};

export interface AccessSettingsUpdateParams {
  /**
   * settingId
   */
  settingId: string | number;
  /**
   * Request body
   */
  body: AccessSettingsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesHighlightsCreateResponse = {
  cover: string;
  coverStoryId: number;
  createdAt: string;
  id: number;
  storiesCount: number;
  title: string;
  userId: number;
};

export type AccessStoriesHighlightsCreateBody = {
  /**
   * Story ID to use as highlight cover
   */
  coverStoryId: number;
  /**
   * Story IDs to include in the highlight
   */
  storyIds: Array<number>;
  /**
   * Story highlight title
   */
  title: string;
};

export interface AccessStoriesHighlightsCreateParams {
  /**
   * Request body
   */
  body: AccessStoriesHighlightsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesHighlightsDeleteResponse = {
  success: boolean;
};

export interface AccessStoriesHighlightsDeleteParams {
  /**
   * highlightId
   */
  highlightId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesHighlightsGetResponse = StoryHighlight;

export interface AccessStoriesHighlightsGetParams {
  /**
   * highlightId
   */
  highlightId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesHighlightsRemoveStoryResponse = {
  success: boolean;
};

export interface AccessStoriesHighlightsRemoveStoryParams {
  /**
   * highlightId
   */
  highlightId: string | number;
  /**
   * storyId
   */
  storyId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesHighlightsReplaceResponse = {
  cover: string;
  coverStoryId: number;
  createdAt: string;
  id: number;
  storiesCount: number;
  title: string;
  userId: number;
};

export type AccessStoriesHighlightsReplaceBody = {
  /**
   * Story ID to use as highlight cover
   */
  coverStoryId: number;
  /**
   * Story IDs to include in the highlight
   */
  storyIds: Array<number>;
  /**
   * Story highlight title
   */
  title: string;
};

export interface AccessStoriesHighlightsReplaceParams {
  /**
   * highlightId
   */
  highlightId: string | number;
  /**
   * Request body
   */
  body: AccessStoriesHighlightsReplaceBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesHighlightsUpdateResponse = {
  success: boolean;
};

export type AccessStoriesHighlightsUpdateBody = {
  /**
   * Story IDs to keep in the highlight
   */
  storyIds: Array<number>;
};

export interface AccessStoriesHighlightsUpdateParams {
  /**
   * highlightId
   */
  highlightId: string | number;
  /**
   * Request body
   */
  body: AccessStoriesHighlightsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesUsersBlockResponse = {
  success: boolean;
};

export interface AccessStoriesUsersBlockParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesUsersListBlockedResponse = {
  items: Array<{
    avatar?: string | (unknown | null);
    avatarThumbs?: unknown | null;
    canAddSubscriber?: boolean | null;
    canCommentStory?: boolean | null;
    canEarn?: boolean | null;
    canLookStory?: boolean | null;
    canPayInternal?: boolean | null;
    canReport?: boolean | null;
    canRestrict?: boolean | null;
    currentSubscribePrice?: number | null;
    displayName?: string | null;
    hasNotViewedStory?: boolean | null;
    hasScheduledStream?: boolean | null;
    hasStories?: boolean | null;
    hasStream?: boolean | null;
    header?: string | (unknown | null);
    headerSize?: unknown | null;
    headerThumbs?: unknown | null;
    id?: number | null;
    isActive?: boolean | null;
    isPaywallRequired?: boolean | null;
    isRestricted?: boolean | null;
    isStoryBlockedUser?: boolean | null;
    isVerified?: boolean | null;
    lastSeen?: string | (unknown | null);
    listsStates?: Array<{
      canAddUser?: boolean | null;
      cannotAddUserReason?: (unknown | null) | string;
      hasUser?: boolean | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    notice?: string | null;
    showMediaCount?: boolean | null;
    subscribePrice?: number | null;
    subscribedBy?: boolean | null;
    subscribedByAutoprolong?: boolean | null;
    subscribedByExpire?: boolean | null;
    subscribedByExpireDate?: string | null;
    subscribedIsExpiredNow?: boolean | null;
    subscribedOn?: boolean | null;
    subscribedOnDuration?: string | null;
    subscribedOnExpiredNow?: boolean | null;
    subscriptionBundles?: Array<{
      canBuy?: boolean | null;
      discount?: number | null;
      duration?: number | null;
      id?: number | null;
      price?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    tipsEnabled?: boolean | null;
    tipsMax?: number | null;
    tipsMin?: number | null;
    tipsMinInternal?: number | null;
    tipsTextEnabled?: boolean | null;
    username?: string | null;
  }>;
};

export interface AccessStoriesUsersListBlockedParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesUsersUnblockResponse = {
  success: boolean;
};

export interface AccessStoriesUsersUnblockParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesCreateResponse = Story;

export type AccessStoriesCreateBody = {
  /**
   * One vault image ID or completed image upload reference.
   */
  mediaItems: Array<number | string>;
  releaseForms?: {
    guests?: Array<number>;
    partners?: Array<number>;
    users?: Array<number>;
  };
};

export interface AccessStoriesCreateParams {
  /**
   * Request body
   */
  body: AccessStoriesCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesDeleteResponse = {
  success: boolean;
};

export interface AccessStoriesDeleteParams {
  /**
   * storyId
   */
  storyId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesGetStatsResponse = {
  createdAt: string;
  storyCommentAll: Array<string>;
  storyCommentChart: Array<{
    count: number;
    date: string;
  }>;
  storyCommentCount: number;
  storyLikeAll: Array<string>;
  storyLikeChart: Array<{
    count: number;
    date: string;
  }>;
  storyLikeCount: number;
  storyLookAll: Array<string>;
  storyLookChart: Array<{
    count: number;
    date: string;
  }>;
  storyLookCount: string;
  storyTipAll: Array<unknown>;
  storyTipChart: Array<{
    count: number;
    date: string;
  }>;
  storyTipCount: number;
  storyTipSum: number;
  storyTipSumChart: Array<{
    count: number;
    date: string;
  }>;
};

export interface AccessStoriesGetStatsParams {
  /**
   * storyId
   */
  storyId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesLikeResponse = {
  isLiked: boolean;
  success: boolean;
};

export interface AccessStoriesLikeParams {
  /**
   * storyId
   */
  storyId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesListResponse = {
  items: Array<Story>;
};

export interface AccessStoriesListParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesListAnswersResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessStoriesListAnswersParams {
  /**
   * storyId
   */
  storyId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesListAnswersItem = NonNullable<AccessStoriesListAnswersResponse["items"]>[number];

export type AccessStoriesListArchiveResponse = {
  items: Array<{
    createdAt?: string | null;
    id?: number | null;
    media?: Array<MediaAsset>;
    question?: unknown | null;
  }>;
  page: CursorPage;
};

export interface AccessStoriesListArchiveParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesListArchiveItem = NonNullable<AccessStoriesListArchiveResponse["items"]>[number];

export type AccessStoriesListViewersResponse = StoryViewerPage;

export interface AccessStoriesListViewersParams {
  /**
   * storyId
   */
  storyId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  onlyWithTips?: boolean | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesListViewersItem = NonNullable<AccessStoriesListViewersResponse["items"]>[number];

export type AccessStoriesMarkWatchedResponse = {
  success: boolean;
};

export interface AccessStoriesMarkWatchedParams {
  /**
   * storyId
   */
  storyId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessStoriesUnlikeResponse = {
  isLiked: boolean;
  success: boolean;
};

export interface AccessStoriesUnlikeParams {
  /**
   * storyId
   */
  storyId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersActivityListResponse = SubscriberPage;

export interface AccessSubscribersActivityListParams {
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Start of the subscriber activity window. Use `YYYY-MM-DD HH:mm:ss` or an ISO 8601 timestamp, for example `2026-04-26 00:00:00`.
   */
  startDate: string;
  /**
   * End of the subscriber activity window. Use the current time for an open-ended recent-activity report, for example `2026-05-03 09:51:54`.
   */
  endDate: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersActivityListItem = NonNullable<AccessSubscribersActivityListResponse["items"]>[number];

export type AccessSubscribersActivityListByPromotionResponse = SubscriberPage;

export interface AccessSubscribersActivityListByPromotionParams {
  /**
   * promotionId
   */
  promotionId: string | number;
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersActivityListByPromotionItem = NonNullable<AccessSubscribersActivityListByPromotionResponse["items"]>[number];

export type AccessSubscribersActivityListByTrialLinkResponse = SubscriberPage;

export interface AccessSubscribersActivityListByTrialLinkParams {
  /**
   * trialLinkId
   */
  trialLinkId: string | number;
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersActivityListByTrialLinkItem = NonNullable<AccessSubscribersActivityListByTrialLinkResponse["items"]>[number];

export type AccessSubscribersActivityListNewResponse = SubscriberPage;

export interface AccessSubscribersActivityListNewParams {
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Start of the subscriber activity window. Use `YYYY-MM-DD HH:mm:ss` or an ISO 8601 timestamp, for example `2026-04-26 00:00:00`.
   */
  startDate: string;
  /**
   * End of the subscriber activity window. Use the current time for an open-ended recent-activity report, for example `2026-05-03 09:51:54`.
   */
  endDate: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersActivityListNewItem = NonNullable<AccessSubscribersActivityListNewResponse["items"]>[number];

export type AccessSubscribersActivityListRenewalsResponse = SubscriberPage;

export interface AccessSubscribersActivityListRenewalsParams {
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Start of the subscriber activity window. Use `YYYY-MM-DD HH:mm:ss` or an ISO 8601 timestamp, for example `2026-04-26 00:00:00`.
   */
  startDate: string;
  /**
   * End of the subscriber activity window. Use the current time for an open-ended recent-activity report, for example `2026-05-03 09:51:54`.
   */
  endDate: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersActivityListRenewalsItem = NonNullable<AccessSubscribersActivityListRenewalsResponse["items"]>[number];

export type AccessSubscribersAwardsGetCountResponse = {
  count?: number;
};

export interface AccessSubscribersAwardsGetCountParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersAwardsListResponse = {
  items: Array<Record<string, unknown>>;
  page: CursorPage;
};

export interface AccessSubscribersAwardsListParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersAwardsListItem = NonNullable<AccessSubscribersAwardsListResponse["items"]>[number];

export type AccessSubscribersDeleteNoteResponse = {
  avatar: null | string;
  avatarThumbs: null | {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: null | number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: null | string;
  headerSize: null | {
    height: number;
    width: number;
  };
  headerThumbs: null | {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPaywallRequired: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: null | string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean | null;
  subscribedByAutoprolong: boolean | null;
  subscribedByData: {
    discountFinishedAt: string | null;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string | null;
    duration: string;
    expiredAt: string;
    hasActivePaidSubscriptions: boolean;
    isMuted: boolean;
    newPostsAfterExpireCount: number;
    newPrice: number;
    price: number;
    regularPrice: number;
    renewedAt: string | null;
    showPostsInFeed: boolean;
    status: null | string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: null | string;
      offerStart: null | string;
      price: number;
      regularPrice: number;
      startDate: string;
      subscriberId: number;
      type: string;
      userId: number;
    }>;
    unsubscribeReason: string;
  };
  subscribedByExpire: boolean | null;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean | null;
  subscribedOnData: {
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
    status: null | string;
    streamsSumm: number;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: string;
      offerStart: string;
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
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  subscriptionBundles: Array<{
    canBuy: boolean;
    discount: number;
    duration: number;
    id: number;
    price: number;
  }>;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export interface AccessSubscribersDeleteNoteParams {
  /**
   * Subscriber user ID
   */
  subscriberId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersGetCountResponse = {
  count?: number;
};

export interface AccessSubscribersGetCountParams {
  type?: "active" | "activity" | "all" | "expired";
  isOnline?: boolean | null;
  isInactive?: boolean | null;
  hasRecommenders?: boolean | null;
  hasAutoprolong?: boolean | null;
  duration?: number | null;
  tips?: number | null;
  totalSpent?: number | null;
  spentDateStart?: string;
  spentDateEnd?: string;
  newPriceLessThan?: number | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersListResponse = SubscriberPage;

export interface AccessSubscribersListParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter by online status
   */
  isOnline?: "0" | "1" | "true" | "false";
  /**
   * Minimum total spend
   */
  minSpend?: number | null;
  /**
   * Start of total-spend date window
   */
  spentDateStart?: string;
  /**
   * End of total-spend date window
   */
  spentDateEnd?: string;
  /**
   * Tip amount filter
   */
  tipAmount?: number | null;
  /**
   * Subscription duration in months
   */
  durationMonths?: number;
  /**
   * Filter by inactive subscription state
   */
  isInactive?: "0" | "1" | "true" | "false";
  /**
   * Filter by recommender activity
   */
  hasRecommenders?: "0" | "1" | "true" | "false";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersListItem = NonNullable<AccessSubscribersListResponse["items"]>[number];

export type AccessSubscribersListActiveResponse = SubscriberPage;

export interface AccessSubscribersListActiveParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter by online status
   */
  isOnline?: "0" | "1" | "true" | "false";
  /**
   * Minimum total spend
   */
  minSpend?: number | null;
  /**
   * Start of total-spend date window
   */
  spentDateStart?: string;
  /**
   * End of total-spend date window
   */
  spentDateEnd?: string;
  /**
   * Tip amount filter
   */
  tipAmount?: number | null;
  /**
   * Subscription duration in months
   */
  durationMonths?: number;
  /**
   * Filter by inactive subscription state
   */
  isInactive?: "0" | "1" | "true" | "false";
  /**
   * Filter by recommender activity
   */
  hasRecommenders?: "0" | "1" | "true" | "false";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersListActiveItem = NonNullable<AccessSubscribersListActiveResponse["items"]>[number];

export type AccessSubscribersListExpiredResponse = SubscriberPage;

export interface AccessSubscribersListExpiredParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter by online status
   */
  isOnline?: "0" | "1" | "true" | "false";
  /**
   * Minimum total spend
   */
  minSpend?: number | null;
  /**
   * Start of total-spend date window
   */
  spentDateStart?: string;
  /**
   * End of total-spend date window
   */
  spentDateEnd?: string;
  /**
   * Tip amount filter
   */
  tipAmount?: number | null;
  /**
   * Subscription duration in months
   */
  durationMonths?: number;
  /**
   * Filter by inactive subscription state
   */
  isInactive?: "0" | "1" | "true" | "false";
  /**
   * Filter by recommender activity
   */
  hasRecommenders?: "0" | "1" | "true" | "false";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersListExpiredItem = NonNullable<AccessSubscribersListExpiredResponse["items"]>[number];

export type AccessSubscribersListRecentExpiredResponse = {
  items: Array<{
    id?: number;
  }>;
};

export interface AccessSubscribersListRecentExpiredParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersListSubscriptionHistoryResponse = {
  items: Array<{
    expireDate?: string | null;
    price?: number | null;
    subscribeDate?: string | null;
  }>;
};

export interface AccessSubscribersListSubscriptionHistoryParams {
  /**
   * Subscriber user ID
   */
  subscriberId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersListTopResponse = {
  items: Array<{
    id?: number;
  }>;
};

export interface AccessSubscribersListTopParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersUpdateDiscountResponse = {
  avatar: string;
  avatarThumbs: {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: string;
  headerSize: {
    height: number;
    width: number;
  };
  headerThumbs: {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean;
  subscribedByAutoprolong: boolean;
  subscribedByData: {
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
    status: string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
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
  subscribedByExpire: boolean;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean;
  subscribedOnData: {
    discountFinishedAt: string;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string;
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
    status: string;
    streamsSumm: number;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: string;
      offerStart: string;
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
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export type AccessSubscribersUpdateDiscountBody = {
  /**
   * Discount percentage (1-100)
   */
  discount: number;
  /**
   * Number of months to apply discount
   */
  period: number;
};

export interface AccessSubscribersUpdateDiscountParams {
  /**
   * Subscriber user ID
   */
  subscriberId: string | number;
  /**
   * Request body
   */
  body: AccessSubscribersUpdateDiscountBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersUpdateDisplayNameResponse = {
  avatar: null | string;
  avatarThumbs: null | {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: null | number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: null | string;
  headerSize: null | {
    height: number;
    width: number;
  };
  headerThumbs: null | {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPaywallRequired: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: null | string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean | null;
  subscribedByAutoprolong: boolean | null;
  subscribedByData: {
    discountFinishedAt: string | null;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string | null;
    duration: string;
    expiredAt: string;
    hasActivePaidSubscriptions: boolean;
    isMuted: boolean;
    newPostsAfterExpireCount: number;
    newPrice: number;
    price: number;
    regularPrice: number;
    renewedAt: string | null;
    showPostsInFeed: boolean;
    status: null | string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: null | string;
      offerStart: null | string;
      price: number;
      regularPrice: number;
      startDate: string;
      subscriberId: number;
      type: string;
      userId: number;
    }>;
    unsubscribeReason: string;
  };
  subscribedByExpire: boolean | null;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean | null;
  subscribedOnData: {
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
    status: null | string;
    streamsSumm: number;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: string;
      offerStart: string;
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
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  subscriptionBundles: Array<{
    canBuy: boolean;
    discount: number;
    duration: number;
    id: number;
    price: number;
  }>;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export type AccessSubscribersUpdateDisplayNameBody = {
  /**
   * Custom display name for subscriber
   */
  displayName: string;
};

export interface AccessSubscribersUpdateDisplayNameParams {
  /**
   * Subscriber user ID
   */
  subscriberId: string | number;
  /**
   * Request body
   */
  body: AccessSubscribersUpdateDisplayNameBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscribersUpdateNoteResponse = {
  avatar: null | string;
  avatarThumbs: null | {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: null | number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: null | string;
  headerSize: null | {
    height: number;
    width: number;
  };
  headerThumbs: null | {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPaywallRequired: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: null | string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean | null;
  subscribedByAutoprolong: boolean | null;
  subscribedByData: {
    discountFinishedAt: string | null;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string | null;
    duration: string;
    expiredAt: string;
    hasActivePaidSubscriptions: boolean;
    isMuted: boolean;
    newPostsAfterExpireCount: number;
    newPrice: number;
    price: number;
    regularPrice: number;
    renewedAt: string | null;
    showPostsInFeed: boolean;
    status: null | string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: null | string;
      offerStart: null | string;
      price: number;
      regularPrice: number;
      startDate: string;
      subscriberId: number;
      type: string;
      userId: number;
    }>;
    unsubscribeReason: string;
  };
  subscribedByExpire: boolean | null;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean | null;
  subscribedOnData: {
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
    status: null | string;
    streamsSumm: number;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: string;
      offerStart: string;
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
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  subscriptionBundles: Array<{
    canBuy: boolean;
    discount: number;
    duration: number;
    id: number;
    price: number;
  }>;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export type AccessSubscribersUpdateNoteBody = {
  /**
   * Note about the subscriber
   */
  notice: string;
};

export interface AccessSubscribersUpdateNoteParams {
  /**
   * Subscriber user ID
   */
  subscriberId: string | number;
  /**
   * Request body
   */
  body: AccessSubscribersUpdateNoteBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsGetCountResponse = {
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
};

export interface AccessSubscriptionsGetCountParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsGetSubscribedCountResponse = {
  count: number;
  hasMore?: boolean;
  list?: Array<unknown | null>;
};

export interface AccessSubscriptionsGetSubscribedCountParams {
  type?: "active" | "all" | "attention" | "expired";
  isOnline?: boolean | null;
  isPaid?: boolean | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsHidePostsResponse = {
  success: boolean;
};

export interface AccessSubscriptionsHidePostsParams {
  /**
   * subscriptionId
   */
  subscriptionId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsListResponse = {
  items: Array<{
    avatar?: (unknown | null) | string;
    avatarThumbs?: (unknown | null) | {
      c144?: string | null;
      c50?: string | null;
    } | (Array<unknown | null>);
    canAddSubscriber?: boolean | null;
    canCommentStory?: boolean | null;
    canEarn?: boolean | null;
    canLookStory?: boolean | null;
    canPayInternal?: boolean | null;
    canReceiveChatMessage?: boolean | null;
    canReport?: boolean | null;
    canRestrict?: boolean | null;
    canTrialSend?: boolean | null;
    canUnsubscribe?: boolean | null;
    currentSubscribePrice?: (unknown | null) | number;
    displayName?: string | null;
    hasNotViewedStory?: boolean | null;
    hasScheduledStream?: boolean | null;
    hasStories?: boolean | null;
    hasStream?: boolean | null;
    header?: (unknown | null) | string;
    headerSize?: (unknown | null) | {
      height?: number | null;
      width?: number | null;
    } | (Array<unknown | null>);
    headerThumbs?: (unknown | null) | {
      w480?: string | null;
      w760?: string | null;
    } | (Array<unknown | null>);
    hideChat?: boolean | null;
    id?: number | null;
    isActive?: boolean | null;
    isBlocked?: boolean | null;
    isPaywallRequired?: boolean | null;
    isPendingAutoprolong?: boolean | null;
    isPerformer?: boolean | null;
    isRealPerformer?: boolean | null;
    isRestricted?: boolean | null;
    isVerified?: boolean | null;
    lastSeen?: (unknown | null) | string;
    listsStates?: Array<{
      canAddUser?: boolean | null;
      cannotAddUserReason?: (unknown | null) | string;
      hasUser?: boolean | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    notice?: string | null;
    subscribePrice?: number | null;
    subscribedBy?: boolean | (unknown | null);
    subscribedByAutoprolong?: boolean | (unknown | null);
    subscribedByData?: {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPostsAfterExpireCount?: number | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      showPostsInFeed?: boolean | null;
      status?: (unknown | null) | string;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subscribedByExpire?: boolean | (unknown | null);
    subscribedByExpireDate?: string | null;
    subscribedIsExpiredNow?: boolean | null;
    subscribedOn?: boolean | (unknown | null);
    subscribedOnData?: (unknown | null) | {
      discountFinishedAt?: (unknown | null) | string;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: (unknown | null) | string;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | null;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | null;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | (unknown | null);
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | (unknown | null);
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>);
    subscribedOnDuration?: (unknown | null) | string;
    subscribedOnExpiredNow?: boolean | (unknown | null);
    subscriptionBundles?: Array<{
      canBuy?: boolean | null;
      discount?: number | null;
      duration?: number | null;
      id?: number | null;
      price?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    tipsEnabled?: boolean | null;
    tipsMax?: number | null;
    tipsMin?: number | null;
    tipsMinInternal?: number | null;
    tipsTextEnabled?: boolean | null;
    username?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessSubscriptionsListParams {
  /**
   * Number of subscriptions to return (1-50)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter to online or offline creators
   */
  isOnline?: boolean;
  /**
   * Filter by paid subscription state
   */
  isPaid?: boolean;
  /**
   * Filter by purchase activity
   */
  hasPurchases?: boolean;
  /**
   * Include blocked subscriptions
   */
  withBlocked?: boolean;
  /**
   * Field to sort or filter subscriptions by
   */
  field?: "expire_date" | "is_expired" | "last_activity" | "subscribe_date";
  /**
   * Sort direction
   */
  sort?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsListItem = NonNullable<AccessSubscriptionsListResponse["items"]>[number];

export type AccessSubscriptionsListActiveResponse = {
  items: Array<{
    avatar?: (unknown | null) | string;
    avatarThumbs?: (unknown | null) | {
      c144?: string | null;
      c50?: string | null;
    } | (Array<unknown | null>);
    canAddSubscriber?: boolean | null;
    canCommentStory?: boolean | null;
    canEarn?: boolean | null;
    canLookStory?: boolean | null;
    canPayInternal?: boolean | null;
    canReceiveChatMessage?: boolean | null;
    canReport?: boolean | null;
    canRestrict?: boolean | null;
    canTrialSend?: boolean | null;
    canUnsubscribe?: boolean | null;
    currentSubscribePrice?: (unknown | null) | number;
    displayName?: string | null;
    hasNotViewedStory?: boolean | null;
    hasScheduledStream?: boolean | null;
    hasStories?: boolean | null;
    hasStream?: boolean | null;
    header?: (unknown | null) | string;
    headerSize?: (unknown | null) | {
      height?: number | null;
      width?: number | null;
    } | (Array<unknown | null>);
    headerThumbs?: (unknown | null) | {
      w480?: string | null;
      w760?: string | null;
    } | (Array<unknown | null>);
    hideChat?: boolean | null;
    id?: number | null;
    isActive?: boolean | null;
    isBlocked?: boolean | null;
    isPaywallRequired?: boolean | null;
    isPendingAutoprolong?: boolean | null;
    isPerformer?: boolean | null;
    isRealPerformer?: boolean | null;
    isRestricted?: boolean | null;
    isVerified?: boolean | null;
    lastSeen?: (unknown | null) | string;
    listsStates?: Array<{
      canAddUser?: boolean | null;
      cannotAddUserReason?: (unknown | null) | string;
      hasUser?: boolean | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    notice?: string | null;
    subscribePrice?: number | null;
    subscribedBy?: boolean | (unknown | null);
    subscribedByAutoprolong?: boolean | (unknown | null);
    subscribedByData?: {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPostsAfterExpireCount?: number | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      showPostsInFeed?: boolean | null;
      status?: (unknown | null) | string;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subscribedByExpire?: boolean | (unknown | null);
    subscribedByExpireDate?: string | null;
    subscribedIsExpiredNow?: boolean | null;
    subscribedOn?: boolean | (unknown | null);
    subscribedOnData?: (unknown | null) | {
      discountFinishedAt?: (unknown | null) | string;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: (unknown | null) | string;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | null;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | null;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | (unknown | null);
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | (unknown | null);
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>);
    subscribedOnDuration?: (unknown | null) | string;
    subscribedOnExpiredNow?: boolean | (unknown | null);
    subscriptionBundles?: Array<{
      canBuy?: boolean | null;
      discount?: number | null;
      duration?: number | null;
      id?: number | null;
      price?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    tipsEnabled?: boolean | null;
    tipsMax?: number | null;
    tipsMin?: number | null;
    tipsMinInternal?: number | null;
    tipsTextEnabled?: boolean | null;
    username?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessSubscriptionsListActiveParams {
  /**
   * Number of subscriptions to return (1-50)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter to online or offline creators
   */
  isOnline?: boolean;
  /**
   * Filter by paid subscription state
   */
  isPaid?: boolean;
  /**
   * Filter by purchase activity
   */
  hasPurchases?: boolean;
  /**
   * Include blocked subscriptions
   */
  withBlocked?: boolean;
  /**
   * Field to sort or filter subscriptions by
   */
  field?: "expire_date" | "is_expired" | "last_activity" | "subscribe_date";
  /**
   * Sort direction
   */
  sort?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsListActiveItem = NonNullable<AccessSubscriptionsListActiveResponse["items"]>[number];

export type AccessSubscriptionsListExpiredResponse = {
  items: Array<{
    avatar?: (unknown | null) | string;
    avatarThumbs?: (unknown | null) | {
      c144?: string | null;
      c50?: string | null;
    } | (Array<unknown | null>);
    canAddSubscriber?: boolean | null;
    canCommentStory?: boolean | null;
    canEarn?: boolean | null;
    canLookStory?: boolean | null;
    canPayInternal?: boolean | null;
    canReceiveChatMessage?: boolean | null;
    canReport?: boolean | null;
    canRestrict?: boolean | null;
    canTrialSend?: boolean | null;
    canUnsubscribe?: boolean | null;
    currentSubscribePrice?: (unknown | null) | number;
    displayName?: string | null;
    hasNotViewedStory?: boolean | null;
    hasScheduledStream?: boolean | null;
    hasStories?: boolean | null;
    hasStream?: boolean | null;
    header?: (unknown | null) | string;
    headerSize?: (unknown | null) | {
      height?: number | null;
      width?: number | null;
    } | (Array<unknown | null>);
    headerThumbs?: (unknown | null) | {
      w480?: string | null;
      w760?: string | null;
    } | (Array<unknown | null>);
    hideChat?: boolean | null;
    id?: number | null;
    isActive?: boolean | null;
    isBlocked?: boolean | null;
    isPaywallRequired?: boolean | null;
    isPendingAutoprolong?: boolean | null;
    isPerformer?: boolean | null;
    isRealPerformer?: boolean | null;
    isRestricted?: boolean | null;
    isVerified?: boolean | null;
    lastSeen?: (unknown | null) | string;
    listsStates?: Array<{
      canAddUser?: boolean | null;
      cannotAddUserReason?: (unknown | null) | string;
      hasUser?: boolean | null;
      id?: string | null;
      name?: string | null;
      type?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    notice?: string | null;
    subscribePrice?: number | null;
    subscribedBy?: boolean | (unknown | null);
    subscribedByAutoprolong?: boolean | (unknown | null);
    subscribedByData?: {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      newPostsAfterExpireCount?: number | null;
      newPrice?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      showPostsInFeed?: boolean | null;
      status?: (unknown | null) | string;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | (unknown | null);
    subscribedByExpire?: boolean | (unknown | null);
    subscribedByExpireDate?: string | null;
    subscribedIsExpiredNow?: boolean | null;
    subscribedOn?: boolean | (unknown | null);
    subscribedOnData?: (unknown | null) | {
      discountFinishedAt?: (unknown | null) | string;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: (unknown | null) | string;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: string | null;
        offerStart?: string | null;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | null;
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | null;
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | (unknown | null);
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: string | (unknown | null);
      status?: string | (unknown | null);
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<unknown | null>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>) | {
      discountFinishedAt?: string | (unknown | null);
      discountPercent?: number | null;
      discountPeriod?: number | null;
      discountStartedAt?: string | (unknown | null);
      duration?: string | null;
      expiredAt?: string | null;
      hasActivePaidSubscriptions?: boolean | null;
      isMuted?: boolean | null;
      messagesSumm?: number | null;
      newPrice?: number | null;
      postsSumm?: number | null;
      price?: number | null;
      regularPrice?: number | null;
      renewedAt?: (unknown | null) | string;
      status?: (unknown | null) | string;
      streamsSumm?: number | null;
      subscribeAt?: string | null;
      subscribePrice?: number | null;
      subscribes?: Array<{
        action?: string | null;
        cancelDate?: unknown | null;
        date?: string | null;
        discount?: number | null;
        duration?: number | null;
        earningId?: number | null;
        expireDate?: string | null;
        id?: number | null;
        isCurrent?: boolean | null;
        offerEnd?: (unknown | null) | string;
        offerStart?: (unknown | null) | string;
        price?: number | null;
        regularPrice?: number | null;
        startDate?: string | null;
        subscriberId?: number | null;
        type?: string | null;
        userId?: number | null;
      } | (Array<unknown | null>) | (unknown | null)>;
      subscribesSumm?: number | null;
      tipsSumm?: number | null;
      totalSumm?: number | null;
      unsubscribeReason?: string | null;
    } | (Array<unknown | null>);
    subscribedOnDuration?: (unknown | null) | string;
    subscribedOnExpiredNow?: boolean | (unknown | null);
    subscriptionBundles?: Array<{
      canBuy?: boolean | null;
      discount?: number | null;
      duration?: number | null;
      id?: number | null;
      price?: number | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    tipsEnabled?: boolean | null;
    tipsMax?: number | null;
    tipsMin?: number | null;
    tipsMinInternal?: number | null;
    tipsTextEnabled?: boolean | null;
    username?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessSubscriptionsListExpiredParams {
  /**
   * Number of subscriptions to return (1-50)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter to online or offline creators
   */
  isOnline?: boolean;
  /**
   * Filter by paid subscription state
   */
  isPaid?: boolean;
  /**
   * Filter by purchase activity
   */
  hasPurchases?: boolean;
  /**
   * Include blocked subscriptions
   */
  withBlocked?: boolean;
  /**
   * Field to sort or filter subscriptions by
   */
  field?: "expire_date" | "is_expired" | "last_activity" | "subscribe_date";
  /**
   * Sort direction
   */
  sort?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessSubscriptionsListExpiredItem = NonNullable<AccessSubscriptionsListExpiredResponse["items"]>[number];

export type AccessSubscriptionsUnhidePostsResponse = {
  success: boolean;
};

export interface AccessSubscriptionsUnhidePostsParams {
  /**
   * subscriptionId
   */
  subscriptionId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUploadsFinalizeResponse = {
  /**
   * Upload references that were finalized. Use these strings in mediaItems for posts, messages, stories, or mass messages.
   */
  uploadIds: Array<string>;
} | {
  /**
   * Vault list ID the media was added to, when requested.
   */
  listId?: number;
  /**
   * Temporary scheduled message ID used to create Vault media.
   */
  messageId?: string | number;
  /**
   * Mapping from each finalized uploadId to its numeric Vault mediaId and media object.
   */
  uploads: Array<{
    /**
     * Full Vault media object created for this upload.
     */
    media: MediaAsset;
    /**
     * Numeric Vault media ID created for this upload.
     */
    mediaId: number;
    /**
     * Upload reference that was finalized into Vault media.
     */
    uploadId: string;
  }>;
};

export type AccessUploadsFinalizeBody = {
  /**
   * Optional existing numeric Vault media IDs to include when adding finalized uploads to a Vault list.
   */
  mediaIds?: Array<number>;
  /**
   * Upload IDs returned by the start upload endpoint.
   */
  uploadIds: Array<string>;
  /**
   * Optional Vault options. Include this object when you need numeric Vault media IDs.
   */
  vaultUpload?: {
    /**
     * Optional Vault list ID. When present, OFAuth adds all returned mediaIds to this list.
     */
    listId?: number;
    /**
     * User ID used to create the temporary scheduled message that turns uploads into Vault media.
     */
    userId: string;
  };
};

export interface AccessUploadsFinalizeParams {
  /**
   * Request body
   */
  body: AccessUploadsFinalizeBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUploadsStartResponse = UploadInitResponse;

export type AccessUploadsStartBody = {
  /**
   * MIME type of the file (e.g., image/jpeg, video/mp4)
   */
  contentType: string;
  /**
   * Required file ETag/hash. OFAuth uses this to check whether the media already exists before creating upload URLs.
   */
  etag: string;
  /**
   * Original filename, including its extension
   */
  filename: string;
  /**
   * File size in bytes
   */
  size: number;
};

export interface AccessUploadsStartParams {
  /**
   * Request body
   */
  body: AccessUploadsStartBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersFriendsListResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessUsersFriendsListParams {
  /**
   * userId
   */
  userId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersFriendsListItem = NonNullable<AccessUsersFriendsListResponse["items"]>[number];

export type AccessUsersFriendsListPinnedResponse = {
  items: Array<unknown | null>;
};

export interface AccessUsersFriendsListPinnedParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersLabelsCreateResponse = {
  id: number;
  isClearInProgress: boolean;
  name: string;
  posts: Array<unknown>;
  postsCount: number;
  type: string;
};

export type AccessUsersLabelsCreateBody = {
  name?: string;
};

export interface AccessUsersLabelsCreateParams {
  /**
   * Request body
   */
  body: AccessUsersLabelsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersLabelsDeleteResponse = {
  success: boolean;
};

export interface AccessUsersLabelsDeleteParams {
  /**
   * labelId
   */
  labelId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersLabelsGetResponse = {
  id: number;
  isClearInProgress: boolean;
  name: string;
  posts: Array<{
    canViewMedia: boolean;
    media?: Array<MediaAsset>;
    postId: number;
    type: string;
    url: string;
  }>;
  postsCount: number;
  type: string;
};

export interface AccessUsersLabelsGetParams {
  /**
   * labelId
   */
  labelId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersLabelsListResponse = {
  items: Array<{
    id?: number | string | (unknown | null);
    isClearInProgress?: boolean | null;
    name?: string | null;
    posts?: Array<{
      canViewMedia?: boolean | null;
      media?: Array<MediaAsset>;
      postId?: number | null;
      type?: string | null;
      url?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    postsCount?: number | null;
    type?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessUsersLabelsListParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  query?: string;
  ids?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersLabelsListItem = NonNullable<AccessUsersLabelsListResponse["items"]>[number];

export type AccessUsersLabelsListForUserResponse = {
  items: Array<{
    id?: number | string | (unknown | null);
    isClearInProgress?: boolean | null;
    name?: string | null;
    postsCount?: number | null;
    type?: string | null;
  }>;
  page: CursorPage;
};

export interface AccessUsersLabelsListForUserParams {
  /**
   * userId
   */
  userId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersLabelsListForUserItem = NonNullable<AccessUsersLabelsListForUserResponse["items"]>[number];

export type AccessUsersMediaGetPurchasedResponse = {
  purchasedMediaIds: Array<unknown>;
};

export interface AccessUsersMediaGetPurchasedParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Media IDs to check for purchased access.
   */
  mediaIds?: (number | null) | (Array<number | null>) | (unknown | null);
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersSocialListButtonsResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessUsersSocialListButtonsParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersStoriesListResponse = {
  items: Array<Story>;
};

export interface AccessUsersStoriesListParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersStoriesListHighlightsResponse = {
  items: Array<{
    cover?: string | null;
    coverStoryId?: number | null;
    createdAt?: string | null;
    id?: number | null;
    storiesCount?: number | null;
    title?: string | null;
    userId?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessUsersStoriesListHighlightsParams {
  /**
   * userId
   */
  userId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  storyIdToCheck?: number | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersStoriesListHighlightsItem = NonNullable<AccessUsersStoriesListHighlightsResponse["items"]>[number];

export type AccessUsersStreamsListResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessUsersStreamsListParams {
  /**
   * userId
   */
  userId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersStreamsListItem = NonNullable<AccessUsersStreamsListResponse["items"]>[number];

export type AccessUsersStreamsListScheduledResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessUsersStreamsListScheduledParams {
  /**
   * userId
   */
  userId: string | number;
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersStreamsListScheduledItem = NonNullable<AccessUsersStreamsListScheduledResponse["items"]>[number];

export type AccessUsersAddToListsResponse = {
  errors?: Array<{
    error: string;
    listId: number;
  }>;
  success: Array<{
    listId: number;
    success: boolean;
  }>;
};

export type AccessUsersAddToListsBody = {
  /**
   * List IDs to add the user to
   */
  listIds: Array<number | string>;
};

export interface AccessUsersAddToListsParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Request body
   */
  body: AccessUsersAddToListsBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersBatchResponse = {
  /**
   * The users that were found, in request order. Ids OnlyFans cannot return are left out.
   */
  users: Array<{
    avatar?: string | null;
    avatarThumbs?: AvatarThumbs | null;
    canAddSubscriber?: boolean;
    canCommentStory?: boolean;
    canEarn?: boolean;
    canLookStory?: boolean;
    canPayInternal?: boolean;
    canReceiveChatMessage?: boolean;
    canReport?: boolean;
    canRestrict?: boolean;
    canTrialSend?: boolean;
    canUnsubscribe?: boolean;
    currentSubscribePrice?: number | null;
    displayName?: string;
    hasNotViewedStory?: boolean;
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
    hideChat?: boolean;
    id: number;
    isActive?: boolean;
    isAdultContent?: boolean;
    isBlocked?: boolean;
    isDeleted?: boolean;
    isFriend?: boolean;
    isPaywallRequired?: boolean;
    isPendingAutoprolong?: boolean;
    isPerformer?: boolean;
    isRealPerformer?: boolean;
    isRestricted?: boolean;
    isVerified?: boolean;
    lastSeen?: string | null;
    listsStates?: Array<{
      canAddUser?: boolean;
      cannotAddUserReason?: string | null;
      hasUser: boolean;
      id: string | number;
      name: string;
      type: string;
    }>;
    name?: string;
    newFan?: boolean;
    notice?: string;
    showMediaCount?: boolean;
    subscribePrice?: number;
    subscribedBy?: boolean | null;
    subscribedByAutoprolong?: boolean | null;
    subscribedByData?: {
      discountFinishedAt?: string | null;
      discountPercent?: number;
      discountPeriod?: number;
      discountStartedAt?: string | null;
      duration?: string;
      expiredAt?: string;
      hasActivePaidSubscriptions?: boolean;
      isMuted?: boolean;
      newPrice?: number;
      price?: number;
      regularPrice?: number;
      renewedAt?: string | null;
      showPostsInFeed?: boolean;
      status?: string | null;
      subscribeAt?: string;
      subscribePrice?: number;
      subscribes?: Array<{
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
      unsubscribeReason?: string;
    } | null;
    subscribedByExpire?: boolean | null;
    subscribedByExpireDate?: string | null;
    subscribedIsExpiredNow?: boolean | null;
    subscribedOn?: boolean | null;
    subscribedOnData?: {
      discountFinishedAt?: string | null;
      discountPercent?: number;
      discountPeriod?: number;
      discountStartedAt?: string | null;
      duration?: string;
      expiredAt?: string;
      hasActivePaidSubscriptions?: boolean;
      isMuted?: boolean;
      messagesSumm?: number;
      newPrice?: number;
      postsSumm?: number;
      price?: number;
      regularPrice?: number;
      renewedAt?: string | null;
      status?: string | null;
      streamsSumm?: number;
      subscribeAt?: string;
      subscribePrice?: number;
      subscribes?: Array<{
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
      subscribesSumm?: number;
      tipsSumm?: number;
      totalSumm?: number;
      unsubscribeReason?: string;
    } | null;
    subscribedOnDuration?: string;
    subscribedOnExpiredNow?: boolean;
    subscriptionBundles?: Array<{
      canBuy?: boolean;
      discount?: number;
      duration?: number;
      id: number;
      price?: number;
    }>;
    tipsEnabled?: boolean;
    tipsMax?: number;
    tipsMin?: number;
    tipsMinInternal?: number;
    tipsTextEnabled?: boolean;
    topFan?: boolean;
    username?: string;
  }>;
};

export type AccessUsersBatchBody = {
  /**
   * User IDs to fetch. Maximum 10 user IDs per request.
   */
  userIds: Array<string>;
};

export interface AccessUsersBatchParams {
  /**
   * Request body
   */
  body: AccessUsersBatchBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersBlockResponse = {
  hideChat: boolean;
  success: boolean;
  user: {
    avatar: null | string;
    avatarThumbs: null | {
      c144: string;
      c50: string;
    };
    canAddSubscriber: boolean;
    canCommentStory: boolean;
    canEarn: boolean;
    canLookStory: boolean;
    canPayInternal: boolean;
    canReceiveChatMessage: boolean;
    canReport: boolean;
    canRestrict: boolean;
    canTrialSend: boolean;
    currentSubscribePrice: number | null;
    displayName: string;
    hasNotViewedStory: boolean;
    hasScheduledStream: boolean;
    hasStories: boolean;
    hasStream: boolean;
    header: null | string;
    headerSize: null | {
      height: number;
      width: number;
    };
    headerThumbs: null | {
      w480: string;
      w760: string;
    };
    hideChat: boolean;
    id: number;
    isActive: boolean;
    isBlocked: boolean;
    isPaywallRequired: boolean;
    isPendingAutoprolong: boolean;
    isPerformer: boolean;
    isRealPerformer: boolean;
    isRestricted: boolean;
    isVerified: boolean;
    lastSeen: null | string;
    listsStates: Array<{
      canAddUser: boolean;
      cannotAddUserReason: null | string;
      hasUser: boolean;
      id: string;
      name: string;
      type: string;
    }>;
    name: string;
    notice: string;
    postsCount: number;
    subscribePrice: number;
    subscribedBy: boolean | null;
    subscribedByAutoprolong: boolean | null;
    subscribedByData: {
      discountFinishedAt: string | null;
      discountPercent: number;
      discountPeriod: number;
      discountStartedAt: string | null;
      duration: string;
      expiredAt: string;
      hasActivePaidSubscriptions: boolean;
      isMuted: boolean;
      newPostsAfterExpireCount: number;
      newPrice: number;
      price: number;
      regularPrice: number;
      renewedAt: string | null;
      showPostsInFeed: boolean;
      status: string | null;
      subscribeAt: string;
      subscribePrice: number;
      subscribes: Array<unknown>;
      unsubscribeReason: string;
    };
    subscribedByExpire: boolean | null;
    subscribedByExpireDate: string;
    subscribedIsExpiredNow: boolean;
    subscribedOn: boolean | null;
    subscribedOnData: {
      discountFinishedAt: null | string;
      discountPercent: number;
      discountPeriod: number;
      discountStartedAt: null | string;
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
      subscribes: Array<unknown>;
      subscribesSumm: number;
      tipsSumm: number;
      totalSumm: number;
      unsubscribeReason: string;
    };
    subscribedOnDuration: string;
    subscribedOnExpiredNow: boolean;
    tipsEnabled: boolean;
    tipsMax: number;
    tipsMin: number;
    tipsMinInternal: number;
    tipsTextEnabled: boolean;
    username: string;
  };
};

export type AccessUsersBlockBody = Record<string, unknown>;

export interface AccessUsersBlockParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Request body
   */
  body: AccessUsersBlockBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersExistsResponse = {
  success: boolean;
};

export type AccessUsersExistsBody = {
  username?: string;
};

export interface AccessUsersExistsParams {
  /**
   * Request body
   */
  body: AccessUsersExistsBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersGetResponse = {
  about?: string;
  advBlock?: Array<string>;
  ageVerificationRequired?: boolean;
  archivedPostsCount?: number;
  audiosCount?: number;
  avatar?: null | string;
  avatarHeaderConverterUpload?: boolean;
  avatarThumbs?: null | {
    c144?: string;
    c50?: string;
  };
  canAddCard?: boolean;
  canAddStory?: boolean;
  canAddSubscriber?: boolean;
  canAlternativeWalletTopUp?: boolean;
  canChangeContentPrice?: boolean;
  canChat?: boolean;
  canCommentStory?: boolean;
  canConnectOfAccount?: boolean;
  canCreateFundRaising?: boolean;
  canCreateLists?: boolean;
  canCreatePromotion?: boolean;
  canCreateTrial?: boolean;
  canEarn?: boolean;
  canLookStory?: boolean;
  canMakeExpirePosts?: boolean;
  canPayInternal?: boolean;
  canPinPost?: boolean;
  canReceiveChatMessage?: boolean;
  canReceiveManualPayout?: boolean;
  canReceiveStripePayout?: boolean;
  canReport?: boolean;
  canRestrict?: boolean;
  canSendChatToAll?: boolean;
  canStreaming?: boolean;
  canTrialSend?: boolean;
  canUnsubscribe?: boolean;
  canUploadAvatarHeader?: boolean;
  canUploadMedia?: boolean;
  chatMessagesCount?: number;
  connectedOfAccounts?: Array<unknown>;
  countPinnedChat?: number;
  countPriorityChat?: number;
  creditBalance?: number;
  creditsMax?: number;
  creditsMin?: number;
  creditsMinAlternatives?: number;
  currentSubscribePrice?: null | number;
  displayName?: string;
  enabledImageEditorForChat?: boolean;
  faceIdRegular?: Array<unknown>;
  favoritedCount?: number;
  favoritesCount?: number;
  finishedStreamsCount?: number;
  firstPublishedPostDate?: string;
  hasFriends?: boolean;
  hasInternalPayments?: boolean;
  hasLabels?: boolean;
  hasLinks?: boolean;
  hasNewAlerts?: boolean;
  hasNewChangedPriceSubscriptions?: boolean;
  hasNewHints?: boolean;
  hasNewTicketReplies?: {
    appeal_form?: boolean;
    closed?: boolean;
    open?: boolean;
    solved?: boolean;
  };
  hasNotViewedStory?: boolean;
  hasPinnedPosts?: boolean;
  hasPurchasedPosts?: boolean;
  hasSavedStreams?: boolean;
  hasScenario?: boolean;
  hasScheduledStream?: boolean;
  hasStories?: boolean;
  hasStream?: boolean;
  hasStripe?: boolean;
  hasSystemNotifications?: boolean;
  hasWatermarkPhoto?: boolean;
  hasWatermarkVideo?: boolean;
  header?: null | string;
  headerSize?: null | {
    height?: number;
    width?: number;
  };
  headerThumbs?: null | {
    w480?: string;
    w760?: string;
  };
  hideChat?: boolean;
  id: number;
  isActive?: boolean;
  isAdultContent?: boolean;
  isAgeVerified?: boolean;
  isAllowTweets?: boolean;
  isBlocked?: boolean;
  isCountryVatNumberCollect?: boolean;
  isCountryVatRefundable?: boolean;
  isCountryWithVat?: boolean;
  isCreditsEnabled?: boolean;
  isDeleteInitiated?: boolean;
  isEmailChecked?: boolean;
  isEmailRequired?: boolean;
  isLegalApprovedAllowed?: boolean;
  isMakePayment?: boolean;
  isMarkdownDisabledForAbout?: boolean;
  isNeedConfirmPayout?: boolean;
  isOtpEnabled?: boolean;
  isPaymentCardConnected?: boolean;
  isPaywallPassed?: boolean;
  isPaywallRequired?: boolean;
  isPendingAutoprolong?: boolean;
  isPerformer?: boolean;
  isPrivateRestriction?: boolean;
  isRealCardConnected?: boolean;
  isRealPerformer?: boolean;
  isReferrerAllowed?: boolean;
  isRestricted?: boolean;
  isScheduledStreamsAllowed?: boolean;
  isSpotifyConnected?: boolean;
  isSpringConnected?: boolean;
  isStripeExist?: boolean;
  isTwitterConnected?: boolean;
  isVatRequired?: boolean;
  isVerified?: boolean;
  isVerifiedReason?: boolean;
  isVisibleOnline?: boolean;
  isWalletAutorecharge?: boolean;
  isWantComments?: boolean;
  ivCountry?: string;
  ivDocExpired?: boolean;
  ivFailReason?: unknown;
  ivFlow?: string;
  ivHideForPerformers?: boolean;
  ivStatus?: string;
  joinDate?: string;
  lastSeen?: string | null;
  listsStates?: Array<{
    canAddUser?: boolean;
    cannotAddUserReason?: null | string;
    hasUser?: boolean;
    id?: string;
    name?: string;
    type?: string;
  }>;
  location?: unknown;
  maxFundRaisingTarget?: number;
  maxPinnedPostsCount?: number;
  mediasCount?: number;
  messageMaxPrice?: number;
  messageMinPrice?: number;
  minFundRaisingTarget?: number;
  name: string;
  needIVApprove?: boolean;
  notice?: string;
  notificationsCount?: number;
  paidFeed?: boolean;
  payPalStatus?: Array<unknown>;
  payoutLegalApproveState?: string;
  payoutType?: string;
  performerTop?: number;
  photosCount?: number;
  pinnedPostsCount?: number;
  postMaxPrice?: number;
  postMinPrice?: number;
  postsCount?: number;
  privateArchivedPostsCount?: number;
  promoOffers?: Array<{
    createdAt?: string;
    expiredAt?: string;
    finishedAt?: string;
    id?: number;
    subscribeDays?: number;
    subscriberId?: string;
    userId?: string;
  }>;
  promotions?: Array<{
    canClaim?: boolean;
    claimsCount?: number;
    createdAt?: string;
    finishedAt?: string;
    hasRelatedPromo?: boolean;
    id?: number;
    isFinished?: boolean;
    message?: string;
    price?: number;
    rawMessage?: string;
    subscribeCounts?: number;
    subscribeDays?: number;
    type?: string;
  }>;
  rfDocAllowedUploads?: number;
  shouldShowFinishedStreams?: boolean;
  showMediaCount?: boolean;
  showPostsInFeed?: boolean;
  showSubscribersCount?: boolean;
  subscribeMaxPrice?: number;
  subscribeMinPrice?: number;
  subscribePrice?: number;
  subscribedBy?: boolean | null;
  subscribedByAutoprolong?: boolean | null;
  subscribedByData?: null | {
    discountFinishedAt?: string | null;
    discountPercent?: number;
    discountPeriod?: number;
    discountStartedAt?: string | null;
    duration?: string;
    expiredAt?: string;
    hasActivePaidSubscriptions?: boolean;
    isMuted?: boolean;
    newPostsAfterExpireCount?: number;
    newPrice?: number;
    price?: number;
    regularPrice?: number;
    renewedAt?: string | null;
    showPostsInFeed?: boolean;
    status?: null | string;
    subscribeAt?: string;
    subscribePrice?: number;
    subscribes?: Array<{
      action?: string;
      cancelDate?: unknown;
      date?: string;
      discount?: number;
      duration?: number;
      earningId?: number;
      expireDate?: string;
      id?: number;
      isCurrent?: boolean;
      offerEnd?: string;
      offerStart?: string;
      price?: number;
      regularPrice?: number;
      startDate?: string;
      subscriberId?: number;
      type?: string;
      userId?: number;
    }>;
    unsubscribeReason?: string;
  } | {
    discountFinishedAt?: string | null;
    discountPercent?: number;
    discountPeriod?: number;
    discountStartedAt?: string | null;
    duration?: string;
    expiredAt?: string;
    hasActivePaidSubscriptions?: boolean;
    isMuted?: boolean;
    newPostsAfterExpireCount?: number;
    newPrice?: number;
    price?: number;
    regularPrice?: number;
    renewedAt?: string | null;
    showPostsInFeed?: boolean;
    status?: string | null;
    subscribeAt?: string;
    subscribePrice?: number;
    subscribes?: Array<unknown>;
    unsubscribeReason?: string;
  };
  subscribedByExpire?: boolean | null;
  subscribedByExpireDate?: string;
  subscribedIsExpiredNow?: boolean;
  subscribedOn?: boolean | null;
  subscribedOnData?: null | {
    discountFinishedAt?: string | null;
    discountPercent?: number;
    discountPeriod?: number;
    discountStartedAt?: string | null;
    duration?: string;
    expiredAt?: string;
    hasActivePaidSubscriptions?: boolean;
    isMuted?: boolean;
    lastActivity?: string;
    messagesSumm?: number;
    newPrice?: number;
    postsSumm?: number;
    price?: number;
    recommendations?: number;
    regularPrice?: number;
    renewedAt?: string | null;
    status?: null | string;
    streamsSumm?: number;
    subscribeAt?: string;
    subscribePrice?: number;
    subscribes?: Array<{
      action?: string;
      cancelDate?: unknown;
      date?: string;
      discount?: number;
      duration?: number;
      earningId?: number;
      expireDate?: string;
      id?: number;
      isCurrent?: boolean;
      offerEnd?: string;
      offerStart?: string;
      price?: number;
      regularPrice?: number;
      startDate?: string;
      subscriberId?: number;
      type?: string;
      userId?: number;
    }>;
    subscribesSumm?: number;
    tipsSumm?: number;
    totalSumm?: number;
    unsubscribeReason?: string;
  } | {
    discountFinishedAt?: string | null;
    discountPercent?: number;
    discountPeriod?: number;
    discountStartedAt?: string | null;
    duration?: string;
    expiredAt?: string;
    hasActivePaidSubscriptions?: boolean;
    isMuted?: boolean;
    lastActivity?: string;
    messagesSumm?: number;
    newPrice?: number;
    postsSumm?: number;
    price?: number;
    recommendations?: number;
    regularPrice?: number;
    renewedAt?: string | null;
    status?: string | null;
    streamsSumm?: number;
    subscribeAt?: string;
    subscribePrice?: number;
    subscribes?: Array<unknown>;
    subscribesSumm?: number;
    tipsSumm?: number;
    totalSumm?: number;
    unsubscribeReason?: string;
  };
  subscribedOnDuration?: string;
  subscribedOnExpiredNow?: boolean;
  subscribersCount?: number;
  subscribesCount?: number;
  subscriptionBundles?: Array<{
    canBuy?: boolean;
    discount?: number;
    duration?: number;
    id?: number;
    price?: number;
  }>;
  tipsEnabled?: boolean;
  tipsMax?: number;
  tipsMin?: number;
  tipsMinInternal?: number;
  tipsTextEnabled?: boolean;
  trialMaxDays?: number;
  trialMaxExpiresDays?: number;
  twitterUsername?: string;
  unreadTips?: number;
  username: string;
  vatNumberName?: string;
  videosCount?: number;
  walletAutorechargeAmount?: number;
  walletAutorechargeMin?: number;
  walletFirstRebills?: boolean;
  watermarkPosition?: string;
  watermarkText?: string;
  website?: unknown;
  wishlist?: unknown;
};

export interface AccessUsersGetParams {
  /**
   * User ID (numeric or username)
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListResponse = SubscriberPage;

export interface AccessUsersListParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  query?: string;
  listId?: number;
  field?: "expire_date" | "last_activity" | "subscribe_date";
  order?: "asc" | "desc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListItem = NonNullable<AccessUsersListResponse["items"]>[number];

export type AccessUsersListBlockedResponse = SubscriberPage;

export interface AccessUsersListBlockedParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListBlockedItem = NonNullable<AccessUsersListBlockedResponse["items"]>[number];

export type AccessUsersListHintsResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessUsersListHintsParams {
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListHintsItem = NonNullable<AccessUsersListHintsResponse["items"]>[number];

export type AccessUsersListLinksResponse = {
  items: Array<{
    description?: string | null;
    id?: number | null;
    image?: {
      height?: number | null;
      src?: string | null;
      thumbs?: {
        c144?: string | null;
        c50?: string | null;
      } | (Array<unknown | null>) | (unknown | null);
      width?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    sort?: number | null;
    title?: string | null;
    url?: string | null;
  }>;
};

export interface AccessUsersListLinksParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListMentionableResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessUsersListMentionableParams {
  limit?: number;
  /**
   * Pagination cursor from previous response
   */
  cursor?: string | null;
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListMentionableItem = NonNullable<AccessUsersListMentionableResponse["items"]>[number];

export type AccessUsersListPostsResponse = PostPage;

export interface AccessUsersListPostsParams {
  /**
   * User ID (numeric or username)
   */
  userId: string | number;
  /**
   * Number of posts to return (1-50)
   */
  limit?: number;
  /**
   * Filter to posts with media. Use any for all media posts, or photo/video for a specific media type.
   */
  media?: "any" | "photo" | "video";
  /**
   * Sort posts by: publish_date, tips, or favorites_count
   */
  sortBy?: "publish_date" | "tips" | "favorites_count";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Include pinned posts
   */
  pinned?: boolean;
  /**
   * Only include posts viewable by the authenticated account
   */
  onlyCanView?: boolean;
  /**
   * Publish time cursor from the previous response. Also accepts ISO datetime, seconds, or seconds.fraction.
   */
  cursor?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListPostsItem = NonNullable<AccessUsersListPostsResponse["items"]>[number];

export type AccessUsersListPromotionsResponse = {
  items: Array<{
    imageSrc?: string | null;
    url?: string | null;
  }>;
};

export interface AccessUsersListPromotionsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListRecommendsResponse = {
  items: Array<{
    id?: number | null;
  }>;
};

export interface AccessUsersListRecommendsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListRestrictedResponse = SubscriberPage;

export interface AccessUsersListRestrictedParams {
  /**
   * Number of items to return (1-20, default: 10)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersListRestrictedItem = NonNullable<AccessUsersListRestrictedResponse["items"]>[number];

export type AccessUsersRestrictResponse = {
  avatar: null | string;
  avatarThumbs: null | {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: null | number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: null | string;
  headerSize: null | {
    height: number;
    width: number;
  };
  headerThumbs: null | {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPaywallRequired: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: null | string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean | null;
  subscribedByAutoprolong: boolean | null;
  subscribedByData: {
    discountFinishedAt: string | null;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string | null;
    duration: string;
    expiredAt: string;
    hasActivePaidSubscriptions: boolean;
    isMuted: boolean;
    newPostsAfterExpireCount: number;
    newPrice: number;
    price: number;
    regularPrice: number;
    renewedAt: string | null;
    showPostsInFeed: boolean;
    status: null | string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
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
  subscribedByExpire: boolean | null;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean | null;
  subscribedOnData: {
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
    subscribes: Array<unknown>;
    subscribesSumm: number;
    tipsSumm: number;
    totalSumm: number;
    unsubscribeReason: string;
  };
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  subscriptionBundles: Array<{
    canBuy: boolean;
    discount: number;
    duration: number;
    id: number;
    price: number;
  }>;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export type AccessUsersRestrictBody = Record<string, unknown>;

export interface AccessUsersRestrictParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Request body
   */
  body: AccessUsersRestrictBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersSearchResponse = {
  items: Array<Record<string, unknown>>;
  page: CursorPage;
};

export interface AccessUsersSearchParams {
  /**
   * Number of items to return (1-100, default: 20)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersSearchItem = NonNullable<AccessUsersSearchResponse["items"]>[number];

export type AccessUsersSubscribeResponse = {
  avatar: string;
  avatarThumbs: {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: string;
  headerSize: {
    height: number;
    width: number;
  };
  headerThumbs: {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean;
  subscribedByAutoprolong: boolean;
  subscribedByData: {
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
    status: string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
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
  subscribedByExpire: boolean;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean | null;
  subscribedOnData: {
    discountFinishedAt: string;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string;
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
    subscribes: Array<unknown>;
    subscribesSumm: number;
    tipsSumm: number;
    totalSumm: number;
    unsubscribeReason: string;
  };
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export type AccessUsersSubscribeBody = {
  source?: "chat" | "subscribesbytype";
};

export interface AccessUsersSubscribeParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Request body
   */
  body: AccessUsersSubscribeBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersUnblockResponse = {
  success: boolean;
  user: {
    avatar: null | string;
    avatarThumbs: null | {
      c144: string;
      c50: string;
    };
    canAddSubscriber: boolean;
    canCommentStory: boolean;
    canEarn: boolean;
    canLookStory: boolean;
    canPayInternal: boolean;
    canReceiveChatMessage: boolean;
    canReport: boolean;
    canRestrict: boolean;
    canTrialSend: boolean;
    canUnsubscribe: boolean;
    currentSubscribePrice: null | number;
    displayName: string;
    hasNotViewedStory: boolean;
    hasScheduledStream: boolean;
    hasStories: boolean;
    hasStream: boolean;
    header: null | string;
    headerSize: null | {
      height: number;
      width: number;
    };
    headerThumbs: null | {
      w480: string;
      w760: string;
    };
    hideChat: boolean;
    id: number;
    isActive: boolean;
    isBlocked: boolean;
    isPaywallRequired: boolean;
    isPendingAutoprolong: boolean;
    isPerformer: boolean;
    isRealPerformer: boolean;
    isRestricted: boolean;
    isVerified: boolean;
    lastSeen: null | string;
    listsStates: Array<{
      canAddUser: boolean;
      cannotAddUserReason: null | string;
      hasUser: boolean;
      id: string;
      name: string;
      type: string;
    }>;
    name: string;
    notice: string;
    postsCount: number;
    subscribePrice: number;
    subscribedBy: boolean | null;
    subscribedByAutoprolong: boolean | null;
    subscribedByData: {
      discountFinishedAt: string | null;
      discountPercent: number;
      discountPeriod: number;
      discountStartedAt: string | null;
      duration: string;
      expiredAt: string;
      hasActivePaidSubscriptions: boolean;
      isMuted: boolean;
      newPostsAfterExpireCount: number;
      newPrice: number;
      price: number;
      regularPrice: number;
      renewedAt: string | null;
      showPostsInFeed: boolean;
      status: null | string;
      subscribeAt: string;
      subscribePrice: number;
      subscribes: Array<{
        action: string;
        cancelDate: unknown;
        date: string;
        discount: number;
        duration: number;
        earningId: number;
        expireDate: string;
        id: number;
        isCurrent: boolean;
        offerEnd: string;
        offerStart: string;
        price: number;
        regularPrice: number;
        startDate: string;
        subscriberId: number;
        type: string;
        userId: number;
      }>;
      unsubscribeReason: string;
    };
    subscribedByExpire: boolean | null;
    subscribedByExpireDate: string;
    subscribedIsExpiredNow: boolean;
    subscribedOn: boolean | null;
    subscribedOnData: {
      discountFinishedAt: null | string;
      discountPercent: number;
      discountPeriod: number;
      discountStartedAt: null | string;
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
      status: null | string;
      streamsSumm: number;
      subscribeAt: string;
      subscribePrice: number;
      subscribes: Array<{
        action: string;
        cancelDate: unknown;
        date: string;
        discount: number;
        duration: number;
        earningId: number;
        expireDate: string;
        id: number;
        isCurrent: boolean;
        offerEnd: string;
        offerStart: string;
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
    subscribedOnDuration: string;
    subscribedOnExpiredNow: boolean;
    subscriptionBundles: Array<{
      canBuy: boolean;
      discount: number;
      duration: number;
      id: number;
      price: number;
    }>;
    tipsEnabled: boolean;
    tipsMax: number;
    tipsMin: number;
    tipsMinInternal: number;
    tipsTextEnabled: boolean;
    username: string;
  };
};

export interface AccessUsersUnblockParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessUsersUnrestrictResponse = {
  avatar: null | string;
  avatarThumbs: null | {
    c144: string;
    c50: string;
  };
  canAddSubscriber: boolean;
  canCommentStory: boolean;
  canEarn: boolean;
  canLookStory: boolean;
  canPayInternal: boolean;
  canReceiveChatMessage: boolean;
  canReport: boolean;
  canRestrict: boolean;
  canTrialSend: boolean;
  canUnsubscribe: boolean;
  currentSubscribePrice: null | number;
  displayName: string;
  hasNotViewedStory: boolean;
  hasScheduledStream: boolean;
  hasStories: boolean;
  hasStream: boolean;
  header: null | string;
  headerSize: null | {
    height: number;
    width: number;
  };
  headerThumbs: null | {
    w480: string;
    w760: string;
  };
  hideChat: boolean;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isPaywallRequired: boolean;
  isPendingAutoprolong: boolean;
  isPerformer: boolean;
  isRealPerformer: boolean;
  isRestricted: boolean;
  isVerified: boolean;
  lastSeen: null | string;
  listsStates: Array<{
    canAddUser: boolean;
    cannotAddUserReason: null | string;
    hasUser: boolean;
    id: string;
    name: string;
    type: string;
  }>;
  name: string;
  notice: string;
  subscribePrice: number;
  subscribedBy: boolean | null;
  subscribedByAutoprolong: boolean | null;
  subscribedByData: {
    discountFinishedAt: string | null;
    discountPercent: number;
    discountPeriod: number;
    discountStartedAt: string | null;
    duration: string;
    expiredAt: string;
    hasActivePaidSubscriptions: boolean;
    isMuted: boolean;
    newPostsAfterExpireCount: number;
    newPrice: number;
    price: number;
    regularPrice: number;
    renewedAt: string | null;
    showPostsInFeed: boolean;
    status: null | string;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: null | string;
      offerStart: null | string;
      price: number;
      regularPrice: number;
      startDate: string;
      subscriberId: number;
      type: string;
      userId: number;
    }>;
    unsubscribeReason: string;
  };
  subscribedByExpire: boolean | null;
  subscribedByExpireDate: string;
  subscribedIsExpiredNow: boolean;
  subscribedOn: boolean | null;
  subscribedOnData: {
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
    status: null | string;
    streamsSumm: number;
    subscribeAt: string;
    subscribePrice: number;
    subscribes: Array<{
      action: string;
      cancelDate: unknown;
      date: string;
      discount: number;
      duration: number;
      earningId: number;
      expireDate: string;
      id: number;
      isCurrent: boolean;
      offerEnd: string;
      offerStart: string;
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
  subscribedOnDuration: string;
  subscribedOnExpiredNow: boolean;
  subscriptionBundles: Array<{
    canBuy: boolean;
    discount: number;
    duration: number;
    id: number;
    price: number;
  }>;
  tipsEnabled: boolean;
  tipsMax: number;
  tipsMin: number;
  tipsMinInternal: number;
  tipsTextEnabled: boolean;
  username: string;
};

export interface AccessUsersUnrestrictParams {
  /**
   * userId
   */
  userId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsMediaCreateResponse = {
  audiosCount: number;
  canDelete: boolean;
  canUpdate: boolean;
  gifsCount: number;
  hasMedia: boolean;
  id: number;
  medias: Array<{
    type: string;
    url: string;
  }>;
  name: string;
  photosCount: number;
  type: string;
  videosCount: number;
};

export type AccessVaultListsMediaCreateBody = {
  /**
   * Media IDs to add to the list
   */
  mediaIds: Array<number>;
};

export interface AccessVaultListsMediaCreateParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Request body
   */
  body: AccessVaultListsMediaCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsMediaDeleteResponse = {
  audiosCount: number;
  canDelete: boolean;
  canUpdate: boolean;
  gifsCount: number;
  hasMedia: boolean;
  id: number;
  medias: Array<{
    type: string;
    url: string;
  }>;
  name: string;
  photosCount: number;
  type: string;
  videosCount: number;
};

export type AccessVaultListsMediaDeleteBody = {
  mediaIds: Array<number | null>;
};

export interface AccessVaultListsMediaDeleteParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Request body
   */
  body: AccessVaultListsMediaDeleteBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsMediaListResponse = VaultMediaPage;

export interface AccessVaultListsMediaListParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Number of items to return (1-40, default: 24)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Sort media by: recent, most-liked, or highest-tips
   */
  sortBy?: "recent" | "most-liked" | "highest-tips";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter by media type
   */
  mediaType?: "photo" | "video" | "audio";
  /**
   * Only return media published before this date
   */
  beforePublishDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsMediaListItem = NonNullable<AccessVaultListsMediaListResponse["items"]>[number];

export type AccessVaultListsCreateResponse = VaultList;

export type AccessVaultListsCreateBody = {
  name: string;
};

export interface AccessVaultListsCreateParams {
  /**
   * Request body
   */
  body: AccessVaultListsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsDeleteResponse = {
  success: boolean;
};

export type AccessVaultListsDeleteBody = {
  clearMedia?: boolean | null;
};

export interface AccessVaultListsDeleteParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Request body
   */
  body: AccessVaultListsDeleteBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsGetResponse = {
  audiosCount: number;
  canDelete: boolean;
  canUpdate: boolean;
  gifsCount: number;
  hasMedia: boolean;
  id: number;
  medias: Array<{
    type: string;
    url: string;
  }>;
  name: string;
  photosCount: number;
  type: string;
  videosCount: number;
};

export interface AccessVaultListsGetParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsListResponse = {
  items: Array<{
    audiosCount?: number | null;
    canDelete?: boolean | null;
    canUpdate?: boolean | null;
    gifsCount?: number | null;
    hasMedia?: boolean | null;
    id?: number | null;
    medias?: Array<{
      type?: string | null;
      url?: string | null;
    } | (Array<unknown | null>) | (unknown | null)>;
    name?: string | null;
    photosCount?: number | null;
    type?: string | null;
    videosCount?: number | null;
  }>;
  page: CursorPage;
};

export interface AccessVaultListsListParams {
  /**
   * Number of items to return (1-40, default: 24)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsListItem = NonNullable<AccessVaultListsListResponse["items"]>[number];

export type AccessVaultListsSortResponse = {
  success: boolean;
};

export type AccessVaultListsSortBody = {
  order: "asc" | "desc";
  sort: "default" | "media" | "name" | "recent";
};

export interface AccessVaultListsSortParams {
  /**
   * Request body
   */
  body: AccessVaultListsSortBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultListsUpdateResponse = {
  audiosCount: number;
  canDelete: boolean;
  canUpdate: boolean;
  gifsCount: number;
  hasMedia: boolean;
  id: number;
  medias: Array<{
    type: string;
    url: string;
  }>;
  name: string;
  photosCount: number;
  type: string;
  videosCount: number;
};

export type AccessVaultListsUpdateBody = {
  /**
   * Remove all media from the list
   */
  clearMedia?: boolean;
  /**
   * New name for the vault list
   */
  name: string;
};

export interface AccessVaultListsUpdateParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Request body
   */
  body: AccessVaultListsUpdateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaGetResponse = VaultMediaItem;

export interface AccessVaultMediaGetParams {
  /**
   * mediaId
   */
  mediaId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaGetTypesResponse = {
  hasAudio: boolean;
  hasGif: boolean;
  hasPhoto: boolean;
  hasVideo: boolean;
};

export interface AccessVaultMediaGetTypesParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaHideResponse = {
  success: boolean;
};

export type AccessVaultMediaHideBody = {
  mediaIds: Array<number | null>;
};

export interface AccessVaultMediaHideParams {
  /**
   * Request body
   */
  body: AccessVaultMediaHideBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaListResponse = VaultMediaPage;

export interface AccessVaultMediaListParams {
  /**
   * Number of items to return (1-40, default: 24)
   */
  limit?: number;
  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string | null;
  /**
   * Sort media by: recent, most-liked, or highest-tips
   */
  sortBy?: "recent" | "most-liked" | "highest-tips";
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
  /**
   * Search/filter text
   */
  query?: string;
  /**
   * Filter by media type
   */
  mediaType?: "photo" | "video" | "audio";
  /**
   * Only return media published before this date
   */
  beforePublishDate?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaListItem = NonNullable<AccessVaultMediaListResponse["items"]>[number];

export type AccessVaultMediaListPostsResponse = {
  items: Array<{
    id?: number | null;
    media?: Array<MediaAsset>;
    mediasCountsByType?: {
      photo?: number | null;
    } | (Array<unknown | null>) | (unknown | null);
    postedAt?: string | null;
    withText?: boolean | null;
  }>;
};

export interface AccessVaultMediaListPostsParams {
  /**
   * mediaId
   */
  mediaId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaListProcessingResponse = {
  is_processing?: boolean;
  list?: Array<unknown | null>;
  success: boolean;
};

export interface AccessVaultMediaListProcessingParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultMediaListReleaseFormsResponse = {
  items: Array<unknown | null>;
  page: CursorPage;
};

export interface AccessVaultMediaListReleaseFormsParams {
  /**
   * mediaId
   */
  mediaId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultUploadsCreateResponse = {
  batchId: string;
  expiresAt: string;
  media?: Array<MediaAsset>;
  mediaIds?: Array<number>;
  status: "pending" | "completed";
  totalFiles: number;
  uploads: Array<UploadInitResponse>;
};

export type AccessVaultUploadsCreateBody = {
  /**
   * Files to upload together through one scheduled vault message after all files finalize
   */
  files: Array<{
    /**
     * MIME type of the file (e.g., image/jpeg, video/mp4)
     */
    contentType: string;
    /**
     * Required file ETag/hash. OFAuth checks whether this batch file already exists in Vault before creating upload URLs.
     */
    etag: string;
    /**
     * Name of the file to upload
     */
    filename: string;
    /**
     * File size in bytes
     */
    size: number;
  }>;
  /**
   * Options for creating Vault media from the batch
   */
  vaultUpload: {
    /**
     * Vault list ID to add the uploaded media to after vault upload completes
     */
    listId?: number;
    /**
     * Upload mode
     */
    mode?: "message";
    /**
     * Target user ID for the upload
     */
    userId?: string | null;
  };
};

export interface AccessVaultUploadsCreateParams {
  /**
   * Request body
   */
  body: AccessVaultUploadsCreateBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessVaultUploadsGetResponse = {
  batchId: string;
  lastError?: string;
  media?: Array<MediaAsset>;
  mediaIds?: Array<number>;
  mediaUploadIds: Array<string>;
  messageId?: string | number;
  status: "pending" | "completed" | "failed";
};

export interface AccessVaultUploadsGetParams {
  /**
   * Vault upload batch ID
   */
  batchId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListLabelsResponse = {
  items: Array<{
    id: number | string;
    name: string;
    postsCount: number;
    type: string;
  }>;
  page: CursorPage;
};

export interface AccessListLabelsParams {
  limit?: number;
  cursor?: string;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type AccessListLabelsItem = NonNullable<AccessListLabelsResponse["items"]>[number];

export type AuthorizationGetResponse = LinkAuthorization;

export type LinkGetUserinfoResponse = LinkUserInfo;

export type LinkedAccountsSettingsGetResponse = LinkedAccountSettings;

export interface LinkedAccountsSettingsGetParams {
  /**
   * id
   */
  id: string | number;
}

export type LinkedAccountsSettingsUpdateResponse = LinkedAccountSettings;

export type LinkedAccountsSettingsUpdateBody = LinkedAccountSettingsUpdate;

export interface LinkedAccountsSettingsUpdateParams {
  /**
   * id
   */
  id: string | number;
  /**
   * Request body
   */
  body: LinkedAccountsSettingsUpdateBody;
}

export type LinkedAccountsCreateReconnectResponse = LinkedAccountReconnectJourney;

export type LinkedAccountsCreateReconnectBody = LinkedAccountReconnectRequest;

export interface LinkedAccountsCreateReconnectParams {
  /**
   * id
   */
  id: string | number;
  /**
   * Request body
   */
  body: LinkedAccountsCreateReconnectBody;
}

export type LinkedAccountsGetResponse = LinkedAccount;

export interface LinkedAccountsGetParams {
  /**
   * id
   */
  id: string | number;
}

export type LinkedAccountsListResponse = LinkedAccountsPage;

export interface LinkedAccountsListParams {
  /**
   * Page size, 1 to 100. Defaults to 50.
   */
  limit?: number;
  /**
   * `next_cursor` from the previous page.
   */
  cursor?: string;
}

export type LinkedAccountsListItem = NonNullable<LinkedAccountsListResponse["data"]>[number];

export interface LinkedAccountsRemoveParams {
  /**
   * id
   */
  id: string | number;
}

export type VaultPlusListsAddResponse = VaultPlusListAddResult;

export interface VaultPlusListsAddParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusListsListResponse = {
  items: Array<VaultPlusListSummary>;
};

export interface VaultPlusListsListParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusListsListMediaResponse = {
  items: Array<VaultPlusListMediaItem>;
};

export interface VaultPlusListsListMediaParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusListsSyncResponse = VaultPlusListSyncResult;

export interface VaultPlusListsSyncParams {
  /**
   * listId
   */
  listId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusMediaBatchResponse = VaultPlusMediaList;

export type VaultPlusMediaBatchBody = VaultPlusBatchMediaRequest;

export interface VaultPlusMediaBatchParams {
  /**
   * Request body
   */
  body: VaultPlusMediaBatchBody;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusMediaDeleteResponse = VaultPlusMediaDeleteResult;

export interface VaultPlusMediaDeleteParams {
  /**
   * mediaId
   */
  mediaId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusMediaDeleteAllResponse = VaultPlusConnectionMediaDeleteResult;

export interface VaultPlusMediaDeleteAllParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusMediaGetResponse = VaultPlusMediaItem;

export interface VaultPlusMediaGetParams {
  /**
   * mediaId
   */
  mediaId: string | number;
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusMediaListResponse = VaultPlusMediaList;

export interface VaultPlusMediaListParams {
  status?: "edge_only" | "pending" | "storing" | "stored" | "removed";
  type?: "image" | "video" | "audio";
  contentType?: string;
  durationMin?: number | null;
  durationMax?: number | null;
  createdAtFrom?: string;
  createdAtTo?: string;
  cachedAtFrom?: string;
  cachedAtTo?: string;
  limit?: number;
  cursor?: string;
  sort?: "createdAt_desc" | "createdAt_asc" | "cachedAt_desc" | "cachedAt_asc" | "duration_desc" | "duration_asc";
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusMediaListItem = NonNullable<VaultPlusMediaListResponse["items"]>[number];

export type VaultPlusGetStatsResponse = VaultPlusIntegrationStats;

export interface VaultPlusGetStatsParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

export type VaultPlusGetStatusResponse = VaultPlusConnectionStatus;

export interface VaultPlusGetStatusParams {
  /**
   * Linked account to act on (`x-linked-account-id`). Defaults to the client's `linkedAccountId`.
   */
  linkedAccountId?: string;
}

// Namespaces
export class AccessAnalyticsMassMessagesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Mass message buyers
   *
   * Get list of users who purchased a specific mass message
   *
   * Operation: `access.analytics.massMessages.listBuyers`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.massMessages.listBuyers({ massMessageId: 'example' })
   * ```
   */
  listBuyers(params: AccessAnalyticsMassMessagesListBuyersParams, options?: RequestOptions): Promise<AccessAnalyticsMassMessagesListBuyersResponse> {
    return request<AccessAnalyticsMassMessagesListBuyersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/mass-messages/${encodeURIComponent(String(params.massMessageId))}/buyers`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.massMessages.listBuyers',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Mass message buyers: every item, fetching pages as needed.
   */
  iterateBuyers(params: Omit<AccessAnalyticsMassMessagesListBuyersParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessAnalyticsMassMessagesListBuyersItem, void, unknown> {
    return paginate<AccessAnalyticsMassMessagesListBuyersItem>(
      (cursor) => this.listBuyers({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Sent mass messages
   *
   * Get stats for sent mass messages
   *
   * Operation: `access.analytics.massMessages.listSent`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.massMessages.listSent()
   * ```
   */
  listSent(params: AccessAnalyticsMassMessagesListSentParams = {}, options?: RequestOptions): Promise<AccessAnalyticsMassMessagesListSentResponse> {
    return request<AccessAnalyticsMassMessagesListSentResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/mass-messages/sent`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.massMessages.listSent',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Sent mass messages: every item, fetching pages as needed.
   */
  iterateSent(params: Omit<AccessAnalyticsMassMessagesListSentParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessAnalyticsMassMessagesListSentItem, void, unknown> {
    return paginate<AccessAnalyticsMassMessagesListSentItem>(
      (cursor) => this.listSent({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessAnalyticsPostsRankingsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Posts ranked by views
   *
   * Rank posts by view count for the requested date range.
   *
   * Operation: `access.analytics.posts.rankings.listViews`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.posts.rankings.listViews()
   * ```
   */
  listViews(params: AccessAnalyticsPostsRankingsListViewsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsPostsRankingsListViewsResponse> {
    return request<AccessAnalyticsPostsRankingsListViewsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/posts/rankings/views`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.posts.rankings.listViews',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsPostsNamespace {
  readonly rankings: AccessAnalyticsPostsRankingsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.rankings = new AccessAnalyticsPostsRankingsNamespace(_config);
  }

  /**
   * Post stats
   *
   * Get detailed stats for a specific post
   *
   * Operation: `access.analytics.posts.get`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.posts.get({ postId: 'example' })
   * ```
   */
  get(params: AccessAnalyticsPostsGetParams, options?: RequestOptions): Promise<AccessAnalyticsPostsGetResponse> {
    return request<AccessAnalyticsPostsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/posts/${encodeURIComponent(String(params.postId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.posts.get',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Top posts
   *
   * Get top performing posts
   *
   * Operation: `access.analytics.posts.listTop`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.posts.listTop()
   * ```
   */
  listTop(params: AccessAnalyticsPostsListTopParams = {}, options?: RequestOptions): Promise<AccessAnalyticsPostsListTopResponse> {
    return request<AccessAnalyticsPostsListTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/posts/top`,
      query: { "by": params.by, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.posts.listTop',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsProfileMessagesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Direct message stats
   *
   * Get direct-message performance stats for the authenticated creator.
   *
   * Operation: `access.analytics.profile.messages.listDirect`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.messages.listDirect()
   * ```
   */
  listDirect(params: AccessAnalyticsProfileMessagesListDirectParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileMessagesListDirectResponse> {
    return request<AccessAnalyticsProfileMessagesListDirectResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/messages/direct`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.messages.listDirect',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Direct message stats: every item, fetching pages as needed.
   */
  iterateDirect(params: Omit<AccessAnalyticsProfileMessagesListDirectParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessAnalyticsProfileMessagesListDirectItem, void, unknown> {
    return paginate<AccessAnalyticsProfileMessagesListDirectItem>(
      (cursor) => this.listDirect({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessAnalyticsProfileTopNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top fan stats
   *
   * Get top fan stats for the authenticated creator.
   *
   * Operation: `access.analytics.profile.top.getFans`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.top.getFans()
   * ```
   */
  getFans(params: AccessAnalyticsProfileTopGetFansParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileTopGetFansResponse> {
    return request<AccessAnalyticsProfileTopGetFansResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/top/fans`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.top.getFans',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Top message stats
   *
   * Get top message stats for the authenticated creator.
   *
   * Operation: `access.analytics.profile.top.getMessages`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.top.getMessages()
   * ```
   */
  getMessages(params: AccessAnalyticsProfileTopGetMessagesParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileTopGetMessagesResponse> {
    return request<AccessAnalyticsProfileTopGetMessagesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/top/messages`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.top.getMessages',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Top post stats
   *
   * Get top post stats for the authenticated creator.
   *
   * Operation: `access.analytics.profile.top.getPosts`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.top.getPosts()
   * ```
   */
  getPosts(params: AccessAnalyticsProfileTopGetPostsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileTopGetPostsResponse> {
    return request<AccessAnalyticsProfileTopGetPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/top/posts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.top.getPosts',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Top story stats
   *
   * Get top story stats for the authenticated creator.
   *
   * Operation: `access.analytics.profile.top.getStories`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.top.getStories()
   * ```
   */
  getStories(params: AccessAnalyticsProfileTopGetStoriesParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileTopGetStoriesResponse> {
    return request<AccessAnalyticsProfileTopGetStoriesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/top/stories`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.top.getStories',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Top stream stats
   *
   * Get top stream stats for the authenticated creator.
   *
   * Operation: `access.analytics.profile.top.getStreams`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.top.getStreams()
   * ```
   */
  getStreams(params: AccessAnalyticsProfileTopGetStreamsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileTopGetStreamsResponse> {
    return request<AccessAnalyticsProfileTopGetStreamsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/top/streams`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.top.getStreams',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsProfileViewsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Profile views QR stats
   *
   * Get profile-view stats for QR traffic.
   *
   * Operation: `access.analytics.profile.views.getQr`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.views.getQr()
   * ```
   */
  getQr(params: AccessAnalyticsProfileViewsGetQrParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileViewsGetQrResponse> {
    return request<AccessAnalyticsProfileViewsGetQrResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/views/qr`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.views.getQr',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsProfileNamespace {
  readonly messages: AccessAnalyticsProfileMessagesNamespace;
  readonly top: AccessAnalyticsProfileTopNamespace;
  readonly views: AccessAnalyticsProfileViewsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.messages = new AccessAnalyticsProfileMessagesNamespace(_config);
    this.top = new AccessAnalyticsProfileTopNamespace(_config);
    this.views = new AccessAnalyticsProfileViewsNamespace(_config);
  }

  /**
   * Stats overview
   *
   * Get account stats overview grouped by an optional interval.
   *
   * Operation: `access.analytics.profile.getOverview`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.getOverview()
   * ```
   */
  getOverview(params: AccessAnalyticsProfileGetOverviewParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileGetOverviewResponse> {
    return request<AccessAnalyticsProfileGetOverviewResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/overview`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "by": params.by },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.getOverview',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Today activity stats
   *
   * Get today's account activity summary.
   *
   * Operation: `access.analytics.profile.getTodayActivity`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.profile.getTodayActivity()
   * ```
   */
  getTodayActivity(params: AccessAnalyticsProfileGetTodayActivityParams = {}, options?: RequestOptions): Promise<AccessAnalyticsProfileGetTodayActivityResponse> {
    return request<AccessAnalyticsProfileGetTodayActivityResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/profile/today-activity`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.profile.getTodayActivity',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsPromotionsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top promotions
   *
   * Get top performing promotions
   *
   * Operation: `access.analytics.promotions.listTop`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.promotions.listTop()
   * ```
   */
  listTop(params: AccessAnalyticsPromotionsListTopParams = {}, options?: RequestOptions): Promise<AccessAnalyticsPromotionsListTopResponse> {
    return request<AccessAnalyticsPromotionsListTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/promotions/top`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.promotions.listTop',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsStoriesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top stories
   *
   * Get top performing stories
   *
   * Operation: `access.analytics.stories.listTop`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.stories.listTop()
   * ```
   */
  listTop(params: AccessAnalyticsStoriesListTopParams = {}, options?: RequestOptions): Promise<AccessAnalyticsStoriesListTopResponse> {
    return request<AccessAnalyticsStoriesListTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/stories/top`,
      query: { "by": params.by, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.stories.listTop',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsStreamsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top streams
   *
   * Get top performing streams
   *
   * Operation: `access.analytics.streams.listTop`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.streams.listTop()
   * ```
   */
  listTop(params: AccessAnalyticsStreamsListTopParams = {}, options?: RequestOptions): Promise<AccessAnalyticsStreamsListTopResponse> {
    return request<AccessAnalyticsStreamsListTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/streams/top`,
      query: { "by": params.by, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.streams.listTop',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTimeseriesEngagementMessagesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Mass messages chart
   *
   * Get time-series mass message performance data
   *
   * Operation: `access.analytics.timeseries.engagement.messages.get`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.messages.get()
   * ```
   */
  get(params: AccessAnalyticsTimeseriesEngagementMessagesGetParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementMessagesGetResponse> {
    return request<AccessAnalyticsTimeseriesEngagementMessagesGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/messages`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.messages.get',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Direct message purchases over time
   *
   * Get time-series purchase counts for paid direct messages.
   *
   * Operation: `access.analytics.timeseries.engagement.messages.getDirectPurchases`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.messages.getDirectPurchases()
   * ```
   */
  getDirectPurchases(params: AccessAnalyticsTimeseriesEngagementMessagesGetDirectPurchasesParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementMessagesGetDirectPurchasesResponse> {
    return request<AccessAnalyticsTimeseriesEngagementMessagesGetDirectPurchasesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/messages/direct-purchases`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.messages.getDirectPurchases',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Mass messages over time
   *
   * Get time-series counts for mass messages sent by the authenticated creator.
   *
   * Operation: `access.analytics.timeseries.engagement.messages.getSent`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.messages.getSent()
   * ```
   */
  getSent(params: AccessAnalyticsTimeseriesEngagementMessagesGetSentParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementMessagesGetSentResponse> {
    return request<AccessAnalyticsTimeseriesEngagementMessagesGetSentResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/messages/sent`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.messages.getSent',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTimeseriesEngagementPostsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Posts chart
   *
   * Get time-series post performance data
   *
   * Operation: `access.analytics.timeseries.engagement.posts.get`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.posts.get()
   * ```
   */
  get(params: AccessAnalyticsTimeseriesEngagementPostsGetParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementPostsGetResponse> {
    return request<AccessAnalyticsTimeseriesEngagementPostsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/posts`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "by": params.by },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.posts.get',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Posts over time
   *
   * Get time-series post publishing volume for the authenticated creator.
   *
   * Operation: `access.analytics.timeseries.engagement.posts.getCount`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.posts.getCount()
   * ```
   */
  getCount(params: AccessAnalyticsTimeseriesEngagementPostsGetCountParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementPostsGetCountResponse> {
    return request<AccessAnalyticsTimeseriesEngagementPostsGetCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/posts/count`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.posts.getCount',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Post views over time
   *
   * Get time-series post view counts for the authenticated creator.
   *
   * Operation: `access.analytics.timeseries.engagement.posts.getViews`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.posts.getViews()
   * ```
   */
  getViews(params: AccessAnalyticsTimeseriesEngagementPostsGetViewsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementPostsGetViewsResponse> {
    return request<AccessAnalyticsTimeseriesEngagementPostsGetViewsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/posts/views`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.posts.getViews',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTimeseriesEngagementNamespace {
  readonly messages: AccessAnalyticsTimeseriesEngagementMessagesNamespace;
  readonly posts: AccessAnalyticsTimeseriesEngagementPostsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.messages = new AccessAnalyticsTimeseriesEngagementMessagesNamespace(_config);
    this.posts = new AccessAnalyticsTimeseriesEngagementPostsNamespace(_config);
  }

  /**
   * Stories chart
   *
   * Get time-series story performance data
   *
   * Operation: `access.analytics.timeseries.engagement.getStories`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.getStories()
   * ```
   */
  getStories(params: AccessAnalyticsTimeseriesEngagementGetStoriesParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementGetStoriesResponse> {
    return request<AccessAnalyticsTimeseriesEngagementGetStoriesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/stories`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "by": params.by },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.getStories',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Streams chart
   *
   * Get time-series stream performance data
   *
   * Operation: `access.analytics.timeseries.engagement.getStreams`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.engagement.getStreams()
   * ```
   */
  getStreams(params: AccessAnalyticsTimeseriesEngagementGetStreamsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesEngagementGetStreamsResponse> {
    return request<AccessAnalyticsTimeseriesEngagementGetStreamsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/engagement/streams`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "by": params.by },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.engagement.getStreams',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTimeseriesNamespace {
  readonly engagement: AccessAnalyticsTimeseriesEngagementNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.engagement = new AccessAnalyticsTimeseriesEngagementNamespace(_config);
  }

  /**
   * Promotions chart
   *
   * Get time-series promotion performance data
   *
   * Operation: `access.analytics.timeseries.getPromotions`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.getPromotions()
   * ```
   */
  getPromotions(params: AccessAnalyticsTimeseriesGetPromotionsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesGetPromotionsResponse> {
    return request<AccessAnalyticsTimeseriesGetPromotionsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/promotions`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.getPromotions',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Subscribers over time
   *
   * Get time-series subscriber counts.
   *
   * Operation: `access.analytics.timeseries.getSubscribers`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.getSubscribers()
   * ```
   */
  getSubscribers(params: AccessAnalyticsTimeseriesGetSubscribersParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesGetSubscribersResponse> {
    return request<AccessAnalyticsTimeseriesGetSubscribersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/subscribers`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.getSubscribers',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Tracking link performance over time
   *
   * Get time-series tracking link performance data.
   *
   * Operation: `access.analytics.timeseries.getTrackingLinks`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.getTrackingLinks()
   * ```
   */
  getTrackingLinks(params: AccessAnalyticsTimeseriesGetTrackingLinksParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesGetTrackingLinksResponse> {
    return request<AccessAnalyticsTimeseriesGetTrackingLinksResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/tracking-links`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.getTrackingLinks',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Trial links chart
   *
   * Get time-series trial link performance data
   *
   * Operation: `access.analytics.timeseries.getTrialLinks`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.getTrialLinks()
   * ```
   */
  getTrialLinks(params: AccessAnalyticsTimeseriesGetTrialLinksParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesGetTrialLinksResponse> {
    return request<AccessAnalyticsTimeseriesGetTrialLinksResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/trial-links`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.getTrialLinks',
      requiredScope: 'analytics:read',
      ...options,
    });
  }

  /**
   * Visitor countries chart
   *
   * Get time-series visitor country data
   *
   * Operation: `access.analytics.timeseries.getVisitorCountries`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.timeseries.getVisitorCountries()
   * ```
   */
  getVisitorCountries(params: AccessAnalyticsTimeseriesGetVisitorCountriesParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTimeseriesGetVisitorCountriesResponse> {
    return request<AccessAnalyticsTimeseriesGetVisitorCountriesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/timeseries/visitor-countries`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "by": params.by },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.timeseries.getVisitorCountries',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTrackingLinksNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top tracking links
   *
   * Get top performing tracking links.
   *
   * Operation: `access.analytics.trackingLinks.listRankings`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.trackingLinks.listRankings()
   * ```
   */
  listRankings(params: AccessAnalyticsTrackingLinksListRankingsParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTrackingLinksListRankingsResponse> {
    return request<AccessAnalyticsTrackingLinksListRankingsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/tracking-links/rankings`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.trackingLinks.listRankings',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTrafficCountriesRankingsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Countries ranked by traffic
   *
   * Rank visitor countries by total profile traffic for the requested date range.
   *
   * Operation: `access.analytics.traffic.countries.rankings.getTotal`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.traffic.countries.rankings.getTotal()
   * ```
   */
  getTotal(params: AccessAnalyticsTrafficCountriesRankingsGetTotalParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTrafficCountriesRankingsGetTotalResponse> {
    return request<AccessAnalyticsTrafficCountriesRankingsGetTotalResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/traffic/countries/rankings/total`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.traffic.countries.rankings.getTotal',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsTrafficCountriesNamespace {
  readonly rankings: AccessAnalyticsTrafficCountriesRankingsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.rankings = new AccessAnalyticsTrafficCountriesRankingsNamespace(_config);
  }
}

export class AccessAnalyticsTrafficNamespace {
  readonly countries: AccessAnalyticsTrafficCountriesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.countries = new AccessAnalyticsTrafficCountriesNamespace(_config);
  }
}

export class AccessAnalyticsTrialLinksNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top trial links
   *
   * Get top performing trial links
   *
   * Operation: `access.analytics.trialLinks.listTop`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.trialLinks.listTop()
   * ```
   */
  listTop(params: AccessAnalyticsTrialLinksListTopParams = {}, options?: RequestOptions): Promise<AccessAnalyticsTrialLinksListTopResponse> {
    return request<AccessAnalyticsTrialLinksListTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/trial-links/top`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.trialLinks.listTop',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsVisitorCountriesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Top visitor countries
   *
   * Get top visitor countries
   *
   * Operation: `access.analytics.visitorCountries.getTop`
   *
   * @scope analytics:read
   * @example
   * ```ts
   * await client.access.analytics.visitorCountries.getTop()
   * ```
   */
  getTop(params: AccessAnalyticsVisitorCountriesGetTopParams = {}, options?: RequestOptions): Promise<AccessAnalyticsVisitorCountriesGetTopResponse> {
    return request<AccessAnalyticsVisitorCountriesGetTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/analytics/visitor-countries/top`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "by": params.by },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.analytics.visitorCountries.getTop',
      requiredScope: 'analytics:read',
      ...options,
    });
  }
}

export class AccessAnalyticsNamespace {
  readonly massMessages: AccessAnalyticsMassMessagesNamespace;
  readonly posts: AccessAnalyticsPostsNamespace;
  readonly profile: AccessAnalyticsProfileNamespace;
  readonly promotions: AccessAnalyticsPromotionsNamespace;
  readonly stories: AccessAnalyticsStoriesNamespace;
  readonly streams: AccessAnalyticsStreamsNamespace;
  readonly timeseries: AccessAnalyticsTimeseriesNamespace;
  readonly trackingLinks: AccessAnalyticsTrackingLinksNamespace;
  readonly traffic: AccessAnalyticsTrafficNamespace;
  readonly trialLinks: AccessAnalyticsTrialLinksNamespace;
  readonly visitorCountries: AccessAnalyticsVisitorCountriesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.massMessages = new AccessAnalyticsMassMessagesNamespace(_config);
    this.posts = new AccessAnalyticsPostsNamespace(_config);
    this.profile = new AccessAnalyticsProfileNamespace(_config);
    this.promotions = new AccessAnalyticsPromotionsNamespace(_config);
    this.stories = new AccessAnalyticsStoriesNamespace(_config);
    this.streams = new AccessAnalyticsStreamsNamespace(_config);
    this.timeseries = new AccessAnalyticsTimeseriesNamespace(_config);
    this.trackingLinks = new AccessAnalyticsTrackingLinksNamespace(_config);
    this.traffic = new AccessAnalyticsTrafficNamespace(_config);
    this.trialLinks = new AccessAnalyticsTrialLinksNamespace(_config);
    this.visitorCountries = new AccessAnalyticsVisitorCountriesNamespace(_config);
  }
}

export class AccessChatsMassMessagesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create mass message broadcast
   *
   * Create a mass message broadcast for multiple fans. The returned `id` is the mass message queue ID: use it as `massMessageId` in `/chats/mass-messages/:massMessageId` and as `queueMessageId` in `/queue/messages/:queueMessageId`.
   *
   * Operation: `access.chats.massMessages.create`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.massMessages.create({ body: {} })
   * ```
   */
  create(params: AccessChatsMassMessagesCreateParams, options?: RequestOptions): Promise<AccessChatsMassMessagesCreateResponse> {
    return request<AccessChatsMassMessagesCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/mass-messages`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.massMessages.create',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Mass message broadcast details
   *
   * Get details for a mass message broadcast. `massMessageId` is the `id` returned by `POST /chats/mass-messages` (the same value as `queueMessageId`). Returns `price`, `previewMediaCount`, `canUnsend` and `unsendSeconds`. This endpoint does not normally return the schedule or recipients: read `GET /queue/messages/:queueMessageId` for `scheduledDate`, `userIds`, `userLists`, `excludeUserLists` and `subscribedAfterDate` (returned under the request names, so they can be sent back on update).
   *
   * Operation: `access.chats.massMessages.get`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.massMessages.get({ massMessageId: 'example' })
   * ```
   */
  get(params: AccessChatsMassMessagesGetParams, options?: RequestOptions): Promise<AccessChatsMassMessagesGetResponse> {
    return request<AccessChatsMassMessagesGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/mass-messages/${encodeURIComponent(String(params.massMessageId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.massMessages.get',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Update mass message broadcast
   *
   * Update a queued mass message broadcast. Send the full message: fields you omit revert to their defaults. Rebuild the body from `GET /queue/messages/:queueMessageId` (`text` with `isMarkdown: false`, `media[].id` as `mediaItems` with previews first, `price`, `previewMediaCount`, `lockedText` as `isLockedText`, `scheduledDate`, `userIds`, `userLists`, `excludeUserLists`, `subscribedAfterDate`). Include `scheduledDate` to keep the schedule and the recipient fields to keep the audience; they are returned under these same names. Keep your own copy of `userTags` and `releaseForms`, which the read does not return in request form. `massMessageId` is the `id` returned by `POST /chats/mass-messages` (same value as `queueMessageId`).
   *
   * Operation: `access.chats.massMessages.update`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.massMessages.update({ massMessageId: 123, body: {} })
   * ```
   */
  update(params: AccessChatsMassMessagesUpdateParams, options?: RequestOptions): Promise<AccessChatsMassMessagesUpdateResponse> {
    return request<AccessChatsMassMessagesUpdateResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/chats/mass-messages/${encodeURIComponent(String(params.massMessageId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.massMessages.update',
      requiredScope: 'messages:write',
      ...options,
    });
  }
}

export class AccessChatsMediaNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Chat thread media
   *
   * Get all media from a chat.
   *
   * Operation: `access.chats.media.list`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.media.list({ userId: 123 })
   * ```
   */
  list(params: AccessChatsMediaListParams, options?: RequestOptions): Promise<AccessChatsMediaListResponse> {
    return request<AccessChatsMediaListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/media`,
      query: { "limit": params.limit, "cursor": params.cursor, "opened": params.opened, "senderUserId": params.senderUserId, "purchased": params.purchased },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.media.list',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chat thread media: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessChatsMediaListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsMediaListItem, void, unknown> {
    return paginate<AccessChatsMediaListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Chat thread audio files
   *
   * List audio media from a chat.
   *
   * Operation: `access.chats.media.listAudios`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.media.listAudios({ userId: 123 })
   * ```
   */
  listAudios(params: AccessChatsMediaListAudiosParams, options?: RequestOptions): Promise<AccessChatsMediaListAudiosResponse> {
    return request<AccessChatsMediaListAudiosResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/media/audios`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.media.listAudios',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chat thread audio files: every item, fetching pages as needed.
   */
  iterateAudios(params: Omit<AccessChatsMediaListAudiosParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsMediaListAudiosItem, void, unknown> {
    return paginate<AccessChatsMediaListAudiosItem>(
      (cursor) => this.listAudios({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Chat thread photos
   *
   * List photo media from a chat.
   *
   * Operation: `access.chats.media.listPhotos`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.media.listPhotos({ userId: 123 })
   * ```
   */
  listPhotos(params: AccessChatsMediaListPhotosParams, options?: RequestOptions): Promise<AccessChatsMediaListPhotosResponse> {
    return request<AccessChatsMediaListPhotosResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/media/photos`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.media.listPhotos',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chat thread photos: every item, fetching pages as needed.
   */
  iteratePhotos(params: Omit<AccessChatsMediaListPhotosParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsMediaListPhotosItem, void, unknown> {
    return paginate<AccessChatsMediaListPhotosItem>(
      (cursor) => this.listPhotos({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Chat thread videos
   *
   * List video media from a chat.
   *
   * Operation: `access.chats.media.listVideos`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.media.listVideos({ userId: 123 })
   * ```
   */
  listVideos(params: AccessChatsMediaListVideosParams, options?: RequestOptions): Promise<AccessChatsMediaListVideosResponse> {
    return request<AccessChatsMediaListVideosResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/media/videos`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.media.listVideos',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chat thread videos: every item, fetching pages as needed.
   */
  iterateVideos(params: Omit<AccessChatsMediaListVideosParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsMediaListVideosItem, void, unknown> {
    return paginate<AccessChatsMediaListVideosItem>(
      (cursor) => this.listVideos({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessChatsMessagesTemplatesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Delete reply-on-subscribe message template
   *
   * Delete the automatic reply-on-subscribe message template.
   *
   * Operation: `access.chats.messages.templates.deleteReplyOnSubscribe`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.templates.deleteReplyOnSubscribe()
   * ```
   */
  deleteReplyOnSubscribe(params: AccessChatsMessagesTemplatesDeleteReplyOnSubscribeParams = {}, options?: RequestOptions): Promise<AccessChatsMessagesTemplatesDeleteReplyOnSubscribeResponse> {
    return request<AccessChatsMessagesTemplatesDeleteReplyOnSubscribeResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/messages/templates/reply_on_subscribe`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.templates.deleteReplyOnSubscribe',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Message templates
   *
   * List saved chat message templates.
   *
   * Operation: `access.chats.messages.templates.list`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.messages.templates.list()
   * ```
   */
  list(params: AccessChatsMessagesTemplatesListParams = {}, options?: RequestOptions): Promise<AccessChatsMessagesTemplatesListResponse> {
    return request<AccessChatsMessagesTemplatesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/messages/templates`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.templates.list',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Create reply-on-subscribe message template
   *
   * Create the automatic reply-on-subscribe message template.
   *
   * Operation: `access.chats.messages.templates.setReplyOnSubscribe`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.templates.setReplyOnSubscribe({ body: {} })
   * ```
   */
  setReplyOnSubscribe(params: AccessChatsMessagesTemplatesSetReplyOnSubscribeParams, options?: RequestOptions): Promise<AccessChatsMessagesTemplatesSetReplyOnSubscribeResponse> {
    return request<AccessChatsMessagesTemplatesSetReplyOnSubscribeResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/messages/templates/reply_on_subscribe`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.templates.setReplyOnSubscribe',
      requiredScope: 'messages:write',
      ...options,
    });
  }
}

export class AccessChatsMessagesNamespace {
  readonly templates: AccessChatsMessagesTemplatesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.templates = new AccessChatsMessagesTemplatesNamespace(_config);
  }

  /**
   * Like chat message
   *
   * Like a chat message.
   *
   * Operation: `access.chats.messages.like`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.like({ messageId: 123, body: {} })
   * ```
   */
  like(params: AccessChatsMessagesLikeParams, options?: RequestOptions): Promise<AccessChatsMessagesLikeResponse> {
    return request<AccessChatsMessagesLikeResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/messages/${encodeURIComponent(String(params.messageId))}/like`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.like',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread messages
   *
   * List messages in a chat conversation, including cursor-style pagination and optional text search.
   *
   * Operation: `access.chats.messages.list`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.messages.list({ userId: 123 })
   * ```
   */
  list(params: AccessChatsMessagesListParams, options?: RequestOptions): Promise<AccessChatsMessagesListResponse> {
    return request<AccessChatsMessagesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/messages`,
      query: { "limit": params.limit, "cursor": params.cursor, "filter": params.filter, "order": params.order, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.list',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chat thread messages: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessChatsMessagesListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsMessagesListItem, void, unknown> {
    return paginate<AccessChatsMessagesListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Pin message for user
   *
   * Pin a message in a user's chat.
   *
   * Operation: `access.chats.messages.pinForUser`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.pinForUser({ userId: 123, messageId: 123 })
   * ```
   */
  pinForUser(params: AccessChatsMessagesPinForUserParams, options?: RequestOptions): Promise<AccessChatsMessagesPinForUserResponse> {
    return request<AccessChatsMessagesPinForUserResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/messages/${encodeURIComponent(String(params.messageId))}/pin/user/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.pinForUser',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread send message
   *
   * Send a direct message to a chat user. Supports text, pricing options, and uploaded media references.
   *
   * Operation: `access.chats.messages.send`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.send({ userId: 123, body: {} })
   * ```
   */
  send(params: AccessChatsMessagesSendParams, options?: RequestOptions): Promise<AccessChatsMessagesSendResponse> {
    return request<AccessChatsMessagesSendResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/messages`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.send',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Unlike chat message
   *
   * Remove a like from a chat message.
   *
   * Operation: `access.chats.messages.unlike`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.unlike({ messageId: 123, body: {} })
   * ```
   */
  unlike(params: AccessChatsMessagesUnlikeParams, options?: RequestOptions): Promise<AccessChatsMessagesUnlikeResponse> {
    return request<AccessChatsMessagesUnlikeResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/messages/${encodeURIComponent(String(params.messageId))}/like`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.unlike',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread unpin message
   *
   * Remove the pinned message from a chat.
   *
   * Operation: `access.chats.messages.unpinAll`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.unpinAll({ userId: 123 })
   * ```
   */
  unpinAll(params: AccessChatsMessagesUnpinAllParams, options?: RequestOptions): Promise<AccessChatsMessagesUnpinAllResponse> {
    return request<AccessChatsMessagesUnpinAllResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/messages/pin`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.unpinAll',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Unpin message for user
   *
   * Remove a pinned message from a user's chat.
   *
   * Operation: `access.chats.messages.unpinForUser`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.unpinForUser({ userId: 'example', messageId: 'example' })
   * ```
   */
  unpinForUser(params: AccessChatsMessagesUnpinForUserParams, options?: RequestOptions): Promise<AccessChatsMessagesUnpinForUserResponse> {
    return request<AccessChatsMessagesUnpinForUserResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/messages/${encodeURIComponent(String(params.messageId))}/pin/user/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.unpinForUser',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread unsend message
   *
   * Delete a previously sent chat message for the specified conversation.
   *
   * Operation: `access.chats.messages.unsend`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.messages.unsend({ messageId: 123, userId: 123, body: { withUserId: 'example' } })
   * ```
   */
  unsend(params: AccessChatsMessagesUnsendParams, options?: RequestOptions): Promise<AccessChatsMessagesUnsendResponse> {
    return request<AccessChatsMessagesUnsendResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/messages/${encodeURIComponent(String(params.messageId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.messages.unsend',
      requiredScope: 'messages:write',
      ...options,
    });
  }
}

export class AccessChatsNamespace {
  readonly massMessages: AccessChatsMassMessagesNamespace;
  readonly media: AccessChatsMediaNamespace;
  readonly messages: AccessChatsMessagesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.massMessages = new AccessChatsMassMessagesNamespace(_config);
    this.media = new AccessChatsMediaNamespace(_config);
    this.messages = new AccessChatsMessagesNamespace(_config);
  }

  /**
   * Chat thread
   *
   * Delete a chat conversation.
   *
   * Operation: `access.chats.delete`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.delete({ userId: 123 })
   * ```
   */
  delete(params: AccessChatsDeleteParams, options?: RequestOptions): Promise<AccessChatsDeleteResponse> {
    return request<AccessChatsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.delete',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread hide
   *
   * Hide a chat conversation.
   *
   * Operation: `access.chats.hide`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.hide({ userId: 123 })
   * ```
   */
  hide(params: AccessChatsHideParams, options?: RequestOptions): Promise<AccessChatsHideResponse> {
    return request<AccessChatsHideResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/hide`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.hide',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chats list
   *
   * Operation: `access.chats.list`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.list()
   * ```
   */
  list(params: AccessChatsListParams = {}, options?: RequestOptions): Promise<AccessChatsListResponse> {
    return request<AccessChatsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats`,
      query: { "limit": params.limit, "cursor": params.cursor, "order": params.order, "query": params.query, "listId": params.listId, "include_users": params.includeUsers },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.list',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chats list: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessChatsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsListItem, void, unknown> {
    return paginate<AccessChatsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Priority chats
   *
   * List priority chat conversations.
   *
   * Operation: `access.chats.listPriority`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.listPriority()
   * ```
   */
  listPriority(params: AccessChatsListPriorityParams = {}, options?: RequestOptions): Promise<AccessChatsListPriorityResponse> {
    return request<AccessChatsListPriorityResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/priority`,
      query: { "limit": params.limit, "cursor": params.cursor, "order": params.order, "query": params.query, "listId": params.listId, "include_users": params.includeUsers },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.listPriority',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Priority chats: every item, fetching pages as needed.
   */
  iteratePriority(params: Omit<AccessChatsListPriorityParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsListPriorityItem, void, unknown> {
    return paginate<AccessChatsListPriorityItem>(
      (cursor) => this.listPriority({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Unread chats
   *
   * List chat conversations with unread messages.
   *
   * Operation: `access.chats.listUnread`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.listUnread()
   * ```
   */
  listUnread(params: AccessChatsListUnreadParams = {}, options?: RequestOptions): Promise<AccessChatsListUnreadResponse> {
    return request<AccessChatsListUnreadResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/unread`,
      query: { "limit": params.limit, "cursor": params.cursor, "order": params.order, "query": params.query, "listId": params.listId, "include_users": params.includeUsers },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.listUnread',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Unread chats: every item, fetching pages as needed.
   */
  iterateUnread(params: Omit<AccessChatsListUnreadParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsListUnreadItem, void, unknown> {
    return paginate<AccessChatsListUnreadItem>(
      (cursor) => this.listUnread({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Chats with tips
   *
   * List chat conversations that include tips.
   *
   * Operation: `access.chats.listWithTips`
   *
   * @scope messages:read
   * @example
   * ```ts
   * await client.access.chats.listWithTips()
   * ```
   */
  listWithTips(params: AccessChatsListWithTipsParams = {}, options?: RequestOptions): Promise<AccessChatsListWithTipsResponse> {
    return request<AccessChatsListWithTipsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/chats/with-tips`,
      query: { "limit": params.limit, "cursor": params.cursor, "order": params.order, "query": params.query, "listId": params.listId, "include_users": params.includeUsers },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.listWithTips',
      requiredScope: 'messages:read',
      ...options,
    });
  }

  /**
   * Chats with tips: every item, fetching pages as needed.
   */
  iterateWithTips(params: Omit<AccessChatsListWithTipsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessChatsListWithTipsItem, void, unknown> {
    return paginate<AccessChatsListWithTipsItem>(
      (cursor) => this.listWithTips({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Mark all chats as read
   *
   * Mark all chats as read.
   *
   * Operation: `access.chats.markAllAsRead`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.markAllAsRead()
   * ```
   */
  markAllAsRead(params: AccessChatsMarkAllAsReadParams = {}, options?: RequestOptions): Promise<AccessChatsMarkAllAsReadResponse> {
    return request<AccessChatsMarkAllAsReadResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/mark-all-as-read`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.markAllAsRead',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread mute
   *
   * Mute a chat conversation.
   *
   * Operation: `access.chats.mute`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.mute({ userId: 123 })
   * ```
   */
  mute(params: AccessChatsMuteParams, options?: RequestOptions): Promise<AccessChatsMuteResponse> {
    return request<AccessChatsMuteResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/mute`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.mute',
      requiredScope: 'messages:write',
      ...options,
    });
  }

  /**
   * Chat thread unmute
   *
   * Unmute a chat conversation.
   *
   * Operation: `access.chats.unmute`
   *
   * @scope messages:write
   * @example
   * ```ts
   * await client.access.chats.unmute({ userId: 123 })
   * ```
   */
  unmute(params: AccessChatsUnmuteParams, options?: RequestOptions): Promise<AccessChatsUnmuteResponse> {
    return request<AccessChatsUnmuteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/chats/${encodeURIComponent(String(params.userId))}/mute`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.chats.unmute',
      requiredScope: 'messages:write',
      ...options,
    });
  }
}

export class AccessFinancesEarningsTimeseriesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Get earnings chart
   *
   * Get time-series earnings data
   *
   * Operation: `access.finances.earnings.timeseries.get`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.get()
   * ```
   */
  get(params: AccessFinancesEarningsTimeseriesGetParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetResponse> {
    return request<AccessFinancesEarningsTimeseriesGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "by": params.by, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.get',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Message earnings over time
   *
   * Get time-series earnings from paid messages.
   *
   * Operation: `access.finances.earnings.timeseries.getMessages`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.getMessages()
   * ```
   */
  getMessages(params: AccessFinancesEarningsTimeseriesGetMessagesParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetMessagesResponse> {
    return request<AccessFinancesEarningsTimeseriesGetMessagesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries/messages`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.getMessages',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Post earnings over time
   *
   * Get time-series earnings from paid posts.
   *
   * Operation: `access.finances.earnings.timeseries.getPosts`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.getPosts()
   * ```
   */
  getPosts(params: AccessFinancesEarningsTimeseriesGetPostsParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetPostsResponse> {
    return request<AccessFinancesEarningsTimeseriesGetPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries/posts`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.getPosts',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Profile tips over time
   *
   * Get time-series earnings from profile tips.
   *
   * Operation: `access.finances.earnings.timeseries.getProfileTips`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.getProfileTips()
   * ```
   */
  getProfileTips(params: AccessFinancesEarningsTimeseriesGetProfileTipsParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetProfileTipsResponse> {
    return request<AccessFinancesEarningsTimeseriesGetProfileTipsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries/profile-tips`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.getProfileTips',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Stream earnings over time
   *
   * Get time-series earnings from streams.
   *
   * Operation: `access.finances.earnings.timeseries.getStreams`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.getStreams()
   * ```
   */
  getStreams(params: AccessFinancesEarningsTimeseriesGetStreamsParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetStreamsResponse> {
    return request<AccessFinancesEarningsTimeseriesGetStreamsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries/streams`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.getStreams',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Subscription earnings over time
   *
   * Get time-series earnings from subscriptions.
   *
   * Operation: `access.finances.earnings.timeseries.getSubscriptions`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.getSubscriptions()
   * ```
   */
  getSubscriptions(params: AccessFinancesEarningsTimeseriesGetSubscriptionsParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetSubscriptionsResponse> {
    return request<AccessFinancesEarningsTimeseriesGetSubscriptionsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries/subscriptions`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.getSubscriptions',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Total earnings over time
   *
   * Get time-series total earnings data.
   *
   * Operation: `access.finances.earnings.timeseries.getTotal`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.timeseries.getTotal()
   * ```
   */
  getTotal(params: AccessFinancesEarningsTimeseriesGetTotalParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTimeseriesGetTotalResponse> {
    return request<AccessFinancesEarningsTimeseriesGetTotalResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/timeseries/total`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "monthlyTotal": params.monthlyTotal },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.timeseries.getTotal',
      requiredScope: 'finances:read',
      ...options,
    });
  }
}

export class AccessFinancesEarningsTransactionsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * List transactions
   *
   * Get a list of earnings transactions
   *
   * Operation: `access.finances.earnings.transactions.list`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.transactions.list()
   * ```
   */
  list(params: AccessFinancesEarningsTransactionsListParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTransactionsListResponse> {
    return request<AccessFinancesEarningsTransactionsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/transactions`,
      query: { "limit": params.limit, "startDate": params.startDate, "cursor": params.cursor, "type": params.type, "tipsSource": params.tipsSource },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.transactions.list',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * List transactions: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessFinancesEarningsTransactionsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesEarningsTransactionsListItem, void, unknown> {
    return paginate<AccessFinancesEarningsTransactionsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Message transactions
   *
   * List earnings transactions where the transaction type is chat messages.
   *
   * Operation: `access.finances.earnings.transactions.listMessages`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.transactions.listMessages()
   * ```
   */
  listMessages(params: AccessFinancesEarningsTransactionsListMessagesParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTransactionsListMessagesResponse> {
    return request<AccessFinancesEarningsTransactionsListMessagesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/transactions/messages`,
      query: { "limit": params.limit, "startDate": params.startDate, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.transactions.listMessages',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Message transactions: every item, fetching pages as needed.
   */
  iterateMessages(params: Omit<AccessFinancesEarningsTransactionsListMessagesParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesEarningsTransactionsListMessagesItem, void, unknown> {
    return paginate<AccessFinancesEarningsTransactionsListMessagesItem>(
      (cursor) => this.listMessages({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Tip transactions
   *
   * List earnings transactions where the transaction type is tips.
   *
   * Operation: `access.finances.earnings.transactions.listTips`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.transactions.listTips()
   * ```
   */
  listTips(params: AccessFinancesEarningsTransactionsListTipsParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsTransactionsListTipsResponse> {
    return request<AccessFinancesEarningsTransactionsListTipsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/transactions/tips`,
      query: { "limit": params.limit, "startDate": params.startDate, "cursor": params.cursor, "tipsSource": params.tipsSource },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.transactions.listTips',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Tip transactions: every item, fetching pages as needed.
   */
  iterateTips(params: Omit<AccessFinancesEarningsTransactionsListTipsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesEarningsTransactionsListTipsItem, void, unknown> {
    return paginate<AccessFinancesEarningsTransactionsListTipsItem>(
      (cursor) => this.listTips({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessFinancesEarningsNamespace {
  readonly timeseries: AccessFinancesEarningsTimeseriesNamespace;
  readonly transactions: AccessFinancesEarningsTransactionsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.timeseries = new AccessFinancesEarningsTimeseriesNamespace(_config);
    this.transactions = new AccessFinancesEarningsTransactionsNamespace(_config);
  }

  /**
   * List chargebacks
   *
   * Get a list of chargebacks
   *
   * Operation: `access.finances.earnings.listChargebacks`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.earnings.listChargebacks()
   * ```
   */
  listChargebacks(params: AccessFinancesEarningsListChargebacksParams = {}, options?: RequestOptions): Promise<AccessFinancesEarningsListChargebacksResponse> {
    return request<AccessFinancesEarningsListChargebacksResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/earnings/chargebacks`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.earnings.listChargebacks',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * List chargebacks: every item, fetching pages as needed.
   */
  iterateChargebacks(params: Omit<AccessFinancesEarningsListChargebacksParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesEarningsListChargebacksItem, void, unknown> {
    return paginate<AccessFinancesEarningsListChargebacksItem>(
      (cursor) => this.listChargebacks({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessFinancesPayoutsChargebacksNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Chargeback ratio
   *
   * Get chargeback ratio for the requested date range.
   *
   * Operation: `access.finances.payouts.chargebacks.getRatio`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.payouts.chargebacks.getRatio()
   * ```
   */
  getRatio(params: AccessFinancesPayoutsChargebacksGetRatioParams = {}, options?: RequestOptions): Promise<AccessFinancesPayoutsChargebacksGetRatioResponse> {
    return request<AccessFinancesPayoutsChargebacksGetRatioResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/payouts/chargebacks/ratio`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.payouts.chargebacks.getRatio',
      requiredScope: 'finances:read',
      ...options,
    });
  }
}

export class AccessFinancesPayoutsNamespace {
  readonly chargebacks: AccessFinancesPayoutsChargebacksNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.chargebacks = new AccessFinancesPayoutsChargebacksNamespace(_config);
  }

  /**
   * Payout balances
   *
   * Get payout balance details.
   *
   * Operation: `access.finances.payouts.getBalances`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.payouts.getBalances()
   * ```
   */
  getBalances(params: AccessFinancesPayoutsGetBalancesParams = {}, options?: RequestOptions): Promise<AccessFinancesPayoutsGetBalancesResponse> {
    return request<AccessFinancesPayoutsGetBalancesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/payouts/balances`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.payouts.getBalances',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Check payout receive status
   *
   * Check whether payouts can be received.
   *
   * Operation: `access.finances.payouts.getCheckReceive`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.payouts.getCheckReceive()
   * ```
   */
  getCheckReceive(params: AccessFinancesPayoutsGetCheckReceiveParams = {}, options?: RequestOptions): Promise<AccessFinancesPayoutsGetCheckReceiveResponse> {
    return request<AccessFinancesPayoutsGetCheckReceiveResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/payouts/check-receive`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.payouts.getCheckReceive',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Payout requests
   *
   * List payout requests.
   *
   * Operation: `access.finances.payouts.listRequests`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.payouts.listRequests()
   * ```
   */
  listRequests(params: AccessFinancesPayoutsListRequestsParams = {}, options?: RequestOptions): Promise<AccessFinancesPayoutsListRequestsResponse> {
    return request<AccessFinancesPayoutsListRequestsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/payouts/requests`,
      query: { "limit": params.limit, "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.payouts.listRequests',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Payout requests: every item, fetching pages as needed.
   */
  iterateRequests(params: Omit<AccessFinancesPayoutsListRequestsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesPayoutsListRequestsItem, void, unknown> {
    return paginate<AccessFinancesPayoutsListRequestsItem>(
      (cursor) => this.listRequests({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Payout stats
   *
   * Get payout stats for the requested date range.
   *
   * Operation: `access.finances.payouts.listStats`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.payouts.listStats()
   * ```
   */
  listStats(params: AccessFinancesPayoutsListStatsParams = {}, options?: RequestOptions): Promise<AccessFinancesPayoutsListStatsResponse> {
    return request<AccessFinancesPayoutsListStatsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/payouts/stats`,
      query: { "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.payouts.listStats',
      requiredScope: 'finances:read',
      ...options,
    });
  }
}

export class AccessFinancesReferralsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Referral balance
   *
   * Get referral balance details.
   *
   * Operation: `access.finances.referrals.getBalance`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.referrals.getBalance()
   * ```
   */
  getBalance(params: AccessFinancesReferralsGetBalanceParams = {}, options?: RequestOptions): Promise<AccessFinancesReferralsGetBalanceResponse> {
    return request<AccessFinancesReferralsGetBalanceResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/referrals/balance`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.referrals.getBalance',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Referrals
   *
   * List referral stats for the authenticated creator.
   *
   * Operation: `access.finances.referrals.list`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.finances.referrals.list()
   * ```
   */
  list(params: AccessFinancesReferralsListParams = {}, options?: RequestOptions): Promise<AccessFinancesReferralsListResponse> {
    return request<AccessFinancesReferralsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/referrals`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "cursor": params.cursor, "onlyPerformers": params.onlyPerformers },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.referrals.list',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Referrals: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessFinancesReferralsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesReferralsListItem, void, unknown> {
    return paginate<AccessFinancesReferralsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Referral payout requests
   *
   * List referral payout requests.
   *
   * Operation: `access.finances.referrals.listPayoutRequests`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.referrals.listPayoutRequests()
   * ```
   */
  listPayoutRequests(params: AccessFinancesReferralsListPayoutRequestsParams = {}, options?: RequestOptions): Promise<AccessFinancesReferralsListPayoutRequestsResponse> {
    return request<AccessFinancesReferralsListPayoutRequestsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/referrals/payout-requests`,
      query: { "limit": params.limit, "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.referrals.listPayoutRequests',
      requiredScope: 'finances:read',
      ...options,
    });
  }

  /**
   * Referral payout requests: every item, fetching pages as needed.
   */
  iteratePayoutRequests(params: Omit<AccessFinancesReferralsListPayoutRequestsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessFinancesReferralsListPayoutRequestsItem, void, unknown> {
    return paginate<AccessFinancesReferralsListPayoutRequestsItem>(
      (cursor) => this.listPayoutRequests({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Referrals over time
   *
   * Get time-series referral payout data.
   *
   * Operation: `access.finances.referrals.listTimeseries`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.referrals.listTimeseries()
   * ```
   */
  listTimeseries(params: AccessFinancesReferralsListTimeseriesParams = {}, options?: RequestOptions): Promise<AccessFinancesReferralsListTimeseriesResponse> {
    return request<AccessFinancesReferralsListTimeseriesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/referrals/timeseries`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "withChart": params.withChart },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.referrals.listTimeseries',
      requiredScope: 'finances:read',
      ...options,
    });
  }
}

export class AccessFinancesTimeseriesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Chargebacks over time
   *
   * Get time-series chargeback data.
   *
   * Operation: `access.finances.timeseries.listChargebacks`
   *
   * @scope finances:read
   * @example
   * ```ts
   * await client.access.finances.timeseries.listChargebacks()
   * ```
   */
  listChargebacks(params: AccessFinancesTimeseriesListChargebacksParams = {}, options?: RequestOptions): Promise<AccessFinancesTimeseriesListChargebacksResponse> {
    return request<AccessFinancesTimeseriesListChargebacksResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/finances/timeseries/chargebacks`,
      query: { "startDate": params.startDate, "endDate": params.endDate, "withTotal": params.withTotal, "withChart": params.withChart },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.finances.timeseries.listChargebacks',
      requiredScope: 'finances:read',
      ...options,
    });
  }
}

export class AccessFinancesNamespace {
  readonly earnings: AccessFinancesEarningsNamespace;
  readonly payouts: AccessFinancesPayoutsNamespace;
  readonly referrals: AccessFinancesReferralsNamespace;
  readonly timeseries: AccessFinancesTimeseriesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.earnings = new AccessFinancesEarningsNamespace(_config);
    this.payouts = new AccessFinancesPayoutsNamespace(_config);
    this.referrals = new AccessFinancesReferralsNamespace(_config);
    this.timeseries = new AccessFinancesTimeseriesNamespace(_config);
  }
}

export class AccessListsUsersNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Add user to list
   *
   * Add a user to a list.
   *
   * Operation: `access.lists.users.add`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.users.add({ listId: 123, userId: 123 })
   * ```
   */
  add(params: AccessListsUsersAddParams, options?: RequestOptions): Promise<AccessListsUsersAddResponse> {
    return request<AccessListsUsersAddResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.add',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Create list users
   *
   * Create list-user assignments.
   *
   * Operation: `access.lists.users.addToLists`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.users.addToLists({ body: {} })
   * ```
   */
  addToLists(params: AccessListsUsersAddToListsParams, options?: RequestOptions): Promise<AccessListsUsersAddToListsResponse> {
    return request<AccessListsUsersAddToListsResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/lists/users`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.addToLists',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Clear list users
   *
   * Remove all users from a list.
   *
   * Operation: `access.lists.users.clear`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.users.clear({ listId: 'example' })
   * ```
   */
  clear(params: AccessListsUsersClearParams, options?: RequestOptions): Promise<AccessListsUsersClearResponse> {
    return request<AccessListsUsersClearResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/users`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.clear',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * List users in user list
   *
   * List users assigned to a specific user list, with pagination support.
   *
   * Operation: `access.lists.users.list`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.users.list({ listId: 123 })
   * ```
   */
  list(params: AccessListsUsersListParams, options?: RequestOptions): Promise<AccessListsUsersListResponse> {
    return request<AccessListsUsersListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/users`,
      query: { "limit": params.limit, "cursor": params.cursor, "field": params.field, "order": params.order, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.list',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * List users in user list: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessListsUsersListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessListsUsersListItem, void, unknown> {
    return paginate<AccessListsUsersListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Pinned list users
   *
   * List pinned users in a list.
   *
   * Operation: `access.lists.users.listPinned`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.users.listPinned({ listId: 123 })
   * ```
   */
  listPinned(params: AccessListsUsersListPinnedParams, options?: RequestOptions): Promise<AccessListsUsersListPinnedResponse> {
    return request<AccessListsUsersListPinnedResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/users/pinned`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.listPinned',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * Pin list user
   *
   * Pin a user in a list.
   *
   * Operation: `access.lists.users.pin`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.users.pin({ listId: 123, userId: 123 })
   * ```
   */
  pin(params: AccessListsUsersPinParams, options?: RequestOptions): Promise<AccessListsUsersPinResponse> {
    return request<AccessListsUsersPinResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/users/${encodeURIComponent(String(params.userId))}/pin`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.pin',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Remove user from list
   *
   * Remove a user from a list.
   *
   * Operation: `access.lists.users.remove`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.users.remove({ listId: 123, userId: 123 })
   * ```
   */
  remove(params: AccessListsUsersRemoveParams, options?: RequestOptions): Promise<AccessListsUsersRemoveResponse> {
    return request<AccessListsUsersRemoveResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.users.remove',
      requiredScope: 'lists:write',
      ...options,
    });
  }
}

export class AccessListsNamespace {
  readonly users: AccessListsUsersNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.users = new AccessListsUsersNamespace(_config);
  }

  /**
   * Create list
   *
   * Create a list through the transformed /lists route.
   *
   * Operation: `access.lists.create`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.create({ body: { name: 'example' } })
   * ```
   */
  create(params: AccessListsCreateParams, options?: RequestOptions): Promise<AccessListsCreateResponse> {
    return request<AccessListsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/lists`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.create',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Delete list
   *
   * Delete a list by id.
   *
   * Operation: `access.lists.delete`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.delete({ listId: 123 })
   * ```
   */
  delete(params: AccessListsDeleteParams, options?: RequestOptions): Promise<AccessListsDeleteResponse> {
    return request<AccessListsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.delete',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Get list
   *
   * Get a list by id.
   *
   * Operation: `access.lists.get`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.get({ listId: 123 })
   * ```
   */
  get(params: AccessListsGetParams, options?: RequestOptions): Promise<AccessListsGetResponse> {
    return request<AccessListsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.get',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * Fan lists
   *
   * List fan lists.
   *
   * Operation: `access.lists.getFans`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.getFans()
   * ```
   */
  getFans(params: AccessListsGetFansParams = {}, options?: RequestOptions): Promise<AccessListsGetFansResponse> {
    return request<AccessListsGetFansResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists/fans`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.getFans',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * Following lists
   *
   * List following lists.
   *
   * Operation: `access.lists.getFollowing`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.getFollowing()
   * ```
   */
  getFollowing(params: AccessListsGetFollowingParams = {}, options?: RequestOptions): Promise<AccessListsGetFollowingResponse> {
    return request<AccessListsGetFollowingResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists/following`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.getFollowing',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * List user lists
   *
   * List user lists created by the authenticated creator, including pagination metadata.
   *
   * Operation: `access.lists.list`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.list()
   * ```
   */
  list(params: AccessListsListParams = {}, options?: RequestOptions): Promise<AccessListsListResponse> {
    return request<AccessListsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "filter": params.filter, "isChat": params.isChat },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.list',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * List user lists: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessListsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessListsListItem, void, unknown> {
    return paginate<AccessListsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * List posts in list
   *
   * List posts for a list.
   *
   * Operation: `access.lists.listPosts`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.lists.listPosts({ listId: 123 })
   * ```
   */
  listPosts(params: AccessListsListPostsParams, options?: RequestOptions): Promise<AccessListsListPostsResponse> {
    return request<AccessListsListPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/posts`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.listPosts',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * List posts in list: every item, fetching pages as needed.
   */
  iteratePosts(params: Omit<AccessListsListPostsParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessListsListPostsItem, void, unknown> {
    return paginate<AccessListsListPostsItem>(
      (cursor) => this.listPosts({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Sort lists
   *
   * Update list ordering.
   *
   * Operation: `access.lists.sort`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.sort({ body: {} })
   * ```
   */
  sort(params: AccessListsSortParams, options?: RequestOptions): Promise<AccessListsSortResponse> {
    return request<AccessListsSortResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/lists/sort`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.sort',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Sort list
   *
   * Update item ordering for a list.
   *
   * Operation: `access.lists.sortItems`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.sortItems({ listId: 123, body: {} })
   * ```
   */
  sortItems(params: AccessListsSortItemsParams, options?: RequestOptions): Promise<AccessListsSortItemsResponse> {
    return request<AccessListsSortItemsResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}/sort`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.sortItems',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Update list
   *
   * Update a list by id.
   *
   * Operation: `access.lists.update`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.lists.update({ listId: 123, body: {} })
   * ```
   */
  update(params: AccessListsUpdateParams, options?: RequestOptions): Promise<AccessListsUpdateResponse> {
    return request<AccessListsUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/lists/${encodeURIComponent(String(params.listId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.lists.update',
      requiredScope: 'lists:write',
      ...options,
    });
  }
}

export class AccessNotificationsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Notification count
   *
   * Get notification count for the authenticated creator.
   *
   * Operation: `access.notifications.getCount`
   *
   * @scope notifications:read
   * @example
   * ```ts
   * await client.access.notifications.getCount()
   * ```
   */
  getCount(params: AccessNotificationsGetCountParams = {}, options?: RequestOptions): Promise<AccessNotificationsGetCountResponse> {
    return request<AccessNotificationsGetCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/notifications/count`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.notifications.getCount',
      requiredScope: 'notifications:read',
      ...options,
    });
  }

  /**
   * List notifications
   *
   * List account notifications for the authenticated creator, with optional pagination and filtering by related username.
   *
   * Operation: `access.notifications.list`
   *
   * @scope notifications:read
   * @example
   * ```ts
   * await client.access.notifications.list()
   * ```
   */
  list(params: AccessNotificationsListParams = {}, options?: RequestOptions): Promise<AccessNotificationsListResponse> {
    return request<AccessNotificationsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/notifications`,
      query: { "limit": params.limit, "cursor": params.cursor, "type": params.type, "relatedUsername": params.relatedUsername },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.notifications.list',
      requiredScope: 'notifications:read',
      ...options,
    });
  }

  /**
   * List notifications: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessNotificationsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessNotificationsListItem, void, unknown> {
    return paginate<AccessNotificationsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Mark notifications read
   *
   * Mark notifications as read for the authenticated creator.
   *
   * Operation: `access.notifications.markRead`
   *
   * @scope notifications:write
   * @example
   * ```ts
   * await client.access.notifications.markRead()
   * ```
   */
  markRead(params: AccessNotificationsMarkReadParams = {}, options?: RequestOptions): Promise<AccessNotificationsMarkReadResponse> {
    return request<AccessNotificationsMarkReadResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/notifications/read`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.notifications.markRead',
      requiredScope: 'notifications:write',
      ...options,
    });
  }
}

export class AccessPostsBookmarksCategoriesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Add post to bookmark category
   *
   * Add a post to a bookmark category.
   *
   * Operation: `access.posts.bookmarks.categories.addPost`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.bookmarks.categories.addPost({ categoryId: 123, postId: 123 })
   * ```
   */
  addPost(params: AccessPostsBookmarksCategoriesAddPostParams, options?: RequestOptions): Promise<AccessPostsBookmarksCategoriesAddPostResponse> {
    return request<AccessPostsBookmarksCategoriesAddPostResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/bookmarks/categories/${encodeURIComponent(String(params.categoryId))}/${encodeURIComponent(String(params.postId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.categories.addPost',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Create post bookmark category
   *
   * Create a post bookmark category.
   *
   * Operation: `access.posts.bookmarks.categories.create`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.bookmarks.categories.create({ body: { name: 'example' } })
   * ```
   */
  create(params: AccessPostsBookmarksCategoriesCreateParams, options?: RequestOptions): Promise<AccessPostsBookmarksCategoriesCreateResponse> {
    return request<AccessPostsBookmarksCategoriesCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/bookmarks/categories`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.categories.create',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Delete post bookmark category
   *
   * Delete a post bookmark category.
   *
   * Operation: `access.posts.bookmarks.categories.delete`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.bookmarks.categories.delete({ categoryId: 123 })
   * ```
   */
  delete(params: AccessPostsBookmarksCategoriesDeleteParams, options?: RequestOptions): Promise<AccessPostsBookmarksCategoriesDeleteResponse> {
    return request<AccessPostsBookmarksCategoriesDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/bookmarks/categories/${encodeURIComponent(String(params.categoryId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.categories.delete',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Post bookmark categories
   *
   * List post bookmark categories.
   *
   * Operation: `access.posts.bookmarks.categories.list`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.bookmarks.categories.list()
   * ```
   */
  list(params: AccessPostsBookmarksCategoriesListParams = {}, options?: RequestOptions): Promise<AccessPostsBookmarksCategoriesListResponse> {
    return request<AccessPostsBookmarksCategoriesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/bookmarks/categories`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "chatGroupId": params.chatGroupId },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.categories.list',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post bookmark categories: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPostsBookmarksCategoriesListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsBookmarksCategoriesListItem, void, unknown> {
    return paginate<AccessPostsBookmarksCategoriesListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Remove post from bookmark category
   *
   * Remove a post from a bookmark category.
   *
   * Operation: `access.posts.bookmarks.categories.removePost`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.bookmarks.categories.removePost({ categoryId: 123, postId: 123 })
   * ```
   */
  removePost(params: AccessPostsBookmarksCategoriesRemovePostParams, options?: RequestOptions): Promise<AccessPostsBookmarksCategoriesRemovePostResponse> {
    return request<AccessPostsBookmarksCategoriesRemovePostResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/bookmarks/categories/${encodeURIComponent(String(params.categoryId))}/${encodeURIComponent(String(params.postId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.categories.removePost',
      requiredScope: 'posts:write',
      ...options,
    });
  }
}

export class AccessPostsBookmarksNamespace {
  readonly categories: AccessPostsBookmarksCategoriesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.categories = new AccessPostsBookmarksCategoriesNamespace(_config);
  }

  /**
   * Create post bookmark
   *
   * Create a bookmark for a post.
   *
   * Operation: `access.posts.bookmarks.add`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.bookmarks.add({ bookmarkId: 123, postId: 123 })
   * ```
   */
  add(params: AccessPostsBookmarksAddParams, options?: RequestOptions): Promise<AccessPostsBookmarksAddResponse> {
    return request<AccessPostsBookmarksAddResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/bookmarks/${encodeURIComponent(String(params.bookmarkId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.add',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Post bookmarks
   *
   * List bookmarked posts.
   *
   * Operation: `access.posts.bookmarks.list`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.bookmarks.list()
   * ```
   */
  list(params: AccessPostsBookmarksListParams = {}, options?: RequestOptions): Promise<AccessPostsBookmarksListResponse> {
    return request<AccessPostsBookmarksListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/bookmarks`,
      query: { "limit": params.limit, "cursor": params.cursor, "entityType": params.entityType },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.list',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post bookmarks: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPostsBookmarksListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsBookmarksListItem, void, unknown> {
    return paginate<AccessPostsBookmarksListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Post bookmarks by type and category
   *
   * List bookmarked posts by type and category.
   *
   * Operation: `access.posts.bookmarks.listByCategory`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.bookmarks.listByCategory({ bookmarkType: 'all', categoryId: 123 })
   * ```
   */
  listByCategory(params: AccessPostsBookmarksListByCategoryParams, options?: RequestOptions): Promise<AccessPostsBookmarksListByCategoryResponse> {
    return request<AccessPostsBookmarksListByCategoryResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/bookmarks/${encodeURIComponent(String(params.bookmarkType))}/${encodeURIComponent(String(params.categoryId))}`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.listByCategory',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post bookmarks by type and category: every item, fetching pages as needed.
   */
  iterateByCategory(params: Omit<AccessPostsBookmarksListByCategoryParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsBookmarksListByCategoryItem, void, unknown> {
    return paginate<AccessPostsBookmarksListByCategoryItem>(
      (cursor) => this.listByCategory({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Post bookmarks by type
   *
   * List bookmarked posts by bookmark type.
   *
   * Operation: `access.posts.bookmarks.listByType`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.bookmarks.listByType({ bookmarkType: 'all' })
   * ```
   */
  listByType(params: AccessPostsBookmarksListByTypeParams, options?: RequestOptions): Promise<AccessPostsBookmarksListByTypeResponse> {
    return request<AccessPostsBookmarksListByTypeResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/bookmarks/${encodeURIComponent(String(params.bookmarkType))}`,
      query: { "limit": params.limit, "cursor": params.cursor, "filter": params.filter, "order": params.order },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.listByType',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post bookmarks by type: every item, fetching pages as needed.
   */
  iterateByType(params: Omit<AccessPostsBookmarksListByTypeParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsBookmarksListByTypeItem, void, unknown> {
    return paginate<AccessPostsBookmarksListByTypeItem>(
      (cursor) => this.listByType({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Delete post bookmarks
   *
   * Delete bookmarks for a post.
   *
   * Operation: `access.posts.bookmarks.remove`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.bookmarks.remove({ postId: 123 })
   * ```
   */
  remove(params: AccessPostsBookmarksRemoveParams, options?: RequestOptions): Promise<AccessPostsBookmarksRemoveResponse> {
    return request<AccessPostsBookmarksRemoveResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/bookmarks`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.bookmarks.remove',
      requiredScope: 'posts:write',
      ...options,
    });
  }
}

export class AccessPostsCommentsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create post comment
   *
   * Create a comment on a post.
   *
   * Operation: `access.posts.comments.create`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.comments.create({ postId: 123, body: { text: 'example' } })
   * ```
   */
  create(params: AccessPostsCommentsCreateParams, options?: RequestOptions): Promise<AccessPostsCommentsCreateResponse> {
    return request<AccessPostsCommentsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/comments`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.create',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Delete post comment
   *
   * Delete a post comment.
   *
   * Operation: `access.posts.comments.delete`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.comments.delete({ commentId: 123 })
   * ```
   */
  delete(params: AccessPostsCommentsDeleteParams, options?: RequestOptions): Promise<AccessPostsCommentsDeleteResponse> {
    return request<AccessPostsCommentsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/comments/${encodeURIComponent(String(params.commentId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.delete',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Like post comment
   *
   * Like a post comment.
   *
   * Operation: `access.posts.comments.like`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.comments.like({ commentId: 123 })
   * ```
   */
  like(params: AccessPostsCommentsLikeParams, options?: RequestOptions): Promise<AccessPostsCommentsLikeResponse> {
    return request<AccessPostsCommentsLikeResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/comments/${encodeURIComponent(String(params.commentId))}/like`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.like',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Post comments
   *
   * List comments for a post.
   *
   * Operation: `access.posts.comments.list`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.comments.list({ postId: 123 })
   * ```
   */
  list(params: AccessPostsCommentsListParams, options?: RequestOptions): Promise<AccessPostsCommentsListResponse> {
    return request<AccessPostsCommentsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/comments`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.list',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post comments: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPostsCommentsListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsCommentsListItem, void, unknown> {
    return paginate<AccessPostsCommentsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Pin post comment
   *
   * Pin a post comment.
   *
   * Operation: `access.posts.comments.pin`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.comments.pin({ commentId: 123 })
   * ```
   */
  pin(params: AccessPostsCommentsPinParams, options?: RequestOptions): Promise<AccessPostsCommentsPinResponse> {
    return request<AccessPostsCommentsPinResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/comments/${encodeURIComponent(String(params.commentId))}/pin`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.pin',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Unlike post comment
   *
   * Remove a post comment like.
   *
   * Operation: `access.posts.comments.unlike`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.comments.unlike({ commentId: 123 })
   * ```
   */
  unlike(params: AccessPostsCommentsUnlikeParams, options?: RequestOptions): Promise<AccessPostsCommentsUnlikeResponse> {
    return request<AccessPostsCommentsUnlikeResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/comments/${encodeURIComponent(String(params.commentId))}/like`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.unlike',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Unpin post comment
   *
   * Unpin a post comment.
   *
   * Operation: `access.posts.comments.unpin`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.comments.unpin({ commentId: 123 })
   * ```
   */
  unpin(params: AccessPostsCommentsUnpinParams, options?: RequestOptions): Promise<AccessPostsCommentsUnpinResponse> {
    return request<AccessPostsCommentsUnpinResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/comments/${encodeURIComponent(String(params.commentId))}/pin`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.comments.unpin',
      requiredScope: 'posts:write',
      ...options,
    });
  }
}

export class AccessPostsFavoritesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Favorite post for author
   *
   * Favorite a post for an author.
   *
   * Operation: `access.posts.favorites.add`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.favorites.add({ authorId: 123, postId: 123 })
   * ```
   */
  add(params: AccessPostsFavoritesAddParams, options?: RequestOptions): Promise<AccessPostsFavoritesAddResponse> {
    return request<AccessPostsFavoritesAddResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/favorites/${encodeURIComponent(String(params.authorId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.favorites.add',
      requiredScope: 'posts:write',
      ...options,
    });
  }
}

export class AccessPostsFundRaisingContributorsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Fundraising contributors count
   *
   * Get fundraising contributor count for a post.
   *
   * Operation: `access.posts.fundRaisingContributors.getCount`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.fundRaisingContributors.getCount({ postId: 123 })
   * ```
   */
  getCount(params: AccessPostsFundRaisingContributorsGetCountParams, options?: RequestOptions): Promise<AccessPostsFundRaisingContributorsGetCountResponse> {
    return request<AccessPostsFundRaisingContributorsGetCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/fund-raising-contributors/count`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.fundRaisingContributors.getCount',
      requiredScope: 'posts:read',
      ...options,
    });
  }
}

export class AccessPostsVotersNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Post voters by option
   *
   * List voters for a specific poll option.
   *
   * Operation: `access.posts.voters.listByOption`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.voters.listByOption({ optionId: 123, postId: 123 })
   * ```
   */
  listByOption(params: AccessPostsVotersListByOptionParams, options?: RequestOptions): Promise<AccessPostsVotersListByOptionResponse> {
    return request<AccessPostsVotersListByOptionResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/voters/${encodeURIComponent(String(params.optionId))}`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.voters.listByOption',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post voters by option: every item, fetching pages as needed.
   */
  iterateByOption(params: Omit<AccessPostsVotersListByOptionParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsVotersListByOptionItem, void, unknown> {
    return paginate<AccessPostsVotersListByOptionItem>(
      (cursor) => this.listByOption({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessPostsNamespace {
  readonly bookmarks: AccessPostsBookmarksNamespace;
  readonly comments: AccessPostsCommentsNamespace;
  readonly favorites: AccessPostsFavoritesNamespace;
  readonly fundRaisingContributors: AccessPostsFundRaisingContributorsNamespace;
  readonly voters: AccessPostsVotersNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.bookmarks = new AccessPostsBookmarksNamespace(_config);
    this.comments = new AccessPostsCommentsNamespace(_config);
    this.favorites = new AccessPostsFavoritesNamespace(_config);
    this.fundRaisingContributors = new AccessPostsFundRaisingContributorsNamespace(_config);
    this.voters = new AccessPostsVotersNamespace(_config);
  }

  /**
   * Archive post
   *
   * Archive a post.
   *
   * Operation: `access.posts.archive`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.archive({ postId: 123 })
   * ```
   */
  archive(params: AccessPostsArchiveParams, options?: RequestOptions): Promise<AccessPostsArchiveResponse> {
    return request<AccessPostsArchiveResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/archive`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.archive',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Create post
   *
   * Create a post on the authenticated creator account. Supports text, scheduling, pricing options, polls, and uploaded media references.
   *
   * Operation: `access.posts.create`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.create({ body: {} })
   * ```
   */
  create(params: AccessPostsCreateParams, options?: RequestOptions): Promise<AccessPostsCreateResponse> {
    return request<AccessPostsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.create',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Delete post
   *
   * Delete an existing post from the authenticated creator account.
   *
   * Operation: `access.posts.delete`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.delete({ postId: 'example' })
   * ```
   */
  delete(params: AccessPostsDeleteParams, options?: RequestOptions): Promise<AccessPostsDeleteResponse> {
    return request<AccessPostsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.delete',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Get post
   *
   * Get a single post by ID, including post metadata and media information when available.
   *
   * Operation: `access.posts.get`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.get({ postId: 'example' })
   * ```
   */
  get(params: AccessPostsGetParams, options?: RequestOptions): Promise<AccessPostsGetResponse> {
    return request<AccessPostsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.get',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * List own posts
   *
   * Get a list of your own posts
   *
   * Operation: `access.posts.list`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.list()
   * ```
   */
  list(params: AccessPostsListParams = {}, options?: RequestOptions): Promise<AccessPostsListResponse> {
    return request<AccessPostsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts`,
      query: { "limit": params.limit, "media": params.media, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "pinned": params.pinned, "onlyCanView": params.onlyCanView, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.list',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * List own posts: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPostsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsListItem, void, unknown> {
    return paginate<AccessPostsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Post buyers
   *
   * List buyers for a post.
   *
   * Operation: `access.posts.listBuyers`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.listBuyers({ postId: 123 })
   * ```
   */
  listBuyers(params: AccessPostsListBuyersParams, options?: RequestOptions): Promise<AccessPostsListBuyersResponse> {
    return request<AccessPostsListBuyersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/buyers`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.listBuyers',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post buyers: every item, fetching pages as needed.
   */
  iterateBuyers(params: Omit<AccessPostsListBuyersParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsListBuyersItem, void, unknown> {
    return paginate<AccessPostsListBuyersItem>(
      (cursor) => this.listBuyers({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Post favorites
   *
   * List users who favorited a post.
   *
   * Operation: `access.posts.listFavorites`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.listFavorites({ postId: 123 })
   * ```
   */
  listFavorites(params: AccessPostsListFavoritesParams, options?: RequestOptions): Promise<AccessPostsListFavoritesResponse> {
    return request<AccessPostsListFavoritesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/favorites`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.listFavorites',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post favorites: every item, fetching pages as needed.
   */
  iterateFavorites(params: Omit<AccessPostsListFavoritesParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsListFavoritesItem, void, unknown> {
    return paginate<AccessPostsListFavoritesItem>(
      (cursor) => this.listFavorites({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * List tagged friend users
   *
   * List users available for tagged-friend selection on posts, with pagination, sorting, and name search.
   *
   * Operation: `access.posts.listTaggedFriendUsers`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.listTaggedFriendUsers()
   * ```
   */
  listTaggedFriendUsers(params: AccessPostsListTaggedFriendUsersParams = {}, options?: RequestOptions): Promise<AccessPostsListTaggedFriendUsersResponse> {
    return request<AccessPostsListTaggedFriendUsersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/tagged-friend-users`,
      query: { "limit": params.limit, "cursor": params.cursor, "filter": params.filter, "source": params.source, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "search": params.search },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.listTaggedFriendUsers',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * List tagged friend users: every item, fetching pages as needed.
   */
  iterateTaggedFriendUsers(params: Omit<AccessPostsListTaggedFriendUsersParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsListTaggedFriendUsersItem, void, unknown> {
    return paginate<AccessPostsListTaggedFriendUsersItem>(
      (cursor) => this.listTaggedFriendUsers({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Post tips
   *
   * List tips for a post.
   *
   * Operation: `access.posts.listTips`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.listTips({ postId: 123 })
   * ```
   */
  listTips(params: AccessPostsListTipsParams, options?: RequestOptions): Promise<AccessPostsListTipsResponse> {
    return request<AccessPostsListTipsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/tips`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.listTips',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post tips: every item, fetching pages as needed.
   */
  iterateTips(params: Omit<AccessPostsListTipsParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsListTipsItem, void, unknown> {
    return paginate<AccessPostsListTipsItem>(
      (cursor) => this.listTips({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Post voters
   *
   * List voters for a post.
   *
   * Operation: `access.posts.listVoters`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.posts.listVoters({ postId: 123 })
   * ```
   */
  listVoters(params: AccessPostsListVotersParams, options?: RequestOptions): Promise<AccessPostsListVotersResponse> {
    return request<AccessPostsListVotersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/voters`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.listVoters',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * Post voters: every item, fetching pages as needed.
   */
  iterateVoters(params: Omit<AccessPostsListVotersParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPostsListVotersItem, void, unknown> {
    return paginate<AccessPostsListVotersItem>(
      (cursor) => this.listVoters({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Pin post
   *
   * Pin a post.
   *
   * Operation: `access.posts.pin`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.pin({ postId: 123 })
   * ```
   */
  pin(params: AccessPostsPinParams, options?: RequestOptions): Promise<AccessPostsPinResponse> {
    return request<AccessPostsPinResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/pin`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.pin',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Unarchive post
   *
   * Unarchive a post.
   *
   * Operation: `access.posts.unarchive`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.unarchive({ postId: 123 })
   * ```
   */
  unarchive(params: AccessPostsUnarchiveParams, options?: RequestOptions): Promise<AccessPostsUnarchiveResponse> {
    return request<AccessPostsUnarchiveResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/unarchive`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.unarchive',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Edit post
   *
   * Update an existing post on the authenticated creator account.
   *
   * Operation: `access.posts.update`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.update({ postId: 'example', body: {} })
   * ```
   */
  update(params: AccessPostsUpdateParams, options?: RequestOptions): Promise<AccessPostsUpdateResponse> {
    return request<AccessPostsUpdateResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.update',
      requiredScope: 'posts:write',
      ...options,
    });
  }

  /**
   * Vote on post
   *
   * Vote on a post poll.
   *
   * Operation: `access.posts.vote`
   *
   * @scope posts:write
   * @example
   * ```ts
   * await client.access.posts.vote({ postId: 123, body: { optionId: 123 } })
   * ```
   */
  vote(params: AccessPostsVoteParams, options?: RequestOptions): Promise<AccessPostsVoteResponse> {
    return request<AccessPostsVoteResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/posts/${encodeURIComponent(String(params.postId))}/vote`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.posts.vote',
      requiredScope: 'posts:write',
      ...options,
    });
  }
}

export class AccessProfileLinksNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Delete account link
   *
   * Delete an authenticated creator link.
   *
   * Operation: `access.profile.links.delete`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.profile.links.delete({ linkId: 123 })
   * ```
   */
  delete(params: AccessProfileLinksDeleteParams, options?: RequestOptions): Promise<AccessProfileLinksDeleteResponse> {
    return request<AccessProfileLinksDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/profile/links/${encodeURIComponent(String(params.linkId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.links.delete',
      requiredScope: 'profile:write',
      ...options,
    });
  }

  /**
   * Account links
   *
   * Get authenticated creator links.
   *
   * Operation: `access.profile.links.list`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.profile.links.list()
   * ```
   */
  list(params: AccessProfileLinksListParams = {}, options?: RequestOptions): Promise<AccessProfileLinksListResponse> {
    return request<AccessProfileLinksListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/profile/links`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.links.list',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Update account links
   *
   * Update authenticated creator links.
   *
   * Operation: `access.profile.links.update`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.profile.links.update({ body: {} })
   * ```
   */
  update(params: AccessProfileLinksUpdateParams, options?: RequestOptions): Promise<AccessProfileLinksUpdateResponse> {
    return request<AccessProfileLinksUpdateResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/profile/links`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.links.update',
      requiredScope: 'profile:write',
      ...options,
    });
  }
}

export class AccessProfileSocialButtonsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Delete social button
   *
   * Delete an authenticated creator social button.
   *
   * Operation: `access.profile.socialButtons.delete`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.profile.socialButtons.delete({ buttonId: 123 })
   * ```
   */
  delete(params: AccessProfileSocialButtonsDeleteParams, options?: RequestOptions): Promise<AccessProfileSocialButtonsDeleteResponse> {
    return request<AccessProfileSocialButtonsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/profile/social-buttons/${encodeURIComponent(String(params.buttonId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.socialButtons.delete',
      requiredScope: 'profile:write',
      ...options,
    });
  }

  /**
   * Social buttons
   *
   * Get authenticated creator social buttons.
   *
   * Operation: `access.profile.socialButtons.list`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.profile.socialButtons.list()
   * ```
   */
  list(params: AccessProfileSocialButtonsListParams = {}, options?: RequestOptions): Promise<AccessProfileSocialButtonsListResponse> {
    return request<AccessProfileSocialButtonsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/profile/social-buttons`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.socialButtons.list',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Update social buttons
   *
   * Update authenticated creator social buttons.
   *
   * Operation: `access.profile.socialButtons.update`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.profile.socialButtons.update({ body: {} })
   * ```
   */
  update(params: AccessProfileSocialButtonsUpdateParams, options?: RequestOptions): Promise<AccessProfileSocialButtonsUpdateResponse> {
    return request<AccessProfileSocialButtonsUpdateResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/profile/social-buttons`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.socialButtons.update',
      requiredScope: 'profile:write',
      ...options,
    });
  }
}

export class AccessProfileNamespace {
  readonly links: AccessProfileLinksNamespace;
  readonly socialButtons: AccessProfileSocialButtonsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.links = new AccessProfileLinksNamespace(_config);
    this.socialButtons = new AccessProfileSocialButtonsNamespace(_config);
  }

  /**
   * Current account
   *
   * Get the authenticated creator account profile.
   *
   * Operation: `access.profile.get`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.profile.get()
   * ```
   */
  get(params: AccessProfileGetParams = {}, options?: RequestOptions): Promise<AccessProfileGetResponse> {
    return request<AccessProfileGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/profile`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.get',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Account capabilities
   *
   * Get action and feature capabilities from the authenticated creator account.
   *
   * Operation: `access.profile.getCapabilities`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.profile.getCapabilities()
   * ```
   */
  getCapabilities(params: AccessProfileGetCapabilitiesParams = {}, options?: RequestOptions): Promise<AccessProfileGetCapabilitiesResponse> {
    return request<AccessProfileGetCapabilitiesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/profile/capabilities`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.getCapabilities',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Profile counts
   *
   * Get profile count fields and account-wide subscription, subscriber, and bookmark counts.
   *
   * Operation: `access.profile.getCounts`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.profile.getCounts()
   * ```
   */
  getCounts(params: AccessProfileGetCountsParams = {}, options?: RequestOptions): Promise<AccessProfileGetCountsResponse> {
    return request<AccessProfileGetCountsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/profile/counts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.getCounts',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Update current account
   *
   * Update multiple supported profile fields on the authenticated creator.
   *
   * Operation: `access.profile.update`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.profile.update({ body: {} })
   * ```
   */
  update(params: AccessProfileUpdateParams, options?: RequestOptions): Promise<AccessProfileUpdateResponse> {
    return request<AccessProfileUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/profile`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.update',
      requiredScope: 'profile:write',
      ...options,
    });
  }

  /**
   * Validate profile data
   *
   * Validate profile data fields before saving them.
   *
   * Operation: `access.profile.validate`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.profile.validate({ body: {} })
   * ```
   */
  validate(params: AccessProfileValidateParams, options?: RequestOptions): Promise<AccessProfileValidateResponse> {
    return request<AccessProfileValidateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/profile/validate`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.profile.validate',
      requiredScope: 'profile:write',
      ...options,
    });
  }
}

export class AccessPromotionsBundlesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create bundle
   *
   * Create a new subscription bundle
   *
   * Operation: `access.promotions.bundles.create`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.bundles.create({ body: { discount: 123, duration: 3 } })
   * ```
   */
  create(params: AccessPromotionsBundlesCreateParams, options?: RequestOptions): Promise<AccessPromotionsBundlesCreateResponse> {
    return request<AccessPromotionsBundlesCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions/bundles`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.bundles.create',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Delete bundle
   *
   * Delete a subscription bundle
   *
   * Operation: `access.promotions.bundles.delete`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.bundles.delete({ bundleId: 'example' })
   * ```
   */
  delete(params: AccessPromotionsBundlesDeleteParams, options?: RequestOptions): Promise<AccessPromotionsBundlesDeleteResponse> {
    return request<AccessPromotionsBundlesDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/promotions/bundles/${encodeURIComponent(String(params.bundleId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.bundles.delete',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Get bundle
   *
   * Get details of a specific subscription bundle
   *
   * Operation: `access.promotions.bundles.get`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.bundles.get({ bundleId: 'example' })
   * ```
   */
  get(params: AccessPromotionsBundlesGetParams, options?: RequestOptions): Promise<AccessPromotionsBundlesGetResponse> {
    return request<AccessPromotionsBundlesGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/bundles/${encodeURIComponent(String(params.bundleId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.bundles.get',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * List bundles
   *
   * Get a list of all subscription bundles
   *
   * Operation: `access.promotions.bundles.list`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.bundles.list()
   * ```
   */
  list(params: AccessPromotionsBundlesListParams = {}, options?: RequestOptions): Promise<AccessPromotionsBundlesListResponse> {
    return request<AccessPromotionsBundlesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/bundles`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.bundles.list',
      requiredScope: 'promotions:read',
      ...options,
    });
  }
}

export class AccessPromotionsTrackingLinksNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create tracking link
   *
   * Create a new tracking link
   *
   * Operation: `access.promotions.trackingLinks.create`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.create({ body: { name: 'example' } })
   * ```
   */
  create(params: AccessPromotionsTrackingLinksCreateParams, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksCreateResponse> {
    return request<AccessPromotionsTrackingLinksCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions/tracking-links`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.create',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Delete tracking link
   *
   * Delete a tracking link
   *
   * Operation: `access.promotions.trackingLinks.delete`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.delete({ trackingLinkId: 'example' })
   * ```
   */
  delete(params: AccessPromotionsTrackingLinksDeleteParams, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksDeleteResponse> {
    return request<AccessPromotionsTrackingLinksDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.delete',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * List tracking links
   *
   * Get a list of all tracking links
   *
   * Operation: `access.promotions.trackingLinks.list`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.list()
   * ```
   */
  list(params: AccessPromotionsTrackingLinksListParams = {}, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksListResponse> {
    return request<AccessPromotionsTrackingLinksListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/tracking-links`,
      query: { "limit": params.limit, "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate, "field": params.field, "includeDeleted": params.includeDeleted, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.list',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * List tracking links: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPromotionsTrackingLinksListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPromotionsTrackingLinksListItem, void, unknown> {
    return paginate<AccessPromotionsTrackingLinksListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Tracking link claimed users
   *
   * Get users who claimed a tracking link.
   *
   * Operation: `access.promotions.trackingLinks.listClaimedUsers`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.listClaimedUsers({ trackingLinkId: 123 })
   * ```
   */
  listClaimedUsers(params: AccessPromotionsTrackingLinksListClaimedUsersParams, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksListClaimedUsersResponse> {
    return request<AccessPromotionsTrackingLinksListClaimedUsersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}/claimed-users`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.listClaimedUsers',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * Tracking link claimed users: every item, fetching pages as needed.
   */
  iterateClaimedUsers(params: Omit<AccessPromotionsTrackingLinksListClaimedUsersParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPromotionsTrackingLinksListClaimedUsersItem, void, unknown> {
    return paginate<AccessPromotionsTrackingLinksListClaimedUsersItem>(
      (cursor) => this.listClaimedUsers({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Tracking link shared with me
   *
   * List recipient-side access records for a tracking link shared with the authenticated account.
   *
   * Operation: `access.promotions.trackingLinks.listSharedWithMe`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.listSharedWithMe({ trackingLinkId: 123 })
   * ```
   */
  listSharedWithMe(params: AccessPromotionsTrackingLinksListSharedWithMeParams, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksListSharedWithMeResponse> {
    return request<AccessPromotionsTrackingLinksListSharedWithMeResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}/shared-with-me`,
      query: { "limit": params.limit, "cursor": params.cursor, "field": params.field, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.listSharedWithMe',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * Tracking link shared with me: every item, fetching pages as needed.
   */
  iterateSharedWithMe(params: Omit<AccessPromotionsTrackingLinksListSharedWithMeParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPromotionsTrackingLinksListSharedWithMeItem, void, unknown> {
    return paginate<AccessPromotionsTrackingLinksListSharedWithMeItem>(
      (cursor) => this.listSharedWithMe({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Share tracking link access
   *
   * Share one user's access to a tracking link.
   *
   * Operation: `access.promotions.trackingLinks.share`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.share({ trackingLinkId: 123, userId: 123 })
   * ```
   */
  share(params: AccessPromotionsTrackingLinksShareParams, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksShareResponse> {
    return request<AccessPromotionsTrackingLinksShareResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}/shared-users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.share',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Revoke tracking link access
   *
   * Revoke one user's access to a tracking link.
   *
   * Operation: `access.promotions.trackingLinks.unshare`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trackingLinks.unshare({ trackingLinkId: 123, userId: 123 })
   * ```
   */
  unshare(params: AccessPromotionsTrackingLinksUnshareParams, options?: RequestOptions): Promise<AccessPromotionsTrackingLinksUnshareResponse> {
    return request<AccessPromotionsTrackingLinksUnshareResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/promotions/tracking-links/${encodeURIComponent(String(params.trackingLinkId))}/shared-users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trackingLinks.unshare',
      requiredScope: 'promotions:write',
      ...options,
    });
  }
}

export class AccessPromotionsTrialLinksNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create trial link
   *
   * Create a new trial link
   *
   * Operation: `access.promotions.trialLinks.create`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trialLinks.create({ body: { name: 'example', durationDays: 1, offer: { limit: 0, expirationDays: 123 } } })
   * ```
   */
  create(params: AccessPromotionsTrialLinksCreateParams, options?: RequestOptions): Promise<AccessPromotionsTrialLinksCreateResponse> {
    return request<AccessPromotionsTrialLinksCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions/trial-links`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trialLinks.create',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Deactivate trial link
   *
   * Deactivate a trial link so it can no longer be claimed.
   *
   * Operation: `access.promotions.trialLinks.deactivate`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trialLinks.deactivate({ trialLinkId: 123 })
   * ```
   */
  deactivate(params: AccessPromotionsTrialLinksDeactivateParams, options?: RequestOptions): Promise<AccessPromotionsTrialLinksDeactivateResponse> {
    return request<AccessPromotionsTrialLinksDeactivateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}/deactivate`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trialLinks.deactivate',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * List trial links
   *
   * Get a list of all trial links
   *
   * Operation: `access.promotions.trialLinks.list`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.trialLinks.list()
   * ```
   */
  list(params: AccessPromotionsTrialLinksListParams = {}, options?: RequestOptions): Promise<AccessPromotionsTrialLinksListResponse> {
    return request<AccessPromotionsTrialLinksListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/trial-links`,
      query: { "limit": params.limit, "cursor": params.cursor, "field": params.field, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trialLinks.list',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * List trial links: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPromotionsTrialLinksListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPromotionsTrialLinksListItem, void, unknown> {
    return paginate<AccessPromotionsTrialLinksListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Trial link shared with me
   *
   * List recipient-side access records for a trial link shared with the authenticated account.
   *
   * Operation: `access.promotions.trialLinks.listSharedWithMe`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.trialLinks.listSharedWithMe({ trialLinkId: 123 })
   * ```
   */
  listSharedWithMe(params: AccessPromotionsTrialLinksListSharedWithMeParams, options?: RequestOptions): Promise<AccessPromotionsTrialLinksListSharedWithMeResponse> {
    return request<AccessPromotionsTrialLinksListSharedWithMeResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}/shared-with-me`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trialLinks.listSharedWithMe',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * Trial link shared with me: every item, fetching pages as needed.
   */
  iterateSharedWithMe(params: Omit<AccessPromotionsTrialLinksListSharedWithMeParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPromotionsTrialLinksListSharedWithMeItem, void, unknown> {
    return paginate<AccessPromotionsTrialLinksListSharedWithMeItem>(
      (cursor) => this.listSharedWithMe({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Share trial link access
   *
   * Share one user's access to a trial link.
   *
   * Operation: `access.promotions.trialLinks.share`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trialLinks.share({ trialLinkId: 123, userId: 123 })
   * ```
   */
  share(params: AccessPromotionsTrialLinksShareParams, options?: RequestOptions): Promise<AccessPromotionsTrialLinksShareResponse> {
    return request<AccessPromotionsTrialLinksShareResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}/shared-users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trialLinks.share',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Revoke trial link access
   *
   * Revoke one user's access to a trial link.
   *
   * Operation: `access.promotions.trialLinks.unshare`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.trialLinks.unshare({ trialLinkId: 123, userId: 123 })
   * ```
   */
  unshare(params: AccessPromotionsTrialLinksUnshareParams, options?: RequestOptions): Promise<AccessPromotionsTrialLinksUnshareResponse> {
    return request<AccessPromotionsTrialLinksUnshareResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/promotions/trial-links/${encodeURIComponent(String(params.trialLinkId))}/shared-users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.trialLinks.unshare',
      requiredScope: 'promotions:write',
      ...options,
    });
  }
}

export class AccessPromotionsNamespace {
  readonly bundles: AccessPromotionsBundlesNamespace;
  readonly trackingLinks: AccessPromotionsTrackingLinksNamespace;
  readonly trialLinks: AccessPromotionsTrialLinksNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.bundles = new AccessPromotionsBundlesNamespace(_config);
    this.trackingLinks = new AccessPromotionsTrackingLinksNamespace(_config);
    this.trialLinks = new AccessPromotionsTrialLinksNamespace(_config);
  }

  /**
   * Create promotion
   *
   * Create a new promotion
   *
   * Operation: `access.promotions.create`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.create({ body: { targetAudience: 'new_subscribers', discount: { type: 'free_trial', durationDays: 1 }, offer: { limit: 123, expirationDays: 123 }, message: 'example' } })
   * ```
   */
  create(params: AccessPromotionsCreateParams, options?: RequestOptions): Promise<AccessPromotionsCreateResponse> {
    return request<AccessPromotionsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.create',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Delete promotion
   *
   * Delete a promotion
   *
   * Operation: `access.promotions.delete`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.delete({ promotionId: 'example' })
   * ```
   */
  delete(params: AccessPromotionsDeleteParams, options?: RequestOptions): Promise<AccessPromotionsDeleteResponse> {
    return request<AccessPromotionsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/promotions/${encodeURIComponent(String(params.promotionId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.delete',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * End promotion
   *
   * End a promotion.
   *
   * Operation: `access.promotions.end`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.end({ promotionId: 123 })
   * ```
   */
  end(params: AccessPromotionsEndParams, options?: RequestOptions): Promise<AccessPromotionsEndResponse> {
    return request<AccessPromotionsEndResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions/${encodeURIComponent(String(params.promotionId))}/end`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.end',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * Promotion offers
   *
   * List promotion offers and associated users.
   *
   * Operation: `access.promotions.getOffers`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.getOffers()
   * ```
   */
  getOffers(params: AccessPromotionsGetOffersParams = {}, options?: RequestOptions): Promise<AccessPromotionsGetOffersResponse> {
    return request<AccessPromotionsGetOffersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions/offers`,
      query: { "sort": params.sort, "field": params.field, "durationMonths": params.durationMonths, "isInactive": params.isInactive, "isOnline": params.isOnline, "hasRecommenders": params.hasRecommenders, "tipAmount": params.tipAmount, "totalSpent": params.totalSpent },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.getOffers',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * Hide promotion offers
   *
   * Hide promotion offers for the authenticated creator account.
   *
   * Operation: `access.promotions.hideOffers`
   *
   * @scope promotions:write
   * @example
   * ```ts
   * await client.access.promotions.hideOffers()
   * ```
   */
  hideOffers(params: AccessPromotionsHideOffersParams = {}, options?: RequestOptions): Promise<AccessPromotionsHideOffersResponse> {
    return request<AccessPromotionsHideOffersResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/promotions/offers/hide`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.hideOffers',
      requiredScope: 'promotions:write',
      ...options,
    });
  }

  /**
   * List promotions
   *
   * Get a list of all promotions
   *
   * Operation: `access.promotions.list`
   *
   * @scope promotions:read
   * @example
   * ```ts
   * await client.access.promotions.list()
   * ```
   */
  list(params: AccessPromotionsListParams = {}, options?: RequestOptions): Promise<AccessPromotionsListResponse> {
    return request<AccessPromotionsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/promotions`,
      query: { "limit": params.limit, "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.promotions.list',
      requiredScope: 'promotions:read',
      ...options,
    });
  }

  /**
   * List promotions: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessPromotionsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessPromotionsListItem, void, unknown> {
    return paginate<AccessPromotionsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessQueueSavedNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Saved-for-later posts
   *
   * List posts saved for later.
   *
   * Operation: `access.queue.saved.listPosts`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.saved.listPosts()
   * ```
   */
  listPosts(params: AccessQueueSavedListPostsParams = {}, options?: RequestOptions): Promise<AccessQueueSavedListPostsResponse> {
    return request<AccessQueueSavedListPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/saved/posts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.saved.listPosts',
      requiredScope: 'queue:read',
      ...options,
    });
  }
}

export class AccessQueueSchedulesSavedForLaterNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Saved-for-later chat schedules
   *
   * List saved-for-later chat schedules.
   *
   * Operation: `access.queue.schedules.savedForLater.listChats`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.schedules.savedForLater.listChats()
   * ```
   */
  listChats(params: AccessQueueSchedulesSavedForLaterListChatsParams = {}, options?: RequestOptions): Promise<AccessQueueSchedulesSavedForLaterListChatsResponse> {
    return request<AccessQueueSchedulesSavedForLaterListChatsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/schedules/saved-for-later/chats`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.schedules.savedForLater.listChats',
      requiredScope: 'queue:read',
      ...options,
    });
  }

  /**
   * Saved-for-later post schedules
   *
   * List saved-for-later post schedules.
   *
   * Operation: `access.queue.schedules.savedForLater.listPosts`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.schedules.savedForLater.listPosts()
   * ```
   */
  listPosts(params: AccessQueueSchedulesSavedForLaterListPostsParams = {}, options?: RequestOptions): Promise<AccessQueueSchedulesSavedForLaterListPostsResponse> {
    return request<AccessQueueSchedulesSavedForLaterListPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/schedules/saved-for-later/posts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.schedules.savedForLater.listPosts',
      requiredScope: 'queue:read',
      ...options,
    });
  }
}

export class AccessQueueSchedulesNamespace {
  readonly savedForLater: AccessQueueSchedulesSavedForLaterNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.savedForLater = new AccessQueueSchedulesSavedForLaterNamespace(_config);
  }

  /**
   * Queued schedules
   *
   * List queued schedules for posts, chats, streams, and stories.
   *
   * Operation: `access.queue.schedules.list`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.schedules.list()
   * ```
   */
  list(params: AccessQueueSchedulesListParams = {}, options?: RequestOptions): Promise<AccessQueueSchedulesListResponse> {
    return request<AccessQueueSchedulesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/schedules`,
      query: { "timeZone": params.timeZone, "publishDate": params.publishDate, "publishDateEnd": params.publishDateEnd, "type": params.type },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.schedules.list',
      requiredScope: 'queue:read',
      ...options,
    });
  }

  /**
   * Schedule counters
   *
   * Count queued schedules grouped by publish date and schedule type.
   *
   * Operation: `access.queue.schedules.listCounters`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.schedules.listCounters()
   * ```
   */
  listCounters(params: AccessQueueSchedulesListCountersParams = {}, options?: RequestOptions): Promise<AccessQueueSchedulesListCountersResponse> {
    return request<AccessQueueSchedulesListCountersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/schedules/counters`,
      query: { "timeZone": params.timeZone, "publishDate": params.publishDate, "publishDateEnd": params.publishDateEnd, "type": params.type },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.schedules.listCounters',
      requiredScope: 'queue:read',
      ...options,
    });
  }

  /**
   * Publish queued schedule
   *
   * Publish a queued schedule immediately.
   *
   * Operation: `access.queue.schedules.publish`
   *
   * @scope queue:write
   * @example
   * ```ts
   * await client.access.queue.schedules.publish({ scheduleId: 123 })
   * ```
   */
  publish(params: AccessQueueSchedulesPublishParams, options?: RequestOptions): Promise<AccessQueueSchedulesPublishResponse> {
    return request<AccessQueueSchedulesPublishResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/queue/schedules/${encodeURIComponent(String(params.scheduleId))}/publish`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.schedules.publish',
      requiredScope: 'queue:write',
      ...options,
    });
  }
}

export class AccessQueueNamespace {
  readonly saved: AccessQueueSavedNamespace;
  readonly schedules: AccessQueueSchedulesNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.saved = new AccessQueueSavedNamespace(_config);
    this.schedules = new AccessQueueSchedulesNamespace(_config);
  }

  /**
   * Delete queued message
   *
   * Delete a scheduled or queued message before it is sent.
   *
   * Operation: `access.queue.deleteMessage`
   *
   * @scope queue:write
   * @example
   * ```ts
   * await client.access.queue.deleteMessage({ queueMessageId: 123 })
   * ```
   */
  deleteMessage(params: AccessQueueDeleteMessageParams, options?: RequestOptions): Promise<AccessQueueDeleteMessageResponse> {
    return request<AccessQueueDeleteMessageResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/queue/messages/${encodeURIComponent(String(params.queueMessageId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.deleteMessage',
      requiredScope: 'queue:write',
      ...options,
    });
  }

  /**
   * Queued message
   *
   * Get a scheduled or queued mass message by its queue ID (the `id` returned by `POST /chats/mass-messages`). Returns the fields needed to rebuild a full `PUT /chats/mass-messages/:massMessageId` body (`text`, `media`, `price`, `previewMediaCount`, `lockedText`, `scheduledDate`, `userIds`, `userLists`, `excludeUserLists`, `subscribedAfterDate`) and `canUnsend`/`unsendSeconds` for cancellation. Recipient fields use the request names and are absent when the message does not use them. `userTags` and the request-shaped `releaseForms` are not returned. Delivery counters (`total`, `pending`, `isDone`, `isCanceled`) are only returned by create and update.
   *
   * Operation: `access.queue.getMessage`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.getMessage({ queueMessageId: 123 })
   * ```
   */
  getMessage(params: AccessQueueGetMessageParams, options?: RequestOptions): Promise<AccessQueueGetMessageResponse> {
    return request<AccessQueueGetMessageResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/messages/${encodeURIComponent(String(params.queueMessageId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.getMessage',
      requiredScope: 'queue:read',
      ...options,
    });
  }

  /**
   * Queued posts
   *
   * List posts that have not been published yet.
   *
   * Operation: `access.queue.listPosts`
   *
   * @scope queue:read
   * @example
   * ```ts
   * await client.access.queue.listPosts()
   * ```
   */
  listPosts(params: AccessQueueListPostsParams = {}, options?: RequestOptions): Promise<AccessQueueListPostsResponse> {
    return request<AccessQueueListPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/queue/posts`,
      query: { "limit": params.limit, "media": params.media, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "pinned": params.pinned, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.queue.listPosts',
      requiredScope: 'queue:read',
      ...options,
    });
  }

  /**
   * Queued posts: every item, fetching pages as needed.
   */
  iteratePosts(params: Omit<AccessQueueListPostsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessQueueListPostsItem, void, unknown> {
    return paginate<AccessQueueListPostsItem>(
      (cursor) => this.listPosts({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessReleaseFormsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create release form link
   *
   * Create a new release-form signing link.
   *
   * Operation: `access.releaseForms.createLink`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.releaseForms.createLink({ body: { name: 'example' } })
   * ```
   */
  createLink(params: AccessReleaseFormsCreateLinkParams, options?: RequestOptions): Promise<AccessReleaseFormsCreateLinkResponse> {
    return request<AccessReleaseFormsCreateLinkResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/release-forms/links`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.releaseForms.createLink',
      requiredScope: 'profile:write',
      ...options,
    });
  }

  /**
   * List release forms
   *
   * List release forms available on the authenticated creator account, including pagination, sorting, and name search.
   *
   * Operation: `access.releaseForms.list`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.releaseForms.list()
   * ```
   */
  list(params: AccessReleaseFormsListParams = {}, options?: RequestOptions): Promise<AccessReleaseFormsListResponse> {
    return request<AccessReleaseFormsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/release-forms`,
      query: { "limit": params.limit, "cursor": params.cursor, "filter": params.filter, "source": params.source, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "search": params.search },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.releaseForms.list',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * List release forms: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessReleaseFormsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessReleaseFormsListItem, void, unknown> {
    return paginate<AccessReleaseFormsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Toggle release form visibility
   *
   * Toggle release form visibility for a release-form entity type.
   *
   * Operation: `access.releaseForms.toggleVisibility`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.releaseForms.toggleVisibility({ releaseFormId: 123, body: { entityType: 'example' } })
   * ```
   */
  toggleVisibility(params: AccessReleaseFormsToggleVisibilityParams, options?: RequestOptions): Promise<AccessReleaseFormsToggleVisibilityResponse> {
    return request<AccessReleaseFormsToggleVisibilityResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/release-forms/${encodeURIComponent(String(params.releaseFormId))}/toggle-visibility`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.releaseForms.toggleVisibility',
      requiredScope: 'profile:write',
      ...options,
    });
  }

  /**
   * Update release form
   *
   * Update a release form.
   *
   * Operation: `access.releaseForms.update`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.releaseForms.update({ releaseFormId: 123, body: { name: 'example' } })
   * ```
   */
  update(params: AccessReleaseFormsUpdateParams, options?: RequestOptions): Promise<AccessReleaseFormsUpdateResponse> {
    return request<AccessReleaseFormsUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/release-forms/${encodeURIComponent(String(params.releaseFormId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.releaseForms.update',
      requiredScope: 'profile:write',
      ...options,
    });
  }
}

export class AccessSettingsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Account settings
   *
   * Get account settings for the authenticated creator.
   *
   * Operation: `access.settings.get`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.settings.get()
   * ```
   */
  get(params: AccessSettingsGetParams = {}, options?: RequestOptions): Promise<AccessSettingsGetResponse> {
    return request<AccessSettingsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/settings`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.settings.get',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Replace account setting
   *
   * Replace one account setting by setting ID.
   *
   * Operation: `access.settings.replace`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.settings.replace({ settingId: 'example', body: {} })
   * ```
   */
  replace(params: AccessSettingsReplaceParams, options?: RequestOptions): Promise<AccessSettingsReplaceResponse> {
    return request<AccessSettingsReplaceResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/settings/${encodeURIComponent(String(params.settingId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.settings.replace',
      requiredScope: 'profile:write',
      ...options,
    });
  }

  /**
   * Patch account setting
   *
   * Patch one account setting by setting ID.
   *
   * Operation: `access.settings.update`
   *
   * @scope profile:write
   * @example
   * ```ts
   * await client.access.settings.update({ settingId: 'example', body: {} })
   * ```
   */
  update(params: AccessSettingsUpdateParams, options?: RequestOptions): Promise<AccessSettingsUpdateResponse> {
    return request<AccessSettingsUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/settings/${encodeURIComponent(String(params.settingId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.settings.update',
      requiredScope: 'profile:write',
      ...options,
    });
  }
}

export class AccessStoriesHighlightsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create story highlight
   *
   * Create a story highlight.
   *
   * Operation: `access.stories.highlights.create`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.highlights.create({ body: { title: 'example', storyIds: [123], coverStoryId: 123 } })
   * ```
   */
  create(params: AccessStoriesHighlightsCreateParams, options?: RequestOptions): Promise<AccessStoriesHighlightsCreateResponse> {
    return request<AccessStoriesHighlightsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/stories/highlights`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.highlights.create',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Delete story highlight
   *
   * Delete a story highlight.
   *
   * Operation: `access.stories.highlights.delete`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.highlights.delete({ highlightId: 123 })
   * ```
   */
  delete(params: AccessStoriesHighlightsDeleteParams, options?: RequestOptions): Promise<AccessStoriesHighlightsDeleteResponse> {
    return request<AccessStoriesHighlightsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/stories/highlights/${encodeURIComponent(String(params.highlightId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.highlights.delete',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Get story highlight
   *
   * Get a story highlight.
   *
   * Operation: `access.stories.highlights.get`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.highlights.get({ highlightId: 123 })
   * ```
   */
  get(params: AccessStoriesHighlightsGetParams, options?: RequestOptions): Promise<AccessStoriesHighlightsGetResponse> {
    return request<AccessStoriesHighlightsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories/highlights/${encodeURIComponent(String(params.highlightId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.highlights.get',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Remove story from highlight
   *
   * Remove a story from a highlight.
   *
   * Operation: `access.stories.highlights.removeStory`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.highlights.removeStory({ highlightId: 123, storyId: 123 })
   * ```
   */
  removeStory(params: AccessStoriesHighlightsRemoveStoryParams, options?: RequestOptions): Promise<AccessStoriesHighlightsRemoveStoryResponse> {
    return request<AccessStoriesHighlightsRemoveStoryResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/stories/highlights/${encodeURIComponent(String(params.highlightId))}/${encodeURIComponent(String(params.storyId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.highlights.removeStory',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Replace story highlight
   *
   * Rename a story highlight and set its stories and cover. Send the whole highlight: the new title, every story ID it should keep, and the cover story ID.
   *
   * Operation: `access.stories.highlights.replace`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.highlights.replace({ highlightId: 123, body: { title: 'example', storyIds: [123], coverStoryId: 123 } })
   * ```
   */
  replace(params: AccessStoriesHighlightsReplaceParams, options?: RequestOptions): Promise<AccessStoriesHighlightsReplaceResponse> {
    return request<AccessStoriesHighlightsReplaceResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/stories/highlights/${encodeURIComponent(String(params.highlightId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.highlights.replace',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Update story highlight
   *
   * Update a story highlight.
   *
   * Operation: `access.stories.highlights.update`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.highlights.update({ highlightId: 123, body: { storyIds: [123] } })
   * ```
   */
  update(params: AccessStoriesHighlightsUpdateParams, options?: RequestOptions): Promise<AccessStoriesHighlightsUpdateResponse> {
    return request<AccessStoriesHighlightsUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/stories/highlights/${encodeURIComponent(String(params.highlightId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.highlights.update',
      requiredScope: 'stories:write',
      ...options,
    });
  }
}

export class AccessStoriesUsersNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Block story user
   *
   * Block a user from stories.
   *
   * Operation: `access.stories.users.block`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.users.block({ userId: 123 })
   * ```
   */
  block(params: AccessStoriesUsersBlockParams, options?: RequestOptions): Promise<AccessStoriesUsersBlockResponse> {
    return request<AccessStoriesUsersBlockResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/stories/users/${encodeURIComponent(String(params.userId))}/block`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.users.block',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Blocked story users
   *
   * List users blocked from stories.
   *
   * Operation: `access.stories.users.listBlocked`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.users.listBlocked()
   * ```
   */
  listBlocked(params: AccessStoriesUsersListBlockedParams = {}, options?: RequestOptions): Promise<AccessStoriesUsersListBlockedResponse> {
    return request<AccessStoriesUsersListBlockedResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories/users/blocked`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.users.listBlocked',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Unblock story user
   *
   * Remove a story user block.
   *
   * Operation: `access.stories.users.unblock`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.users.unblock({ userId: 123 })
   * ```
   */
  unblock(params: AccessStoriesUsersUnblockParams, options?: RequestOptions): Promise<AccessStoriesUsersUnblockResponse> {
    return request<AccessStoriesUsersUnblockResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/stories/users/${encodeURIComponent(String(params.userId))}/block`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.users.unblock',
      requiredScope: 'stories:write',
      ...options,
    });
  }
}

export class AccessStoriesNamespace {
  readonly highlights: AccessStoriesHighlightsNamespace;
  readonly users: AccessStoriesUsersNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.highlights = new AccessStoriesHighlightsNamespace(_config);
    this.users = new AccessStoriesUsersNamespace(_config);
  }

  /**
   * Create story
   *
   * Create a story from one uploaded image or vault image.
   *
   * Operation: `access.stories.create`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.create({ body: { mediaItems: [123] } })
   * ```
   */
  create(params: AccessStoriesCreateParams, options?: RequestOptions): Promise<AccessStoriesCreateResponse> {
    return request<AccessStoriesCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/stories`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.create',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Delete story
   *
   * Delete a story.
   *
   * Operation: `access.stories.delete`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.delete({ storyId: 123 })
   * ```
   */
  delete(params: AccessStoriesDeleteParams, options?: RequestOptions): Promise<AccessStoriesDeleteResponse> {
    return request<AccessStoriesDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.delete',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Story stats
   *
   * Get stats for a story.
   *
   * Operation: `access.stories.getStats`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.getStats({ storyId: 123 })
   * ```
   */
  getStats(params: AccessStoriesGetStatsParams, options?: RequestOptions): Promise<AccessStoriesGetStatsResponse> {
    return request<AccessStoriesGetStatsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}/stats`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.getStats',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Like story
   *
   * Like a story.
   *
   * Operation: `access.stories.like`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.like({ storyId: 123 })
   * ```
   */
  like(params: AccessStoriesLikeParams, options?: RequestOptions): Promise<AccessStoriesLikeResponse> {
    return request<AccessStoriesLikeResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}/like`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.like',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Own stories
   *
   * List stories for the authenticated creator.
   *
   * Operation: `access.stories.list`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.list()
   * ```
   */
  list(params: AccessStoriesListParams = {}, options?: RequestOptions): Promise<AccessStoriesListResponse> {
    return request<AccessStoriesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.list',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Story answer
   *
   * Get answer details for a story.
   *
   * Operation: `access.stories.listAnswers`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.listAnswers({ storyId: 123 })
   * ```
   */
  listAnswers(params: AccessStoriesListAnswersParams, options?: RequestOptions): Promise<AccessStoriesListAnswersResponse> {
    return request<AccessStoriesListAnswersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}/answer`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.listAnswers',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Story answer: every item, fetching pages as needed.
   */
  iterateAnswers(params: Omit<AccessStoriesListAnswersParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessStoriesListAnswersItem, void, unknown> {
    return paginate<AccessStoriesListAnswersItem>(
      (cursor) => this.listAnswers({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Story archive
   *
   * List archived stories.
   *
   * Operation: `access.stories.listArchive`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.listArchive()
   * ```
   */
  listArchive(params: AccessStoriesListArchiveParams = {}, options?: RequestOptions): Promise<AccessStoriesListArchiveResponse> {
    return request<AccessStoriesListArchiveResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories/archive`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.listArchive',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Story archive: every item, fetching pages as needed.
   */
  iterateArchive(params: Omit<AccessStoriesListArchiveParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessStoriesListArchiveItem, void, unknown> {
    return paginate<AccessStoriesListArchiveItem>(
      (cursor) => this.listArchive({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Story viewers
   *
   * List viewers for a story.
   *
   * Operation: `access.stories.listViewers`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.stories.listViewers({ storyId: 123 })
   * ```
   */
  listViewers(params: AccessStoriesListViewersParams, options?: RequestOptions): Promise<AccessStoriesListViewersResponse> {
    return request<AccessStoriesListViewersResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}/viewers`,
      query: { "limit": params.limit, "cursor": params.cursor, "onlyWithTips": params.onlyWithTips },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.listViewers',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * Story viewers: every item, fetching pages as needed.
   */
  iterateViewers(params: Omit<AccessStoriesListViewersParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessStoriesListViewersItem, void, unknown> {
    return paginate<AccessStoriesListViewersItem>(
      (cursor) => this.listViewers({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Mark story watched
   *
   * Mark a story as watched.
   *
   * Operation: `access.stories.markWatched`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.markWatched({ storyId: 123 })
   * ```
   */
  markWatched(params: AccessStoriesMarkWatchedParams, options?: RequestOptions): Promise<AccessStoriesMarkWatchedResponse> {
    return request<AccessStoriesMarkWatchedResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}/watched`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.markWatched',
      requiredScope: 'stories:write',
      ...options,
    });
  }

  /**
   * Unlike story
   *
   * Remove a story like.
   *
   * Operation: `access.stories.unlike`
   *
   * @scope stories:write
   * @example
   * ```ts
   * await client.access.stories.unlike({ storyId: 123 })
   * ```
   */
  unlike(params: AccessStoriesUnlikeParams, options?: RequestOptions): Promise<AccessStoriesUnlikeResponse> {
    return request<AccessStoriesUnlikeResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/stories/${encodeURIComponent(String(params.storyId))}/like`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.stories.unlike',
      requiredScope: 'stories:write',
      ...options,
    });
  }
}

export class AccessSubscribersActivityNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Recent subscriber activity events
   *
   * List recent subscriber activity across new subscriptions and renewals.
   *
   * Operation: `access.subscribers.activity.list`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.activity.list({ startDate: 'example', endDate: 'example' })
   * ```
   */
  list(params: AccessSubscribersActivityListParams, options?: RequestOptions): Promise<AccessSubscribersActivityListResponse> {
    return request<AccessSubscribersActivityListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/activity`,
      query: { "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.activity.list',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Recent subscriber activity events: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessSubscribersActivityListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersActivityListItem, void, unknown> {
    return paginate<AccessSubscribersActivityListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Promotion subscribers
   *
   * List subscribers associated with one subscription promotion.
   *
   * Operation: `access.subscribers.activity.listByPromotion`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.activity.listByPromotion({ promotionId: 'example' })
   * ```
   */
  listByPromotion(params: AccessSubscribersActivityListByPromotionParams, options?: RequestOptions): Promise<AccessSubscribersActivityListByPromotionResponse> {
    return request<AccessSubscribersActivityListByPromotionResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/activity/promotions/${encodeURIComponent(String(params.promotionId))}`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.activity.listByPromotion',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Promotion subscribers: every item, fetching pages as needed.
   */
  iterateByPromotion(params: Omit<AccessSubscribersActivityListByPromotionParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersActivityListByPromotionItem, void, unknown> {
    return paginate<AccessSubscribersActivityListByPromotionItem>(
      (cursor) => this.listByPromotion({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Trial link subscribers
   *
   * List subscribers associated with one trial link.
   *
   * Operation: `access.subscribers.activity.listByTrialLink`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.activity.listByTrialLink({ trialLinkId: 'example' })
   * ```
   */
  listByTrialLink(params: AccessSubscribersActivityListByTrialLinkParams, options?: RequestOptions): Promise<AccessSubscribersActivityListByTrialLinkResponse> {
    return request<AccessSubscribersActivityListByTrialLinkResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/activity/trial-links/${encodeURIComponent(String(params.trialLinkId))}`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.activity.listByTrialLink',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Trial link subscribers: every item, fetching pages as needed.
   */
  iterateByTrialLink(params: Omit<AccessSubscribersActivityListByTrialLinkParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersActivityListByTrialLinkItem, void, unknown> {
    return paginate<AccessSubscribersActivityListByTrialLinkItem>(
      (cursor) => this.listByTrialLink({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * New subscribers
   *
   * List recent new subscriber activity.
   *
   * Operation: `access.subscribers.activity.listNew`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.activity.listNew({ startDate: 'example', endDate: 'example' })
   * ```
   */
  listNew(params: AccessSubscribersActivityListNewParams, options?: RequestOptions): Promise<AccessSubscribersActivityListNewResponse> {
    return request<AccessSubscribersActivityListNewResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/activity/new`,
      query: { "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.activity.listNew',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * New subscribers: every item, fetching pages as needed.
   */
  iterateNew(params: Omit<AccessSubscribersActivityListNewParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersActivityListNewItem, void, unknown> {
    return paginate<AccessSubscribersActivityListNewItem>(
      (cursor) => this.listNew({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Subscriber renewals
   *
   * List recent subscriber renewal activity.
   *
   * Operation: `access.subscribers.activity.listRenewals`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.activity.listRenewals({ startDate: 'example', endDate: 'example' })
   * ```
   */
  listRenewals(params: AccessSubscribersActivityListRenewalsParams, options?: RequestOptions): Promise<AccessSubscribersActivityListRenewalsResponse> {
    return request<AccessSubscribersActivityListRenewalsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/activity/renewals`,
      query: { "cursor": params.cursor, "startDate": params.startDate, "endDate": params.endDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.activity.listRenewals',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Subscriber renewals: every item, fetching pages as needed.
   */
  iterateRenewals(params: Omit<AccessSubscribersActivityListRenewalsParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersActivityListRenewalsItem, void, unknown> {
    return paginate<AccessSubscribersActivityListRenewalsItem>(
      (cursor) => this.listRenewals({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessSubscribersAwardsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Subscriber awards count
   *
   * Count subscriber awards with optional filters.
   *
   * Operation: `access.subscribers.awards.getCount`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.awards.getCount()
   * ```
   */
  getCount(params: AccessSubscribersAwardsGetCountParams = {}, options?: RequestOptions): Promise<AccessSubscribersAwardsGetCountResponse> {
    return request<AccessSubscribersAwardsGetCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/awards/count`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.awards.getCount',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Subscriber awards
   *
   * List subscriber awards.
   *
   * Operation: `access.subscribers.awards.list`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.awards.list()
   * ```
   */
  list(params: AccessSubscribersAwardsListParams = {}, options?: RequestOptions): Promise<AccessSubscribersAwardsListResponse> {
    return request<AccessSubscribersAwardsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/awards`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.awards.list',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Subscriber awards: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessSubscribersAwardsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersAwardsListItem, void, unknown> {
    return paginate<AccessSubscribersAwardsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessSubscribersNamespace {
  readonly activity: AccessSubscribersActivityNamespace;
  readonly awards: AccessSubscribersAwardsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.activity = new AccessSubscribersActivityNamespace(_config);
    this.awards = new AccessSubscribersAwardsNamespace(_config);
  }

  /**
   * Clear subscriber note
   *
   * Clear the note/notice for a subscriber.
   *
   * Operation: `access.subscribers.deleteNote`
   *
   * @scope subscribers:write
   * @example
   * ```ts
   * await client.access.subscribers.deleteNote({ subscriberId: 'example' })
   * ```
   */
  deleteNote(params: AccessSubscribersDeleteNoteParams, options?: RequestOptions): Promise<AccessSubscribersDeleteNoteResponse> {
    return request<AccessSubscribersDeleteNoteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/subscribers/${encodeURIComponent(String(params.subscriberId))}/note`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.deleteNote',
      requiredScope: 'subscribers:write',
      ...options,
    });
  }

  /**
   * Subscriber count
   *
   * Count subscribers with optional activity, spend, and subscription-state filters.
   *
   * Operation: `access.subscribers.getCount`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.getCount()
   * ```
   */
  getCount(params: AccessSubscribersGetCountParams = {}, options?: RequestOptions): Promise<AccessSubscribersGetCountResponse> {
    return request<AccessSubscribersGetCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/count`,
      query: { "type": params.type, "isOnline": params.isOnline, "isInactive": params.isInactive, "hasRecommenders": params.hasRecommenders, "hasAutoprolong": params.hasAutoprolong, "duration": params.duration, "tips": params.tips, "totalSpent": params.totalSpent, "spentDateStart": params.spentDateStart, "spentDateEnd": params.spentDateEnd, "newPriceLessThan": params.newPriceLessThan },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.getCount',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Subscribers
   *
   * List all subscribers. Use `GET /v3/access/subscribers/expired` for expired subscribers.
   *
   * Operation: `access.subscribers.list`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.list()
   * ```
   */
  list(params: AccessSubscribersListParams = {}, options?: RequestOptions): Promise<AccessSubscribersListResponse> {
    return request<AccessSubscribersListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "isOnline": params.isOnline, "minSpend": params.minSpend, "spentDateStart": params.spentDateStart, "spentDateEnd": params.spentDateEnd, "tipAmount": params.tipAmount, "durationMonths": params.durationMonths, "isInactive": params.isInactive, "hasRecommenders": params.hasRecommenders },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.list',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Subscribers: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessSubscribersListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersListItem, void, unknown> {
    return paginate<AccessSubscribersListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Active subscribers
   *
   * List subscribers whose subscription is currently active.
   *
   * Operation: `access.subscribers.listActive`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.listActive()
   * ```
   */
  listActive(params: AccessSubscribersListActiveParams = {}, options?: RequestOptions): Promise<AccessSubscribersListActiveResponse> {
    return request<AccessSubscribersListActiveResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/active`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "isOnline": params.isOnline, "minSpend": params.minSpend, "spentDateStart": params.spentDateStart, "spentDateEnd": params.spentDateEnd, "tipAmount": params.tipAmount, "durationMonths": params.durationMonths, "isInactive": params.isInactive, "hasRecommenders": params.hasRecommenders },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.listActive',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Active subscribers: every item, fetching pages as needed.
   */
  iterateActive(params: Omit<AccessSubscribersListActiveParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersListActiveItem, void, unknown> {
    return paginate<AccessSubscribersListActiveItem>(
      (cursor) => this.listActive({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Expired subscribers
   *
   * List subscribers whose subscription has expired.
   *
   * Operation: `access.subscribers.listExpired`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.listExpired()
   * ```
   */
  listExpired(params: AccessSubscribersListExpiredParams = {}, options?: RequestOptions): Promise<AccessSubscribersListExpiredResponse> {
    return request<AccessSubscribersListExpiredResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/expired`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "isOnline": params.isOnline, "minSpend": params.minSpend, "spentDateStart": params.spentDateStart, "spentDateEnd": params.spentDateEnd, "tipAmount": params.tipAmount, "durationMonths": params.durationMonths, "isInactive": params.isInactive, "hasRecommenders": params.hasRecommenders },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.listExpired',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Expired subscribers: every item, fetching pages as needed.
   */
  iterateExpired(params: Omit<AccessSubscribersListExpiredParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscribersListExpiredItem, void, unknown> {
    return paginate<AccessSubscribersListExpiredItem>(
      (cursor) => this.listExpired({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Recently expired subscribers
   *
   * List subscribers whose subscriptions recently expired.
   *
   * Operation: `access.subscribers.listRecentExpired`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.listRecentExpired()
   * ```
   */
  listRecentExpired(params: AccessSubscribersListRecentExpiredParams = {}, options?: RequestOptions): Promise<AccessSubscribersListRecentExpiredResponse> {
    return request<AccessSubscribersListRecentExpiredResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/recent-expired`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.listRecentExpired',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Subscriber history entries
   *
   * Get subscription history for a specific subscriber.
   *
   * Operation: `access.subscribers.listSubscriptionHistory`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.listSubscriptionHistory({ subscriberId: 'example' })
   * ```
   */
  listSubscriptionHistory(params: AccessSubscribersListSubscriptionHistoryParams, options?: RequestOptions): Promise<AccessSubscribersListSubscriptionHistoryResponse> {
    return request<AccessSubscribersListSubscriptionHistoryResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/${encodeURIComponent(String(params.subscriberId))}/subscription-history`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.listSubscriptionHistory',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Top subscribers
   *
   * List top subscribers by ranking.
   *
   * Operation: `access.subscribers.listTop`
   *
   * @scope subscribers:read
   * @example
   * ```ts
   * await client.access.subscribers.listTop()
   * ```
   */
  listTop(params: AccessSubscribersListTopParams = {}, options?: RequestOptions): Promise<AccessSubscribersListTopResponse> {
    return request<AccessSubscribersListTopResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscribers/top`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.listTop',
      requiredScope: 'subscribers:read',
      ...options,
    });
  }

  /**
   * Apply discount to subscriber
   *
   * Apply a discount to a subscriber's subscription
   *
   * Operation: `access.subscribers.updateDiscount`
   *
   * @scope subscribers:write
   * @example
   * ```ts
   * await client.access.subscribers.updateDiscount({ subscriberId: 'example', body: { discount: 5, period: 1 } })
   * ```
   */
  updateDiscount(params: AccessSubscribersUpdateDiscountParams, options?: RequestOptions): Promise<AccessSubscribersUpdateDiscountResponse> {
    return request<AccessSubscribersUpdateDiscountResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/subscribers/${encodeURIComponent(String(params.subscriberId))}/discount`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.updateDiscount',
      requiredScope: 'subscribers:write',
      ...options,
    });
  }

  /**
   * Set subscriber display name
   *
   * Set a custom display name for a subscriber.
   *
   * Operation: `access.subscribers.updateDisplayName`
   *
   * @scope subscribers:write
   * @example
   * ```ts
   * await client.access.subscribers.updateDisplayName({ subscriberId: 'example', body: { displayName: 'example' } })
   * ```
   */
  updateDisplayName(params: AccessSubscribersUpdateDisplayNameParams, options?: RequestOptions): Promise<AccessSubscribersUpdateDisplayNameResponse> {
    return request<AccessSubscribersUpdateDisplayNameResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/subscribers/${encodeURIComponent(String(params.subscriberId))}/display-name`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.updateDisplayName',
      requiredScope: 'subscribers:write',
      ...options,
    });
  }

  /**
   * Update subscriber note
   *
   * Update the note/notice for a subscriber
   *
   * Operation: `access.subscribers.updateNote`
   *
   * @scope subscribers:write
   * @example
   * ```ts
   * await client.access.subscribers.updateNote({ subscriberId: 'example', body: { notice: 'example' } })
   * ```
   */
  updateNote(params: AccessSubscribersUpdateNoteParams, options?: RequestOptions): Promise<AccessSubscribersUpdateNoteResponse> {
    return request<AccessSubscribersUpdateNoteResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/subscribers/${encodeURIComponent(String(params.subscriberId))}/note`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscribers.updateNote',
      requiredScope: 'subscribers:write',
      ...options,
    });
  }
}

export class AccessSubscriptionsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Subscription counts
   *
   * Get aggregate counters for subscriptions, subscribers, and bookmarks by status.
   *
   * Operation: `access.subscriptions.getCount`
   *
   * @scope subscriptions:read
   * @example
   * ```ts
   * await client.access.subscriptions.getCount()
   * ```
   */
  getCount(params: AccessSubscriptionsGetCountParams = {}, options?: RequestOptions): Promise<AccessSubscriptionsGetCountResponse> {
    return request<AccessSubscriptionsGetCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscriptions/count`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.getCount',
      requiredScope: 'subscriptions:read',
      ...options,
    });
  }

  /**
   * Subscribed creator count
   *
   * Count creators the authenticated account subscribes to, optionally filtered by type, online state, or paid state.
   *
   * Operation: `access.subscriptions.getSubscribedCount`
   *
   * @scope subscriptions:read
   * @example
   * ```ts
   * await client.access.subscriptions.getSubscribedCount()
   * ```
   */
  getSubscribedCount(params: AccessSubscriptionsGetSubscribedCountParams = {}, options?: RequestOptions): Promise<AccessSubscriptionsGetSubscribedCountResponse> {
    return request<AccessSubscriptionsGetSubscribedCountResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscriptions/subscribes/count`,
      query: { "type": params.type, "isOnline": params.isOnline, "isPaid": params.isPaid },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.getSubscribedCount',
      requiredScope: 'subscriptions:read',
      ...options,
    });
  }

  /**
   * Hide subscription posts
   *
   * Hide posts for a subscription.
   *
   * Operation: `access.subscriptions.hidePosts`
   *
   * @scope subscriptions:write
   * @example
   * ```ts
   * await client.access.subscriptions.hidePosts({ subscriptionId: 123 })
   * ```
   */
  hidePosts(params: AccessSubscriptionsHidePostsParams, options?: RequestOptions): Promise<AccessSubscriptionsHidePostsResponse> {
    return request<AccessSubscriptionsHidePostsResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/subscriptions/${encodeURIComponent(String(params.subscriptionId))}/hide-posts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.hidePosts',
      requiredScope: 'subscriptions:write',
      ...options,
    });
  }

  /**
   * Subscriptions
   *
   * List creators the authenticated creator subscribes to or previously subscribed to.
   *
   * Operation: `access.subscriptions.list`
   *
   * @scope subscriptions:read
   * @example
   * ```ts
   * await client.access.subscriptions.list()
   * ```
   */
  list(params: AccessSubscriptionsListParams = {}, options?: RequestOptions): Promise<AccessSubscriptionsListResponse> {
    return request<AccessSubscriptionsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscriptions`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "isOnline": params.isOnline, "isPaid": params.isPaid, "hasPurchases": params.hasPurchases, "withBlocked": params.withBlocked, "field": params.field, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.list',
      requiredScope: 'subscriptions:read',
      ...options,
    });
  }

  /**
   * Subscriptions: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessSubscriptionsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscriptionsListItem, void, unknown> {
    return paginate<AccessSubscriptionsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Active subscriptions
   *
   * List creators the authenticated creator currently subscribes to.
   *
   * Operation: `access.subscriptions.listActive`
   *
   * @scope subscriptions:read
   * @example
   * ```ts
   * await client.access.subscriptions.listActive()
   * ```
   */
  listActive(params: AccessSubscriptionsListActiveParams = {}, options?: RequestOptions): Promise<AccessSubscriptionsListActiveResponse> {
    return request<AccessSubscriptionsListActiveResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscriptions/active`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "isOnline": params.isOnline, "isPaid": params.isPaid, "hasPurchases": params.hasPurchases, "withBlocked": params.withBlocked, "field": params.field, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.listActive',
      requiredScope: 'subscriptions:read',
      ...options,
    });
  }

  /**
   * Active subscriptions: every item, fetching pages as needed.
   */
  iterateActive(params: Omit<AccessSubscriptionsListActiveParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscriptionsListActiveItem, void, unknown> {
    return paginate<AccessSubscriptionsListActiveItem>(
      (cursor) => this.listActive({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Expired subscriptions
   *
   * List creators the authenticated creator used to subscribe to.
   *
   * Operation: `access.subscriptions.listExpired`
   *
   * @scope subscriptions:read
   * @example
   * ```ts
   * await client.access.subscriptions.listExpired()
   * ```
   */
  listExpired(params: AccessSubscriptionsListExpiredParams = {}, options?: RequestOptions): Promise<AccessSubscriptionsListExpiredResponse> {
    return request<AccessSubscriptionsListExpiredResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/subscriptions/expired`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "isOnline": params.isOnline, "isPaid": params.isPaid, "hasPurchases": params.hasPurchases, "withBlocked": params.withBlocked, "field": params.field, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.listExpired',
      requiredScope: 'subscriptions:read',
      ...options,
    });
  }

  /**
   * Expired subscriptions: every item, fetching pages as needed.
   */
  iterateExpired(params: Omit<AccessSubscriptionsListExpiredParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessSubscriptionsListExpiredItem, void, unknown> {
    return paginate<AccessSubscriptionsListExpiredItem>(
      (cursor) => this.listExpired({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Unhide subscription posts
   *
   * Stop hiding posts for a subscription.
   *
   * Operation: `access.subscriptions.unhidePosts`
   *
   * @scope subscriptions:write
   * @example
   * ```ts
   * await client.access.subscriptions.unhidePosts({ subscriptionId: 123 })
   * ```
   */
  unhidePosts(params: AccessSubscriptionsUnhidePostsParams, options?: RequestOptions): Promise<AccessSubscriptionsUnhidePostsResponse> {
    return request<AccessSubscriptionsUnhidePostsResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/subscriptions/${encodeURIComponent(String(params.subscriptionId))}/hide-posts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.subscriptions.unhidePosts',
      requiredScope: 'subscriptions:write',
      ...options,
    });
  }
}

export class AccessUploadsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Finalize uploads
   *
   * Finalize one or more upload sessions with JSON after uploading every part URL. Single-part uploads use the same flow as multipart uploads: upload the part bytes first, then finalize. Include `vaultUpload` to save finalized uploads to Vault, and optional `vaultUpload.listId` to add the resulting numeric media IDs to a Vault list.
   *
   * Operation: `access.uploads.finalize`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.uploads.finalize({ body: { uploadIds: ['example'] } })
   * ```
   */
  finalize(params: AccessUploadsFinalizeParams, options?: RequestOptions): Promise<AccessUploadsFinalizeResponse> {
    return request<AccessUploadsFinalizeResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/uploads/finalize`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.uploads.finalize',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * Start upload
   *
   * Create an upload session. OFAuth uses the required `etag` to check for existing media before returning upload URLs.
   *
   * Operation: `access.uploads.start`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.uploads.start({ body: { filename: 'example', etag: 'example', size: 123, contentType: 'example' } })
   * ```
   */
  start(params: AccessUploadsStartParams, options?: RequestOptions): Promise<AccessUploadsStartResponse> {
    return request<AccessUploadsStartResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/uploads/start`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.uploads.start',
      requiredScope: 'vault:write',
      ...options,
    });
  }
}

export class AccessUsersFriendsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * User friends
   *
   * List a user's friends.
   *
   * Operation: `access.users.friends.list`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.friends.list({ userId: 123 })
   * ```
   */
  list(params: AccessUsersFriendsListParams, options?: RequestOptions): Promise<AccessUsersFriendsListResponse> {
    return request<AccessUsersFriendsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/friends`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.friends.list',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * User friends: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessUsersFriendsListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersFriendsListItem, void, unknown> {
    return paginate<AccessUsersFriendsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Pinned user friends
   *
   * List a user's pinned friends.
   *
   * Operation: `access.users.friends.listPinned`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.friends.listPinned({ userId: 123 })
   * ```
   */
  listPinned(params: AccessUsersFriendsListPinnedParams, options?: RequestOptions): Promise<AccessUsersFriendsListPinnedResponse> {
    return request<AccessUsersFriendsListPinnedResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/friends/pinned`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.friends.listPinned',
      requiredScope: 'users:read',
      ...options,
    });
  }
}

export class AccessUsersLabelsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create label
   *
   * Create a label.
   *
   * Operation: `access.users.labels.create`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.users.labels.create({ body: {} })
   * ```
   */
  create(params: AccessUsersLabelsCreateParams, options?: RequestOptions): Promise<AccessUsersLabelsCreateResponse> {
    return request<AccessUsersLabelsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/labels`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.labels.create',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Delete label
   *
   * Delete a label.
   *
   * Operation: `access.users.labels.delete`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.users.labels.delete({ labelId: 123 })
   * ```
   */
  delete(params: AccessUsersLabelsDeleteParams, options?: RequestOptions): Promise<AccessUsersLabelsDeleteResponse> {
    return request<AccessUsersLabelsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/users/labels/${encodeURIComponent(String(params.labelId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.labels.delete',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Get label
   *
   * Get a label.
   *
   * Operation: `access.users.labels.get`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.users.labels.get({ labelId: 123 })
   * ```
   */
  get(params: AccessUsersLabelsGetParams, options?: RequestOptions): Promise<AccessUsersLabelsGetResponse> {
    return request<AccessUsersLabelsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/labels/${encodeURIComponent(String(params.labelId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.labels.get',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * Labels
   *
   * List labels.
   *
   * Operation: `access.users.labels.list`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.users.labels.list()
   * ```
   */
  list(params: AccessUsersLabelsListParams = {}, options?: RequestOptions): Promise<AccessUsersLabelsListResponse> {
    return request<AccessUsersLabelsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/labels`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "ids": params.ids },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.labels.list',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * Labels: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessUsersLabelsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersLabelsListItem, void, unknown> {
    return paginate<AccessUsersLabelsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * User labels
   *
   * List labels assigned to a user.
   *
   * Operation: `access.users.labels.listForUser`
   *
   * @scope lists:read
   * @example
   * ```ts
   * await client.access.users.labels.listForUser({ userId: 123 })
   * ```
   */
  listForUser(params: AccessUsersLabelsListForUserParams, options?: RequestOptions): Promise<AccessUsersLabelsListForUserResponse> {
    return request<AccessUsersLabelsListForUserResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/labels`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.labels.listForUser',
      requiredScope: 'lists:read',
      ...options,
    });
  }

  /**
   * User labels: every item, fetching pages as needed.
   */
  iterateForUser(params: Omit<AccessUsersLabelsListForUserParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersLabelsListForUserItem, void, unknown> {
    return paginate<AccessUsersLabelsListForUserItem>(
      (cursor) => this.listForUser({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessUsersMediaNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Purchased user media
   *
   * List purchased media for a user.
   *
   * Operation: `access.users.media.getPurchased`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.media.getPurchased({ userId: 123 })
   * ```
   */
  getPurchased(params: AccessUsersMediaGetPurchasedParams, options?: RequestOptions): Promise<AccessUsersMediaGetPurchasedResponse> {
    return request<AccessUsersMediaGetPurchasedResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/media/purchased`,
      query: { "mediaIds": params.mediaIds },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.media.getPurchased',
      requiredScope: 'users:read',
      ...options,
    });
  }
}

export class AccessUsersSocialNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * User social buttons
   *
   * Get social buttons for a user.
   *
   * Operation: `access.users.social.listButtons`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.social.listButtons({ userId: 123 })
   * ```
   */
  listButtons(params: AccessUsersSocialListButtonsParams, options?: RequestOptions): Promise<AccessUsersSocialListButtonsResponse> {
    return request<AccessUsersSocialListButtonsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/social/buttons`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.social.listButtons',
      requiredScope: 'users:read',
      ...options,
    });
  }
}

export class AccessUsersStoriesNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * List user stories
   *
   * Get active stories for a specific user.
   *
   * Operation: `access.users.stories.list`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.users.stories.list({ userId: 123 })
   * ```
   */
  list(params: AccessUsersStoriesListParams, options?: RequestOptions): Promise<AccessUsersStoriesListResponse> {
    return request<AccessUsersStoriesListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/stories`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.stories.list',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * User story highlights
   *
   * List story highlights for a user.
   *
   * Operation: `access.users.stories.listHighlights`
   *
   * @scope stories:read
   * @example
   * ```ts
   * await client.access.users.stories.listHighlights({ userId: 123 })
   * ```
   */
  listHighlights(params: AccessUsersStoriesListHighlightsParams, options?: RequestOptions): Promise<AccessUsersStoriesListHighlightsResponse> {
    return request<AccessUsersStoriesListHighlightsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/stories/highlights`,
      query: { "limit": params.limit, "cursor": params.cursor, "storyIdToCheck": params.storyIdToCheck },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.stories.listHighlights',
      requiredScope: 'stories:read',
      ...options,
    });
  }

  /**
   * User story highlights: every item, fetching pages as needed.
   */
  iterateHighlights(params: Omit<AccessUsersStoriesListHighlightsParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersStoriesListHighlightsItem, void, unknown> {
    return paginate<AccessUsersStoriesListHighlightsItem>(
      (cursor) => this.listHighlights({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessUsersStreamsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * User streams
   *
   * List user streams.
   *
   * Operation: `access.users.streams.list`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.streams.list({ userId: 123 })
   * ```
   */
  list(params: AccessUsersStreamsListParams, options?: RequestOptions): Promise<AccessUsersStreamsListResponse> {
    return request<AccessUsersStreamsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/streams`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.streams.list',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * User streams: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessUsersStreamsListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersStreamsListItem, void, unknown> {
    return paginate<AccessUsersStreamsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Scheduled user streams
   *
   * List scheduled streams for a user.
   *
   * Operation: `access.users.streams.listScheduled`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.streams.listScheduled({ userId: 123 })
   * ```
   */
  listScheduled(params: AccessUsersStreamsListScheduledParams, options?: RequestOptions): Promise<AccessUsersStreamsListScheduledResponse> {
    return request<AccessUsersStreamsListScheduledResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/streams/scheduled`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.streams.listScheduled',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * Scheduled user streams: every item, fetching pages as needed.
   */
  iterateScheduled(params: Omit<AccessUsersStreamsListScheduledParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersStreamsListScheduledItem, void, unknown> {
    return paginate<AccessUsersStreamsListScheduledItem>(
      (cursor) => this.listScheduled({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessUsersNamespace {
  readonly friends: AccessUsersFriendsNamespace;
  readonly labels: AccessUsersLabelsNamespace;
  readonly media: AccessUsersMediaNamespace;
  readonly social: AccessUsersSocialNamespace;
  readonly stories: AccessUsersStoriesNamespace;
  readonly streams: AccessUsersStreamsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.friends = new AccessUsersFriendsNamespace(_config);
    this.labels = new AccessUsersLabelsNamespace(_config);
    this.media = new AccessUsersMediaNamespace(_config);
    this.social = new AccessUsersSocialNamespace(_config);
    this.stories = new AccessUsersStoriesNamespace(_config);
    this.streams = new AccessUsersStreamsNamespace(_config);
  }

  /**
   * Add user to multiple lists
   *
   * Add a single user to multiple lists in one call
   *
   * Operation: `access.users.addToLists`
   *
   * @scope lists:write
   * @example
   * ```ts
   * await client.access.users.addToLists({ userId: 'example', body: { listIds: [123] } })
   * ```
   */
  addToLists(params: AccessUsersAddToListsParams, options?: RequestOptions): Promise<AccessUsersAddToListsResponse> {
    return request<AccessUsersAddToListsResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/lists`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.addToLists',
      requiredScope: 'lists:write',
      ...options,
    });
  }

  /**
   * Batch get users
   *
   * Get up to 10 users by id in one OnlyFans call. Each user has the fields OnlyFans returns in its `m` user view (listed on the response), which is less than the full profile: use `GET /users/{userId}` for about, counts and the other profile fields. Users come back in request order; ids OnlyFans cannot return are left out.
   *
   * Operation: `access.users.batch`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.batch({ body: { userIds: ['example'] } })
   * ```
   */
  batch(params: AccessUsersBatchParams, options?: RequestOptions): Promise<AccessUsersBatchResponse> {
    return request<AccessUsersBatchResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/batch`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.batch',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * Block user
   *
   * Block a user.
   *
   * Operation: `access.users.block`
   *
   * @scope users:write
   * @example
   * ```ts
   * await client.access.users.block({ userId: 123, body: {} })
   * ```
   */
  block(params: AccessUsersBlockParams, options?: RequestOptions): Promise<AccessUsersBlockResponse> {
    return request<AccessUsersBlockResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/block`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.block',
      requiredScope: 'users:write',
      ...options,
    });
  }

  /**
   * Check users exist
   *
   * Check whether users exist.
   *
   * Operation: `access.users.exists`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.exists({ body: {} })
   * ```
   */
  exists(params: AccessUsersExistsParams, options?: RequestOptions): Promise<AccessUsersExistsResponse> {
    return request<AccessUsersExistsResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/exists`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.exists',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * Get user
   *
   * Get a user profile by user ID.
   *
   * Operation: `access.users.get`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.get({ userId: 'example' })
   * ```
   */
  get(params: AccessUsersGetParams, options?: RequestOptions): Promise<AccessUsersGetResponse> {
    return request<AccessUsersGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.get',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * List users
   *
   * List users, or list users in a user list when listId is provided.
   *
   * Operation: `access.users.list`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.list()
   * ```
   */
  list(params: AccessUsersListParams = {}, options?: RequestOptions): Promise<AccessUsersListResponse> {
    return request<AccessUsersListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query, "listId": params.listId, "field": params.field, "order": params.order },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.list',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * List users: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessUsersListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersListItem, void, unknown> {
    return paginate<AccessUsersListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * List blocked users
   *
   * List users currently blocked by the authenticated creator account.
   *
   * Operation: `access.users.listBlocked`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.listBlocked()
   * ```
   */
  listBlocked(params: AccessUsersListBlockedParams = {}, options?: RequestOptions): Promise<AccessUsersListBlockedResponse> {
    return request<AccessUsersListBlockedResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/blocked`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listBlocked',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * List blocked users: every item, fetching pages as needed.
   */
  iterateBlocked(params: Omit<AccessUsersListBlockedParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersListBlockedItem, void, unknown> {
    return paginate<AccessUsersListBlockedItem>(
      (cursor) => this.listBlocked({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * User hints
   *
   * Get user hints.
   *
   * Operation: `access.users.listHints`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.listHints()
   * ```
   */
  listHints(params: AccessUsersListHintsParams = {}, options?: RequestOptions): Promise<AccessUsersListHintsResponse> {
    return request<AccessUsersListHintsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/hints`,
      query: { "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listHints',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * User hints: every item, fetching pages as needed.
   */
  iterateHints(params: Omit<AccessUsersListHintsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersListHintsItem, void, unknown> {
    return paginate<AccessUsersListHintsItem>(
      (cursor) => this.listHints({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Public user links
   *
   * Get links for a user.
   *
   * Operation: `access.users.listLinks`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.listLinks({ userId: 123 })
   * ```
   */
  listLinks(params: AccessUsersListLinksParams, options?: RequestOptions): Promise<AccessUsersListLinksResponse> {
    return request<AccessUsersListLinksResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/links`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listLinks',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * Mention users
   *
   * Search users for mentions.
   *
   * Operation: `access.users.listMentionable`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.listMentionable()
   * ```
   */
  listMentionable(params: AccessUsersListMentionableParams = {}, options?: RequestOptions): Promise<AccessUsersListMentionableResponse> {
    return request<AccessUsersListMentionableResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/mention`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listMentionable',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * Mention users: every item, fetching pages as needed.
   */
  iterateMentionable(params: Omit<AccessUsersListMentionableParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersListMentionableItem, void, unknown> {
    return paginate<AccessUsersListMentionableItem>(
      (cursor) => this.listMentionable({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * List user posts
   *
   * List posts published by a specific user, with sorting, pagination, and optional post counters.
   *
   * Operation: `access.users.listPosts`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.users.listPosts({ userId: 'example' })
   * ```
   */
  listPosts(params: AccessUsersListPostsParams, options?: RequestOptions): Promise<AccessUsersListPostsResponse> {
    return request<AccessUsersListPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/posts`,
      query: { "limit": params.limit, "media": params.media, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "pinned": params.pinned, "onlyCanView": params.onlyCanView, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listPosts',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * List user posts: every item, fetching pages as needed.
   */
  iteratePosts(params: Omit<AccessUsersListPostsParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersListPostsItem, void, unknown> {
    return paginate<AccessUsersListPostsItem>(
      (cursor) => this.listPosts({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * User promotions
   *
   * List user promotions.
   *
   * Operation: `access.users.listPromotions`
   *
   * @scope profile:read
   * @example
   * ```ts
   * await client.access.users.listPromotions()
   * ```
   */
  listPromotions(params: AccessUsersListPromotionsParams = {}, options?: RequestOptions): Promise<AccessUsersListPromotionsResponse> {
    return request<AccessUsersListPromotionsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/promotions`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listPromotions',
      requiredScope: 'profile:read',
      ...options,
    });
  }

  /**
   * Recommended users
   *
   * List recommended users.
   *
   * Operation: `access.users.listRecommends`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.listRecommends()
   * ```
   */
  listRecommends(params: AccessUsersListRecommendsParams = {}, options?: RequestOptions): Promise<AccessUsersListRecommendsResponse> {
    return request<AccessUsersListRecommendsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/recommends`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listRecommends',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * List restricted users
   *
   * List users currently restricted by the authenticated creator account.
   *
   * Operation: `access.users.listRestricted`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.listRestricted()
   * ```
   */
  listRestricted(params: AccessUsersListRestrictedParams = {}, options?: RequestOptions): Promise<AccessUsersListRestrictedResponse> {
    return request<AccessUsersListRestrictedResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/restrict`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.listRestricted',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * List restricted users: every item, fetching pages as needed.
   */
  iterateRestricted(params: Omit<AccessUsersListRestrictedParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersListRestrictedItem, void, unknown> {
    return paginate<AccessUsersListRestrictedItem>(
      (cursor) => this.listRestricted({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Restrict user
   *
   * Restrict a user from interacting with the authenticated creator account.
   *
   * Operation: `access.users.restrict`
   *
   * @scope users:write
   * @example
   * ```ts
   * await client.access.users.restrict({ userId: 123, body: {} })
   * ```
   */
  restrict(params: AccessUsersRestrictParams, options?: RequestOptions): Promise<AccessUsersRestrictResponse> {
    return request<AccessUsersRestrictResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/restrict`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.restrict',
      requiredScope: 'users:write',
      ...options,
    });
  }

  /**
   * Search performers
   *
   * Search for performers/users
   *
   * Operation: `access.users.search`
   *
   * @scope users:read
   * @example
   * ```ts
   * await client.access.users.search()
   * ```
   */
  search(params: AccessUsersSearchParams = {}, options?: RequestOptions): Promise<AccessUsersSearchResponse> {
    return request<AccessUsersSearchResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/users/search`,
      query: { "limit": params.limit, "cursor": params.cursor, "query": params.query },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.search',
      requiredScope: 'users:read',
      ...options,
    });
  }

  /**
   * Search performers: every item, fetching pages as needed.
   */
  iterateSearch(params: Omit<AccessUsersSearchParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessUsersSearchItem, void, unknown> {
    return paginate<AccessUsersSearchItem>(
      (cursor) => this.search({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Subscribe to user
   *
   * Subscribe to a user.
   *
   * Operation: `access.users.subscribe`
   *
   * @scope subscriptions:write
   * @example
   * ```ts
   * await client.access.users.subscribe({ userId: 123, body: {} })
   * ```
   */
  subscribe(params: AccessUsersSubscribeParams, options?: RequestOptions): Promise<AccessUsersSubscribeResponse> {
    return request<AccessUsersSubscribeResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/subscribe`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.subscribe',
      requiredScope: 'subscriptions:write',
      ...options,
    });
  }

  /**
   * Unblock user
   *
   * Remove a user block.
   *
   * Operation: `access.users.unblock`
   *
   * @scope users:write
   * @example
   * ```ts
   * await client.access.users.unblock({ userId: 123 })
   * ```
   */
  unblock(params: AccessUsersUnblockParams, options?: RequestOptions): Promise<AccessUsersUnblockResponse> {
    return request<AccessUsersUnblockResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/block`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.unblock',
      requiredScope: 'users:write',
      ...options,
    });
  }

  /**
   * Unrestrict user
   *
   * Remove a user restriction for the authenticated creator account.
   *
   * Operation: `access.users.unrestrict`
   *
   * @scope users:write
   * @example
   * ```ts
   * await client.access.users.unrestrict({ userId: 123 })
   * ```
   */
  unrestrict(params: AccessUsersUnrestrictParams, options?: RequestOptions): Promise<AccessUsersUnrestrictResponse> {
    return request<AccessUsersUnrestrictResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/users/${encodeURIComponent(String(params.userId))}/restrict`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.users.unrestrict',
      requiredScope: 'users:write',
      ...options,
    });
  }
}

export class AccessVaultListsMediaNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Add media to vault list
   *
   * Add one or more media items to a Vault folder.
   *
   * Operation: `access.vault.lists.media.create`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.lists.media.create({ listId: 123, body: { mediaIds: [123] } })
   * ```
   */
  create(params: AccessVaultListsMediaCreateParams, options?: RequestOptions): Promise<AccessVaultListsMediaCreateResponse> {
    return request<AccessVaultListsMediaCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/vault/lists/${encodeURIComponent(String(params.listId))}/media`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.media.create',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * Remove vault list media
   *
   * Remove media items from a Vault list.
   *
   * Operation: `access.vault.lists.media.delete`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.lists.media.delete({ listId: 123, body: { mediaIds: [123] } })
   * ```
   */
  delete(params: AccessVaultListsMediaDeleteParams, options?: RequestOptions): Promise<AccessVaultListsMediaDeleteResponse> {
    return request<AccessVaultListsMediaDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/vault/lists/${encodeURIComponent(String(params.listId))}/media`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.media.delete',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * List media in vault list
   *
   * List media items contained in a specific Vault folder, with optional media filters and sorting.
   *
   * Operation: `access.vault.lists.media.list`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.lists.media.list({ listId: 123 })
   * ```
   */
  list(params: AccessVaultListsMediaListParams, options?: RequestOptions): Promise<AccessVaultListsMediaListResponse> {
    return request<AccessVaultListsMediaListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/lists/${encodeURIComponent(String(params.listId))}/media`,
      query: { "limit": params.limit, "cursor": params.cursor, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "query": params.query, "mediaType": params.mediaType, "beforePublishDate": params.beforePublishDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.media.list',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * List media in vault list: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessVaultListsMediaListParams, 'cursor'>, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessVaultListsMediaListItem, void, unknown> {
    return paginate<AccessVaultListsMediaListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AccessVaultListsNamespace {
  readonly media: AccessVaultListsMediaNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.media = new AccessVaultListsMediaNamespace(_config);
  }

  /**
   * Create vault list
   *
   * Create a Vault folder for organizing media.
   *
   * Operation: `access.vault.lists.create`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.lists.create({ body: { name: 'example' } })
   * ```
   */
  create(params: AccessVaultListsCreateParams, options?: RequestOptions): Promise<AccessVaultListsCreateResponse> {
    return request<AccessVaultListsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/vault/lists`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.create',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * Delete vault list
   *
   * Delete a Vault folder by ID.
   *
   * Operation: `access.vault.lists.delete`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.lists.delete({ listId: 123, body: {} })
   * ```
   */
  delete(params: AccessVaultListsDeleteParams, options?: RequestOptions): Promise<AccessVaultListsDeleteResponse> {
    return request<AccessVaultListsDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/access/vault/lists/${encodeURIComponent(String(params.listId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.delete',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * Vault list
   *
   * Get a single Vault list by ID.
   *
   * Operation: `access.vault.lists.get`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.lists.get({ listId: 123 })
   * ```
   */
  get(params: AccessVaultListsGetParams, options?: RequestOptions): Promise<AccessVaultListsGetResponse> {
    return request<AccessVaultListsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/lists/${encodeURIComponent(String(params.listId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.get',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * List vault folders
   *
   * List Vault folders for the authenticated creator account.
   *
   * Operation: `access.vault.lists.list`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.lists.list()
   * ```
   */
  list(params: AccessVaultListsListParams = {}, options?: RequestOptions): Promise<AccessVaultListsListResponse> {
    return request<AccessVaultListsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/lists`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.list',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * List vault folders: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessVaultListsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessVaultListsListItem, void, unknown> {
    return paginate<AccessVaultListsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Sort vault lists
   *
   * Update Vault list sort order.
   *
   * Operation: `access.vault.lists.sort`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.lists.sort({ body: { order: 'asc', sort: 'default' } })
   * ```
   */
  sort(params: AccessVaultListsSortParams, options?: RequestOptions): Promise<AccessVaultListsSortResponse> {
    return request<AccessVaultListsSortResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/vault/lists/sort`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.sort',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * Update vault list
   *
   * Rename or update metadata for a Vault folder.
   *
   * Operation: `access.vault.lists.update`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.lists.update({ listId: 123, body: { name: 'example' } })
   * ```
   */
  update(params: AccessVaultListsUpdateParams, options?: RequestOptions): Promise<AccessVaultListsUpdateResponse> {
    return request<AccessVaultListsUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/access/vault/lists/${encodeURIComponent(String(params.listId))}`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.lists.update',
      requiredScope: 'vault:write',
      ...options,
    });
  }
}

export class AccessVaultMediaNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Vault media item
   *
   * Get a single Vault media item by ID.
   *
   * Operation: `access.vault.media.get`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.media.get({ mediaId: 123 })
   * ```
   */
  get(params: AccessVaultMediaGetParams, options?: RequestOptions): Promise<AccessVaultMediaGetResponse> {
    return request<AccessVaultMediaGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/media/${encodeURIComponent(String(params.mediaId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.get',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * Vault media types
   *
   * Get which media types are present in Vault.
   *
   * Operation: `access.vault.media.getTypes`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.media.getTypes()
   * ```
   */
  getTypes(params: AccessVaultMediaGetTypesParams = {}, options?: RequestOptions): Promise<AccessVaultMediaGetTypesResponse> {
    return request<AccessVaultMediaGetTypesResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/media/types`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.getTypes',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * Hide vault media
   *
   * Hide one or more Vault media items.
   *
   * Operation: `access.vault.media.hide`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.media.hide({ body: { mediaIds: [123] } })
   * ```
   */
  hide(params: AccessVaultMediaHideParams, options?: RequestOptions): Promise<AccessVaultMediaHideResponse> {
    return request<AccessVaultMediaHideResponse>(this._config, {
      method: 'PUT',
      path: `/v3/access/vault/media/hidden`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.hide',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * List vault media
   *
   * List media items in the creator's Vault, with filters for media type, folder, sorting, and pagination.
   *
   * Operation: `access.vault.media.list`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.media.list()
   * ```
   */
  list(params: AccessVaultMediaListParams = {}, options?: RequestOptions): Promise<AccessVaultMediaListResponse> {
    return request<AccessVaultMediaListResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/media`,
      query: { "limit": params.limit, "cursor": params.cursor, "sortBy": params.sortBy, "sortDirection": params.sortDirection, "query": params.query, "mediaType": params.mediaType, "beforePublishDate": params.beforePublishDate },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.list',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * List vault media: every item, fetching pages as needed.
   */
  iterate(params: Omit<AccessVaultMediaListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessVaultMediaListItem, void, unknown> {
    return paginate<AccessVaultMediaListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }

  /**
   * Vault media posts
   *
   * List posts that use a Vault media item.
   *
   * Operation: `access.vault.media.listPosts`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.media.listPosts({ mediaId: 123 })
   * ```
   */
  listPosts(params: AccessVaultMediaListPostsParams, options?: RequestOptions): Promise<AccessVaultMediaListPostsResponse> {
    return request<AccessVaultMediaListPostsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/media/${encodeURIComponent(String(params.mediaId))}/posts`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.listPosts',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * Vault media processing
   *
   * Get processing status for media currently being prepared in Vault.
   *
   * Operation: `access.vault.media.listProcessing`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.media.listProcessing()
   * ```
   */
  listProcessing(params: AccessVaultMediaListProcessingParams = {}, options?: RequestOptions): Promise<AccessVaultMediaListProcessingResponse> {
    return request<AccessVaultMediaListProcessingResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/media/processing`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.listProcessing',
      requiredScope: 'vault:read',
      ...options,
    });
  }

  /**
   * Get vault media release forms
   *
   * Get release forms attached to a Vault media item.
   *
   * Operation: `access.vault.media.listReleaseForms`
   *
   * @scope vault:read
   * @example
   * ```ts
   * await client.access.vault.media.listReleaseForms({ mediaId: 123 })
   * ```
   */
  listReleaseForms(params: AccessVaultMediaListReleaseFormsParams, options?: RequestOptions): Promise<AccessVaultMediaListReleaseFormsResponse> {
    return request<AccessVaultMediaListReleaseFormsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/media/${encodeURIComponent(String(params.mediaId))}/release-forms`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.media.listReleaseForms',
      requiredScope: 'vault:read',
      ...options,
    });
  }
}

export class AccessVaultUploadsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Create vault upload session
   *
   * Create upload sessions for 1 to 10 files that should be saved to Vault as one group. OFAuth uses each required file `etag` to check for existing Vault media before upload URLs are created.
   *
   * Operation: `access.vault.uploads.create`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.uploads.create({ body: { files: [{ filename: 'example', etag: 'example', size: 123, contentType: 'example' }], vaultUpload: {} } })
   * ```
   */
  create(params: AccessVaultUploadsCreateParams, options?: RequestOptions): Promise<AccessVaultUploadsCreateResponse> {
    return request<AccessVaultUploadsCreateResponse>(this._config, {
      method: 'POST',
      path: `/v3/access/vault/uploads`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.uploads.create',
      requiredScope: 'vault:write',
      ...options,
    });
  }

  /**
   * Vault upload session status
   *
   * Operation: `access.vault.uploads.get`
   *
   * @scope vault:write
   * @example
   * ```ts
   * await client.access.vault.uploads.get({ batchId: 'example' })
   * ```
   */
  get(params: AccessVaultUploadsGetParams, options?: RequestOptions): Promise<AccessVaultUploadsGetResponse> {
    return request<AccessVaultUploadsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/vault/uploads/${encodeURIComponent(String(params.batchId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.vault.uploads.get',
      requiredScope: 'vault:write',
      ...options,
    });
  }
}

export class AccessVaultNamespace {
  readonly lists: AccessVaultListsNamespace;
  readonly media: AccessVaultMediaNamespace;
  readonly uploads: AccessVaultUploadsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.lists = new AccessVaultListsNamespace(_config);
    this.media = new AccessVaultMediaNamespace(_config);
    this.uploads = new AccessVaultUploadsNamespace(_config);
  }
}

export class AccessNamespace {
  readonly analytics: AccessAnalyticsNamespace;
  readonly chats: AccessChatsNamespace;
  readonly finances: AccessFinancesNamespace;
  readonly lists: AccessListsNamespace;
  readonly notifications: AccessNotificationsNamespace;
  readonly posts: AccessPostsNamespace;
  readonly profile: AccessProfileNamespace;
  readonly promotions: AccessPromotionsNamespace;
  readonly queue: AccessQueueNamespace;
  readonly releaseForms: AccessReleaseFormsNamespace;
  readonly settings: AccessSettingsNamespace;
  readonly stories: AccessStoriesNamespace;
  readonly subscribers: AccessSubscribersNamespace;
  readonly subscriptions: AccessSubscriptionsNamespace;
  readonly uploads: AccessUploadsNamespace;
  readonly users: AccessUsersNamespace;
  readonly vault: AccessVaultNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.analytics = new AccessAnalyticsNamespace(_config);
    this.chats = new AccessChatsNamespace(_config);
    this.finances = new AccessFinancesNamespace(_config);
    this.lists = new AccessListsNamespace(_config);
    this.notifications = new AccessNotificationsNamespace(_config);
    this.posts = new AccessPostsNamespace(_config);
    this.profile = new AccessProfileNamespace(_config);
    this.promotions = new AccessPromotionsNamespace(_config);
    this.queue = new AccessQueueNamespace(_config);
    this.releaseForms = new AccessReleaseFormsNamespace(_config);
    this.settings = new AccessSettingsNamespace(_config);
    this.stories = new AccessStoriesNamespace(_config);
    this.subscribers = new AccessSubscribersNamespace(_config);
    this.subscriptions = new AccessSubscriptionsNamespace(_config);
    this.uploads = new AccessUploadsNamespace(_config);
    this.users = new AccessUsersNamespace(_config);
    this.vault = new AccessVaultNamespace(_config);
  }

  /**
   * List post labels
   *
   * List the authenticated creator's post labels.
   *
   * Operation: `access.listLabels`
   *
   * @scope posts:read
   * @example
   * ```ts
   * await client.access.listLabels()
   * ```
   */
  listLabels(params: AccessListLabelsParams = {}, options?: RequestOptions): Promise<AccessListLabelsResponse> {
    return request<AccessListLabelsResponse>(this._config, {
      method: 'GET',
      path: `/v3/access/labels`,
      query: { "limit": params.limit, "cursor": params.cursor },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'access.listLabels',
      requiredScope: 'posts:read',
      ...options,
    });
  }

  /**
   * List post labels: every item, fetching pages as needed.
   */
  iterateLabels(params: Omit<AccessListLabelsParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<AccessListLabelsItem, void, unknown> {
    return paginate<AccessListLabelsItem>(
      (cursor) => this.listLabels({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["page","nextCursor"], hasMore: ["page","hasMore"] },
      options,
    );
  }
}

export class AuthorizationNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Disconnect the current authorization
   *
   * Ends durable consent and every credential of this authorization. Independent authorizations remain usable. Subsequent use of a revoked bearer receives invalid_token.
   *
   * Operation: `authorization.disconnect`
   * @example
   * ```ts
   * await client.authorization.disconnect()
   * ```
   */
  disconnect(options?: RequestOptions): Promise<void> {
    return request<void>(this._config, {
      method: 'DELETE',
      path: `/v3/authorization`,
      operation: 'authorization.disconnect',
      ...options,
    });
  }

  /**
   * Get the current authorization
   *
   * Returns this token's durable authorization, issued scope and the first page of current account grants. Continue account discovery through GET /v3/linked-accounts.
   *
   * Operation: `authorization.get`
   * @example
   * ```ts
   * await client.authorization.get()
   * ```
   */
  get(options?: RequestOptions): Promise<AuthorizationGetResponse> {
    return request<AuthorizationGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/authorization`,
      operation: 'authorization.get',
      ...options,
    });
  }
}

export class LinkNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Get the person who authorized this app
   *
   * Requires identity:read consent and a current authorization. The subject identifies the person's OFAuth account and is independent of their linked creator accounts.
   *
   * Operation: `link.getUserinfo`
   *
   * @scope identity:read
   * @example
   * ```ts
   * await client.link.getUserinfo()
   * ```
   */
  getUserinfo(options?: RequestOptions): Promise<LinkGetUserinfoResponse> {
    return request<LinkGetUserinfoResponse>(this._config, {
      method: 'GET',
      path: `/v3/link/userinfo`,
      operation: 'link.getUserinfo',
      requiredScope: 'identity:read',
      ...options,
    });
  }
}

export class LinkedAccountsSettingsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Get linked account settings
   *
   * Per-account Vault+ settings for the environment of your token: Test and Live settings of the same account are separate. `overrides` holds the fields this account sets; every other field follows the integration's Vault+ settings. `effective` is what Vault+ applies, limited to the qualities your Developer plan includes (`allowed_qualities`); qualities your plan does not include are listed in `restricted_qualities` and apply again after an upgrade. Sandbox accounts always have Vault+ enabled with default settings.
   *
   * Operation: `linkedAccounts.settings.get`
   * @example
   * ```ts
   * await client.linkedAccounts.settings.get({ id: 'conn_example123' })
   * ```
   */
  get(params: LinkedAccountsSettingsGetParams, options?: RequestOptions): Promise<LinkedAccountsSettingsGetResponse> {
    return request<LinkedAccountsSettingsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/linked-accounts/${encodeURIComponent(String(params.id))}/settings`,
      operation: 'linkedAccounts.settings.get',
      ...options,
    });
  }

  /**
   * Update linked account settings
   *
   * Turns Vault+ on or off for one linked account in the environment of your token (other environments are unchanged) and sets the Vault+ settings it overrides. `overrides` is a merge patch: a field set to `null` follows the integration setting again, and `"overrides": null` clears every override. Qualities your Developer plan does not include are refused. Narrowing the media kinds or qualities removes stored media the account no longer keeps. Requires the `vault:write` scope on the account. Test accounts need a paid Developer plan.
   *
   * Operation: `linkedAccounts.settings.update`
   * @example
   * ```ts
   * await client.linkedAccounts.settings.update({ id: 'conn_example123', body: { vault_plus: {} } })
   * ```
   */
  update(params: LinkedAccountsSettingsUpdateParams, options?: RequestOptions): Promise<LinkedAccountsSettingsUpdateResponse> {
    return request<LinkedAccountsSettingsUpdateResponse>(this._config, {
      method: 'PATCH',
      path: `/v3/linked-accounts/${encodeURIComponent(String(params.id))}/settings`,
      body: params.body,
      operation: 'linkedAccounts.settings.update',
      ...options,
    });
  }
}

export class LinkedAccountsNamespace {
  readonly settings: LinkedAccountsSettingsNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.settings = new LinkedAccountsSettingsNamespace(_config);
  }

  /**
   * Reconnect a linked account
   *
   * Creates a 15-minute journey for the owner to reconnect this authorization's exact account. `redirect_uri` must exactly match a registered OAuth redirect URI or, for a private Operator app, its registered `ofauth_reconnect_return_uri`. Open the returned `url`; the owner returns with `state` and `reconnect=completed`, `canceled`, `expired`, or `denied`. Confirm recovery with the existing account status or `linked_account.reconnected` event. This preserves authorization and account IDs, scopes, and unrelated accounts. It never retries an interrupted request. An expired OAuth token must be refreshed before this endpoint can be called.
   *
   * Operation: `linkedAccounts.createReconnect`
   * @example
   * ```ts
   * await client.linkedAccounts.createReconnect({ id: 'conn_example123', body: { redirect_uri: 'example', state: 'example' } })
   * ```
   */
  createReconnect(params: LinkedAccountsCreateReconnectParams, options?: RequestOptions): Promise<LinkedAccountsCreateReconnectResponse> {
    return request<LinkedAccountsCreateReconnectResponse>(this._config, {
      method: 'POST',
      path: `/v3/linked-accounts/${encodeURIComponent(String(params.id))}/reconnect`,
      body: params.body,
      operation: 'linkedAccounts.createReconnect',
      ...options,
    });
  }

  /**
   * Get a linked account
   *
   * Returns one of this authorization's linked accounts.
   *
   * Operation: `linkedAccounts.get`
   * @example
   * ```ts
   * await client.linkedAccounts.get({ id: 'conn_example123' })
   * ```
   */
  get(params: LinkedAccountsGetParams, options?: RequestOptions): Promise<LinkedAccountsGetResponse> {
    return request<LinkedAccountsGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/linked-accounts/${encodeURIComponent(String(params.id))}`,
      operation: 'linkedAccounts.get',
      ...options,
    });
  }

  /**
   * List this authorization's linked accounts
   *
   * Returns the accounts the access token's authorization covers, with their status and granted scopes, ordered by id. Send an account `id` as the `x-linked-account-id` header on Access requests.
   *
   * Operation: `linkedAccounts.list`
   * @example
   * ```ts
   * await client.linkedAccounts.list()
   * ```
   */
  list(params: LinkedAccountsListParams = {}, options?: RequestOptions): Promise<LinkedAccountsListResponse> {
    return request<LinkedAccountsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/linked-accounts`,
      query: { "limit": params.limit, "cursor": params.cursor },
      operation: 'linkedAccounts.list',
      ...options,
    });
  }

  /**
   * List this authorization's linked accounts: every item, fetching pages as needed.
   */
  iterate(params: Omit<LinkedAccountsListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<LinkedAccountsListItem, void, unknown> {
    return paginate<LinkedAccountsListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "data", nextCursor: ["next_cursor"], hasMore: ["has_more"] },
      options,
    );
  }

  /**
   * Remove a linked account
   *
   * Removes this authorization's access to one linked account. The account itself and other apps' access are unaffected. Repeating the call succeeds.
   *
   * Operation: `linkedAccounts.remove`
   * @example
   * ```ts
   * await client.linkedAccounts.remove({ id: 'conn_example123' })
   * ```
   */
  remove(params: LinkedAccountsRemoveParams, options?: RequestOptions): Promise<void> {
    return request<void>(this._config, {
      method: 'DELETE',
      path: `/v3/linked-accounts/${encodeURIComponent(String(params.id))}`,
      operation: 'linkedAccounts.remove',
      ...options,
    });
  }
}

export class VaultPlusListsNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Add Vault+ list media
   *
   * Fetch the current OnlyFans vault list and retain only media that is not already cached. Additive: never deletes cached media and does not move the sync baseline.
   *
   * Operation: `vaultPlus.lists.add`
   * @example
   * ```ts
   * await client.vaultPlus.lists.add({ listId: 123 })
   * ```
   */
  add(params: VaultPlusListsAddParams, options?: RequestOptions): Promise<VaultPlusListsAddResponse> {
    return request<VaultPlusListsAddResponse>(this._config, {
      method: 'POST',
      path: `/v3/vault-plus/lists/${encodeURIComponent(String(params.listId))}/add`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.lists.add',
      ...options,
    });
  }

  /**
   * List Vault+ lists
   *
   * Return cached vault-list summaries for the Connection. Reads cached list records only; it does not fetch live OnlyFans state.
   *
   * Operation: `vaultPlus.lists.list`
   * @example
   * ```ts
   * await client.vaultPlus.lists.list()
   * ```
   */
  list(params: VaultPlusListsListParams = {}, options?: RequestOptions): Promise<VaultPlusListsListResponse> {
    return request<VaultPlusListsListResponse>(this._config, {
      method: 'GET',
      path: `/v3/vault-plus/lists`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.lists.list',
      ...options,
    });
  }

  /**
   * List Vault+ list media
   *
   * Return cached media membership for one list, including cached status and variants when present.
   *
   * Operation: `vaultPlus.lists.listMedia`
   * @example
   * ```ts
   * await client.vaultPlus.lists.listMedia({ listId: 123 })
   * ```
   */
  listMedia(params: VaultPlusListsListMediaParams, options?: RequestOptions): Promise<VaultPlusListsListMediaResponse> {
    return request<VaultPlusListsListMediaResponse>(this._config, {
      method: 'GET',
      path: `/v3/vault-plus/lists/${encodeURIComponent(String(params.listId))}/media`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.lists.listMedia',
      ...options,
    });
  }

  /**
   * Sync Vault+ list media
   *
   * Fetch the current OnlyFans vault list and authoritatively sync cached media to it. The first sync creates a baseline and removes nothing; later syncs purge only media that left the list since the previous sync and is not owned by another cached list.
   *
   * Operation: `vaultPlus.lists.sync`
   * @example
   * ```ts
   * await client.vaultPlus.lists.sync({ listId: 123 })
   * ```
   */
  sync(params: VaultPlusListsSyncParams, options?: RequestOptions): Promise<VaultPlusListsSyncResponse> {
    return request<VaultPlusListsSyncResponse>(this._config, {
      method: 'PUT',
      path: `/v3/vault-plus/lists/${encodeURIComponent(String(params.listId))}/sync`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.lists.sync',
      ...options,
    });
  }
}

export class VaultPlusMediaNamespace {
  constructor(private readonly _config: OFAuthConfig) {
  }

  /**
   * Batch read Vault+ media
   *
   * Return multiple cached media items by raw OnlyFans media id. Unknown ids are omitted.
   *
   * Operation: `vaultPlus.media.batch`
   * @example
   * ```ts
   * await client.vaultPlus.media.batch({ body: { mediaIds: ['example'] } })
   * ```
   */
  batch(params: VaultPlusMediaBatchParams, options?: RequestOptions): Promise<VaultPlusMediaBatchResponse> {
    return request<VaultPlusMediaBatchResponse>(this._config, {
      method: 'POST',
      path: `/v3/vault-plus/media/batch`,
      body: params.body,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.media.batch',
      ...options,
    });
  }

  /**
   * Delete Vault+ media
   *
   * Delete one cached media item (every retained variant) for the Connection.
   *
   * Operation: `vaultPlus.media.delete`
   * @example
   * ```ts
   * await client.vaultPlus.media.delete({ mediaId: 4492994399 })
   * ```
   */
  delete(params: VaultPlusMediaDeleteParams, options?: RequestOptions): Promise<VaultPlusMediaDeleteResponse> {
    return request<VaultPlusMediaDeleteResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/vault-plus/media/${encodeURIComponent(String(params.mediaId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.media.delete',
      ...options,
    });
  }

  /**
   * Delete Vault+ connection media
   *
   * Delete all cached media for the Connection.
   *
   * Operation: `vaultPlus.media.deleteAll`
   * @example
   * ```ts
   * await client.vaultPlus.media.deleteAll()
   * ```
   */
  deleteAll(params: VaultPlusMediaDeleteAllParams = {}, options?: RequestOptions): Promise<VaultPlusMediaDeleteAllResponse> {
    return request<VaultPlusMediaDeleteAllResponse>(this._config, {
      method: 'DELETE',
      path: `/v3/vault-plus/media`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.media.deleteAll',
      ...options,
    });
  }

  /**
   * Read Vault+ media
   *
   * Return one cached media item with every available variant. `mediaId` is the raw OnlyFans media id.
   *
   * Operation: `vaultPlus.media.get`
   * @example
   * ```ts
   * await client.vaultPlus.media.get({ mediaId: 4492994399 })
   * ```
   */
  get(params: VaultPlusMediaGetParams, options?: RequestOptions): Promise<VaultPlusMediaGetResponse> {
    return request<VaultPlusMediaGetResponse>(this._config, {
      method: 'GET',
      path: `/v3/vault-plus/media/${encodeURIComponent(String(params.mediaId))}`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.media.get',
      ...options,
    });
  }

  /**
   * Query Vault+ media
   *
   * Query cached media for the Connection. Items are grouped by raw OnlyFans media id with variants keyed by label.
   *
   * Operation: `vaultPlus.media.list`
   * @example
   * ```ts
   * await client.vaultPlus.media.list()
   * ```
   */
  list(params: VaultPlusMediaListParams = {}, options?: RequestOptions): Promise<VaultPlusMediaListResponse> {
    return request<VaultPlusMediaListResponse>(this._config, {
      method: 'GET',
      path: `/v3/vault-plus/media`,
      query: { "status": params.status, "type": params.type, "contentType": params.contentType, "durationMin": params.durationMin, "durationMax": params.durationMax, "createdAtFrom": params.createdAtFrom, "createdAtTo": params.createdAtTo, "cachedAtFrom": params.cachedAtFrom, "cachedAtTo": params.cachedAtTo, "limit": params.limit, "cursor": params.cursor, "sort": params.sort },
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.media.list',
      ...options,
    });
  }

  /**
   * Query Vault+ media: every item, fetching pages as needed.
   */
  iterate(params: Omit<VaultPlusMediaListParams, 'cursor'> = {}, options?: PaginationOptions & RequestOptions): AsyncGenerator<VaultPlusMediaListItem, void, unknown> {
    return paginate<VaultPlusMediaListItem>(
      (cursor) => this.list({ ...params, cursor: cursor }, options),
      { items: "items", nextCursor: ["nextCursor"], hasMore: null },
      options,
    );
  }
}

export class VaultPlusNamespace {
  readonly lists: VaultPlusListsNamespace;
  readonly media: VaultPlusMediaNamespace;

  constructor(private readonly _config: OFAuthConfig) {
    this.lists = new VaultPlusListsNamespace(_config);
    this.media = new VaultPlusMediaNamespace(_config);
  }

  /**
   * Read Vault+ stats
   *
   * Return aggregate Vault+ stats for the Installation's Integration environment: every Connection granted to the Integration in this environment.
   *
   * Operation: `vaultPlus.getStats`
   * @example
   * ```ts
   * await client.vaultPlus.getStats()
   * ```
   */
  getStats(params: VaultPlusGetStatsParams = {}, options?: RequestOptions): Promise<VaultPlusGetStatsResponse> {
    return request<VaultPlusGetStatsResponse>(this._config, {
      method: 'GET',
      path: `/v3/vault-plus/stats`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.getStats',
      ...options,
    });
  }

  /**
   * Read Vault+ status
   *
   * Return cache status for the Connection.
   *
   * Operation: `vaultPlus.getStatus`
   * @example
   * ```ts
   * await client.vaultPlus.getStatus()
   * ```
   */
  getStatus(params: VaultPlusGetStatusParams = {}, options?: RequestOptions): Promise<VaultPlusGetStatusResponse> {
    return request<VaultPlusGetStatusResponse>(this._config, {
      method: 'GET',
      path: `/v3/vault-plus/status`,
      linkedAccount: true,
      linkedAccountId: params.linkedAccountId,
      operation: 'vaultPlus.getStatus',
      ...options,
    });
  }
}

/**
 * OFAuth V3 API client for one authorization.
 *
 * @example
 * ```ts
 * const client = new OFAuthClient({ accessToken: tokens, linkedAccountId: 'conn_123' })
 * const profile = await client.access.profile.get()
 * for await (const chat of client.access.chats.iterate()) console.log(chat.user.id)
 * ```
 */
export class OFAuthClient {
  readonly access: AccessNamespace;
  readonly authorization: AuthorizationNamespace;
  readonly link: LinkNamespace;
  readonly linkedAccounts: LinkedAccountsNamespace;
  readonly vaultPlus: VaultPlusNamespace;

  /** Throws in a browser unless `dangerouslyAllowBrowser` is set: access tokens belong on your server. */
  constructor(private readonly _config: OFAuthConfig) {
    rejectBrowserAccessToken(_config);
    this.access = new AccessNamespace(_config);
    this.authorization = new AuthorizationNamespace(_config);
    this.link = new LinkNamespace(_config);
    this.linkedAccounts = new LinkedAccountsNamespace(_config);
    this.vaultPlus = new VaultPlusNamespace(_config);
    this.realtime = Object.assign(
      (options: RealtimeOptions = {}): RealtimeConnection => {
        const linkedAccountId = options.linkedAccountId ?? _config.linkedAccountId;
        if (!linkedAccountId) throw new OFAuthError('realtime() needs a linkedAccountId');
        const { onRequest, onResponse, debug, fetch, headers } = _config;
        const url = realtimeUrlFor(_config.baseUrl ?? DEFAULT_API_URL);
        return new ClientRealtimeConnection({ onRequest, onResponse, debug, ...options, fetch, headers, url, accessToken: _config.accessToken, linkedAccountId });
      },
      {
        createStreamUrl: (params: CreateRealtimeStreamUrlParams = {}, options: RequestOptions = {}): Promise<RealtimeStreamUrl> => {
          const linkedAccountId = params.linkedAccountId ?? _config.linkedAccountId;
          if (!linkedAccountId) return Promise.reject(new OFAuthError('realtime.createStreamUrl() needs a linkedAccountId'));
          return request<RealtimeStreamUrl>(_config, { ...options, method: 'POST', path: '/v3/realtime', body: { linkedAccountId }, operation: 'realtime.createStreamUrl' });
        },
      },
    );
  }

  /**
   * A client for another linked account of the same authorization.
   */
  withLinkedAccount(linkedAccountId: string): OFAuthClient {
    return new OFAuthClient({ ...this._config, linkedAccountId });
  }

  /**
   * Upload a file (start, PUT parts, finalize). Returns the upload id to use in
   * `mediaItems`, or the existing media when the file is already in the vault.
   *
   * @scope vault:write
   */
  uploadMedia(data: Uint8Array | ArrayBuffer | Blob, options: UploadMediaOptions): Promise<UploadMediaResult> {
    return uploadMedia(this._config, data, options);
  }

  /**
   * Realtime for one linked account over Server-Sent Events.
   *
   * - `client.realtime(options?)`: a server stream with this client's access token, extra headers,
   *   `fetch`, `onRequest`/`onResponse` hooks, and `debug` setting. Call `connect()` on the result.
   * - `client.realtime.createStreamUrl({ linkedAccountId? })`: a stream URL for a browser (`POST /v3/realtime`),
   *   opened there with `connectRealtimeStream` from `@ofauth/onlyfans-sdk/realtime-browser`.
   *
   * Always streams `/v3/realtime/events` on the client's `baseUrl` origin: Realtime is served on the same
   * origin as every other API route, so the token only goes where API requests go. `client.realtime()`
   * throws when `baseUrl` is not an http(s) URL.
   */
  readonly realtime: RealtimeClient;
}

/**
 * Create a client. Same as `new OFAuthClient(config)`.
 */
export function createOFAuthClient(config: OFAuthConfig): OFAuthClient {
  return new OFAuthClient(config);
}
