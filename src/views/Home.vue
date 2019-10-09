<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  import Carousel from '@/components/base/Carousel'
  export default {
    name: "Home",
    data: () => {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
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
      if (this.trips != null && this.trips.data != null)
        this.trips = this.trips.data;

      if(this.$store.getters.loggedUser && this.$store.getters.loggedUser.interests) {
        const user = this.$store.getters.loggedUser;
        const query = user.interests.map(interest => `interests.tag=${interest.tag}`).join('&')
        
        this.suggested = await this.$store.dispatch("getTrips", {query:`/voyages?${query}&_limit=5`})
      if (this.suggested != null && this.suggested.data != null)
        this.suggested = this.suggested.data;
      }
    },

    components: {
      Carousel
    },
  };
</script>
