<template>
  <v-container
    class="spacing-playground py-0 px-2"
    fill-height
    fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-col
          cols="12"
          md="8"
        >
        <v-avatar 
          v-if="user.picture"
          slot="offset"
          class="mx-auto d-block elevation-6"
          size="230"
        >
          <img :src="user.picture.url">
        </v-avatar>
        <v-avatar 
          v-else
          slot="offset"
          class="mx-auto d-block elevation-6"
          size="230"
        >
          <img src="http://barnesjewishblog.org/wp-content/uploads/2011/03/male-smiling.jpg">
        </v-avatar>
        <v-card-text class="headline text-center">
          <p class="font-weight-black">{{ user.username }}</p>
        </v-card-text>
        <v-card-text class="text-center">
          {{ user.firstname + " " + user.lastname }}
        </v-card-text>
        <v-card-text class="text-center">
            {{ "Email: " + user.email }}
        </v-card-text>
        </v-col>
        <v-col
          cols="8"
        >
          <strong>Interests:</strong><br>
          <v-row
            rows="4"
            class="text-xs-center"
          >
              <v-chip
                v-for="key in user.interests"
                v-if="key"
                :key="key.id"
                class="ma-2"
              >
                {{ key.tag }}
              </v-chip>
          </v-row>
        </v-col>

        <v-col
          cols="10"
          class="text-right"
        >
          <v-btn color="success">
            Edit Profile
          </v-btn>
        </v-col>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
          <v-layout align-center justify-center column>   
          <v-card-text class="headline text-center">
            <p class="font-weight-black"> {{ user.username }} trips </p>
          </v-card-text>  
            <v-container grid-list-xl>
              <v-layout v-bind="binding" v-for="(item, index) in user.voyages" :key="index">
                <li><router-link :to="{ path: '/trips/' + item.id, query:{trip:trips[item.id]} }">
                  <v-flex xs2>
                    <v-img
                      v-if="item.picture"
                      class="white--text"
                      height="400px"
                      width="7000px"
                      :src="item.picture.url"
                    >
                    </v-img>
                    <v-card-title class="align-end fill-height"> {{ item.title }} </v-card-title>
                    <v-card-text class="trunc"> {{ item.description }} </v-card-text>
                  </v-flex>
                </router-link></li>
              </v-layout>
            </v-container>
          </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  function sortTrips(array) {
      var result = {};
      array.forEach(function(trip) {
          result[trip.id] = trip;
      });
      return result;
  }

  export default {
    name: "UserProfile",
    data: () => {
      return {
        user: null,
        loading: false,
        trips: null,
      };
    },

    computed: {},

    methods: {

      fetchTrips: async function(page) {
        this.user = this.$store.getters.loggedUser;
        this.loading = true;
        const { data } = await this.$store.dispatch("getTrips", {
          query: `user=${this.user.id}`
        });
        this.trips = sortTrips(data);
        this.loading = false;
        console.log(this.trips);
      },
      
      countTrips: async function() {
        const count = await axios.get(
          "https://dev-tripadlowcost.herokuapp.com/voyages/count"
        );
        this.limit = Math.trunc(count.data / 12) + 1;
      }
    },

    mounted: async function() {
      this.fetchTrips();
      this.user = this.$store.getters.fullUser;
    }
  };
</script>

<style>
  .spacing-playground .v-select .v-input__prepend-outer, .spacing-playground .v-select .v-input__append-outer {
    margin-top: 0.55rem;
    margin-right: 0.2rem;
  }

  .v-input__slider {
    width: 100%;
  }

  li a {
    text-decoration: none;
  }
</style>