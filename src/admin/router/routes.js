import DriversList from "../components/drivers-list.component.vue";

const AdminHome = {
  template: `<div>Home</div>`
};
const DriverProfile = {
  template: `<div>DriverProfile</div>`
};
const AdminLocations = {
  template: `<div>Locations</div>`
};

const AdminRoutes = [
  {
    path: "/admin",
    name: "admin",
    // route level code-splitting
    // this generates a separate chunk (highscorelist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin.view.vue"),
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
        path: "drivers/:id",
        component: DriverProfile
      },
      {
        path: "locations",
        component: AdminLocations
      }
    ]
  }
];

export default AdminRoutes;
