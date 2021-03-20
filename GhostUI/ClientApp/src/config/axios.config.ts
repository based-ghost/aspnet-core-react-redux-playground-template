import axios from 'axios';
import { toast } from 'react-toastify';
import { renderToastifyContent } from '../utils';
import type { AxiosError, AxiosResponse } from 'axios';

const handleAxiosError = (error: AxiosError): void => {
  // Error Message Object
  const message = {
    body: 'Internal Server Error',
    request: '',
    status: 500
  };

  // Setup Error Message
  if (
    typeof error !== 'undefined' &&
    Object.prototype.hasOwnProperty.call(error, 'message')
  ) {
    message.body = error.message;
  }

  if (typeof error.response !== 'undefined') {
    // Setup Generic Response Messages
    switch (error.response.status) {
      case 401:
        message.body = 'UnAuthorized';
        break;
      case 404:
        message.body = 'API Route is Missing or Undefined';
        break;
      case 405:
        message.body = 'API Route Method Not Allowed';
        break;
      case 422:
        break;
      case 500:
      default:
        message.body = 'Internal Server Error';
        break;
    }

    // Assign error status code
    if (error.response.status > 0) {
      message.status = error.response.status;
    }

    // Try to Use the Response Message
    if (
      Object.prototype.hasOwnProperty.call(error, 'response') &&
      Object.prototype.hasOwnProperty.call(error.response, 'data') &&
      Object.prototype.hasOwnProperty.call(error.response.data, 'message') &&
      !!error.response.data.message.length
    ) {
      message.body = error.response.data.message;
    }
  }

  // Log in console or use toastify notification
  toast.error(
    renderToastifyContent(
      `XHR Error - ${message.status} (${message.body})`,
      'exclamation'
    )
  );
};

export class AxiosGlobalConfig {
  public static setup(): void {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        handleAxiosError(error);
        return Promise.reject(error);
      }
    );
  }
}
