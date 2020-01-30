<template>
  <div
    class="card qp-card qp-nav-card"
    :class="{
      [`qp-nav-card-${color}`]: true,
      [`qp-nav-card-active`]: active,
      [`qp-nav-card-active-${color}`]: active
    }"
    @click="
      () => {
        this.navigate(path);
      }
    "
  >
    <div class="card-body">
      <div class="jumbotron jumbotron-fluid pt-1 pb-3 my-1">
        <div class="container" v-if="title">
          <h1 class="display-4 d-flex align-items-center">
            <font-awesome-icon
              v-if="icon !== null"
              :icon="[icon.type, icon.name]"
              transform="shrink-8"
              :class="{
                'qp-nav-card-icon': true,
                [`qp-nav-card-icon-${color}`]: true
              }"
            />{{ title }}
          </h1>
          <p class="lead" v-if="!!$slots.description">
          <slot name="description"></slot>
          </p>
        </div>
      </div>
        </div>
      </div>
      <!-- <div class="qp-card-footer d-flex justify-content-between align-items-center">
        <h5
          class="d-flex align-items-center"
          v-if="title"
        >
          <font-awesome-icon
            v-if="icon !== null"
            :icon="[icon.type, icon.name]"
            transform="shrink-8"
            :class="{
              'qp-nav-card-icon': true,
              [`qp-nav-card-icon-${color}`]: true
            }"
          />
          <span>{{ title }}</span>
        </h5>
      </div> -->
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
    return {};
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "red"
    },
    icon: {
      type: Object
    },
    path: {
      type: String,
      default: ""
    },
    title: {
      type: String
    },
    translations: {
      type: Object
    }
  },

  methods: {
    navigate(path) {
      console.log(path);
      // navigate to requested race
      this.$router.push(`${this.path}`);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/variables.less");

.qp-nav-card {
  &-icon {
    font-size: 1.7em;

    &-red {
      color: @red-section-color;
    }

    &-blue {
      color: @blue-section-color;
    }

    &-green {
      color: @green-section-color;
    }

    &-turquoise {
      color: @turquoise-section-color;
    }

    &-yellow {
      color: @yellow-section-color;
    }
  }

  &:hover {
    cursor: pointer;
    border-color: @color-info !important;
  }
  &-red {
    &:hover {
      border-color: @red-section-color !important;
    }
  }

  &-blue {
    &:hover {
      border-color: @blue-section-color !important;
    }
  }

  &-green {
    &:hover {
      border-color: @green-section-color !important;
    }
  }

  &-turquoise {
    &:hover {
      border-color: @turquoise-section-color !important;
    }
  }

  &-yellow {
    &:hover {
      border-color: @yellow-section-color !important;
    }
  }

  &-active {
    // background-color: lighten(@color-secondary, 50%) !important;
    border-color: rgba(0, 0, 0, 0.25) !important;

    &:hover {
      cursor: default;
      border-color: rgba(0, 0, 0, 0.25) !important;
    }
    // &-red,
    // &-red:hover {
    //   // &:hover {
    //   border-color: @red-section-border-color !important;
    //   // }
    // }

    // &-blue,
    // &-blue:hover {
    //   // &:hover {
    //   border-color: @blue-section-border-color !important;
    //   // }
    // }

    // &-green,
    // &-green:hover {
    //   // &:hover {
    //   border-color: @green-section-border-color !important;
    //   // }
    // }

    // &-turquoise,
    // &-turquoise:hover {
    //   // &:hover {
    //   border-color: @turquoise-section-border-color !important;
    //   // }
    // }

    // &-yellow,
    // &-yellow:hover {
    //   // &:hover {
    //   border-color: @yellow-section-border-color !important;
    //   // }
    // }
  }

  .qp-card-footer {
    margin: auto;
  }
}
</style>
