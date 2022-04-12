import WorkoutResult from "@/model/WorkoutResult";
import SetResult from "@/model/SetResult";
import {
    getLastWorkoutResultsExerciseResults,
    getResultsByWorkoutId,
    saveWorkoutResult
} from "@/services/workoutResultService";
import {getCurrentDateString} from "@/utils/utils";
import {DEFAULT_TIME_OF_WORKOUT} from "@/utils/globalParameters";
import {currentUserId} from "@/services/authService";

const state = {
    newWorkoutResult: {} as WorkoutResult
};
const getters = {
    getExerciseResultById: (state) => (id: string) => {
        return state.newWorkoutResult.exerciseResults.find((result) => result.exerciseId === id)
    },
};
const mutations = {
    setWorkoutResult(state, workoutResult: WorkoutResult) {
        state.newWorkoutResult = workoutResult;
    },
    setExerciseSetLoad(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.loads[setResult.index] = setResult.load
    },
    setExerciseSetReps(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.reps[setResult.index] = setResult.reps
    },
    setWorkoutTime(state, timeOfWorkout: number) {
        state.newWorkoutResult.timeOfWorkout = timeOfWorkout;
    },
    //TODO: Promise?
    addSet(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.loads.push(setResult.load)
        exerciseResultToEdit.reps.push(setResult.reps)
    },
    removeSet(state, exerciseId: string) {
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == exerciseId)
        exerciseResultToEdit.loads.pop()
        exerciseResultToEdit.reps.pop()
    }
};

const actions = {
    //TODO: getLast? do firebase
    async initNewWorkoutResult({commit}, workoutId) {
        const workoutResults = await getResultsByWorkoutId(workoutId, 5)
        const newWorkoutResult = {
            dayOfWorkout: getCurrentDateString(),
            exerciseResults: getLastWorkoutResultsExerciseResults(workoutResults),
            timeOfWorkout: DEFAULT_TIME_OF_WORKOUT,
            workoutId: workoutId,
            userId: currentUserId(),
        }
        commit('setWorkoutResult', newWorkoutResult)
    },
    async finishWorkout({state}) {
        console.log("state.newWorkoutResult", state.newWorkoutResult);
        return saveWorkoutResult(state.newWorkoutResult)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export interface ExerciseSetPayload {
    exerciseId: string,
    newSetResult: SetResult
}
