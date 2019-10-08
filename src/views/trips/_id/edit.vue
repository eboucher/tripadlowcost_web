<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <div>
          <div class="container">
          <h2 class="title has-text-centered">Manage your trip</h2>
          <Notification :message="error" v-if="error"/>
          <img v-if="trip.picture" class="center" :src="trip.picture.url" :alt="trip.title">
          <form method="post" @submit.prevent="updateTrip">
            <div class="large-12 medium-12 small-12 cell">
              <label>Update picture
                <input type="file" id="picture" ref="picture" v-on:change="handleFileUpload()" accept="image/png, image/jpeg"/>
              </label>
            </div>
            <div class="field">
              <label class="label">Title *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="title"
                  v-model="title"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">start *</label>
              <input
                type="date"
                class="input"
                name="start"
                v-model="start"
                required
              >
              <label class="label">end</label>
              <input
                type="date"
                class="input"
                name="end"
                v-model="end"
              >
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="description">
                <textarea
                  type="text"
                  class="input"
                  name="description"
                  v-model="description"
                ></textarea>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Update Trip</button>
            </div>
          </form>
            <v-divider></v-divider>
            <strong>Interests:</strong><br>
            <v-chip
              v-for="key in this.trip.interests"
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
          </div>
          <div class="container">
          <div class="navbar-etape">
          <v-card
            max-width="400"
            tile
          >
          <v-list>
            <v-list-item-group v-model="selection" color="primary">
            <v-subheader>STEPS</v-subheader>
            <v-list-item
            v-for="etape in trip.etapes"
            :key="etape.id">
              <v-list-item-content>
                {{etape.title}}
              </v-list-item-content>
            </v-list-item>
              <v-list-item
              :key="trip.etapes.length">
                <v-list-item-content>
                  New step
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          </v-card>
          </div>
            <div class="etape-display">
              <v-layout column justify-center align-center v-if="etapeSelected">
                <v-flex xs12 sm8 md6>
                  <div class="text-xs-center">
                    <h1>{{ etapeSelected.title }}</h1>
                    <v-carousel v-if="etapeSelected.pictures.length > 0"
                                max="500">
                      <v-carousel-item
                        v-for="(item,i) in etapeSelected.pictures"
                        :key="i"
                        :src="item.url"
                        contain
                        height="500px"
                        width="1000px"
                      ></v-carousel-item>
                    </v-carousel>
                  </div>
                </v-flex>
                <form method="post" @submit.prevent="addOrUpdateStep">
                  <div class="large-12 medium-12 small-12 cell">
                    <label>Update picture
                      <input type="file" id="pictures" ref="pictures" multiple v-on:change="handlePicturesUpload()" accept="image/png, image/jpeg"/>
                    </label>
                  </div>
                  <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                      <input
                        type="text"
                        class="input"
                        name="title"
                        v-model="etapeSelected.title"
                        required
                      >
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">start *</label>
                    <input
                      type="date"
                      class="input"
                      name="start"
                      v-model="etapeSelected.start"
                    >
                  </div>
                  <div class="field">
                    <label class="label">Address</label>
                    <input
                      type="text"
                      class="input"
                      name="address"
                      v-model="etapeSelected.address"
                    >
                  </div>
                  <div class="field">
                    <label class="label">Description</label>
                    <div class="description">
                <textarea
                  type="text"
                  class="input"
                  name="description"
                  v-model="etapeSelected.comment"
                ></textarea>
                    </div>
                  </div>
                  <v-rating v-model="etapeSelected.mark"></v-rating>
                  <div class="control">
                    <button type="submit" class="button is-dark is-fullwidth">Update</button>
                  </div>
                </form>
              </v-layout>
          </div>
        </div>
        </div>
</template>

