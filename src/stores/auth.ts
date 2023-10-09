import {
  AUTH_SIGN_UP,
  AUTH_LOGIN,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FIRST_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "@/api/auth";

import { defineStore } from "pinia";
const user: any = localStorage.getItem("userInfo");

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      userInfo: JSON.parse(user),
    };
  },
  getters: {},
  actions: {
    register(payload: any) {
      return AUTH_SIGN_UP(
        { payload },
        payload.successCallback,
        payload.errorCallback
      );
    },

    login(payload: any) {
      return AUTH_LOGIN(
        { payload },
        payload.successCallback,
        payload.errorCallback
      );
    },
    forgotPassword(payload: any) {
      return FORGOT_PASSWORD(
        { payload },
        payload.successCallback,
        payload.errorCallback
      );
    },
    resetPassword(payload: any) {
      return RESET_PASSWORD(
        { payload },
        payload.successCallback,
        payload.errorCallback
      );
    },
    changePassword(payload: any) {
      return CHANGE_PASSWORD(
        { payload },
        payload.successCallback,
        payload.errorCallback
      );
    },
    changePasswordFirst(payload: any) {
      return CHANGE_PASSWORD_FIRST_LOGIN(
        { payload },
        payload.successCallback,
        payload.errorCallback
      );
    },
  },
});
