import { toast } from 'react-toastify';
import { renderToastifyMsg } from '../utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

/**
 * SignalR hub defaults
 * BASE_URL needs full url or else prerendering fails (can't normalize /hubs/users)
 */
const SignalrConfig = {
  CONNECTION_DELAY: 0,
  HUB_MESSAGE_DELAY: 3000,
  BASE_URL: '/hubs/users',
  TOASTIFY_ICON: 'info-circle',
  LOGIN_USER_EVENT: 'UserLogin',
  LOGOUT_USER_EVENT: 'UserLogout',
  HUB_MESSAGE_TITLE: 'Hub Message',
  CLOSE_EVENT: 'CloseAllConnections'
};

/**
 * SignalR API abstraction layer communication - configures/manages hub connections (typescript singleton pattern)
 */
class SignalRService {
  private _hubConnection!: HubConnection;
  private static _signalRService: SignalRService;

  private constructor() {
    this.createConnection();
    this.registerOnServerEvents();
  }

  public static get Instance(): SignalRService {
    return (this._signalRService || (this._signalRService = new this()));
  }

  public startConnection(): void {
    if (this._hubConnection.state === HubConnectionState.Disconnected) {
      setTimeout(() => {
        this._hubConnection.start().catch(e => console.error(e));
      }, SignalrConfig.CONNECTION_DELAY);
    }
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(SignalrConfig.BASE_URL)
      .build();
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on(SignalrConfig.LOGIN_USER_EVENT, () => {
      setTimeout(() => {
        toast.info(
          renderToastifyMsg(
            'A user has logged in (SignalR)',
            SignalrConfig.TOASTIFY_ICON as IconProp
          )
        );
      }, SignalrConfig.HUB_MESSAGE_DELAY);
    });

    this._hubConnection.on(SignalrConfig.LOGOUT_USER_EVENT, () => {
      setTimeout(() => {
        toast.info(
          renderToastifyMsg(
            'A user has logged out (SignalR)',
            SignalrConfig.TOASTIFY_ICON as IconProp
          )
        );
      }, SignalrConfig.HUB_MESSAGE_DELAY);
    });

    this._hubConnection.on(SignalrConfig.CLOSE_EVENT, (reason: string) => {
      this._hubConnection.stop().then(() => {
        setTimeout(() => {
          toast.info(
            renderToastifyMsg(
              `All hub connections closed (SignalR) - ${reason}`,
              SignalrConfig.TOASTIFY_ICON as IconProp
            )
          );
        }, SignalrConfig.HUB_MESSAGE_DELAY);
      });
    });
  }
}

export const SignalRApi = SignalRService.Instance;
