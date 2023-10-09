import Cookies from "js-cookie";
import { generateStorageKey } from "./format";

export const checkRouterWithToken = (
  token: string | undefined,
  to: any,
  userInfo: string | null
) => {
  if (!token) {
    const publicPaths = ["/admin"];
    if (publicPaths.includes(to.path)) {
      return true;
    }
    return { path: "/admin" };
  } else {
    if (!userInfo) {
      Cookies.remove(generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME));
      if (to.path === "/admin") {
        return true;
      }
      return { path: "/admin" };
    }
  }
};
