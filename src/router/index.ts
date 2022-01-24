import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ItemExchange } from "@/views";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/itemexchange",
    name: "ItemExchange",
    component: ItemExchange,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
