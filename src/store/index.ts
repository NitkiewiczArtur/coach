import {createLogger, createStore} from 'vuex'
import exercise from "@/store/modules/exercise";

const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
  modules: {exercise},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
