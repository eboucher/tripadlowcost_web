<template>
	<v-layout column align-center justify-center>
    <v-toolbar-title>
      Log in to TripadLowCost
    </v-toolbar-title>

    <Notification :message="error" v-if="error"/>
    <v-form 
      @submit.prevent="login"
      method="post"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="username"
        :counter="10"
        :rules="[nameRules, rules.required]"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show ? 'text' : 'password'"
        name="password"
        label="Password"
        @click:append="show = !show"
      ></v-text-field>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        type="submit"
        @click="validate"
      >
        Log In
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
    <div class="has-text-centered" style="margin-top: 20px">
      <p>
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
    <p>
      <router-link to="/auth/forgotpassword">Forgot your password ?</router-link>
    </p>
    </div>
  </v-layout>
</template>

<script>
  import Notification from '@/components/base/Notification'

  export default {
    middleware: 'guest',
    components: {
      Notification,
    },

    data() {
      return {
        username: '',
        password: '',
        error: null,
        
        show: false,
        password: '',
        rules: {
          required: value => !!value || 'Required',
        },
      }
    },

    methods: {
      async login() {
        try {
          await this.$auth.loginWith('local', {
            data: {
              identifier: this.username,
              password: this.password
            }
          })
        } catch (e) {
          this.error = e.response.data.message
        }
      },

      reset() {
        this.$refs.form.reset()
      },

      resetValidation () {
        this.$refs.form.resetValidation()
      },
    }
  }
</script>
