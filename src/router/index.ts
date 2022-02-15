import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ItemExchange, Login } from "@/views";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/itemexchange",
    name: "ItemExchange",
    component: ItemExchange,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "LoginLayout" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
