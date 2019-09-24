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
        <small class="text-muted" v-if="created">
          {{ $t("app.created") }}: {{ created }}
        </small>
        <br />
        <small class="text-muted" v-if="modified">
          {{ $t("app.modified") }}: {{ modified }}
        </small>
      </p>

      <div class="row mb-1" v-if="location">
        <div class="col-4 col-md-6">{{ this.$t(translations.location) }}:</div>
        <div class="col-8 col-md-6">
          <span v-if="!modify">{{ location }}</span>
          <input
            v-else
            type="text"
            class="form-control"
            v-model="model.location"
            v-init-input:model="{
              field: 'location',
              value: location
            }"
            v-bind:placeholder="location"
          />
        </div>
      </div>

      <div class="row mb-1" v-if="amount">
        <div class="col-4 col-md-6">
          {{ $tc(translations.amount, amount) }}:
        </div>
        <div class="col-8 col-md-6">
          {{ amount }}
        </div>
      </div>

      <div class="row mb-1" v-if="highscore">
        <div class="col-4 col-md-6">
          {{ this.$t(translations.highscoreLabel) }}:
        </div>
        <div class="col-8 col-md-6">
          {{ highscore }}
        </div>
      </div>

      <div class="row mb-1" v-if="!!$slots.description">
        <div class="col-12">
          <slot name="description"></slot>
        </div>
      </div>

      <div class="qp-card-footer d-flex justify-content-between">
        <div class="qp-card-footer-actions">
          <span v-if="!modify">
            <action-icon
              v-if="actions.delete"
              @click="$emit('delete', $event, id)"
              :wrapper="{
                title: $t('common.delete')
              }"
              :actions="{
                class: 'qp-action-icon-remove',
                icon: ['far', 'trash-alt']
              }"
            />

            <action-icon
              v-if="actions.edit"
              @click="$emit('edit', $event, id)"
              :wrapper="{
                title: $t('common.edit')
              }"
              :actions="{
                class: 'qp-action-icon-edit',
                icon: ['fas', 'pencil-alt']
              }"
            />
          </span>
          <span v-if="modify">
            <action-icon
              v-if="actions.cancel"
              @click="$emit('cancel', $event, null)"
              :wrapper="{
                title: $t('common.cancel')
              }"
              :actions="{
                class: 'qp-action-icon-cancel',
                icon: ['fas', 'times']
              }"
            />

            <action-icon
              v-if="actions.save"
              @click="$emit('save', $event, id)"
              :wrapper="{
                title: $t('common.save')
              }"
              :actions="{
                class: 'qp-action-icon-success',
                icon: ['fas', 'check']
              }"
            />
          </span>
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
    title: {
      type: String
    },
    created: {
      type: String
    },
    modified: {
      type: String
    },
    location: {
      type: String
    },
    amount: {
      type: Number
    },
    highscore: {
      type: String
    },
    actions: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped></style>
