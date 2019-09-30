<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Create a public trip</h2>
          <h2 class="title has-text-centered">Post your trip details so that it can be discovered by TripAdLowCost surfers</h2>

          <Notification :message="error" v-if="error"/>
          <form method="post" @submit.prevent="createTrip">
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
            <div class="large-12 medium-12 small-12 cell">
              <label>picture
                <input type="file" id="picture" ref="picture" v-on:change="handleFileUpload()"/>
              </label>
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
              <button type="submit" class="button is-dark is-fullwidth">Create</button>
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
    middleware: 'auth',
    components: {
      Notification,
    },
    date() {
      return {
        title: '',
        start: '',
        end: '',
        picture: '',
        description: '',
        error: ''
      }
    },
    methods: {
      async createTrip() {
        try {
          const voyage = await this.$axios.post('/voyages', {
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
          await this.submitFile(voyage.data.id)
          this.$router.push(`/trips/${voyage.data.id}/edit`)
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      handleFileUpload() {
        this.picture = this.$refs.picture.files[0];
      },
      async submitFile(voyageId) {
        let formData = new FormData();
        formData.append('files', this.picture);
        formData.append('refId', voyageId);
        formData.append('ref', 'voyage');
        formData.append('field', 'picture');
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
    }
  }
</script>

<style scoped>

</style>
