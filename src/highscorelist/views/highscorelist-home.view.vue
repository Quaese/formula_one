<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>{{ $t("seasons.availableSeasons") }}</h2>
      </div>
    </div>
    <ol
      class="row d-flex d-flex-row justify-content-between qp-card-list"
      v-if="seasons !== null"
    >
      <li class="mb-4" v-for="seasonId in order" :key="seasonId">
        <highscorlist-card
          v-bind:id="seasonId"
          v-bind:headerImage="`url(${getImage(seasons[seasonId].image)})`"
          v-bind:title="seasons[seasonId].title"
          v-bind:model="model"
          v-bind:modify="modifyState.season === seasonId"
          v-bind:created="formatDateTime(seasons[seasonId].created)"
          v-bind:modified="formatDateTime(seasons[seasonId].modified)"
          v-bind:amount="seasons[seasonId].races.length"
          v-bind:translations="translations"
          v-bind:actions="actions"
          @edit="hEdit"
          @cancel="hEdit"
          @delete="hRemove"
          @navigate="hNavigate"
          @save="hSave"
        >
          <!-- <p slot="description">Hier kommt eine fette Beschreibung</p> -->
        </highscorlist-card>
      </li>

      <!-- add season -->
      <li class="mb-4">
        <highscorlist-card-add
          v-bind:title="$t('seasons.addSeason')"
          @add="hAdd"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import HighscorelistCard from "../components/highscorelist-card.component";
import HighscorelistCardAdd from "../components/highscorelist-cardadd.component";
import TimeService from "../services/time.service";

export default {
  name: "highscorelist-home-view",

  components: {
    "highscorlist-card": HighscorelistCard,
    "highscorlist-card-add": HighscorelistCardAdd
  },

  data() {
    return {
      model: {
        title: ""
      },
      // translation keys for card component
      translations: {
        amount: "seasons.races"
      },
      // actions for card component
      actions: {
        cancel: true,
        delete: true,
        edit: true,
        navigate: true,
        save: true
      }
    };
  },

  computed: {
    seasons() {
      return this.$store.state.highscorelist.seasons
        ? this.$store.state.highscorelist.seasons.byId
        : null;
    },
    order() {
      return this.$store.state.highscorelist.seasons.order;
    },
    modifyState() {
      return this.$store.getters["highscorelist/getModifyState"]();
    }
  },

  created() {
    // // get seasons
    // if (this.$store.state.highscorelist.seasons === null) {
    //   this.$store.dispatch("highscorelist/fetchState");
    // }
  },

  methods: {
    hNavigate(evt, id) {
      this.navigate(id);
    },
    navigate(id) {
      this.$router.push(`/highscorelist/season/${id}`);
    },

    formatDateTime(timestamp) {
      return TimeService.formatDateTime(timestamp);
    },

    getImage(filename) {
      // from: https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
      return require("@/assets/images/cardheader/" + filename);
    },

    randomImage(border) {
      let rnd = Math.ceil(Math.random() * border);
      rnd = rnd < 10 ? `0${rnd}` : `${rnd}`;

      return "formula_one_" + rnd + ".jpg";
    },

    resetModel() {
      Object.keys(this.model).forEach(key => (this.model[key] = null));
    },

    hEdit(evt, id) {
      this.setModify(id);
    },
    setModify(seasonId) {
      // reset model
      this.resetModel();

      this.$store.dispatch("highscorelist/setModifyState", {
        id: seasonId,
        object: "season"
      });
    },

    hSave(evt, id) {
      this.saveModify(id);
    },
    saveModify(seasonId) {
      this.$store.dispatch("highscorelist/updateSeason", {
        id: seasonId,
        title: this.model.title,
        object: "season"
      });

      // reset model
      this.resetModel();
    },

    hAdd() {
      this.addSeason();
    },
    addSeason() {
      this.$store.dispatch("highscorelist/addSeason", {
        image: this.randomImage(10),
        object: "season"
      });
    },

    hRemove(evt, id) {
      this.remove(id);
    },
    async remove(seasonId) {
      try {
        // get season object
        const season = await this.$store.getters["highscorelist/getSeasonById"](
          seasonId
        );

        // show dialog
        await this.$dialog.confirm(
          {
            title: this.$t("dialog.confirmDeleteHeader"),
            body: this.$t("dialog.confirmDeleteSeasonText", {
              title: season.title
            })
          },
          {
            cancelText: this.$t("dialog.cancelText"),
            okText: this.$t("dialog.deleteText")
          }
        );

        // saison löschen
        this.$store.dispatch("highscorelist/removeSeason", {
          id: seasonId,
          object: "season"
        });
      } catch (error) {
        console.log("nicht löschen ...");
      }
    }
  }
};
</script>

<style></style>
