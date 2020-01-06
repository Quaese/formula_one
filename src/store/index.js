import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app.module";
import highscorelist from "../highscorelist/store/modules/highscorelist.module";
import admin from "../admin/store/modules/admin.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    highscorelist,
    admin
  }
});
