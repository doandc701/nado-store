import type { AxiosResponse } from "axios";
import API from "./abstract";

const AUTH_SIGN_UP = (
  params: any,
  successCallback: any,
  errorCallback: any
) => {
  const url = "/auth/register";
  const data = params.payload.data;
  return API.post(url, data).then(successCallback).catch(errorCallback);
};

const AUTH_LOGIN = (params: any, successCallback: any, errorCallback: any) => {
  const url =
    params.payload.type === "admin" ? "/auth/login" : "/auth/buyer/login";
  const data = params.payload.data;
  return API.post(url, data).then(successCallback).catch(errorCallback);
};

const FORGOT_PASSWORD = (
  params: any,
  successCallback: any,
  errorCallback: any
) => {
  let url = `/auth/forgot-password`;
  let data = params.payload.data;
  return API.post(url, data).then(successCallback).catch(errorCallback);
};

const RESET_PASSWORD = (
  params: any,
  successCallback: any,
  errorCallback: any
) => {
  let url = `/auth/reset-password`;
  let data = params.payload.data;
  return API.post(url, data).then(successCallback).catch(errorCallback);
};

const CHANGE_PASSWORD = (
  params: any,
  successCallback: any,
  errorCallback: any
) => {
  let url = `/auth/reset`;
  let data = params.payload.data;
  return API.post(url, data).then(successCallback).catch(errorCallback);
};

const CHANGE_PASSWORD_FIRST_LOGIN = (
  params: any,
  successCallback: any,
  errorCallback: any
) => {
  let url = `/auth/change-password`;
  let data = params.payload.data;
  return API.post(url, data).then(successCallback).catch(errorCallback);
};

export {
  AUTH_SIGN_UP,
  AUTH_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FIRST_LOGIN,
};
