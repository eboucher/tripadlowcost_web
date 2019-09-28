<template>
  <v-card
  max-width="1000">
  <v-carousel
  height="500"
  cycle="true">
    <v-carousel-item
      v-for="trip in trips"
      :key="trip.id"
      contain>
    <Trip
      :key="trip.id"
      :title="trip.title"
      :thumbnail="trip.picture"
      :id="trip.id"
      :height="500"
      :width="1000"
      :previewText="trip.description"/>
    </v-carousel-item>
  </v-carousel>
  </v-card>
</template>

<script>
  import Trip from '@/components/Trip'

  export default {
    components: {
      Trip
    },
    name: "carousel",
    props: ["trips"],
    }
</script>

<style scoped>

</style>
