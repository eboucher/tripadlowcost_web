<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
    <h1>{{ this.trip.title }}</h1>
      <img v-if="this.trip.picture" class="center" :src="this.trip.picture.url" :alt="this.trip.title">
      </div>
      <div class="container">
    <v-divider></v-divider>
        <div class="text-xs-center">
          <p>{{formatDate(this.trip.start)}} || {{formatDate(this.trip.end)}}</p>
          <p>Author : <nuxt-link :to="'/profile/' + this.trip.user.id">{{ this.trip.user.username }}
            <v-avatar>
              <img v-if="this.trip.user.picture" class="profilepic" :src="this.trip.user.picture.url" >
              <img v-else class="profilepic" src="https://webhostingmedia.net/wp-content/uploads/2018/01/http-error-404-not-found.png" alt= "profile">
            </v-avatar>
          </nuxt-link>
          </p>
          {{ this.likes }}
          <v-btn v-if="loggedUser" v-on:click.native="like" color="primary">Like</v-btn>
          <v-btn v-if="loggedUser" v-on:click.native="unlike" color="error">Unlike</v-btn>
          <p>
          <v-btn v-if="loggedUser.id === this.trip.user.id" v-on:click.native="deleteTrip" color="error">Delete</v-btn>
          <v-btn v-if="loggedUser.id === this.trip.user.id" :to="'/trips/' + this.trip.id + '/edit'">Edit</v-btn>
          </p>
        </div>
        <v-divider></v-divider>
    <p> {{ this.trip.description }} </p>
    </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

  data: () => {
    return {
      user: null,
      trip: null
    };
    if(this.thumbnail)
      return {
        picture: this.thumbnail.url
      }
    else
      return {
        picture: 'https://webhostingmedia.net/wp-content/uploads/2018/01/http-error-404-not-found.png'
      }
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
    // this fetchTrip method is not ok! IT'S ONLY FOR TESTING A TRIP
    // BUT IT NEEDS TO BE MODIFIED
    fetchTrip: async function() {
      this.user = this.$store.getters.loggedUser;
      const { data } = await this.$store.dispatch("getTrips", {
        query: `user=${this.user.id}`
      });
      this.trip = data[0];
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
