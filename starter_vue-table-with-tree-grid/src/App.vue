<template>
  <div id="app">
    <!-- <Example></Example> -->
    <Example2></Example2>

  </div>
</template>

<script>

// import Example from './components/Example.vue'
import Example2 from './components/Example2.vue'

export default {
  name: 'App',
  components: {
    // Example,
    Example2,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
