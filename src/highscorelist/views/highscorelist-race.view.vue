<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2 class="qp-breadcrumb-header">
          <action-icon
            @click="back()"
            :wrapper="{
              title: $t('common.more')
            }"
            :actions="{
              class: 'qp-action-icon-primary',
              icon: ['fas', 'arrow-left']
            }"
          />
          {{
            `${$tc("seasons.results", race !== null && race.results.length) +
              (race !== null ? " - " + race.title : "")}`
          }}
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <highscorelist-table
          v-bind:race="race"
          v-bind:fields="fields"
          v-bind:seasonId="seasonId"
        ></highscorelist-table>
      </div>
    </div>
  </div>
</template>

<script>
// import ActionIconLayered from "./actionicon-layered.component" is globally registered in main.js

import HighscorelistTable from "../components/highscorelist-table.component.vue";

export default {
  name: "highscorelist-view",

  components: {
    "highscorelist-table": HighscorelistTable
  },

  data() {
    return {
      seasonId: this.$route.params.seasonId,
      raceId: this.$route.params.id
    };
  },

  computed: {
    fields() {
      return this.$store.state.highscorelist.fields;
    },
    race() {
      return this.$store.state.highscorelist.races
        ? this.$store.state.highscorelist.races[this.raceId]
        : null;
    },
    results() {
      return this.$store.state.highscorelist.results;
    }
  },

  created() {
    if (
      this.$store.state.highscorelist.seasons !== null &&
      this.$store.state.highscorelist.seasons.races !== null
    ) {
      // get fields
      if (this.$store.state.highscorelist.fields === null) {
        this.$store.dispatch("highscorelist/getFields");
      }
    } else {
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },

  methods: {
    back() {
      this.$router.push(`/highscorelist/season/${this.seasonId}`);
    }
  }
};
</script>

<style></style>
