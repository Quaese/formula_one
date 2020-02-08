<template>
  <div>
    DriverProfile {{ $route.params }}
    <highscorelist-card
      v-bind:id="driver.id"
      v-bind:title="driver.name"
      v-bind:model="model"
      v-bind:modify="driver.id === this.$route.params.id"
      v-bind:created="formatDateTime(driver.created || new Date().getTime())"
      v-bind:modified="formatDateTime(driver.modified || new Date().getTime())"
      v-bind:translations="translations"
      v-bind:actions="actions"
      @edit="hEdit"
      @cancel="hEdit"
      @delete="hRemove"
      @navigate="hNavigate"
      @save="hSave"
      v-if="driver !== null"
    >
      <!-- <p slot="description">Hier kommt eine fette Beschreibung</p> -->
    </highscorelist-card>
  </div>
</template>

<script>
import HighscorelistCard from "../../highscorelist/components/highscorelist-card.component";
import TimeService from "../../highscorelist/services/time.service";

export default {
  name: "drivers-profile",

  components: {
    "highscorelist-card": HighscorelistCard
  },

  data () {
    return {
      model: {
        name: ""
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
    driver () {
      return this.$store.getters["highscorelist/getDriverById"](
        this.$route.params.id
      );
    }
  },

  methods: {
    hNavigate (evt, id) {
      console.log("drivers-profile.component (method: hNavigate)");
      this.navigate(id);
    },
    navigate (id) {
      console.log("drivers-profile.component (method: navigate)");
      // this.$router.push(`/highscorelist/season/${id}`);
    },

    formatDateTime (timestamp) {
      return TimeService.formatDateTime(timestamp);
    },

    // getImage(filename) {
    //   // from: https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
    //   return require("@/assets/images/cardheader/" + filename);
    // },

    // randomImage(border) {
    //   let rnd = Math.ceil(Math.random() * border);
    //   rnd = rnd < 10 ? `0${rnd}` : `${rnd}`;

    //   return "formula_one_" + rnd + ".jpg";
    // },

    resetModel () {
      Object.keys(this.model).forEach(key => (this.model[key] = null));
    },

    hEdit (evt, id) {
      this.setModify(id);
    },
    setModify (driverId) {
      // reset model
      this.resetModel();

      this.$store.dispatch("highscorelist/setModifyState", {
        id: driverId,
        object: "driver"
      });
    },

    hSave (evt, id) {
      this.saveModify(id);
    },
    saveModify (seasonId) {
      // this.$store.dispatch("highscorelist/updateSeason", {
      //   id: seasonId,
      //   title: this.model.title,
      //   object: "season"
      // });

      // reset model
      this.resetModel();
    },

    hAdd () {
      console.log("drivers-profile.component (method: hAdd)");
      this.addDriver();
    },
    addDriver () {
      console.log("drivers-profile.component (method: addDriver)");
      // this.$store.dispatch("highscorelist/addSeason", {
      //   image: this.randomImage(10),
      //   object: "season"
      // });
    },

    hRemove (evt, id) {
      console.log("drivers-profile.component (method: hRemove)");
      this.remove(id);
    },
    async remove (seasonId) {
      console.log("drivers-profile.component (method: remove)");

      // try {
      //   // get season object
      //   const season = await this.$store.getters["highscorelist/getSeasonById"](
      //     seasonId
      //   );

      //   // show dialog
      //   await this.$dialog.confirm(
      //     {
      //       title: this.$t("dialog.confirmDeleteHeader"),
      //       body: this.$t("dialog.confirmDeleteSeasonText", {
      //         title: season.title
      //       })
      //     },
      //     {
      //       cancelText: this.$t("dialog.cancelText"),
      //       okText: this.$t("dialog.deleteText")
      //     }
      //   );

      //   // saison löschen
      //   this.$store.dispatch("highscorelist/removeSeason", {
      //     id: seasonId,
      //     object: "season"
      //   });
      // } catch (error) {
      //   console.log("nicht löschen ...");
      // }
    }
  }
};
</script>

<style lang="less" scoped></style>
