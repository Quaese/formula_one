<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Season List</h2>
      </div>
    </div>
    <ol class="row d-flex d-flex-row justify-content-between qp-card-list" v-if="seasons!==null">
      <li v-for="(seasonId) in order" :key="seasonId">
        <div class="card qp-card">
          <img class="card-img-top qp-card-img" :src="randomNumber(10)" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title mb-2">{{seasons[seasonId].title}}</h5>
            <p class="card-subtitle mb-3 card-text">
              <small class="text-muted">Created: {{formatDateTime(seasons[seasonId].date)}}</small>
            </p>
            <div class="row mb-3">
              <div class="col-4">Races:</div>
              <div class="col-8">{{seasons[seasonId].races.length}}</div>
            </div>

            <div class="row">
              <div class="col-12 text-right">
                <a @click="navigate(seasonId)" class="btn btn-primary">more</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
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
      const date = new Date(timestamp);

      return `${date.getDate()}.${date.getMonth() +
        1}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },

    randomNumber(border) {
      let rnd = Math.ceil(Math.random() * border);
      rnd = rnd < 10 ? `0${rnd}` : `${rnd}`;

      // from: https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
      return require("@/assets/images/cardheader/formula_one_" + rnd + ".jpg");
    }
  }
};
</script>

<style>
</style>
