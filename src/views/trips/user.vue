<template>
  <div class="text-xs-center">
    <section v-if="!loading" class="trips">
      <Trip
        v-for="trip in trips"
        :key="trip.id"
        :title="trip.title"
        :thumbnail="trip.picture"
        :id="trip.id"
        :height="400"
        :width="300"
        :previewText="trip.description"/>
    </section>
  </div>
</template>

<script>
  import Trip from '@/components/core/Trip'

  export default {
    middleware: 'auth',
    components: {
      Trip
    },

    async asyncData({ app }) {
      return app.$axios.get(`/voyages?user=${app.$auth.$state.user.id}`)
        .then(res => {
          return {
            trips : res.data
          }
        })
    }
  }
</script>


<style scoped>
  .trips {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: auto;
    width: 80%;
  }

</style>
