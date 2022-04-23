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
import {getWorkoutById} from "@/services/workoutService";
import ExerciseResult from "@/model/ExerciseResult";

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
    setDayOfWorkout(state, dayOfWorkout: Date) {
        state.newWorkoutResult.dayOfWorkout = dayOfWorkout;
    },
    addExerciseSet(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.loads.push(setResult.load)
        exerciseResultToEdit.reps.push(setResult.reps)
    },
    removeExerciseSet(state, exerciseId: string) {
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == exerciseId)
        exerciseResultToEdit.loads.pop()
        exerciseResultToEdit.reps.pop()
    }
};

const actions = {
    async initNewWorkoutResult({commit}, workoutId: string) {
        const workoutResults = await getResultsByWorkoutId(workoutId, 5)
        //hack, dayOfWorkout saved as String to make display date in dateInput possible.
        // mapToSnapshot in workoutResultService handles it
        let lastExerciseResults
        if (!workoutResults.length) {
            const workout = await getWorkoutById(workoutId)
            lastExerciseResults = workout?.exercises.map(exerciseId => ({
                exerciseId,
                loads: [],
                reps: []
            } as ExerciseResult))
        } else {
            lastExerciseResults = getLastWorkoutResultsExerciseResults(workoutResults)
        }
        const newWorkoutResult = {
            dayOfWorkout: getCurrentDateString(),
            exerciseResults: lastExerciseResults,
            timeOfWorkout: DEFAULT_TIME_OF_WORKOUT,
            workoutId: workoutId,
            userId: currentUserId(),
        }
        commit('setWorkoutResult', newWorkoutResult)
        return Promise.resolve(newWorkoutResult)
    },
    async finishWorkout({state}) {
        console.log("state.newWorkoutResult", state.newWorkoutResult);
        return saveWorkoutResult(state.newWorkoutResult)
    },
    setDayOfWorkout({commit}, dayOfWorkout: Date) {
        commit('setDayOfWorkout', dayOfWorkout)
    },
    setWorkoutTime({commit}, timeOfWorkout: number) {
        commit('setWorkoutTime', timeOfWorkout)
    },
    removeExerciseSet({commit}, exerciseId) {
        commit('removeExerciseSet', exerciseId)
    },
    addExerciseSet({commit}, payload: ExerciseSetPayload) {
        commit('addExerciseSet', payload)
    },
    setExerciseSetLoad({commit}, payload: ExerciseSetPayload) {
        commit('setExerciseSetLoad', payload)
    },
    setExerciseSetReps({commit}, payload: ExerciseSetPayload) {
        commit('setExerciseSetReps', payload)
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
