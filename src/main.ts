import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import vue3GoogleLogin from "vue3-google-login";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "animate.css";

const app = createApp(App);
// setup save cookies
app.use(VueCookies, {
  expires: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    "1065027875316-iovkcvsh7geirh5r91qef9a2imdvo1f3.apps.googleusercontent.com",
});

app.mount("#app");
