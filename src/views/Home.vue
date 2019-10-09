<template>
  <section class="section">

    <Carousel
      :trips="trips"/>
    <div v-if="loggedUser">
    <h1 class="title">Suggestions</h1>
    <Carousel
      :trips="suggested"/>
    </div>

    <TripPreview
      v-for="trip in trips"
      :key="trip.id"
      :title="trip.title"
      :excerpt="trip.description"
      :thumbnailImage="trip.thumbnail"
      :id="trip.id"
    />
  </section>

</template>

<script>
  import Carousel from '@/components/base/Carousel'
  export default {
    name: "Home",
    data: () => {
      return {
        trips: null,
        suggested: null,
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
      },
    },

    mounted: async function() {
      this.trips = await this.$store.dispatch("getTrips", {query:'_start=0&_limit=12&_sort=created_at:DESC'});
      this.trips = this.trips.data;

      if(this.$store.getters.loggedUser && this.$store.getters.loggedUser.interests) {
        const user = this.$store.getters.loggedUser;
        const query = user.interests.map(interest => `interests.tag=${interest.tag}`).join('&')
        this.suggested = await this.$store.dispatch("getTrips", {query:`/voyages?${query}&_limit=5`})
        this.suggested = this.suggested.data;
      }
    },

    components: {
      Carousel
    },
  };
</script>
