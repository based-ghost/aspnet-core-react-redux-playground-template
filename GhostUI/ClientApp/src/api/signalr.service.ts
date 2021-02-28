import { toast } from 'react-toastify';
import { SIGNALR_CONFIG } from '../config';
import { renderToastifyMsg } from '../utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

/**
 * SignalR API abstraction layer communication.
 * Configures/manages hub connections (typescript singleton pattern).
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
      this._hubConnection
        .start()
        .catch((e) => console.error(e));
    }
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(SIGNALR_CONFIG.baseUrl)
      .build();
  }

  private hubToastMessage(
    message: string,
    icon: IconProp = SIGNALR_CONFIG.toastIcon,
    delay: number = SIGNALR_CONFIG.messageDelay
  ): void {
    setTimeout(() => {
      const toastContent = renderToastifyMsg(message, icon);
      toast.info(toastContent);
    }, delay);
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on(SIGNALR_CONFIG.events.login, () => {
      this.hubToastMessage('A user has logged in (SignalR)');
    });

    this._hubConnection.on(SIGNALR_CONFIG.events.logout, () => {
      this.hubToastMessage('A user has logged out (SignalR)');
    });

    this._hubConnection.on(SIGNALR_CONFIG.events.closeConnections, (reason: string) => {
      this._hubConnection
        .stop()
        .then(() => {
          this.hubToastMessage(`All hub connections closed (SignalR) - ${reason}`);
        });
    });
  }
}

export const SignalRApi = SignalRService.Instance;
