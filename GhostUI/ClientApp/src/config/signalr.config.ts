import type { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * SignalR hub defaults
 * "baseUrl" needs full url or else prerendering fails (can't normalize /hubs/users)
 */
export type SignalRConfig = {
  baseUrl: string;
  toastIcon: IconProp;
  messageDelay: number;
  events: Record<'login' | 'logout' | 'closeConnections', string>;
};

export const SIGNALR_CONFIG: SignalRConfig = {
  messageDelay: 3000,
  baseUrl: '/hubs/users',
  toastIcon: 'info-circle',
  events: {
    login: 'UserLogin',
    logout: 'UserLogout',
    closeConnections: 'CloseAllConnections',
  },
};