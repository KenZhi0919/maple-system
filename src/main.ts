import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n";
import { example } from "@/plugins";
import "bootstrap/dist/js/bootstrap.js";

createApp(App).use(store).use(router).use(i18n).use(example).mount("#app");
