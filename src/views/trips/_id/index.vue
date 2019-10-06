<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
    <h1>{{ trip.title }}</h1>
      <img v-if="trip.picture" class="center" :src="trip.picture.url" :alt="trip.title">
      </div>
      <div class="container">
    <v-divider></v-divider>
        <div class="text-xs-center">
          <p>{{formatDate(trip.start)}} || {{formatDate(trip.end)}}</p>
          <p>Author : <router-link :to="'/profile/' + trip.user.id">{{ trip.user.username }}
            <v-avatar>
              <img v-if="trip.user.picture" class="profilepic" :src="trip.user.picture.url" >
              <img v-else class="profilepic" src="../../../static/defaultpic.png" alt= "profile">
            </v-avatar>
          </router-link>
          </p>
          {{ this.likes }}
          <v-btn v-if="loggedInUser && !this.liked" v-on:click.native="like" color="primary">Like</v-btn>
          <v-btn v-if="loggedInUser && this.liked" v-on:click.native="unlike" color="error">Unlike</v-btn>
          <p>
          <v-btn v-if="loggedInUser.id === trip.user.id" v-on:click.native="deleteTrip" color="error">Delete</v-btn>
          <v-btn v-if="loggedInUser.id === trip.user.id" :to="'/trips/' + trip.id + '/edit'">Edit</v-btn>
          </p>
        </div>
        <v-divider></v-divider>
    <p> {{ trip.description }} </p>
    </div>
        <v-timeline>
          <v-timeline-item
            v-for="etape in trip.etapes"
            :key="etape.id"
            color="red lighten-2"
            large
          >
            <template v-slot:opposite>
              <span>{{ formatDate(etape.start) }}</span>
            </template>
            <router-link :to="'/trips/' + trip.id + '/' + etape.id">
            <v-card class="elevation-2">
              <v-card-title class="headline">{{ etape.title }}</v-card-title>
              <v-card-text>
                {{ etape.comment }}
              </v-card-text>
            </v-card>
            </router-link>
          </v-timeline-item>
        </v-timeline>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['loggedInUser']),
    },
    middleware: 'auth',
    data() {
      return {
        liked: null,
        likes: null
      }
    },
    asyncData({ app, params }) {
      return app.$axios.get(`/voyages/${params.id}`)
        .then(res => {
          return {
            trip : res.data
          }
        })
    },
    mounted() {
      this.liked = this.loggedInUser.likes.some(el => {
        return el.id === this.trip.id
      })
      this.likes = this.trip.userslikes.length
    },
    methods: {
      async deleteTrip(){
        await this.$axios.delete(`/voyages/${this.trip.id}`,{
          headers: {
            Authorization: this.$auth.$storage._state['_token.local']
          }
        })
        this.$router.push('/trips')
      },
      async unlike() {
        const likes = this.$auth.$state.user.likes.filter(like => like.id !== this.trip.id)
        await this.$axios.put(`/users/${this.$auth.$state.user.id}`, {
            likes
          },
          {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
        await this.$auth.fetchUser()
        this.likes--
        this.liked = false
      },
      async like() {
        const likes = this.$auth.$state.user.likes.map(like => like.id)
        likes.push(this.trip.id)
        await this.$axios.put(`/users/${this.$auth.$state.user.id}`, {
            likes
          },
          {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
        await this.$auth.fetchUser()
        this.likes++
        this.liked = true
      },
      formatDate(date) {
        const fullDate = new Date(date)
        const year = fullDate.getFullYear()
        const month = fullDate.getMonth() + 1
        const day = fullDate.getDate()
        return `${day}/${month}/${year}`
      }
    }
  }
</script>


<style scoped>
h1 {
  font-size: 250%;
}
</style>
