<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">RESET PASSWORD ?</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password confirmation</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="passwordConfirmation"
                  v-model="passwordConfirmation"
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
        password: '',
        passwordConfirmation: '',
        error: null,
        succes: null
      }
    },

    methods: {
      async login() {
        try {
          await this.$axios.post('/auth/reset-password', {
            code: this.$route.query.code,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation
          })
          this.succes = 'Password changed !'
        } catch (e) {
          this.error = e
        }
      }
    }
  }
</script>

<style scoped>

</style>
