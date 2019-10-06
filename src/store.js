import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

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
    // retrieveTokens(context, credentials) {

    //   return new Promise((resolve, reject) => {
    //     axios.post('/login', {
    //       identifier: credentials.username,
    //       password: credentials.password,
    //     })
    //       .then(response => {
    //         const token = response.data.access_token

    //         localStorage.setItem('access_token', token)
    //         context.commit('retrieveToken', token)
    //         resolve(response)
    //         // console.log(response);
    //         // context.commit('addTodo', response.data)
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         reject(error)
    //       })
    //     })
    // }
    async login({commit, state}, userInfos) {

      axios.post(`https://dev-tripadlowcost.herokuapp.com/login`, {
        identifier: userInfos.username,
        password: userInfos.password,
      }).then(response => {
        console.log(response);
      })

      //commit('setToken', token);
    }
  },
  
  getters: {
    isAuthenticated: (state) => {
      return state.token != null;
    }
  }
});