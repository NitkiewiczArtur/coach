import { createLogger, createStore } from 'vuex'

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
