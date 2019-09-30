export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
};

export const state = () => ({
  picture: ''
})

export const mutations = {
  setPicture(state, payload) {
    state.picture = payload
  }
}
