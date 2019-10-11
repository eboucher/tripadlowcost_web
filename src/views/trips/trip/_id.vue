<template>
  <v-container align-content-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <p xs6 offset-xs3 class="align-center">{{ this.trip.title }}</p>
        <v-img
          :src="this.trip.picture.url"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="1000"
          max-height="500"
        >
        </v-img>
        <div class="text-xs-center" >
          <p>{{formatDate(this.trip.start)}} || {{formatDate(this.trip.end)}}</p>
        </div>
        <p> {{ this.trip.description }} </p>
        <p>Author : <router-link :to="'/profile/' + this.trip.user.id">{{ this.trip.user.username }}
        </router-link>
        </p>
        <div>
          {{ this.likes }}
          <v-btn
          v-if="loggedUser"
          v-on:click.native="like"
          class="ma-2" 
          text 
          icon 
          color="blue lighten-2">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>

          <v-btn
          v-if="loggedUser"
          v-on:click.native="unlike"
          class="ma-2" 
          text 
          icon 
          color="red lighten-2">
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
        </div>

        <v-btn v-if="loggedUser.id === this.trip.user.id" v-on:click.native="deleteTrip" color="error">Delete</v-btn>
        <v-btn
            v-if="loggedUser.id === this.trip.user.id"
          class="ma-2" 
          tile 
          outlined 
          color="success" 
          :to="'/trips/' + this.trip.id + '/edit'"
          >
          <v-icon left>mdi-pencil</v-icon> Edit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  data: () => {
    return {
      user: null,
      trip: null
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
    fetchTrip: async function() {
      this.user = this.$store.getters.loggedUser;
      const { data } = await this.$store.dispatch("getTrips", {
        query: `user=${this.user.id}`
      });
      this.trip = this.$route.query.trip;
    },
      async deleteTrip(){
        this.$router.push('/trips')
      },
      async unlike() {
      },
      async like() {
      },
      formatDate(date) {
        const fullDate = new Date(date)
        const year = fullDate.getFullYear()
        const month = fullDate.getMonth() + 1
        const day = fullDate.getDate()
        return `${day}/${month}/${year}`
      }
  },

  mounted: async function() {
    this.fetchTrip();
    this.loggedUser();
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }

</style>
