<template>
    <v-footer
      color="primary lighten-1"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn href="/about"
          color="white"
          text
          rounded
          class="my-2"
        >
        About Us
        </v-btn>
        <v-btn href="/about/terms-and-conditions"
          color="white"
          text
          rounded
          class="my-2"
        >
        Terms and Conditions
        </v-btn>
        <v-btn href="/about/privacy-policy"
          color="white"
          text
          rounded
          class="my-2"
        >
        Privacy Policy
        </v-btn>
        <v-btn href="/about/cookie-policy"
          color="white"
          text
          rounded
          class="my-2"
        >
        Cookie Policy
        </v-btn>
        <v-btn href="/about/cookie-consent"
          color="white"
          text
          rounded
          class="my-2"
        >
        Cookie Consent
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