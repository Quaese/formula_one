import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";

import { config } from "./config/config";
import { configureFakeBackend } from "./highscorelist/_tools/fake-backend.tool";

// register input initializer globally
import "./directives/init-input.directive";
import "bootstrap/dist/css/bootstrap.css";

if (config.fakeBackend) {
  console.log("fakeBackend");
  // setup fake backend
  configureFakeBackend();
}

// font-awesome 5.x
// Docs see: https://www.npmjs.com/package/@fortawesome/vue-fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTimes,
  faTimesCircle,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle as faCheckCircleRegular,
  faTimesCircle as faTimesCircleRegular,
  faTrashAlt as faTrashAltRegular
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faEdit,
  faTimes,
  faTimesCircle,
  faTrashAlt,
  faCheckCircleRegular,
  faTimesCircleRegular,
  faTrashAltRegular
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
