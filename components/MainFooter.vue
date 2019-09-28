<template>
  <v-footer
    app=true
    height="auto"
    color="blue-grey lighten-3"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn href="/about/about-us"
        color="white"
        text
        rounded
      >
      About Us
      </v-btn>
      <v-btn href="/about/terms-and-conditions"
        color="white"
        text
        rounded
      >
      Terms and Conditions
      </v-btn>
      <v-btn href="/about/privacy-policy"
        color="white"
        text
        rounded
      >
      Privacy Policy
      </v-btn>
      <v-btn href="/about/cookie-policy"
        color="white"
        text
        rounded
      >
      Cookie Policy
      </v-btn>
      <v-btn href="/about/cookie-consent"
        color="white"
        text
        rounded
      >
      Cookie Consent
      </v-btn>
      <v-flex
        primary
        blue-grey lighten-2
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2019 — <strong>TripAdLowCost</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
