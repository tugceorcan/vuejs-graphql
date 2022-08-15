import axios from "axios";
import Vue from "vue";
import store from "@/store";
import router from "@/router";

const _axios = axios.create({
  baseURL: "https://simplisaleshw.cotunnel.com",
  timeout: 2000,
});

_axios.interceptors.request.use(
  (config) => {
    if (store.state.token && store.state.token != "") {
      config.headers["Authorization"] = `Bearer ${store.state.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
var plug = {};
plug.install = (Vue, options) => {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(plug);

export default plug;
