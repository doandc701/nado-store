import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
import moment from "moment/moment";
import { generateStorageKey } from "@/utils/format";
import { APP_TOKEN_NAME, VITE_APP_API_URL } from "@/config/constants";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL_LOCAL,
  headers: {
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get(generateStorageKey(APP_TOKEN_NAME));

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);

export default API;
