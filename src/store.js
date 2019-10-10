import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// var base_url = `https://dev-tripadlowcost.herokuapp.com/`;

export default new Vuex.Store({

  state: {
    token: null,
    user: null
  },
  
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },

  actions: {
    async login({commit, state}, userInfos) {

      await axios.post(`https://dev-tripadlowcost.herokuapp.com/auth/local`, {
        identifier: userInfos.username,
        password: userInfos.password
      }).then(response => {
        console.log(response);
        commit('setToken', response);
      })
    },

    async getUser({commit, state}, jwt) {

      await axios.get(`https://dev-tripadlowcost.herokuapp.com/users/me`, {
          headers: {
            Authorization: "bearer " + jwt,
          }
      }).then(response => {
        commit('setUser', response);
      })
    },
    
    async register({commit, state}, userInfos) {

      axios.post(`https://dev-tripadlowcost.herokuapp.com/auth/local/register`, {
        username: userInfos.username,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
        password: userInfos.password,
        adress: userInfos.adress,
        phone: userInfos.phone
      }).then(response => {
        commit('setToken', response);
      })
    },
    
    async getTrips() {
      return await axios.get(`https://dev-tripadlowcost.herokuapp.com/voyages/`);
    },
    
    /*
    async getMyProfile({}) {
      return await axios.get(`https://dev-tripadlowcost.herokuapp.com/voyages?${query.query}`);
    },
    */
    
    async createTrip({commit, state}, tripInfos) {
      const newTrip = await axios.post('https://dev-tripadlowcost.herokuapp.com/voyages', {
        title: tripInfos.title,
        start: tripInfos.start,
        end: tripInfos.end,
        description: tripInfos.description,
        close: false
      },
      {
        headers: {
          Authorization: "bearer " + tripInfos.jwt,
        }
      })
      return newTrip;
    },

    async uploadImage({commit, state}, formData) {
      await axios.post(`https://dev-tripadlowcost.herokuapp.com/upload`,
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.getJWT
          }
        }).then(response => {
          commit('setToken', response);
      })
    }
    
  },
  
  getters: {
    isAuthenticated: (state) => {
      return state.token != null;
    },

    loggedUser: (state) => {
      return state.token.data.user;
    },

    fullUser: (state) => {
      return state.user;
    },

    getUsername: (state) => {
      return state.token.data.username;
    },

    getJWT: (state) => {
      return state.token.data.jwt;
    }
  }
});