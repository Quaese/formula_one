import Vue from "vue";
import Router from "vue-router";
import Home from "../home/views/Home.vue";

// routes for different sections
import HighscoreRoutes from "../highscorelist/router/routes";
import AdminRoutes from "../admin/router/routes";

// routes array for router instantiation
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
].concat([...HighscoreRoutes, ...AdminRoutes]);

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes
});
