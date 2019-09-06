<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('setUser',localStorage.tsToken);
  }
}
</script>
<style lang="scss">
#app {
   width: 100%;
  height: 100%;
}

</style>
