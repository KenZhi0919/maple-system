import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n";
import { example } from "@/plugins";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap/dist/js/bootstrap.js";
import Notifications from "@kyvg/vue3-notification";

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(example)
  .use(VueLoading, {
    color: "#EB7547",
    loader: "bars",
    height: 100,
    width: 100,
  })
  .use(Notifications)
  .mount("#app");
