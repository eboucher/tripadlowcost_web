import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {},
  
  mutations: {},

  actions: {
    retrieveTokens(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          identifier: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.access_token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    }
  }
});