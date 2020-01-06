import Vue from "vue";
import Router from "vue-router";
import Home from "../home/views/Home.vue";

import DriversList from "../admin/components/drivers-list.component";

const AdminHome = {
  template: `<div>Home</div>`
};
// const AdminDrivers = {
//   template: `<div>Drivers</div>`
// };
const AdminLocations = {
  template: `<div>Locations</div>`
};

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
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (highscorelist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "admin" */ "../admin/views/admin.view.vue"),
      children: [
        {
          path: "",
          component: AdminHome
        },
        {
          path: "drivers",
          component: DriversList
        },
        {
          path: "locations",
          component: AdminLocations
        }
      ]
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
