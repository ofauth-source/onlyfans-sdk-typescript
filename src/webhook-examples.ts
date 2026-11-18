/* eslint-disable */
/**
 * One example envelope per webhook event type, from the OpenAPI spec (`components.schemas.*Envelope.example`).
 * Used by `createTestEvent` in `@ofauth/onlyfans-sdk/testing`. Generated; do not edit.
 */

import type { WebhookEventOf, WebhookEventType } from './webhooks';

export const WEBHOOK_EVENT_EXAMPLES: { readonly [T in WebhookEventType]: WebhookEventOf<T> } = {
  "authorization.granted": {
    "authorizationId": "authz_example123",
    "data": {
      "authorization_id": "authz_example123",
      "linked_account_ids": [
        "conn_example123"
      ],
      "reason": "authorized"
    },
    "environment": "live",
    "eventId": "evt_lifecycle_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": null,
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "authorization.granted"
  },
  "authorization.revoked": {
    "authorizationId": "authz_example123",
    "data": {
      "authorization_id": "authz_example123",
      "linked_account_ids": [
        "conn_example123"
      ],
      "reason": "owner_revoked"
    },
    "environment": "live",
    "eventId": "evt_lifecycle_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": null,
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "authorization.revoked"
  },
  "authorization.updated": {
    "authorizationId": "authz_example123",
    "data": {
      "added_linked_account_ids": [
        "conn_example123"
      ],
      "authorization_id": "authz_example123",
      "reason": "auto_added",
      "removed_linked_account_ids": [],
      "scopes_changed": false
    },
    "environment": "live",
    "eventId": "evt_lifecycle_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": null,
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "authorization.updated"
  },
  "linked_account.disconnected": {
    "authorizationId": "authz_example123",
    "data": {
      "authorization_id": "authz_example123",
      "linked_account_id": "conn_example123",
      "reason": "owner_disconnected"
    },
    "environment": "live",
    "eventId": "evt_lifecycle_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "linked_account.disconnected"
  },
  "linked_account.expired": {
    "authorizationId": "authz_example123",
    "data": {
      "authorization_id": "authz_example123",
      "linked_account_id": "conn_example123",
      "reason": "provider_session_expired"
    },
    "environment": "live",
    "eventId": "evt_lifecycle_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "linked_account.expired"
  },
  "linked_account.reconnected": {
    "authorizationId": "authz_example123",
    "data": {
      "authorization_id": "authz_example123",
      "linked_account_id": "conn_example123",
      "reason": "reconnected"
    },
    "environment": "live",
    "eventId": "evt_lifecycle_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "linked_account.reconnected"
  },
  "realtime.chat_message.liked": {
    "authorizationId": "authz_example123",
    "data": {
      "id": 123,
      "isLiked": true
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.chat_message.liked"
  },
  "realtime.chat_message.received": {
    "authorizationId": "authz_example123",
    "data": {
      "id": 123,
      "withUserId": 456
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.chat_message.received"
  },
  "realtime.chat_message.unliked": {
    "authorizationId": "authz_example123",
    "data": {
      "id": 123,
      "isLiked": false
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.chat_message.unliked"
  },
  "realtime.chat_typing.updated": {
    "authorizationId": "authz_example123",
    "data": {
      "id": 123
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.chat_typing.updated"
  },
  "realtime.inbox_counts.updated": {
    "authorizationId": "authz_example123",
    "data": {
      "chatMessagesCount": 1,
      "countPriorityChat": 2,
      "unreadTips": 3
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.inbox_counts.updated"
  },
  "realtime.post_fundraising.updated": {
    "authorizationId": "authz_example123",
    "data": {
      "id": 123
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.post_fundraising.updated"
  },
  "realtime.post.published": {
    "authorizationId": "authz_example123",
    "data": {
      "authorId": 456,
      "id": 123
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.post.published"
  },
  "realtime.stories.updated": {
    "authorizationId": "authz_example123",
    "data": {
      "id": 123,
      "userId": 456
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.stories.updated"
  },
  "realtime.system_message.received": {
    "authorizationId": "authz_example123",
    "data": {
      "hasSystemNotifications": true,
      "id": 2,
      "type": "message"
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.system_message.received"
  },
  "realtime.system_messages.updated": {
    "authorizationId": "authz_example123",
    "data": {
      "hasSystemNotifications": true,
      "notificationsCount": 1
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.system_messages.updated"
  },
  "realtime.toasts.received": {
    "authorizationId": "authz_example123",
    "data": {
      "items": [
        {
          "id": 3,
          "type": "message"
        }
      ]
    },
    "environment": "live",
    "eventId": "evt_realtime_example123",
    "externalOauthClientId": "external_oauth_client_example123",
    "integrationId": "int_example123",
    "linkedAccountId": "conn_example123",
    "occurredAt": "2026-04-23T14:30:15.143Z",
    "order": 1,
    "schemaVersion": "1",
    "test": false,
    "type": "realtime.toasts.received"
  },
};
