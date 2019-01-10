import axios, { AxiosInstance } from 'axios';
import { handleError } from '../../utils/handle-error';

/**
 * Service API base class - configures default settings/error handling for inheriting class
 */
export abstract class BaseService {
    protected readonly $http: AxiosInstance;

    protected constructor(controllerName: string, useInterceptors: boolean = true) {
        this.$http = axios.create({
            timeout: 50000,
            baseURL: `api/${controllerName}/`
        });

        if (useInterceptors) {
            this.addResponseInterceptors();
        }
    }

    private addResponseInterceptors(): void {
        this.$http.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                handleError(error);
                return Promise.reject(error);
            }
        );
    }
}