import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// var base_url = `https://dev-tripadlowcost.herokuapp.com/`;

export default new Vuex.Store({

  state: {
    token: null
  },
  
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },

  actions: {
    async login({commit, state}, userInfos) {

      axios.post(`https://dev-tripadlowcost.herokuapp.com/auth/local`, {
        identifier: userInfos.username,
        password: userInfos.password
      }).then(response => {
        commit('setToken', response);
      })
    },
    
    async register({commit, state}, userInfos) {

      axios.post(`https://dev-tripadlowcost.herokuapp.com/auth/local/register`, {
        identifier: userInfos.username,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
        password: userInfos.password,
        adress: userInfos.adress,
        phone: userInfos.phone
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
    }
  }
});