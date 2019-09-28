<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Register!</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">Username *</label>
              <div class="control">
                <input
                  @keydown.space.prevent
                  type="text"
                  class="input"
                  name="username"
                  v-model="username"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Lastname *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="lastname"
                  v-model="lastname"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Firstname *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="firstname"
                  v-model="firstname"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Email *</label>
              <div class="control">
                <input
                  @keydown.space.prevent
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Adress</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="adress"
                  v-model="adress"
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Phone number</label>
              <div class="control">
                <input
                  type="tel"
                  class="input"
                  name="phone"
                  v-model="phone"
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password *</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm password *</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="confirmPassword"
                  required
                >
              </div>
            </div>
            <input type="checkbox" id="checkbox" v-model="checked">
            <label for="checkbox">Do you accept our  <nuxt-link to="/about/terms-and-conditions">terms & conditions ?</nuxt-link></label>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Register</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        lastname: '',
        firstname: '',
        adress: '',
        phone: '',
        checked: '',
        error: null
      }
    },

    methods: {
      async register() {
        if(this.password !== this.confirmPassword) {
          this.error = "Passwords don't match."
          return
        }
        if(!this.checked){
          this.error = "Please accept our terms & condtions."
          return
        }
        try {
          await this.$axios.post('/auth/local/register', {
            username: this.username,
            email: this.email,
            password: this.password,
            adress: this.adress,
            phone: this.phone,
            lastname: this.lastname,
            firstname: this.firstname
          })

          await this.$auth.loginWith('local', {
            data: {
              identifier: this.username,
              password: this.password
            }
          })

          this.$router.push('/')
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    }
  }
</script>
