<template>
	<v-layout column align-center justify-center>
      <v-toolbar-title>Register</v-toolbar-title>
      <v-form 
        @submit.prevent="register"
        ref="form"
      >
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="rules.required"
          label="Username"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="First name"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="lastname"
          :counter="10"
          label="Last name"
          required
        ></v-text-field>
    
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="adress"
          :counter="10"
          label="Adress"
          adress-icon="place"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="phone"
          :counter="10"
          label="Phone number"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm password"
          @click:append="show1 = !show1"
        ></v-text-field>
    
        <!-- <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox> -->
    
        <v-btn
          color="success"
          class="mr-4"
          @click="register"
        >
          Validate
        </v-btn>
    
        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
    
        <v-btn
          color="warning"
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </v-form>
  </v-layout>
</template>

<script>
  import Notification from '@/components/base/Notification'

  export default {
    name: 'register',
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
        error: null,
        
        show1: false,
        show2: false,
        password: '',
        confirmPassword: '',
        checkbox: false,
        rules: {
          required: value => !!value || 'Required',
          min: v => v.length >= 6 || 'Min 6 characters',
          usernameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length < 4) || 'Username must be at least 4 characters',
            v => (v && v.length <= 10) || 'Username must be less than 10 characters',
          ],
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
        },
      }
    },

    methods: {
      register() {
        if(this.password !== this.confirmPassword) {
          this.error = "Passwords don't match."
          return
        }
        try {
          this.$store.dispatch("register", {
            username: this.username,
            email: this.email,
            password: this.password,
            adress: this.adress,
            phone: this.phone,
            lastname: this.lastname,
            firstname: this.firstname
          }),

          this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });

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
