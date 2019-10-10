<template>
  <v-container
    class="spacing-playground py-0 px-2"
    fill-height
    fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-avatar
          slot="offset"
          class="mx-auto d-block elevation-6"
          size="230"
        >
          <img
            src="http://barnesjewishblog.org/wp-content/uploads/2011/03/male-smiling.jpg"
          >
        </v-avatar>
        <v-card-text class="headline text-center">
          <p class="font-weight-black">{{ loggedUser.username }}</p>
        </v-card-text>
        <v-card-text class="text-center">
          {{ loggedUser.firstname + " " + loggedUser.lastname }}
        </v-card-text>
        <v-card-text class="text-center">
            {{ "Email: " + loggedUser.email }}
        </v-card-text>
        <strong>Interests:</strong><br>
        <v-chip
          v-for="key in loggedUser.interests"
          v-if="key"
          :key="key.id"
          class="ma-2"
        >
          {{ key.tag }}
        </v-chip>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Company (disabled)"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Country"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn color="success">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "UserProfile",
    data: () => {
      return {
        user: null,
        userTrips: null,
      };
    },

    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      loggedUser() {
        if (this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return false;
        }
      }
    },

    mounted: async function() {
      const { data } = await this.$store.dispatch("getTrips", {
        query: "_start=0&_limit=12&_sort=created_at:DESC"
      });
      this.trips = data.filter(trip => trip.picture != undefined);

      this.user = this.$store.getters.loggedUser;

      if (
        this.$store.getters.loggedUser &&
        this.$store.getters.loggedUser.interests
      ) {
        const user = this.$store.getters.loggedUser;
        const query = user.interests
          .map(interest => `interests.tag=${interest.tag}`)
          .join("&");
        const suggested = await this.$store.dispatch("getTrips", {
          query: `/voyages?${query}&_limit=5`
        });
        this.suggested = suggested.data;
      }
    }
  };
</script>

<style>
  .spacing-playground .v-select .v-input__prepend-outer, .spacing-playground .v-select .v-input__append-outer {
    margin-top: 0.55rem;
    margin-right: 0.2rem;
  }