import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.css";
import "./plugins/axios";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
