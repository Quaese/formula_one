<template>
  <div>
    Admin
    <ol class="row d-flex d-flex-row justify-content-between qp-card-list">
      <li class="mb-4" v-for="(card, index) in cards" :key="index">
        <nav-card
          :title="$tc('admin.drivers', 1)"
          :actions="card.actions"
          :path="card.path"
          :translations="card.translations"
        />
      </li>
    </ol>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavCard from "../../components/nav-card.component";

export default {
  name: "admin",

  components: {
    "nav-card": NavCard
  },

  data() {
    const path = "/admin/";

    return {
      cards: [
        {
          actions: {
            save: true,
            navigate: true
          },
          path: path + "drivers",
          translations: {
            location: "seasons.races"
          }
        },
        {
          actions: {
            save: true,
            navigate: true
          },
          path: path + "locations",
          translations: {
            location: "seasons.races"
          }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped></style>
