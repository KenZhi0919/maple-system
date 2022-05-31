import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      name: '',
      email: '',
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
  },
  modules: {},
})
