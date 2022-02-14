import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n";

createApp(App).use(store).use(router).use(i18n).mount("#app");
import "bootstrap/dist/js/bootstrap.js";
