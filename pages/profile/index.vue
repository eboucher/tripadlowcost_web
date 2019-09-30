<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Profile Picture:</strong>
          <v-avatar :size="128">
          <img v-if="loggedInUser && loggedInUser.picture" class="profilepic" :src="loggedInUser.picture.url" >
          <img v-else class="profilepic" src="../../static/defaultpic.png" alt= "profile">
          </v-avatar>
        </p>
        <p>
          <strong>Username:</strong>
          {{ loggedInUser.username }}
        </p>
        <p>
        <strong>Lastname:</strong>
        {{ loggedInUser.lastname }}
        </p>
        <p>
        <strong>Firstname:</strong>
        {{ loggedInUser.firstname }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>
      </div>
      <v-divider></v-divider>
      <strong>Interests:</strong><br>
      <v-chip
        v-for="key in loggedInUser.interests"
        v-if="key"
        :key="key.id"
        class="ma-2"
      >
        {{ key.tag }}
      </v-chip>
      <v-divider></v-divider>
      <v-avatar :size="64" v-for="user in loggedInUser.follows" :key="user.id">
        <nuxt-link :to="'/profile/' + user.id">
          {{ user.username }}
        <img :size="64" v-if="user.picture" class="profilepic" :src="user.picture.url" >
        <img v-else class="profilepic" src="../../static/defaultpic.png" alt= "profile">
        </nuxt-link>
      </v-avatar>
      <v-divider></v-divider>
      <v-btn to="/profile/edit">Edit</v-btn>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['loggedInUser']),
    },
    middleware: 'auth'
  }
</script>
