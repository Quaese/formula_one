// vue.config.js
module.exports = {
  publicPath: ".",
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      css: {
        url: true
      }
    }
  }
};
