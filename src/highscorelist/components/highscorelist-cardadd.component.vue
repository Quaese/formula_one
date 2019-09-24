<template>
  <div class="card qp-card">
    <div class="card-body">
      <h5 class="card-title mb-2" v-if="title">{{ title }}</h5>
      <div class="row mb-1">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <action-icon
            @click="$emit('add', $event)"
            :wrapper="{
              class: 'qp-card-icon-large',
              title: $t('common.add')
            }"
            :actions="{
              class: 'qp-action-icon-primary',
              icon: ['fas', 'plus']
            }"
          />
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
// import ActionIconLayered from "./actionicon-layered.component" is globally registered in main.js

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
