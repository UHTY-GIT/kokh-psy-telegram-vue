import { createStore } from 'vuex'

export default createStore({
  state: {
    debugMode: false,
  },
  getters: {
    isDebugMode: (state) => state.debugMode,
  },
  mutations: {
    SET_DEBUG_MODE(state, value) {
      state.debugMode = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
