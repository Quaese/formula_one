<template>
  <div class="home">
    <logo />
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import AppLogo from "../../components/app-logo.component";

export default {
  name: "home",
  components: {
    logo: AppLogo,
    HelloWorld
  }
};
</script>
