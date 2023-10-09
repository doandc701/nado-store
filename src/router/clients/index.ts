const ClientLayout = () => import("@/layout/LayoutClient.vue");

import HomeView from "../../views/home/index.vue";
import ProductsView from "../../views/products/index.vue";
import ProductDetailView from "../../views/details/index.vue";
import LiveView from "../../views/LiveView.vue";
import ThemeLogin from "../../views/accounts/index.vue";
import ThemeCheckout from "../../views/checkout/index.vue";

const clientRouter = [
  {
    path: "/",
    component: ClientLayout,
    children: [
      {
        path: "/",
        name: "",
        component: HomeView,
        props: true,
      },
      {
        path: "/products",
        name: "Sản phẩm",
        component: ProductsView,
      },
      {
        path: "/shoes",
        name: "Giày",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../../views/shoes/index.vue"),
        children: [
          {
            path: "/shoes/nike",
            name: "Nike",
            component: () => import("../../views/shoes/nike.vue"),
            // only authenticated users can create posts
            meta: { requiresAuth: true },
          },
          {
            path: "/shoes/adidas",
            name: "Adidas",
            component: () => import("../../views/shoes/adidas.vue"),
            // anybody can read a post
            meta: { requiresAuth: false },
          },
        ],
      },
      {
        path: "/shop/:name",
        name: "Shop Details",
        component: ProductDetailView,
        props: true,
      },
      {
        path: "/blog",
        name: "24h Thời Trang",
        component: LiveView,
      },
      {
        path: "/contacts",
        name: "Liên Hệ",
        component: LiveView,
      },
      {
        path: "/buyer/login",
        name: "Đăng nhập",
        component: ThemeLogin,
        props: true,
      },
      {
        path: "/checkout/cart",
        name: "Thanh toán giỏ hàng",
        component: ThemeCheckout,
        props: true,
      },
      {
        path: "/checkout/:name",
        name: "Thanh toán ngay",
        component: ThemeCheckout,
        props: true,
      },
    ],
  },
];

export default clientRouter;
