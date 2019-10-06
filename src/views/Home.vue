<template>
  <div id="home">
    <Carousel:trips="trips"/>
    <div v-if="loggedInUser && suggested.length > 0">
    <h1 class="title">Suggestions</h1>
    <Carousel:trips="suggested"/>
    </div>

    <TripPreview
      v-for="trip in trips"
      :key="trip.id"
      :title="trip.title"
      :excerpt="trip.description"
      :thumbnailImage="trip.thumbnail"
      :id="trip.id" 
    /> 
  </div>
</template>

<script>
  import Carousel from '@/components/base/Carousel'
  import { mapGetters } from 'vuex'

  export default {
    name: "Home",
    computed: {
      ...mapGetters(['loggedInUser'])
    },
    components: {
      Carousel,
    },

    async asyncData({ app }) {
      const recent = await app.$axios.get('/voyages?_sort=created_at:DESC&_limit=5')
        .then(res => {
          return {
            trips : res.data
          }
        })
      if(app.$auth.$state.user && app.$auth.$state.user.interests)
      {
        const query = app.$auth.$state.user.interests.map(interest => `interests.tag=${interest.tag}`).join('&')
        const suggestion = await app.$axios.get(`/voyages?${query}&_limit=5`)
          .then(res => {
            return {
              suggested : res.data
            }
          })
        return {
          ...recent,
          ...suggestion
        }
      }
      return recent
    }
  };
</script>
