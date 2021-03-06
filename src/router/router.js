import Vue from "vue";
import Router from "vue-router";
import Home from "../home/views/Home.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/highscorelist",
      name: "highscorelist-home",
      // route level code-splitting
      // this generates a separate chunk (highscorelist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "highscorelist" */ "../highscorelist/views/highscorelist-home.view.vue")
    },
    {
      path: "/highscorelist/season/:seasonId/race/:id",
      name: "highscorelist-race",
      // route level code-splitting
      // this generates a separate chunk (highscorelist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "highscorelist" */ "../highscorelist/views/highscorelist-race.view.vue")
    },
    {
      path: "/highscorelist/season/:id",
      name: "highscorelist-season",
      // route level code-splitting
      // this generates a separate chunk (highscorelist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "highscorelist" */ "../highscorelist/views/highscorelist-season.view.vue")
    }
    // {
    //   path: "/highscorelist/:id",
    //   name: "highscorelist",
    //   // route level code-splitting
    //   // this generates a separate chunk (highscorelist.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "highscorelist" */ "../highscorelist/views/highscorelist.view.vue"
    //     )
    // },
  ]
});
