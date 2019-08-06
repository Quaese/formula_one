import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";

/* *** import own less files *** */
import "./assets/style/index.less";

/* *** load config *** */
import { config } from "./config/config";

/* *** load configure fake-backend *** */
import { configureFakeBackend } from "./highscorelist/_tools/fake-backend.tool";
if (config.fakeBackend) {
  console.log("fakeBackend");
  // setup fake backend
  configureFakeBackend();
}

/* *** register input initializer globally *** */
import "./directives/init-input.directive";

/* *** bootstrap *** */
import "bootstrap/dist/css/bootstrap.css";

/* *** font-awesome 5.x *** */
// Docs see: https://www.npmjs.com/package/@fortawesome/vue-fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faEdit,
  faPencilAlt,
  faTimes,
  faTimesCircle,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle as faCheckCircleRegular,
  faCircle as faCircleRegular,
  faTimesCircle as faTimesCircleRegular,
  faTrashAlt as faTrashAltRegular
} from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";
// add icons/fonts
library.add(
  faCheck,
  faEdit,
  faPencilAlt,
  faTimes,
  faTimesCircle,
  faTrashAlt,
  faCheckCircleRegular,
  faCircleRegular,
  faTimesCircleRegular,
  faTrashAltRegular
);
// register font-awesome-component globally
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
