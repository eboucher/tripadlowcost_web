<template>
    <v-footer
      color="primary lighten-1"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn to="/about"
          color="white"
          exact
          text
          rounded
          class="my-2"
        >
        About Us
        </v-btn>
        <v-btn to="/about/terms-and-conditions"
          color="white"
          text
          rounded
          class="my-2"
        >
        Terms and Conditions
        </v-btn>
        <v-btn to="/about/privacy-policy"
          color="white"
          text
          rounded
          class="my-2"
        >
        Privacy Policy
        </v-btn>
        <v-btn to="/about/cookie-policy"
          color="white"
          text
          rounded
          class="my-2"
        >
        Cookie Policy
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>TripadLowCost</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>