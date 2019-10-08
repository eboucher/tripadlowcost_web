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

      <v-toolbar-items>
        <v-btn text to='/'>Home</v-btn>
        <v-btn text to='/trips'>Trips</v-btn>
        <v-btn text to='/login'>Login</v-btn>
        <v-btn text to='/register'>Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    methods: {
    }
  }
</script>
