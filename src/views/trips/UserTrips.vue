<template>
  <section>
    <h1>Your trips</h1>
    <v-row justify="center" v-if="loading">
      <v-progress-circular :size="75" indeterminate color="primary"></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col v-for="(item, index) in trips" :key="index" cols="3">
        <li><router-link :to="{ path: '/trips/' + item.id, query:{trip:trips[item.id]} }">
          <v-card max-width="344" class="mx-auto">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-img v-if="item.picture" class="white--text" height="200px" :src="item.picture.url"></v-img>
            <v-img
              v-else
              class="white--text"
              height="200px"
              src="https://webhostingmedia.net/wp-content/uploads/2018/01/http-error-404-not-found.png"
            ></v-img>
            <v-card-text class="trunc">{{item.description}}</v-card-text>
          </v-card>
        </router-link></li>
      </v-col>
    </v-row>
    <v-row>
      <v-pagination v-model="page" @input="goTo" :length="limit" total-visible="7"></v-pagination>
    </v-row>
  </section>
</template>

<script>
  import axios from "axios";

  function sortTrips(array) {
      var result = {};
      array.forEach(function(trip) {
          result[trip.id] = trip;
      });
      return result;
  }
  
  export default {
    name: "PublicTrips",

    components: {},

    data: () => {
      return {
        user: null,
        loading: false,
        trips: null,
        limit: 1,
        page: 1
      };
    },

    computed: {
      loggedUser() {
        if (this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return false;
        }
      }
    },

    methods: {

      goTo: function(page) {
        this.fetchTrips(page);
      },
      
      countTrips: async function() {
        const count = await axios.get(
          "https://dev-tripadlowcost.herokuapp.com/voyages/count"
        );
        this.limit = Math.trunc(count.data / 12) + 1;
      }
    },

    mounted: async function() {
      this.countTrips();
      this.user = this.$store.getters.fullUser;
      this.trips = sortTrips(this.user.voyages);
    }
  };
</script>


<style scoped>
  .trunc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li a {
    text-decoration: none;
  }
</style>
