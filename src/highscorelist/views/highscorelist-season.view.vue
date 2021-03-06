<template>
  <div class="container-fluid" v-if="season">
    <div class="row">
      <div class="col-12">
        <h2 class="qp-breadcrumb-header">
          <action-icon
            @click="back()"
            :wrapper="{
              title: $t('common.back')
            }"
            :actions="{
              class: 'qp-action-icon-primary',
              icon: ['fas', 'arrow-left']
            }"
          />
          {{ $t("seasons.season") }} - {{ season.title }}
        </h2>
      </div>
    </div>

    <ol class="row d-flex d-flex-row justify-content-between qp-card-list">
      <!-- add race -->
      <li class="mb-4 qp-card-list-add-item">
        <highscorlist-card-add
          v-bind:title="$t('seasons.addRace')"
          v-bind:height="true"
          @add="hAdd"
        />
      </li>

      <li class="mb-4" v-for="raceId in season.sortedRaces" :key="raceId">
        <highscorlist-card
          v-bind:id="raceId"
          v-bind:title="races[raceId].title"
          v-bind:model="model"
          v-bind:modify="modifyState.race === raceId"
          v-bind:created="formatDateTime(races[raceId].created)"
          v-bind:modified="formatDateTime(races[raceId].modified)"
          v-bind:location="races[raceId].location"
          v-bind:amount="races[raceId].results.length"
          v-bind:highscore="
            getResultById(races[raceId].results[0])
              ? drivers[getResultById(races[raceId].results[0]).driverId].name
              : $t('seasons.highscoreNameDefault')
          "
          v-bind:translations="translations"
          v-bind:actions="actions"
          @edit="hEdit"
          @cancel="hEdit"
          @delete="hRemove"
          @navigate="hNavigate"
          @save="hSave"
        />
      </li>
    </ol>
  </div>
</template>

<script>
// import ActionIconLayered from "./actionicon-layered.component" is globally registered in main.js

import HighscorelistCard from "../components/highscorelist-card.component";
import HighscorelistCardAdd from "../components/highscorelist-cardadd.component";
import ArrayService from "../../services/array.service";

export default {
  name: "highscorelist-season-view",

  components: {
    "highscorlist-card": HighscorelistCard,
    "highscorlist-card-add": HighscorelistCardAdd
  },

  data() {
    return {
      model: {
        title: "",
        location: ""
      },
      seasonId: this.$route.params.id,
      // translation keys for card component
      translations: {
        highscoreLabel: "seasons.highscoreTime",
        location: "seasons.location",
        amount: "seasons.results"
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
    season() {
      // get season by id from store
      let season = this.$store.getters["highscorelist/getSeasonById"](
        this.seasonId
      );

      // if season and all existing races are available
      if (season && this.races) {
        // sort races corresponding to the season by creation date
        // and add an array containing the IDs in descending order
        season.sortedRaces = this.sortRacesByProperty(
          [...season.races],
          {
            ...this.races
          },
          "created",
          true
        );
      }

      return season;
    },

    races() {
      return this.$store.state.highscorelist.races;
    },

    modifyState() {
      return this.$store.getters["highscorelist/getModifyState"]();
    },

    drivers() {
      return this.$store.getters["highscorelist/getDrivers"]();
    }
  },

  created() {
    if (this.$store.state.highscorelist.seasons === null) {
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },

  methods: {
    hNavigate(evt, id) {
      this.navigate(id);
    },
    navigate(id) {
      // navigate to requested race
      this.$router.push(`/highscorelist/season/${this.seasonId}/race/${id}`);
    },

    back() {
      this.$router.push(`/highscorelist/`);
    },

    formatDateTime(timestamp) {
      const date = new Date(timestamp);

      return `${date.getDate()}.${date.getMonth() +
        1}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },

    getResultById: function(id) {
      return this.$store.getters["highscorelist/getResultById"](id);
    },

    sortRacesByProperty: function(raceIDs, races, property, desc = false) {
      let sortedRaces = [];

      raceIDs.forEach(id => {
        sortedRaces = [...sortedRaces, races[id]];
      });

      return sortedRaces
        .sort(ArrayService.sortObjectByProperty(property, desc))
        .map(race => race.id);
    },

    resetModel() {
      Object.keys(this.model).forEach(key => (this.model[key] = null));
    },

    hEdit(evt, id) {
      this.setModify(id);
    },
    setModify(raceId) {
      // reset model
      this.resetModel();

      this.$store.dispatch("highscorelist/setModifyState", {
        id: raceId,
        object: "race"
      });
    },

    hSave(evt, id) {
      this.saveModify(id);
    },
    saveModify(raceId) {
      this.$store.dispatch("highscorelist/updateRace", {
        id: raceId,
        title: this.model.title,
        location: this.model.location,
        object: "race"
      });

      // reset model
      this.resetModel();
    },

    hAdd() {
      this.addRace();
    },
    addRace() {
      this.$store.dispatch("highscorelist/addRace", {
        seasonId: this.seasonId,
        object: "race"
      });
    },

    hRemove(evt, id) {
      this.remove(id);
    },
    async remove(raceId) {
      try {
        // get season object
        const race = await this.$store.getters["highscorelist/getRaceById"](
          raceId
        );

        // show dialog
        await this.$dialog.confirm(
          {
            title: this.$t("dialog.confirmDeleteHeader"),
            body: this.$t("dialog.confirmDeleteRaceText", {
              title: race.title
            })
          },
          {
            cancelText: this.$t("dialog.cancelText"),
            okText: this.$t("dialog.deleteText")
          }
        );

        // delete race
        this.$store.dispatch("highscorelist/removeRace", {
          id: raceId,
          object: "race"
        });
      } catch (error) {
        console.log("nicht löschen ...");
      }
    }
  }
};
</script>

<style></style>
