import { toast } from "react-toastify";
import { renderToastifyMsg } from "../utils";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@aspnet/signalr";

/**
 * SignalR hub defaults
 * BASE_URL needs full url or else prerendering fails (can't normalize /hubs/users)
 */
const _signalrConfig = {
  CONNECTION_DELAY: 0,
  TOASTIFY_ICON: "info",
  HUB_MESSAGE_DELAY: 3000,
  LOGIN_USER_EVENT: "UserLogin",
  LOGOUT_USER_EVENT: "UserLogout",
  HUB_MESSAGE_TITLE: "Hub Message",
  CLOSE_EVENT: "CloseAllConnections",
  BASE_URL: "http://localhost:56717/hubs/users"
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
    return (
      this._signalRService || (this._signalRService = new this())
    );
  }

  public startConnection(): void {
    if (this._hubConnection.state === HubConnectionState.Connected) return;

    setTimeout(() => {
      this._hubConnection.start().catch(error => {
        console.error(String(error));
      });
    }, _signalrConfig.CONNECTION_DELAY);
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(_signalrConfig.BASE_URL)
      .build();
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on(_signalrConfig.LOGIN_USER_EVENT, () => {
      setTimeout(() => {
        toast.info(
          renderToastifyMsg(
            "A user has logged in (SignalR)",
            _signalrConfig.TOASTIFY_ICON
          )
        );
      }, _signalrConfig.HUB_MESSAGE_DELAY);
    });

    this._hubConnection.on(_signalrConfig.LOGOUT_USER_EVENT, () => {
      setTimeout(() => {
        toast.info(
          renderToastifyMsg(
            "A user has logged out (SignalR)",
            _signalrConfig.TOASTIFY_ICON
          )
        );
      }, _signalrConfig.HUB_MESSAGE_DELAY);
    });

    this._hubConnection.on(_signalrConfig.CLOSE_EVENT, (reason: string) => {
      this._hubConnection.stop().then(() => {
        setTimeout(() => {
          toast.info(
            renderToastifyMsg(
              `All hub connections closed (SignalR) - ${reason}`,
              _signalrConfig.TOASTIFY_ICON
            )
          );
        }, _signalrConfig.HUB_MESSAGE_DELAY);
      });
    });
  }
}

export const SignalRApi = SignalRService.Instance;
