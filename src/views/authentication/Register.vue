<template>
	<v-layout column align-center justify-center>
      <v-toolbar-title>Register</v-toolbar-title>
      <v-form @submit.prevent="register"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="[nameRules, rules.required]"
          label="Username"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="[nameRules, rules.required]"
          label="First name"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="[nameRules, rules.required]"
          label="Last name"
          required
        ></v-text-field>
    
        <v-text-field
          v-model="email"
          :rules="[emailRules, rules.required]"
          label="E-mail"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Adress"
          adress-icon="place"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Phone number"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm password"
          @click:append="show1 = !show1"
        ></v-text-field>
    
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
    
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
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
        error: null,
        
        show1: false,
        show2: false,
        password: '',
        confirmPassword: '',
        rules: {
          required: value => !!value || 'Required',
          min: v => v.length >= 6 || 'Min 6 characters',
        },
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
