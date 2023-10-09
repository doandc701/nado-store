import { createRouter, createWebHistory } from "vue-router";
import clientRouter from "./clients/index";
import adminRouter from "./admin/index";
import { generateStorageKey } from "@/utils/format";
import Cookies from "js-cookie";
import { checkRouterWithToken } from "@/utils/isRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...clientRouter, ...adminRouter],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  if (!to.path.includes("/admin")) return;
  const token: string | undefined = Cookies.get(
    generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME)
  );
  const user = localStorage.getItem("user");
  return checkRouterWithToken(token, to, user);
});
router.afterEach((to, from, failure) => {
  if (to.path.includes("/admin")) {
    const token: string | undefined = Cookies.get(
      generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME)
    );
    const user = localStorage.getItem("user");
    return checkRouterWithToken(token, to, user);
  }
  if (failure) {
    console.log(failure);
  }
});

export default router;
