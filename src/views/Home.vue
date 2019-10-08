<template>
  <section class="section">
    
    <div class="middle" style="background-color:#bbb;">
      <div class="container">
        <Carousel
          :trips="trips"/>
        <div v-if="loggedUser && suggested.length > 0">
        <h1 class="title">Suggestions</h1>
        <Carousel
          :trips="suggested"/>
        </div>
      </div>
    </div>

    <TripPreview
      v-for="trip in trips"
      :key="trip.id"
      :title="trip.title"
      :excerpt="trip.description"
      :thumbnailImage="trip.thumbnail"
      :id="trip.id" />
  </section>
</template>

<script>
  import Carousel from '@/components/base/Carousel'
  export default {
    name: "Home",
    data: () => {
      return {
      };
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      loggedUser() {
        if(this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return "User not found";
        }
      }
    },
    components: {
      Carousel
    },

    async asyncData() {
      const recent = await this.$store.$axios.get('https://dev-tripadlowcost.herokuapp.com/voyages?_sort=created_at:DESC&_limit=5')
        .then(res => {
          return {
            trips : res.data
          }
        })
      if(this.$store.getters.loggedUser && this.$store.getters.loggedUser.interests) {
        const query = this.$store.getters.loggedUser.interests.map(interest => `interests.tag=${interest.tag}`).join('&')
        const suggestion = await app.$axios.get(`https://dev-tripadlowcost.herokuapp.com//voyages?${query}&_limit=5`)
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
