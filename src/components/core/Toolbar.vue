<template>
  <v-toolbar
  flat
  >
    <v-img
      :src="require('@/assets/logo.png')"
      class="mr-5"
      contain
      height="48"
      width="48"
      max-width="48"
      @click="$vuetify.goTo(0)"
    />
    <v-toolbar-title>TripadLowCost</v-toolbar-title>

    <div class="flex-grow-1"></div>
    <v-text-field
      append-icon="mdi-magnify"
      flat
      hide-details
      solo-inverted
      style="max-width: 400px;"
    />
    <v-spacer/>

    <v-toolbar-items>
      <v-btn text to='/'>Home</v-btn>
      <v-btn text to='/trips/create'>Post</v-btn>
      <v-btn text to='/trips'>Trips</v-btn>
      <v-menu offset-y>
          <template v-slot:activator="{ on }">
          <v-btn
              color="primary"
              dark
              v-on="on"
          >
              Profile
          </v-btn>
          </template>
          <v-list>
          <v-list-item to='/profile'>
              <v-list-item-content> Profile </v-list-item-content>
          </v-list-item>

          <v-list-item to='/trips/user'>
              <v-list-item-content> Trips </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout">
              <v-list-item-content> Logout </v-list-item-content>
          </v-list-item>
          </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    methods: {
      ...mapMutations(['toggleDrawer']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href)
      }
    }
  }
</script>
