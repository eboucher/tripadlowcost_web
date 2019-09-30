<template>
  <div>
    <Navbar/>
    <div class="app">
    <nuxt/>
    </div>
    <MainFooter/>
  </div>
</template>


<script>
  export default {
    components: {
      Navbar: () => import('~/components/Navbar'),
      MainFooter: () => import('~/components/MainFooter')
    }
  }
</script>


<style scoped>
  body {
    height: 100%
  }
  .app{
    margin-bottom: 150px;
  }

</style>
