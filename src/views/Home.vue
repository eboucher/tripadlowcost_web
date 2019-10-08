<template>
  <section class="section">
    {{ trips }}
  </section>
</template>

<script>
  import Carousel from '@/components/base/Carousel'
  export default {
    name: "Home",
    data: () => {
      return {
        trips: null
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
      console.log("Bonjour on est là!");
      this.trips = await this.$store.dispatch("getTrips", {query:'_start=0&_limit=12&_sort=created_at:DESC'});
      console.log(trips);
      return { trips };
    },

    components: {
      Carousel
    },

    /*
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
    */
  };
</script>
