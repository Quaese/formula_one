<template>
  <div>
    highscorelist-card
    {{ modify ? "true" : "false" }}
    <button @click="$emit('save', $event, id)">save</button>
    <div class="card qp-card">
      <div
        class="card-img-top qp-card-img-bg"
        v-if="headerImage"
        :style="{
          'background-image': headerImage
        }"
      ></div>

      <div class="card-body">
        <h5 class="card-title mb-2" v-if="title">
          <span v-if="!modify">{{ title }}</span>
          <input
            v-else
            type="text"
            class="form-control"
            v-model="model.title"
            v-init-input:model="{
              field: 'title',
              value: title
            }"
            v-bind:placeholder="title"
          />
        </h5>
        <p class="card-subtitle mb-3 card-text" style="line-height: 1.1;">
          <small class="text-muted" v-if="created"
            >{{ $t("app.created") }}: {{ created }}</small
          >
          <br />
          <small class="text-muted" v-if="modified"
            >{{ $t("app.modified") }}: {{ modified }}</small
          >
        </p>
        <div class="row mb-1" if="amount">
          <div class="col-4 col-md-6">{{ translations.amount }}:</div>
          <div class="col-8 col-md-6">
            {{ amount }}
          </div>
        </div>

        <!-- <div class="qp-card-footer d-flex justify-content-between">
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
            </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "highscorelist-card",

  props: {
    id: {
      type: String
    },
    model: {},
    modify: {
      type: Boolean,
      default: false
    },
    translations: {
      type: Object
    },
    headerImage: {
      type: String
    },
    title: { type: String },
    created: {},
    modified: {},
    amount: {}
    // save: {}
  }
};
</script>

<style lang="less" scoped></style>
