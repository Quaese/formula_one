<template>
  <font-awesome-layers
    @click="$emit('click')"
    :title="wrapper.title"
    :class="
      `fa-lg qp-action-icon qp-action-icon-layer ${
        wrapper.class ? wrapper.class : ''
      }`
    "
  >
    <font-awesome-icon :icon="['far', 'circle']" />
    <font-awesome-icon
      :class="actions.class"
      :icon="actions.icon"
      :transform="transform"
    />
  </font-awesome-layers>
</template>

<script>
export default {
  name: "action-icon",

  props: {
    wrapper: {
      type: Object
    },
    actions: {
      type: Object
    },
    transform: {
      type: String,
      default: "shrink-8"
    }
  }
};
</script>

<style lang="less" scoped></style>
