<template>
  <v-flex xs12 sm6>
    <v-card
    :min-width= "width"
    :max-width = "width"
    :min-height = "height"
    :max-height = "height">
    <v-card-title primary-title>{{ trip.title }}</v-card-title>
    <v-img
        :height="height/2"
        :src="trip.picture.url"
        contain>
    </v-img>

    <v-card-text v-if="trip.previewText && trip.previewText.length > width /2">
    {{ trip.previewText.slice(0, width/2) }} ... (voir plus)
    </v-card-text>
    <v-card-text v-if="trip.previewText && trip.previewText.length <= width / 2" >
        {{ trip.previewText }}
    </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {

  data: () => {
    return {
      user: null,
      trip: null
    };
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

    fetchTrip: async function() {
      this.user = this.$store.getters.loggedUser;
      const { data } = await this.$store.dispatch("getTrips", {
        query: `user=${this.user.id}`
      });
      this.trip = data[0];
    },
  },

  mounted: async function() {
    this.fetchTrip();
  }
}
</script>