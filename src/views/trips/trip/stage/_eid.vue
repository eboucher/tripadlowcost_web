<template>
  <v-container align-content-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <p xs6 offset-xs3 class="align-center">{{ this.stage.title }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  data: () => {
    return {
      user: null,
      trip: null,
      stage: null,
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
    fetchStage: async function() {
      this.stage = this.$route.query.stage;
    },
      formatDate(date) {
        const fullDate = new Date(date)
        const year = fullDate.getFullYear()
        const month = fullDate.getMonth() + 1
        const day = fullDate.getDate()
        return `${day}/${month}/${year}`
      }
  },

  mounted: async function() {
    this.fetchStage();
    this.loggedUser();
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }

</style>
