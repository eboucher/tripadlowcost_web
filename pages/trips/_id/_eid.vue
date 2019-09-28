<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <h1>{{ etape.title }}</h1>
        <v-carousel v-if="etape.pictures.length > 0"
        max="500">
          <v-carousel-item
            v-for="(item,i) in etape.pictures"
            :key="i"
            :src="item.url"
            contain
          height="500px"
          width="1000px"
          ></v-carousel-item>
        </v-carousel>
      </div>
    </v-flex>
      <v-divider></v-divider>
      <v-rating v-model="etape.mark" :readonly=true></v-rating> {{ this.formatDate(etape.start) }}
      <v-divider></v-divider>
    <v-flex xs12 sm8 md6>
      <div class="container">
        <p> {{ etape.comment }} </p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "_eid",
      middleware: 'auth',
      asyncData({ app, params }) {
        return app.$axios.get(`/etapes/${params.eid}`)
          .then(res => {
            return {
              etape : res.data,
              id: params.id,
              eid: params.id
            }
          })
      },
      methods: {
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

<style scoped>

</style>
