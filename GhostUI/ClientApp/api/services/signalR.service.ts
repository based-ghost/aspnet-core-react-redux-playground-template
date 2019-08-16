import { toast } from 'react-toastify';
import { signalRConfig } from '../../config/constants';
import { renderToastifyMsg } from '../../utils/notificationUtils';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';

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
        return this._signalRService || (this._signalRService = new this());
    }

    public startConnection(): void {
        if (this._hubConnection.state === HubConnectionState.Connected)
            return;

        setTimeout(() => {
            this._hubConnection.start().catch((error) => {
                console.error(error.toString());
            });
        }, signalRConfig.CONNECTION_DELAY);
    }

    private createConnection(): void {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(signalRConfig.BASE_URL)
            .build();
    }

    private registerOnServerEvents(): void {
        this._hubConnection.on(signalRConfig.LOGIN_USER_EVENT, () => {
            setTimeout(() => {
                toast.info(renderToastifyMsg('A user has logged in (SignalR)', signalRConfig.TOASTIFY_ICON));
            }, signalRConfig.HUB_MESSAGE_DELAY);
        });

        this._hubConnection.on(signalRConfig.LOGOUT_USER_EVENT, () => {
            setTimeout(() => {
                toast.info(renderToastifyMsg('A user has logged out (SignalR)', signalRConfig.TOASTIFY_ICON));
            }, signalRConfig.HUB_MESSAGE_DELAY);
        });

        this._hubConnection.on(signalRConfig.CLOSE_EVENT, (reason: string) => {
            this._hubConnection.stop().then(() => {
                setTimeout(() => {
                    toast.info(renderToastifyMsg(`All hub connections closed (SignalR) - ${reason}`, signalRConfig.TOASTIFY_ICON));
                }, signalRConfig.HUB_MESSAGE_DELAY);
            });
        });
    }
}

export const SignalRApi = SignalRService.Instance;