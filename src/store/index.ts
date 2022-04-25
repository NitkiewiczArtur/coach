import {createLogger, createStore} from 'vuex'
import workoutResult from "@/store/modules/workoutResult";
import loader from "@/store/modules/loader";
import auth from "@/store/modules/auth";

const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    setError({commit}, error) {
      commit('SET_ERROR', error)
    }
  },
  modules: {workoutResult, loader, auth},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
