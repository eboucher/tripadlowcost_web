<template>
  <div class="text-xs-center">
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
import Trip from '@/components/base/Trip'

export default {
  components: {
    Trip
  },
  watch: {
    page: async function (newValue) {
      this.loading = true
        const voyages = await this.$axios.get(`/voyages?_start=${(newValue - 1) * 12}&_limit=12&_sort=created_at:DESC`)
          .then(res => {
            return res.data
          })
      this.trips = {
          ...voyages
      }
      this.loading = false
    }
  },

  data() {
    return {
      page: 1,
      loading: false,
    }
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
    }
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
