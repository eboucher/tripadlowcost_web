<template>
  <section>
    <v-row justify="center">
      <h1>Recent trips</h1>
      <v-carousel cycle height="500">
        <v-carousel-item v-for="(item,i) in trips" :key="i" :src="item.picture.url">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3" style="color: white;">{{ item.title }}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row justify="center" v-if="loggedUser" style="margin-top:15px;">
      <h1>Suggestions</h1>
      <v-carousel cycle height="500">
        <v-carousel-item v-for="(item,i) in suggested.slice().reverse()" :key="i" :src="item.picture.url">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3" style="color: white;">{{ item.title }}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </section>
</template>

<script>
  export default {
    name: "Home",
    data: () => {
      return {
        user: null,
        trips: null,
        suggested: null,
      };
    },

    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      loggedUser() {
        if (this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return false;
        }
      }
    },

    mounted: async function() {

      const { data } = await this.$store.dispatch("getTrips", {
        query: "_start=0&_limit=12&_sort=created_at:DESC"
      });
      this.trips = data.filter(trip => trip.picture != undefined);

      if (this.$store.getters.fullUser &&
        this.$store.getters.fullUser.interests) 
      {
        this.user = this.$store.getters.fullUser;
        const query = this.user.interests
          .map(interest => `interests.tag=${interest.tag}`)
          .join("&");
        const suggested = await this.$store.dispatch("getTrips", {
          query: `/voyages?${query}&_limit=5`
        });
        this.suggested = suggested.data;
      }
    }
  };
</script>
