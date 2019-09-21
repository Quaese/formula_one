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
      <li
        class="mb-4"
        v-for="seasonId in order"
        :key="seasonId"
      >
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
          @save="hSave"
        />
        <div class="card qp-card">
          <div
            class="card-img-top qp-card-img-bg"
            :style="{
              'background-image': `url(${getImage(seasons[seasonId].image)})`
            }"
          ></div>
          <div class="card-body">
            <h5 class="card-title mb-2">
              <span v-if="modifyState.season !== seasonId">{{
                seasons[seasonId].title
              }}</span>
              <!-- <input
                v-else
                type="text"
                class="form-control"
                v-model="model.title"
                v-init-input:model="{
                  field: 'title',
                  value: seasons[seasonId].title
                }"
                v-bind:placeholder="seasons[seasonId].title"
              /> -->
            </h5>
            <p
              class="card-subtitle mb-3 card-text"
              style="line-height: 1.1;"
            >
              <small class="text-muted">{{ $t("app.created") }}:
                {{ formatDateTime(seasons[seasonId].created) }}</small>
              <br />
              <small class="text-muted">{{ $t("app.modified") }}:
                {{ formatDateTime(seasons[seasonId].modified) }}</small>
            </p>
            <div class="row mb-1">
              <div class="col-4 col-md-6">{{ $t("seasons.races") }}:</div>
              <div class="col-8 col-md-6">
                {{ seasons[seasonId].races.length }}
              </div>
            </div>

            <div class="qp-card-footer d-flex justify-content-between">
              <div class="qp-card-footer-actions">
                <span v-if="modifyState.season !== seasonId">
                  <font-awesome-layers
                    @click="removeSeason(seasonId)"
                    :title="$t('common.delete')"
                    class="fa-lg qp-action-icon qp-action-icon-layer"
                  >
                    <font-awesome-icon :icon="['far', 'circle']" />
                    <font-awesome-icon
                      class="qp-action-icon-remove"
                      :icon="['far', 'trash-alt']"
                      transform="shrink-8"
                    />
                  </font-awesome-layers>

                  <font-awesome-layers
                    @click="setModify(seasonId)"
                    :title="$t('common.edit')"
                    class="fa-lg qp-action-icon qp-action-icon-layer"
                  >
                    <font-awesome-icon :icon="['far', 'circle']" />
                    <font-awesome-icon
                      class="qp-action-icon-edit"
                      icon="pencil-alt"
                      transform="shrink-8"
                    />
                  </font-awesome-layers>
                </span>
                <span v-if="modifyState.season === seasonId">
                  <font-awesome-layers
                    @click="setModify(null)"
                    :title="$t('common.cancel')"
                    class="fa-lg qp-action-icon qp-action-icon-layer"
                  >
                    <font-awesome-icon :icon="['far', 'circle']" />
                    <font-awesome-icon
                      class="qp-action-icon-cancel"
                      :icon="['fas', 'times']"
                      transform="shrink-8"
                    />
                  </font-awesome-layers>

                  <font-awesome-layers
                    @click="saveModify(seasonId)"
                    :title="$t('common.save')"
                    class="fa-lg qp-action-icon qp-action-icon-layer"
                  >
                    <font-awesome-icon :icon="['far', 'circle']" />
                    <font-awesome-icon
                      class="qp-action-icon-success"
                      icon="check"
                      transform="shrink-8"
                    />
                  </font-awesome-layers>
                </span>
              </div>

              <div class="qp-card-footer-navigate">
                <font-awesome-layers
                  @click="navigate(seasonId)"
                  :title="$t('common.more')"
                  class="fa-lg qp-action-icon qp-action-icon-layer"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                  <font-awesome-icon
                    class="qp-action-icon-primary"
                    icon="arrow-right"
                    transform="shrink-8"
                  />
                </font-awesome-layers>
              </div>
            </div>
          </div>
        </div>
      </li>

      <!-- add season -->
      <li class="mb-4">
        <div class="card qp-card">
          <div class="card-body">
            <h5 class="card-title mb-2">{{ $t("seasons.addSeason") }}</h5>
            <div class="row mb-1">
              <div class="col-12 d-flex justify-content-center align-items-center">
                <font-awesome-layers
                  @click="addSeason()"
                  :title="$t('common.add')"
                  class="fa-lg qp-action-icon qp-action-icon-layer qp-card-icon-large"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                  <font-awesome-icon
                    class="qp-action-icon-primary"
                    :icon="['fas', 'plus']"
                    transform="shrink-8"
                  />
                </font-awesome-layers>
              </div>
            </div>

            <div class="qp-card-footer ep-flex d-flex justify-content-between">
              <div class="qp-card-footer-actions"></div>
              <div class="qp-card-footer-navigate"></div>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import HighscorelistCard from "../components/highscorelist-card.component";
import TimeService from "../services/time.service";

export default {
  name: "highscorelist-home-view",

  components: {
    "highscorlist-card": HighscorelistCard
  },

  data () {
    return {
      model: {
        title: ""
      },
      translations: {
        amount: this.$t("seasons.races")
      }
    };
  },

  computed: {
    seasons () {
      return this.$store.state.highscorelist.seasons
        ? this.$store.state.highscorelist.seasons.byId
        : null;
    },
    order () {
      return this.$store.state.highscorelist.seasons.order;
    },
    modifyState () {
      return this.$store.getters["highscorelist/getModifyState"]();
    }
  },

  created () {
    // get seasons
    if (this.$store.state.highscorelist.seasons === null) {
      this.$store.dispatch("highscorelist/fetchState");
    }
  },

  methods: {
    navigate (id) {
      this.$router.push(`/highscorelist/season/${id}`);
    },

    formatDateTime (timestamp) {
      return TimeService.formatDateTime(timestamp);
    },

    getImage (filename) {
      // from: https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working
      return require("@/assets/images/cardheader/" + filename);
    },

    randomImage (border) {
      let rnd = Math.ceil(Math.random() * border);
      rnd = rnd < 10 ? `0${rnd}` : `${rnd}`;

      return "formula_one_" + rnd + ".jpg";
    },

    resetModel () {
      Object.keys(this.model).forEach(key => (this.model[key] = null));
    },

    setModify (seasonId) {
      // reset model
      this.resetModel();

      this.$store.dispatch("highscorelist/setModifyState", {
        id: seasonId,
        object: "season"
      });
    },

    hSave (evt, id) {
      this.saveModify(id);
    },
    saveModify (seasonId) {
      console.log("abc", seasonId, this.model.title);
      return;
      this.$store.dispatch("highscorelist/updateSeason", {
        id: seasonId,
        title: this.model.title,
        object: "season"
      });

      // reset model
      this.resetModel();
    },

    addSeason () {
      this.$store.dispatch("highscorelist/addSeason", {
        image: this.randomImage(10),
        object: "season"
      });
    },

    async removeSeason (seasonId) {
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
