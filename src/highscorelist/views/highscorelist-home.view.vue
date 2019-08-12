<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Available Seasons</h2>
      </div>
    </div>
    <ol class="row d-flex d-flex-row justify-content-between qp-card-list" v-if="seasons!==null">
      <li class="mb-4" v-for="(seasonId) in order" :key="seasonId">
        <div class="card qp-card">
          <div
            class="card-img-top qp-card-img-bg"
            :style="{'background-image': `url(${randomNumber(10)})`}"
          ></div>
          <div class="card-body">
            <h5 class="card-title mb-2">{{seasons[seasonId].title}}</h5>
            <p class="card-subtitle mb-3 card-text">
              <small class="text-muted">Created: {{formatDateTime(seasons[seasonId].date)}}</small>
            </p>
            <div class="row mb-1">
              <div class="col-6">Races:</div>
              <div class="col-6">{{seasons[seasonId].races.length}}</div>
            </div>

            <div class="qp-card-footer d-flex justify-content-between">
              <div class="qp-card-footer-actions">
                <font-awesome-layers
                  @click="remove(seasonId)"
                  title="remove"
                  class="fa-lg qp-action-icon qp-action-icon-layer"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                  <font-awesome-icon
                    class="qp-action-icon-remove"
                    :icon="['far', 'trash-alt']"
                    transform="shrink-8"
                  />
                </font-awesome-layers>

                <!-- <font-awesome-layers
                  @click="setEdit(true)"
                  title="edit"
                  class="fa-lg qp-action-icon qp-action-icon-layer"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                  <font-awesome-icon
                    class="qp-action-icon-edit"
                    icon="pencil-alt"
                    transform="shrink-8"
                  />
                </font-awesome-layers>-->
              </div>

              <div class="qp-card-footer-navigate">
                <font-awesome-layers
                  @click="navigate(seasonId)"
                  title="more"
                  class="fa-lg qp-action-icon qp-action-icon-layer"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                  <font-awesome-icon
                    class="qp-action-icon-primary"
                    icon="arrow-right"
                    transform="shrink-8"
                  />
                </font-awesome-layers>
              </div>
            </div>
          </div>
        </div>
      </li>

      <!-- add season -->
      <li class="mb-4">
        <div class="card qp-card">
          <div class="card-body">
            <h5 class="card-title mb-2">Add season</h5>
            <div class="row mb-1">
              <div class="col-12 d-flex justify-content-center align-items-center">
                <font-awesome-layers
                  @click="addSeason(true);"
                  title="add"
                  class="fa-lg qp-action-icon qp-action-icon-layer qp-card-icon-large"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                  <font-awesome-icon
                    class="qp-action-icon-primary"
                    :icon="['fas', 'plus']"
                    transform="shrink-8"
                  />
                </font-awesome-layers>
              </div>
            </div>

            <div class="qp-card-footer ep-flex d-flex justify-content-between">
              <div class="qp-card-footer-actions"></div>
              <div class="qp-card-footer-navigate"></div>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import TimeService from "../services/time.service";

export default {
  name: "highscorelist-home-view",

  data() {
    return {};
  },

  computed: {
    seasons() {
      return this.$store.state.highscorelist.seasons
        ? this.$store.state.highscorelist.seasons.byId
        : null;
    },
    order() {
      return this.$store.state.highscorelist.seasons.order;
    }
  },

  created() {
    // get seasons
    if (this.$store.state.highscorelist.seasons === null) {
      this.$store.dispatch("highscorelist/fetchState");
    }
  },

  methods: {
    navigate(id) {
      this.$router.push(`/highscorelist/season/${id}`);
    },

    formatDateTime(timestamp) {
      return TimeService.formatDateTime(timestamp);
    },

    randomNumber(border) {
      let rnd = Math.ceil(Math.random() * border);
      rnd = rnd < 10 ? `0${rnd}` : `${rnd}`;

      // from: https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
      return require("@/assets/images/cardheader/formula_one_" + rnd + ".jpg");
    },

    remove(seasonId) {
      console.log("highscorelist-home.view.vue (remove): ", seasonId);
    }
  }
};
</script>

<style>
</style>
