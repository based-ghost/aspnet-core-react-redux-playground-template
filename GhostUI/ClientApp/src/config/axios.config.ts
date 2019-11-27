import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { renderToastifyMsg } from "../utils";

export const configureAxiosInterceptors = (): void => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      handleAxiosError(error);
      return Promise.reject(error);
    }
  );
};

const handleAxiosError = (error: AxiosError): void => {
  // Error Message Object
  const message = {
    body: "Internal Server Error",
    request: "",
    status: 500
  };

  //Setup Error Message
  if (typeof error !== "undefined") {
    if (error.hasOwnProperty("message")) {
      message.body = error.message;
    }
  }

  if (typeof error.response !== "undefined") {
    // Setup Generic Response Messages
    if (error.response.status === 401) {
      message.body = "UnAuthorized";
    } else if (error.response.status === 404) {
      message.body = "API Route is Missing or Undefined";
    } else if (error.response.status === 405) {
      message.body = "API Route Method Not Allowed";
    } else if (error.response.status === 422) {
      //Validation Message
    } else if (error.response.status >= 500) {
      message.body = "Internal Server Error";
    }

    // Assign error status code
    if (error.response.status > 0) {
      message.status = error.response.status;
    }

    // Try to Use the Response Message
    if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data")) {
      if (error.response.data.hasOwnProperty("message") && error.response.data.message.length > 0) {
        message.body = error.response.data.message;
      }
    }
  }

  // Log in console or use toastify notification
  toast.error(
    renderToastifyMsg(
      `XHR Error - ${message.status} (${message.body})`,
      "exclamation"
    )
  );
};
