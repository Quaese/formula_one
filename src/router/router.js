import Vue from "vue";
import Router from "vue-router";
import Home from "../home/views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/highscorelist",
      name: "highscorelist",
      // route level code-splitting
      // this generates a separate chunk (highscorelist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "highscorelist" */ "../highscorelist/views/highscorelist.view.vue"
        )
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../about/views/About.vue")
    }
  ]
});
