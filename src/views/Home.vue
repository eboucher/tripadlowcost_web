<template>
  <section>
    <v-row justify="center">
      <h1>Recent trips</h1>
      <v-carousel height="500">
        <v-carousel-item v-for="(item,i) in trips" :key="i" :src="item.picture.url">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3" style="color: white;">{{ item.title }}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row justify="center" v-if="loggedUser" style="margin-top:15px;">
      <h1>Suggestions</h1>
      <v-carousel height="500">
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {
      trips: null,
      suggested: null,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
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
    console.log(this.trips.filter(trip => trip.picture != undefined));

    if (
      this.$store.getters.loggedUser &&
      this.$store.getters.loggedUser.interests
    ) {
      const user = this.$store.getters.loggedUser;
      const query = user.interests
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
