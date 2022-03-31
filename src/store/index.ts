import {createLogger, createStore} from 'vuex'
import workoutResult from "@/store/modules/workoutResult";

const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
  modules: {workoutResult},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
