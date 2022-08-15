import Vue from "vue";
import Router from "vue-router";
import store from "./store";

// ---------------- Routes ------------------

import Login from "./views/auth/login";
import Logout from "./views/auth/logout";
import Error from "./views/errors/404";
import Order from "./views/pages/order";
import Product from "./views/pages/product";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.VUE_APP_BASEURL,
  routes: [
    {
      path: "/login",
      name: "app-login",
      component: Login,
    },
    {
      path: "/logout",
      name: "app-logout",
      component: Logout,
    },
    {
      path: "/order-list",
      name: "order-list",
      component: Order,
    },
    {
      path: "/product-list",
      name: "product-list",
      component: Product,
    },
    {
      path: "/product-list",
      name: "product-list",
      component: Product,
    },
    { path: "*", component: Error }
  ],
});

export default router;
