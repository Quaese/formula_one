<template>
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
        <span>{{ title }}</span>
      </h5>

      <p class="card-subtitle mb-3 card-text" style="line-height: 1.1;">
        <small class="text-muted" v-if="created">
          {{ $t("app.created") }}: {{ created || new Date() }}
        </small>
        <br />
        <small class="text-muted" v-if="modified">
          {{ $t("app.modified") }}: {{ modified || new Date() }}
        </small>
      </p>

      <div class="row mb-1">
        <div class="col-4 col-md-6">{{ $t(translations.location) }}:</div>
        <div class="col-8 col-md-6">
          <span>Content</span>
        </div>
      </div>

      <div class="row mb-1" v-if="!!$slots.description">
        <div class="col-12">
          <slot name="description"></slot>
        </div>
      </div>

      <div class="qp-card-footer d-flex justify-content-between">
        <div class="qp-card-footer-actions">
          <span></span>
        </div>

        <div class="qp-card-footer-navigate" v-if="actions.navigate">
          <action-icon
            v-if="actions.navigate"
            @click="$emit('navigate', $event, id)"
            :wrapper="{
              title: $t('common.more')
            }"
            :actions="{
              class: 'qp-action-icon-primary',
              icon: ['fas', 'arrow-right']
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ActionIconLayered from "./actionicon-layered.component" is globally registered in main.js

import Vue from "vue";

export default {
  name: "nav-card",

  components: {},

  data() {
    // event bus (using Vue instance to use $emit as event emitter)
    const bus = new Vue();

    return {
      bus
    };
  },

  props: {
    id: {
      type: String
    },
    translations: {
      type: Object
    },
    headerImage: {
      type: String
    },
    title: {
      type: String
    },
    created: {
      type: String
    },
    modified: {
      type: String
    },
    actions: {
      type: Object
    }
  },

  methods: {}
};
</script>

<style lang="less" scoped></style>
