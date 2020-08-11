module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/scss/variables.scss";'
      }
    }
  }
}