<template>
  <div class="container-fluid" v-if="season">
    <!-- <div class="row mb-4">
      <div class="col-12">
        <font-awesome-layers
          @click="back()"
          title="back"
          class="fa-lg qp-action-icon qp-action-icon-layer"
        >
          <font-awesome-icon :icon="['far', 'circle']" />
          <font-awesome-icon class="qp-action-icon-primary" icon="arrow-left" transform="shrink-8" />
        </font-awesome-layers>
      </div>
    </div>-->

    <div class="row">
      <div class="col-12">
        <h2 class="qp-breadcrumb-header">
          <font-awesome-layers
            @click="back()"
            title="back"
            class="fa-lg qp-action-icon qp-action-icon-layer"
          >
            <font-awesome-icon :icon="['far', 'circle']" />
            <font-awesome-icon
              class="qp-action-icon-primary"
              icon="arrow-left"
              transform="shrink-8"
            />
          </font-awesome-layers>
          Season - {{season.title}}
        </h2>
      </div>
    </div>
    <!-- <ol class="row">
      <li
        class="col-12"
        v-for="raceId in season.races"
        :key="raceId"
        @click="navigate(raceId)"
      >{{races[raceId].title}}</li>
    </ol>-->

    <ol class="row d-flex d-flex-row justify-content-between qp-card-list">
      <li class="mb-4" v-for="raceId in season.races" :key="raceId">
        <div class="card qp-card">
          <div class="card-body">
            <h5 class="card-title mb-2">{{races[raceId].title}}</h5>
            <p class="card-subtitle mb-3 card-text">
              <small class="text-muted">Created: {{formatDateTime(races[raceId].date)}}</small>
            </p>
            <div class="row mb-1">
              <div class="col-4 col-md-6">Location:</div>
              <div class="col-8 col-md-6">{{races[raceId].location}}</div>
            </div>
            <div class="row mb-1">
              <div class="col-4 col-md-6">Results:</div>
              <div class="col-8 col-md-6">{{races[raceId].results.length}}</div>
            </div>

            <div class="qp-card-footer d-flex justify-content-between">
              <div class="qp-card-footer-actions">
                <font-awesome-layers
                  @click="remove(raceId)"
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

                <font-awesome-layers
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
                </font-awesome-layers>
              </div>

              <div class="qp-card-footer-navigate">
                <font-awesome-layers
                  @click="navigate(raceId)"
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

      <!-- add race -->
      <li class="mb-4">
        <div class="card qp-card">
          <div class="card-body">
            <h5 class="card-title mb-2">Add race</h5>
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
export default {
  name: "highscorelist-season-view",

  data() {
    return {
      seasonId: this.$route.params.id
    };
  },

  computed: {
    season() {
      return this.$store.getters["highscorelist/getSeasonById"](this.seasonId);
    },

    races() {
      return this.$store.state.highscorelist.races;
    }
  },

  created() {
    if (this.$store.state.highscorelist.seasons === null) {
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },

  methods: {
    back() {
      this.$router.push(`/highscorelist/`);
    },

    formatDateTime(timestamp) {
      const date = new Date(timestamp);

      return `${date.getDate()}.${date.getMonth() +
        1}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },

    navigate(id) {
      // // set id's of current objects (season, race)
      // this.$store.dispatch("highscorelist/setCurrent", {
      //   seasonId: this.seasonId,
      //   raceId: id
      // });

      // navigate to requested race
      this.$router.push(`/highscorelist/season/${this.seasonId}/race/${id}`);
    },

    remove(raceId) {
      console.log("highscorelist-season.view.vue (remove): ", raceId);
    }
  }
};
</script>

<style>
</style>
