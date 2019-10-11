<template>
  <v-container fluid grid-list-xl>
    <v-layout column align-center justify-space-around row fill-height>
      <v-toolbar-title class="display-1 text-center">Share your trip so that it can be discovered by TripadLowCost surfers</v-toolbar-title>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="title"
          label="Title"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <v-file-input
          type="file"
          :rules="[rules.required, rules.imageRules]"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Select an image"
          prepend-icon="mdi-camera"
          label="Image"
          v-model="image"
          ref="picture"
          v-on:change="handleFileUpload()"
        ></v-file-input>

        <v-row justify="space-around">
          <v-date-picker
            :rules="[rules.required]"
            v-model="start" 
            color="green lighten-1"
            ></v-date-picker>

          <v-date-picker 
          :rules="[rules.required]"
          v-model="end" 
          color="green lighten-1"
          ></v-date-picker>
        </v-row>

        <v-textarea
          v-model="description"
          outlined
          name="input-7-4"
          label="Description"
          value=""
        ></v-textarea>

        <v-btn
          :disabled="!valid"
          color="success"
          @click="createTrip"
        >
          Create trip
        </v-btn>

        <v-btn
          color="error"
          @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
  
  export default {
    name: 'post',

    data: () => ({
      valid: true,

      title: '',
      image: null,
      start: new Date().toISOString().substr(0, 10),
      end: new Date().toISOString().substr(0, 10),
      description: '',
      error:'',

      rules: {
        required: v => !!v || 'Required',
        imageRules: value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
      },
    }),

    methods: {

      reset () {
        this.$refs.form.reset()
      },

      async createTrip() {
        const newTrip = await this.$store.dispatch("createTrip", {
            title: this.title,
            start: this.start,
            end: this.end,
            description: this.description,
            close: false,
            jwt: this.$store.getters.getJWT
          })
        await this.submitFile(newTrip.data.id);
        this.$router.push(`/trips/${newTrip.data.id}/edit`)
      },

      handleFileUpload() {
        this.image = this.$refs.picture.files[0];
      },

      async submitFile(tripId) {
        let formData = new FormData();
        formData.append('files', this.image);
        formData.append('refId', tripId);
        formData.append('ref', 'voyage');
        formData.append('field', 'picture');
        await this.$store.dispatch("uploadImage", formData);
      },

    }
  }
</script>