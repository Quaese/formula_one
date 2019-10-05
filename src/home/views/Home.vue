<template>
  <div class="container-fluid home">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t("home.headline") }}</h1>
      </div>
    </div>
    <!-- .row -->

    <div class="row">
      <div class="col-12">
        <div class="qp-logo-holder">
          <logo />
        </div>
      </div>
    </div>
    <!-- .row -->

    <div class="row">
      <div class="col-12">
        <h2>{{ $t("home.description.headline") }}</h2>
      </div>
      <div class="col-12" v-html="$t('home.description.text')"></div>
    </div>
    <!-- .row -->
  </div>
</template>

<script>
// @ is an alias to /src
import AppLogo from "../../components/app-logo.component";

export default {
  name: "home",
  components: {
    logo: AppLogo
  }
};
</script>
