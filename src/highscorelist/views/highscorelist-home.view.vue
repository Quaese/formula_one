<template>
  <div>
    <h2>Highscorelist Home</h2>
    <ol>
      <li v-for="(id, index) in highscorelist_ids" :key="index">
        <span @click="navigate(id)">{{id}}</span>
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
    highscorelist_ids() {
      return this.$store.state.highscorelist.ids;
    }
  },

  created() {
    // get fields
    if (this.$store.state.highscorelist.ids === null) {
      this.$store.dispatch("highscorelist/getListIDs");
    }
  },

  methods: {
    navigate(id) {
      this.$router.push(`/highscorelist/${id}`);
    }
  }
};
</script>

<style>
</style>
