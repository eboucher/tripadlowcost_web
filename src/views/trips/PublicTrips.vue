<template>
  <div class="text-xs-center">
  <router-view></router-view>
    <section v-if="!loading" class="trips">
      <Trip
        v-for="trip in trips"
        :key="trip.id"
        :title="trip.title"
        :thumbnail="trip.picture"
        :id="trip.id"
        :height="400"
        :width="300"
        :previewText="trip.description"/>
    </section>
    <section v-else>
      <v-progress-circular :width="10"
                          :size="200"
                          color="grey"
                          indeterminate>
      </v-progress-circular>
    </section>
    <v-pagination
      v-model="page"
      :length="maxPages">
    </v-pagination>
  </div>
</template>

<script>
import Trip from '@/components/core/Trip'

export default {
  name: "PublicTrips",

  components: {
    Trip
  },

  data: () => {
    return {
      page: 1,
      loading: false,
      trips: null
    };
  },

  async asyncData({ $axios }) {
    const voyages = await $axios.get('/voyages?_start=0&_limit=12&_sort=created_at:DESC')
      .then(res => {
        return {
          trips : res.data
        }
      })
    const count = await $axios.get('/voyages/count')
      .then(res => {
        return {
          maxPages : Math.trunc(res.data / 12 + 1)
        }
      })
    return {
      ...voyages,
      ...count
    }
  },

  mounted: async function() {
    this.trips = await this.$store.dispatch("getTrips", {query:`/voyages?_start=${(newValue - 1) * 12}&_limit=12&_sort=created_at:DESC`});
    this.trips = this.trips.data;

    if(this.$store.getters.loggedUser && this.$store.getters.loggedUser.interests) {
      const user = this.$store.getters.loggedUser;
      const query = user.interests.map(interest => `interests.tag=${interest.tag}`).join('&')
      this.suggested = await this.$store.dispatch("getTrips", {query:`/voyages?${query}&_limit=5`})
      this.suggested = this.suggested.data;
    }
  },
}
</script>


<style scoped>
.trips {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: auto;
    width: 80%;
    padding-top: 2rem;
}

</style>
