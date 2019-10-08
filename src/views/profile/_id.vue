<template>
  <div class="container">
  <section class="content">
    <div>
      <div class="content">
          <v-avatar v-if="this.user && this.user.picture" :size="128">
            <img class="profilepic" :src="this.user.picture.url" >
          </v-avatar>
          <v-avatar v-else :size="128">
            <img class="profilepic" src="../../static/defaultpic.png" alt= "profile">
          </v-avatar>
        <p>
          <strong>Username:</strong>
          {{ this.user.username }}
        </p>
        <p>
          <strong>Lastname:</strong>
          {{ this.user.lastname }}
        </p>
        <p>
          <strong>Firstname:</strong>
          {{ this.user.firstname }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ this.user.email }}
        </p>
        <p v-if="this.user.phone">
          <strong>Phone:</strong>
          {{ this.user.phone }}
        </p>
        <p v-if="this.user.adress">
          <strong>Adress:</strong>
          {{ this.user.adress }}
        </p>
        <p>
          <v-btn v-if="loggedUser && !this.followed" v-on:click.native="follow" color="primary">Follow</v-btn>
          <v-btn v-if="loggedUser && this.followed" v-on:click.native="unfollow" color="error">Unfollow</v-btn>
        </p>
        <v-divider></v-divider>
        <strong>Interests:</strong><br>
        <v-chip
          v-for="key in this.$auth.$state.user.interests"
          v-if="key"
          :key="key.id"
          class="ma-2"
        >
          {{ key.tag }}
        </v-chip>
        <v-divider></v-divider>
      </div>
    </div>
  </section>
  <section class="content">
    <strong v-if="this.trip">Last trip</strong>
    <Trip v-if="this.trip"
      :height="500"
      :width="1000"
      :key="trip.id"
      :title="trip.title"
      :thumbnail="trip.picture"
      :id="trip.id"
      :previewText="trip.description"/>
  </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Trip from '@/components/core/Trip'

  export default {

    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      loggedUser() {
        if(this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return "User not found";
        }
      }
    },

    components: {
      Trip
    },

    data() {
      return {
        followed: null
      }
    },

    mounted() {
        this.followed = this.loggedUser.follows.some(el => {
          return el.id === this.user.id
        })
    },

    methods: {
      async unfollow() {
        const follows = this.$auth.$state.user.follows.filter(follow => follow.id !== this.user.id)
        await this.$axios.put(`/users/${this.$auth.$state.user.id}`, {
            follows
          },
          {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
        await this.$auth.fetchUser()
        this.followed = false
      },

      async follow() {
        const follows = this.$auth.$state.user.follows.map(follow => follow.id)
        follows.push(this.user.id)
        await this.$axios.put(`/users/${this.$auth.$state.user.id}`, {
            follows
          },
          {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
        await this.$auth.fetchUser()
        this.followed = true
      }
    },

      async asyncData({ app, params}) {
        const user = await app.$axios.get(`/users?id=${params.id}`, {
          headers: {
            Authorization: app.$auth.$storage._state['_token.local']
          }
        }).then(res => {
          return {
            user: res.data[0]
          }
        })
        const lastTrip = await app.$axios.get(`/voyages?user=${params.id}&_sort=created_at:DESC&_limit=1`)
          .then(res => {
            return {
              trip : res.data[0]
            }
          })
        return {
          ...user,
          ...lastTrip
        }
      }
    }
</script>

<style scoped>
section {
  justify-content: center;
}
</style>
