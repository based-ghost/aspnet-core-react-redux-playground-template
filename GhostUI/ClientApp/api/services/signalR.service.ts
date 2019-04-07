import { toast } from 'react-toastify';
import * as SignalR from '@aspnet/signalr';
import { signalRConfig } from '../../config/constants';
import { renderToastifyMsg } from '../../utils/notificationUtils';

/**
 * SignalR API abstraction layer communication - configures/manages hub connections (typescript singleton pattern)
 */
class SignalRService {
    private _isConnected: boolean = false;
    private _hubConnection!: SignalR.HubConnection;
    private static _signalRService: SignalRService;

    private constructor() {
        this.createConnection();
        this.registerOnServerEvents();
    }

    public static get Instance(): SignalRService {
        return this._signalRService || (this._signalRService = new this());
    }

    public startConnection(): void {
        // HubConnection.state does not exist in versions of  <= 1.0.0
        // Had to downgrade since there is an existing bug around server-side rendering and some typeings
        // Also need to define absolute path for hub url and not just /hubs/users in lower packages
        // Uncomment after bug is resolved and package @aspnet/signalr is upgraded to latest / remove _isConnected code
        //if (this._hubConnection.state === SignalR.HubConnectionState.Connected)
        //    return;

        if (this._isConnected)
            return;

        setTimeout(() => {
            this._hubConnection.start()
                .then(() => {
                    this._isConnected = true;
                })
                .catch((error) => {
                    console.error(error.toString());
                });
        }, signalRConfig.CONNECTION_DELAY);
    }

    private createConnection(): void {
        this._hubConnection = new SignalR.HubConnectionBuilder()
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
                    this._isConnected = false;
                    toast.info(renderToastifyMsg(`All hub connections closed (SignalR) - ${reason}`, signalRConfig.TOASTIFY_ICON));
                }, signalRConfig.HUB_MESSAGE_DELAY);
            });
        });
    }
}

export const SignalRApi = SignalRService.Instance;