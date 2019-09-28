<template>
  <section class="section">
    <div class="middle" style="background-color:#bbb;">
      <div class="container">
        <Carousel
          :trips="trips"/>
        <div v-if="loggedInUser && suggested.length > 0">
        <h1 class="title">Suggestions</h1>
        <Carousel
          :trips="suggested"/>
        </div>
      </div>
    </div>

    <TripPreview
      v-for="trip in trips"
      :key="trip.id"
      :title="trip.title"
      :excerpt="trip.description"
      :thumbnailImage="trip.thumbnail"
      :id="trip.id" /> 
  </section>
</template>

<script>
  import Carousel from '@/components/Carousel'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['loggedInUser'])
    },
    components: {
      Carousel,
    },

    async asyncData({ app }) {
      const recent = await app.$axios.get('/voyages?_sort=created_at:DESC&_limit=5')
        .then(res => {
          return {
            trips : res.data
          }
        })
      if(app.$auth.$state.user && app.$auth.$state.user.interests){
        const query = app.$auth.$state.user.interests.map(interest => `interests.tag=${interest.tag}`).join('&')
        const suggestion = await app.$axios.get(`/voyages?${query}&_limit=5`)
          .then(res => {
            return {
              suggested : res.data
            }
          })
        return {
          ...recent,
          ...suggestion
        }
      }
      return recent
    }
  }
</script>

<style>

  .section {
    justify-content: center;
    margin: auto;
  }

  .v-card {
    margin: auto;
  }

  @media (min-width: 35rem) {
    #posts {
      flex-direction: row;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  * {
  box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  /* Style the header */
  .header {
    grid-area: header;
    background-color: #f1f1f1;
    padding: 30px;
    text-align: center;
    font-size: 35px;
  }

  /* The grid container */
  .grid-container {
    display: grid;
    grid-template-areas: 
      'header header header header header header' 
      'left left middle middle right right' 
      'footer footer footer footer footer footer';
    /* grid-column-gap: 10px; - if you want gap between the columns */
  } 

  /* Style the middle column */
  .middle {
    padding: 10px;
    border-radius: 12px;
    margin-left: 350px;
    margin-right: 350px;
    grid-area: middle;
  }

  /* Style the title */
  .title {
    color: rgb(48, 63, 131);
    text-align: center;
    font-size: large;
  }
</style>
