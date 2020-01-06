<template>
  <div>
    <ul v-if="drivers">
      <li v-for="key in Object.keys(drivers)" :key="key">
        {{ drivers[key].name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "divers-list",

  data() {
    return {};
  },

  computed: {
    drivers() {
      // get season by id from store
      let drivers = this.$store.getters["highscorelist/getDrivers"]();

      // // if season and all existing races are available
      // if (season && this.races) {
      //   // sort races corresponding to the season by creation date
      //   // and add an array containing the IDs in descending order
      //   season.sortedRaces = this.sortRacesByProperty(
      //     [...season.races],
      //     {
      //       ...this.races
      //     },
      //     "created",
      //     true
      //   );
      // }

      return drivers;
    }
  }
};
</script>

<style lang="scss" scoped></style>
