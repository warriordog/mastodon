// @ts-check

import WebSocketClient from '@gamestdio/websocket';
import { AppDispatch, RootState } from './store/configureStore';

let sharedConnection: WebSocketClient | undefined;

interface StreamEvent {
  event: string;
  payload: unknown;
}

interface ConnectionHandler {
  onConnect: () => void;
  onReceive: (event: StreamEvent) => void;
  onDisconnect: () => void;
}

interface Subscription extends ConnectionHandler {
  channelName: string;
  params: Record<string, string>;
}

const subscriptions: Subscription[] = [];

const subscriptionCounters: Record<string, number> = {};

const addSubscription = (subscription: Subscription) => {
  subscriptions.push(subscription);
};

const removeSubscription = (subscription: Subscription) => {
  const index = subscriptions.indexOf(subscription);

  if (index !== -1) {
    subscriptions.splice(index, 1);
  }
};

const subscribe = ({ channelName, params, onConnect }: Subscription) => {
  const key = channelNameWithInlineParams(channelName, params);

  subscriptionCounters[key] = subscriptionCounters[key] || 0;

  if (subscriptionCounters[key] === 0) {
    sharedConnection.send(JSON.stringify({ type: 'subscribe', stream: channelName, ...params }));
  }

  subscriptionCounters[key] += 1;
  onConnect();
};

const unsubscribe = ({ channelName, params, onDisconnect }: Subscription) => {
  const key = channelNameWithInlineParams(channelName, params);

  subscriptionCounters[key] = subscriptionCounters[key] || 1;

  if (subscriptionCounters[key] === 1 && sharedConnection.readyState === WebSocketClient.OPEN) {
    sharedConnection.send(JSON.stringify({ type: 'unsubscribe', stream: channelName, ...params }));
  }

  subscriptionCounters[key] -= 1;
  onDisconnect();
};

interface ConnectionCallbacks {
  connected(): void;
  received(data): void;
  disconnected(): void;
  reconnected(): void;
}

const sharedCallbacks : ConnectionCallbacks = {
  connected () {
    subscriptions.forEach(subscription => subscribe(subscription));
  },

  received (data) {
    const { stream } = data;

    subscriptions.filter(({ channelName, params }) => {
      const streamChannelName = stream[0];

      if (stream.length === 1) {
        return channelName === streamChannelName;
      }

      const streamIdentifier = stream[1];

      if (['hashtag', 'hashtag:local'].includes(channelName)) {
        return channelName === streamChannelName && params.tag === streamIdentifier;
      } else if (channelName === 'list') {
        return channelName === streamChannelName && params.list === streamIdentifier;
      }

      return false;
    }).forEach(subscription => {
      subscription.onReceive(data);
    });
  },

  disconnected () {
    subscriptions.forEach(subscription => unsubscribe(subscription));
  },

  reconnected () {
    // no-op
  },
};

const channelNameWithInlineParams = (channelName: string, params: Record<string, string>): string => {
  if (Object.keys(params).length === 0) {
    return channelName;
  }

  return `${channelName}&${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
};

export const connectStream = (channelName: string, params: Record<string, string>, callbacks: (dispatch: AppDispatch, getState: () => RootState) => ConnectionHandler) => (dispatch: AppDispatch, getState: () => RootState): (() => void) => {
  const streamingAPIBaseURL = getState().meta.streaming_api_base_url;
  const accessToken = getState().meta.access_token;
  const { onConnect, onReceive, onDisconnect } = callbacks(dispatch, getState);

  // If we cannot use a websockets connection, we must fall back
  // to using individual connections for each channel
  if (!streamingAPIBaseURL.startsWith('ws')) {
    const connection = createConnection(streamingAPIBaseURL, accessToken, channelNameWithInlineParams(channelName, params), {
      connected () {
        onConnect();
      },

      received (data) {
        onReceive(data);
      },

      disconnected () {
        onDisconnect();
      },

      reconnected () {
        onConnect();
      },
    }).connection;

    return () => {
      connection.close();
    };
  }

  const subscription = {
    channelName,
    params,
    onConnect,
    onReceive,
    onDisconnect,
  };

  addSubscription(subscription);

  // If a connection is open, we can execute the subscription right now. Otherwise,
  // because we have already registered it, it will be executed on connect

  if (!sharedConnection) {
    const conn = createConnection(streamingAPIBaseURL, accessToken, '', sharedCallbacks);
    if (!isWebSocketConnection(conn)) {
      throw new Error('Bug Detected: Wrong connection type - expected WebSocketClient but it is not.');
    }
    sharedConnection = conn.connection;
  } else if (sharedConnection.readyState === WebSocketClient.OPEN) {
    subscribe(subscription);
  }

  return () => {
    removeSubscription(subscription);
    unsubscribe(subscription);
  };
};

const KNOWN_EVENT_TYPES = [
  'update',
  'delete',
  'notification',
  'conversation',
  'filters_changed',
  'encrypted_message',
  'announcement',
  'announcement.delete',
  'announcement.reaction',
];

const handleEventSourceMessage = (e: MessageEvent, received: (e: StreamEvent) => void) => {
  received({
    event: e.type,
    payload: e.data,
  });
};

interface WebSocketConnection {
  readonly type: 'ws';
  readonly connection: WebSocketClient;
}

interface EventSourceConnection {
  readonly type: 'es';
  readonly connection: EventSource;
}

function isWebSocketConnection(conn: WebSocketConnection | EventSourceConnection) : conn is WebSocketConnection {
  return conn.type === 'ws';
}

const createConnection = (streamingAPIBaseURL: string, accessToken: string, channelName: string, { connected, received, disconnected, reconnected }: ConnectionCallbacks): WebSocketConnection | EventSourceConnection => {
  const params = channelName.split('&');

  channelName = params.shift();

  if (streamingAPIBaseURL.startsWith('ws')) {
    const ws = new WebSocketClient(`${streamingAPIBaseURL}/api/v1/streaming/?${params.join('&')}`, accessToken);

    ws.onopen      = connected;
    ws.onmessage   = e => received(JSON.parse(e.data));
    ws.onclose     = disconnected;
    ws.onreconnect = reconnected;

    return {
      type: 'ws',
      connection: ws,
    };
  }

  channelName = channelName.replace(/:/g, '/');

  if (channelName.endsWith(':media')) {
    channelName = channelName.replace('/media', '');
    params.push('only_media=true');
  }

  params.push(`access_token=${accessToken}`);

  const es = new EventSource(`${streamingAPIBaseURL}/api/v1/streaming/${channelName}?${params.join('&')}`);

  es.onopen = () => {
    connected();
  };

  KNOWN_EVENT_TYPES.forEach(type => {
    es.addEventListener(type, e => handleEventSourceMessage(e, received));
  });

  es.onerror = disconnected;

  return {
    type: 'es',
    connection: es,
  };
};
