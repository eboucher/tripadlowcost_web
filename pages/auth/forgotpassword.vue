<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">FORGOT PASSWORD ?</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                >
              </div>
            </div>
            <div v-if="succes" class="notification is-success">
              {{ succes }}
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Notification from '~/components/Notification'

  export default {
    middleware: 'guest',
    components: {
      Notification,
    },

    data() {
      return {
        email: '',
        error: null,
        succes: null
      }
    },

    methods: {
      async login() {
        try {
          await this.$axios.post('/auth/forgot-password', {
            email: this.email
          })
          this.succes = 'Email successfully sent.'
        } catch (e) {
          this.error = "Invalid email"
        }
      }
    }
  }
</script>

<style scoped>

</style>
