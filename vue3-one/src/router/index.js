import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/home.vue"),
    },
    {
      path: "/user",
      name: "User",
      component: () => import("../views/user.vue"),
    },
  ],
});
