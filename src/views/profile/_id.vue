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
        <v-col
          cols="12"
          md="8"
        >
        <v-avatar 
          v-if="user.picture"
          slot="offset"
          class="mx-auto d-block elevation-6"
          size="230"
        >
          <img :src="user.picture.url">
        </v-avatar>
        <v-avatar 
          v-else
          slot="offset"
          class="mx-auto d-block elevation-6"
          size="230"
        >
          <img src="http://barnesjewishblog.org/wp-content/uploads/2011/03/male-smiling.jpg">
        </v-avatar>
        <v-card-text class="headline text-center">
          <p class="font-weight-black">{{ user.username }}</p>
        </v-card-text>
        <v-card-text class="text-center">
          {{ user.firstname + " " + user.lastname }}
        </v-card-text>
        <v-card-text class="text-center">
            {{ "Email: " + user.email }}
        </v-card-text>
        </v-col>
        <v-col
          cols="8"
        >
          <strong>Interests:</strong><br>
          <v-row
            rows="4"
            class="text-xs-center"
          >
              <v-chip
                v-for="key in user.interests"
                v-if="key"
                :key="key.id"
                class="ma-2"
              >
                {{ key.tag }}
              </v-chip>
          </v-row>
        </v-col>

        <v-col
          cols="10"
          class="text-right"
        >
          <v-btn color="success">
            Edit Profile
          </v-btn>
        </v-col>
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
      };
    },

    computed: {
      
    },

    mounted: async function() {
      this.user = this.$store.getters.fullUser.data;
    }
  };
</script>

<style>
  .spacing-playground .v-select .v-input__prepend-outer, .spacing-playground .v-select .v-input__append-outer {
    margin-top: 0.55rem;
    margin-right: 0.2rem;
  }