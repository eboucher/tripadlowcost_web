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
  import Navbar from '~/components/Navbar'
  import MainFooter from '~/components/MainFooter'

  export default {
    components: {
      Navbar,
      MainFooter
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
