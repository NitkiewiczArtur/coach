import {createLogger, createStore} from 'vuex'
import workoutResult from "@/store/modules/workoutResult";
import loader from "@/store/modules/loader";
import auth from "@/store/modules/auth";

const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
  state:{
    errors: []
  },
  modules: {workoutResult, loader, auth},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
