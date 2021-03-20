import { toast } from 'react-toastify';
import { SIGNALR_CONFIG } from '../config';
import { renderToastifyContent } from '../utils';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * SignalR API abstraction layer communication.
 * Configures/manages hub connections (typescript singleton pattern).
 */
class SignalRService {
  private static _signalRService: SignalRService;
  private _hubConnection: HubConnection | undefined;

  private constructor() {
    this.createConnection();
    this.registerOnServerEvents();
  }

  public static get Instance(): SignalRService {
    return this._signalRService || (this._signalRService = new this());
  }

  get connectionState(): HubConnectionState {
    return this._hubConnection?.state ?? HubConnectionState.Disconnected;
  }

  public async startConnection(): Promise<void> {
    try {
      await this._hubConnection?.start();
      console.assert(this.connectionState === HubConnectionState.Connected);
    } catch (e) {
      console.assert(this.connectionState === HubConnectionState.Disconnected);
      console.error(e);
      setTimeout(() => this.startConnection(), 5000);
    }
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(SIGNALR_CONFIG.baseUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }

  private hubToastMessage(
    message: string,
    icon: IconProp = SIGNALR_CONFIG.toastIcon,
    delay: number = SIGNALR_CONFIG.messageDelay
  ): void {
    setTimeout(() => {
      const toastContent = renderToastifyContent(message, icon);
      toast.info(toastContent);
    }, delay);
  }

  private registerOnServerEvents(): void {
    this._hubConnection?.on(SIGNALR_CONFIG.events.login, () => {
      this.hubToastMessage('A user has logged in (SignalR)');
    });

    this._hubConnection?.on(SIGNALR_CONFIG.events.logout, () => {
      this.hubToastMessage('A user has logged out (SignalR)');
    });

    this._hubConnection?.on(SIGNALR_CONFIG.events.closeConnections, async (reason: string) => {
      try {
        await this._hubConnection?.stop();
        this.hubToastMessage(`All hub connections closed (SignalR) - ${reason}`);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export const SignalRApi = SignalRService.Instance;
