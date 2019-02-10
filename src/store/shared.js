export default {
  state: {
    loading: false,
    error: null,
    loading2: false,
    loading3: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoading2 (state, payload) {
      state.loading2 = payload
    },
    setLoading3 (state, payload) {
      state.loading3 = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setLoading2 ({commit}, payload) {
      commit('setLoading2', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    setLoading3 ({commit}, payload) {
      commit('setLoading3', payload)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    loading2 (state) {
      return state.loading2
    },
    loading3 (state) {
      return state.loading3
    },
    error (state) {
      return state.error
    }
  }
}
