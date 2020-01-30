<template>
  <div>
    Admin
    <ol
      class="row_ d-flex d-flex-row justify-content-stretch qp-card-list-flex qp-card-list_ qp-card-list_nav_"
    >
      <li class="mb-4" v-for="(card, index) in cards" :key="index">
        <nav-card
          :title="$tc(card.translations.title, 2)"
          :actions="card.actions"
          :color="card.color"
          :path="card.path"
          :translations="card.translations"
          :icon="card.icon || null"
          :active="new RegExp(card.path).test($route.fullPath)"
        >
          <div slot="description">{{ $t(card.translations.description) }}</div>
        </nav-card>
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
    console.log(this.$route.fullPath);

    return {
      cards: [
        {
          actions: {
            save: true,
            navigate: true
          },
          color: "blue",
          icon: {
            type: "fas",
            name: "dharmachakra"
          },
          path: path + "drivers",
          translations: {
            title: "admin.drivers.title",
            description: "admin.drivers.description",
            location: "seasons.races"
          }
        },
        {
          actions: {
            save: true,
            navigate: true
          },
          color: "red",
          icon: {
            type: "fas",
            name: "globe"
          },
          path: path + "locations",
          translations: {
            title: "admin.locations.title",
            description: "admin.locations.description",
            location: "seasons.location"
          }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped></style>
