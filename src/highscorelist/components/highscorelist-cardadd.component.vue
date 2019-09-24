<template>
  <div class="card qp-card">
    <div class="card-body">
      <h5 class="card-title mb-2" v-if="title">{{ title }}</h5>
      <div class="row mb-1">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <font-awesome-layers
            @click="$emit('add', $event)"
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
</template>

<script>
export default {
  name: "highscorelist-card-add",

  props: {
    title: {
      type: String
    },
    actions: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped></style>
