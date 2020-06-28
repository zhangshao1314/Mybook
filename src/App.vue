<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
  window.addEventListener('unload', this.saveState) },
  methods: {
   saveState()
    { sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    } }
}
</script>

<style>
</style>
