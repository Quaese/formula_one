<template>
  <div v-if="results !== null && drivers !== null">
    <table class="table table-hover qp-table-results">
      <thead>
        <th v-for="(header, index) in fields" :key="index">
          <span>
            <font-awesome-icon
              v-if="header.icon"
              class="qp-action-icon-gap"
              :icon="[header.icon.type, header.icon.name]"
              transform="shrink-8"
            />
            {{ header.dict ? $t(header.dict) : header.value }}
          </span>
        </th>
      </thead>
      <tbody>
        <highscorelist-item
          v-for="(resultId, idxLine) in race.results"
          v-bind:raceId="race.id"
          v-bind:fields="fields"
          v-bind:item="results[resultId]"
          v-bind:drivers="drivers"
          v-bind:availableDrivers="{
            ...availableDrivers,
            [results[resultId]['driverId']]:
              drivers[results[resultId]['driverId']]
          }"
          v-bind:availableDriversOptions="[
            ...availableDriversOptions,
            drivers[results[resultId]['driverId']]
          ]"
          v-bind:last="race.results.length - 1 === idxLine"
          v-bind:idxLine="idxLine"
          :key="idxLine"
        ></highscorelist-item>

        <highscorelist-item-add
          v-bind:raceId="race.id"
          v-bind:fields="fields"
        ></highscorelist-item-add>
      </tbody>
    </table>
  </div>
</template>

<script>
import TimeService from "../services/time.service";

import HighscorelistItem from "./highscorelist-item.component";
import HighscorelistItemAdd from "./highscorelist-itemadd.component";

export default {
  name: "highscorelist-table",

  components: {
    "highscorelist-item": HighscorelistItem,
    "highscorelist-item-add": HighscorelistItemAdd
  },

  data() {
    return {};
  },

  props: {
    race: {
      type: Object,
      default() {
        return {};
      }
    },
    fields: {
      type: Array,
      default() {
        return [
          { name: "place", value: "Platz" },
          { name: "name", value: "Name" },
          { name: "time", value: "Zeit" },
          { name: "diff_first", value: "+" },
          { name: "diff_prev", value: "+" },
          { name: "actions", value: "Aktionen" }
        ];
      }
    }
  },

  computed: {
    results() {
      return this.$store.state.highscorelist.results;
    },

    filteredResults() {
      return this.$store.getters["highscorelist/getAllRaceResults"](this.race);
    },

    drivers() {
      return this.$store.getters["highscorelist/getDrivers"]();
    },

    availableDrivers() {
      return this.$store.getters["highscorelist/getAvailableDriversForRace"](
        this.race
      );
    },

    availableDriversOptions() {
      return this.$store.getters[
        "highscorelist/getAvailableDriversForRaceAsArray"
      ](this.race);
    }
  },

  // Larissa Rosenthal
  // Ladyna Wittscher

  created() {
    if (
      this.$store.state.highscorelist.seasons === null ||
      this.$store.state.highscorelist.seasons.races === null
    ) {
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },
  // mounted() {
  //   this.availableDrivers;
  // },

  methods: {
    formatTime: function(time) {
      return TimeService.secondsToString(time);
    }
  }
};
</script>

<style></style>
