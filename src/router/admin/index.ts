const Layout = () => import("@/layout/LayoutAdmin.vue");
import Login from "../../views/admin/auth/index.vue";
import ProductsView from "../../views/products/index.vue";
const adminRouter = [
  // login
  {
    path: "/",
    name: "Admin",
    component: Layout,
    children: [
      // home
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        props: true,
        component: ProductsView,
        meta: {
          title: "Dashboard Admin",
          showLink: false,
          rank: 102,
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "Login",
    component: Login,
    props: true,
  },
  {
    path: "/redirect",
    component: Layout,
    props: true,
    meta: {
      title: "Admin",
      showLink: false,
      rank: 104,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue"),
      },
    ],
  },
];

export default adminRouter;
