<template>
  <div>
    <v-toolbar
    flat
    fixed
    >
      <v-img
        :src="require('@/assets/logo.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
      />
      <v-toolbar-title>TripadLowCost</v-toolbar-title>
      <v-spacer/>
      <v-text-field
        append-icon="mdi-magnify"
        flat
        hide-details
        solo-inverted
        style="max-width: 400px;"
      />
      <v-spacer/>

      <v-toolbar-items v-if="!isAuthenticated">
        <v-btn text to='/'>Home</v-btn>
        <v-btn text to='/trips/public-trips'>Trips</v-btn>
        <v-btn text to='/login'>Login</v-btn>
        <v-btn text to='/register'>Register</v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn text to='/'>Home</v-btn>
        <v-btn text to='/post'>Post</v-btn>
        <v-btn text to='/trips/public-trips'>Trips</v-btn>

        <v-menu offset-y>
          <template v-if="isAuthenticated" v-slot:activator="{ on }">
            <v-btn text v-on="on"> {{ loggedUser.username }} </v-btn>
          </template>
          <v-list>
            <router-link to="/profile/user-profile">
              <v-list-item>
                <v-list-item-title> My profile </v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item to='/trips/user-trips'>
              <v-list-item-title> My trips </v-list-item-title>
            </v-list-item>
            <v-list-item to='/trips'>
              <v-list-item-title> Settings </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title> Log out </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: null,
        search: ''
      }
    },

    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
      loggedUser() {
        if(this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return false;
        }
      }
    },

    methods: {
      async logout() {
        await this.$auth.logout();
      },
      trigger() {
        this.$router.push(`/trips/search?query=${this.search}`)
      }
    },
    
    mounted: async function() {
      const user = this.$store.getters.loggedUser;
      this.username = user.username
    }
  }
</script>
