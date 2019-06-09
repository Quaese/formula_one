import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";

// register input initializer globally
import "./directives/init-input.directive";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
