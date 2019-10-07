<template>
	<v-layout column align-center justify-center>
    <Notification :message="error" v-if="error"/>
    <v-form 
      @submit.prevent="login"
      ref="form"
    >
      <v-text-field
        v-model="username"
        :rules="[rules.required]"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :rules="[rules.required]"
        :type="show ? 'text' : 'password'"
        name="password"
        label="Password"
        @click:append="show = !show"
      ></v-text-field>
  
      <v-btn
        type="submit"
        color="success"
        class="mr-4"
        @click.native="login"
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
    name: 'login',
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
      login() {
        this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        
        this.$router.push({ name: "Home" });
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