<script>
  import Notification from '~/components/Notification'

  export default {
    middleware: 'auth',
    components: {
      Notification,
    },
    watch: {
      selection: async function (newValue) {
        console.log(newValue)
        if(this.trip.etapes.length <= newValue){
          this.etapeSelected = {
            title: null,
            start: null,
            comment: null,
            pictures: [],
            mark: 1,
            adress: null,
          }
        } else {
          this.etapeSelected = this.trip.etapes[newValue]
          this.etapeSelected.start = new Date(this.etapeSelected.start).toISOString().substring(0, 10)
        }
      }
    },
    data() {
      return {
        end: null,
        start: null,
        description: null,
        title: null,
        error: '',
        picture: null,
        etapeSelected: null,
        selection: null,
        pictures: null,
      }
    },
    mounted() {
      if(this.trip.start)
        this.start = new Date(this.trip.start).toISOString().substring(0, 10)
      if(this.trip.end)
        this.end = new Date(this.trip.end).toISOString().substring(0, 10)
      this.description = this.trip.description
      this.title = this.trip.title
    },
    asyncData({ app, params }) {
      return app.$axios.get(`/voyages/${params.id}`)
        .then(res => {
          return {
            trip : res.data
          }
        })
    },
    methods: {
      async updateTrip() {
        if(!this.end)
          this.end = null
        try {
          await this.$axios.put(`/voyages/${this.trip.id}`, {
              title: this.title,
              start: this.start,
              end: this.end,
              description: this.description,
              close: false
            },
            {
              headers: {
                Authorization: this.$auth.$storage._state['_token.local']
              }
            })
          if(this.picture){
            await this.submitFile(this.picture, this.trip.id, 'voyage', 'picture')
          }
          this.trip = await this.$axios.get(`/voyages/${this.trip.id}`)
            .then(res => res.data)
          // this.$router.push(`/trips/${this.trip.id}`)
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      async deleteInterest(id) {
        try {
          await this.$axios.delete(`/interests/${id}`,
            {
              headers: {
                Authorization: this.$auth.$storage._state['_token.local']
              }
            })
          this.trip = await this.$axios.get(`/voyages/${this.trip.id}`)
            .then(res => res.data)
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      async addInterest() {
        try {
          await this.$axios.post(`/interests/`, {
            tag: this.tag,
            voyage: this.trip.id
          }, {
            headers: {
              Authorization: this.$auth.$storage._state['_token.local']
            }
          })
          this.trip = await this.$axios.get(`/voyages/${this.trip.id}`)
            .then(res => res.data)
          this.tag = ''
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      handleFileUpload() {
        this.picture = this.$refs.picture.files[0];
      },
      handlePicturesUpload() {
        this.pictures = this.$refs.pictures.files;
      },
      async submitFile(file, refId, model, modelField) {
        console.log(file)
        let formData = new FormData();
        formData.append('files', file);
        formData.append('refId', refId);
        formData.append('ref', model);
        formData.append('field', modelField);
        try {
          await this.$axios.post('/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: this.$auth.$storage._state['_token.local']
              }
            })
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      async addOrUpdateStep(){
        try {
          if(this.etapeSelected.id){
            await this.$axios.put(`/etapes/${this.etapeSelected.id}`, {
                title: this.etapeSelected.title,
                start: this.etapeSelected.start,
                comment: this.etapeSelected.comment,
                mark: this.etapeSelected.mark,
                adress: this.etapeSelected.adress,
                pictures: this.etapeSelected.pictures
              },
              {
                headers: {
                  Authorization: this.$auth.$storage._state['_token.local']
                }
              })
          } else {
            this.etapeSelected.id = await this.$axios.post(`/etapes`, {
                title: this.etapeSelected.title,
                start: this.etapeSelected.start,
                comment: this.etapeSelected.comment,
                mark: this.etapeSelected.mark,
                voyage: this.trip.id,
                adress: this.etapeSelected.adress
              },
              {
                headers: {
                  Authorization: this.$auth.$storage._state['_token.local']
                }
              }).then(res => res.data.id)
          }
          if(this.pictures){
            for(let i = 0; i < this.pictures.length; i++ )
              await this.submitFile(this.pictures[i], this.etapeSelected.id, 'etape', 'pictures')
          }
          this.selection = null
          this.trip = await this.$axios.get(`/voyages/${this.trip.id}`)
            .then(res => res.data)
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      formatDate(date) {
        const fullDate = new Date(date)
        const year = fullDate.getFullYear()
        const month = fullDate.getMonth() + 1
        const day = fullDate.getDate()
        return `${day}/${month}/${year}`
      }
    }
    }
</script>
<style>
  .navbar-etape{
    width: 10%;
    margin-right: 1%;
    display: inline-flex;
  }
  .etape-display{
    width: 60%;
    display: inline-flex;
  }
</style>
