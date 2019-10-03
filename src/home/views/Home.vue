<template>
  <div class="home">
    <div class="qp-logo-holder">
      <logo />
    </div>
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
