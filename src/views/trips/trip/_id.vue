<template>
  <v-flex xs12 sm6>
    <v-card
      :min-width= "width"
      :max-width = "width"
      :min-height = "height"
      :max-height = "height">
      <v-card-title primary-title>{{ this.$route.params }}</v-card-title>
      <v-img
        :height="height/2"
        :src="picture"
        contain>
      </v-img>

      <v-card-text v-if="previewText && previewText.length > width /2">
      {{ previewText.slice(0, width/2) }} ... (voir plus)
      </v-card-text>
      <v-card-text v-if="previewText && previewText.length <= width / 2" >
        {{ previewText }}
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["thumbnail", "title", "previewText", "id", "author", "height", "width"],

  data: () => {
    if(this.thumbnail)
      return {
        picture: this.thumbnail.url
      }
    else
      return {
        picture: 'https://webhostingmedia.net/wp-content/uploads/2018/01/http-error-404-not-found.png'
      }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }

</style>
