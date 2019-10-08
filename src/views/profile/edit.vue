<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Edit profile!</h2>

          <Notification :message="error" v-if="error"/>
          <p>
            <strong>Profile Picture:</strong>
            <v-avatar :size="128">
              <img v-if="loggedInUser && this.$auth.$state.user.picture" class="profilepic" :src="this.$auth.$state.user.picture.url" >
              <img v-else class="profilepic" src="../../static/defaultpic.png" alt= "profile">
            </v-avatar>
          </p>
          <div class="container">
            <div class="large-12 medium-12 small-12 cell">
              <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              </label>
            </div>
          </div>
          <p>
            <strong>Username:</strong>
            {{ loggedInUser.username }}
          </p>
          <p>
            <strong>Lastname:</strong>
            {{ loggedInUser.lastname }}
          </p>
          <p>
            <strong>Firstname:</strong>
            {{ loggedInUser.firstname }}
          </p>
          <form method="post" @submit.prevent="update">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Update</button>
            </div>
          </form>
          <v-divider></v-divider>
          <strong>Interests:</strong><br>
          <v-chip
            v-for="key in this.$auth.$state.user.interests"
            v-if="key"
            :key="key.id"
            class="ma-2"
            close
            @click:close="deleteInterest(key.id)"
          >
            {{ key.tag }}
          </v-chip>
          <form method="post" @submit.prevent="addInterest">
            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="tag"
                  v-model="tag"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Add interest</button>
            </div>
          </form>
          <v-divider></v-divider>
          <form method="post" @submit.prevent="updatePassword">
            <div class="field">
              <label class="label">New password</label>
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
              <label class="label">Confirm your password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="confirmationPassword"
                  v-model="confirmationPassword"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Change password</button>
            </div>
          </form>
          <div v-if="passwordNote" class="notification is-success">
            {{ passwordNote }}
          </div>
          <v-dialog
            v-model="dialog"
            max-width="350"
          >
            <v-card>
              <v-card-title class="headline">Do you really want to delete your account ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  flat="flat"
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="red"
                  flat="flat"
                  @click="deleteAccount"
                >
                  Yes, delete my account
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            color="red"
            dark
            @click.stop="dialog = true"
          >
            Delete account
          </v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Notification from '@/components/base/Notification'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['loggedInUser'])
    },
    middleware: 'auth',
    components: {
      Notification,
    },

    data() {
      return {
        username: '',
        email: this.$auth.$state.user.email,
        password: '',
        confirmationPassword: '',
        lastname: '',
        firstname: '',
        error: null,
        file: '',
        passwordNote: '',
        tag: '',
        dialog: false,
      }
    },

    methods: {
      async deleteInterest(id) {
        try {
          await this.$axios.delete(`/interests/${id}`,
            {
              headers: {
                Authorization: this.$auth.$storage._state['_token.local']
              }
            })
          await this.$auth.fetchUser()
        } catch (e) {
          this.error = e.response.data.message
        }
      },

      async deleteAccount() {
        console.log(this.$auth.$state.user.id)
        try {
          await this.$axios.delete(`/users/${this.$auth.$state.user.id}`,
            {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
          this.dialog = false
          await this.$auth.logout()
          this.$router.push('/')
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      async addInterest() {
        try {
          await this.$axios.post(`/interests/`, {
            tag: this.tag,
            user: this.$auth.$state.user.id
          }, {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
          await this.$auth.fetchUser()
          this.tag = ''
        } catch (e) {
          this.error = e.response.data.message
        }
      },

      handleFileUpload() {
        this.file = this.$refs.file.files[0];
      },

      async submitFile() {
        let formData = new FormData();
        formData.append('files', this.file);
        formData.append('refId', this.$auth.$state.user.id);
        formData.append('ref', 'user');
        formData.append('source', 'users-permissions');
        formData.append('field', 'picture');
        try {
          await this.$axios.post('/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })

        } catch (e) {
          this.error = e.response.data.message
        }
      },

      updatePassword() {
        if (this.password !== this.confirmationPassword) {
          this.error = 'Password must be the same.'
          return
        }
        this.$axios.put(`/users/${this.$auth.$state.user.id}`, {
            password: this.password
          },
          {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
        this.password = ''
        this.confirmationPassword = ''
        this.passwordNote = 'Successfully changed password'
      },

      async update() {
        try {
          if (this.email !== this.$auth.$state.user.email) {
            await this.$axios.put(`/users/${this.$auth.$state.user.id}`, {
                email: this.email
              },
              {
                headers: {
                  Authorization: this.$auth.$storage._state['_token.local']
                }
              })
          }
          if (this.file) {
            await this.submitFile()
          }
          await this.$auth.fetchUser()
          this.$router.push('/profile')
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    }
  }
</script>
