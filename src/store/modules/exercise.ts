import {Exercise} from "@/model/Exercise";

const state = {
    exercises: [] as Exercise[]
};
const getters = {
    getExercises(state) {
        return state.exercises;
    },
};
const mutations = {
    setExercises(state, exercises: Exercise[]) {
        state.exercises = exercises;
    }
};
const actions = {};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
