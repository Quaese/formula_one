<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse">
            <ul id="nav" class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/highscorelist">highscorelist</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
  <!-- end: #id -->
</template>

<script>
export default {
  name: "app",

  created() {
    this.$store.dispatch("app/setupApp", { name: "QPs Highscorelist" });
  }
};
</script>

<style lang="less">
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
