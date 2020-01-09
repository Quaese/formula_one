const HighscoreRoutes = [
  {
    path: "/highscorelist",
    name: "highscorelist-home",
    // route level code-splitting
    // this generates a separate chunk (highscorelist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "highscorelist" */ "../views/highscorelist-home.view.vue")
  },
  {
    path: "/highscorelist/season/:seasonId/race/:id",
    name: "highscorelist-race",
    // route level code-splitting
    // this generates a separate chunk (highscorelist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "highscorelist" */ "../views/highscorelist-race.view.vue")
  },
  {
    path: "/highscorelist/season/:id",
    name: "highscorelist-season",
    // route level code-splitting
    // this generates a separate chunk (highscorelist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "highscorelist" */ "../views/highscorelist-season.view.vue")
  }
];

export default HighscoreRoutes;
