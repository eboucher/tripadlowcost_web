<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Profile Picture:</strong>
          <v-avatar :size="128">
          <img v-if="loggedUser && loggedUser.picture" class="profilepic" :src="loggedUser.picture.url" >
          <img v-else class="profilepic" src="../../static/defaultpic.png" alt= "profile">
          </v-avatar>
        </p>
        <p>
          <strong>Username:</strong>
          {{ loggedUser.username }}
        </p>
        <p>
        <strong>Lastname:</strong>
        {{ loggedUser.lastname }}
        </p>
        <p>
        <strong>Firstname:</strong>
        {{ loggedUser.firstname }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedUser.email }}
        </p>
      </div>
      <v-divider></v-divider>
      <strong>Interests:</strong><br>
      <v-chip
        v-for="key in loggedUser.interests"
        v-if="key"
        :key="key.id"
        class="ma-2"
      >
        {{ key.tag }}
      </v-chip>
      <v-divider></v-divider>
      <v-avatar :size="64" v-for="user in loggedUser.follows" :key="user.id">
        <nuxt-link :to="'/profile/' + user.id">
          {{ user.username }}
        <img :size="64" v-if="user.picture" class="profilepic" :src="user.picture.url" >
        <img v-else class="profilepic" src="@/assets/defaultpic.png" alt= "profile">
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
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      loggedUser() {
        if(this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return "User not found";
        }
      }
    },
  }
</script>
