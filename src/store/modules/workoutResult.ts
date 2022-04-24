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
    SET_WORKOUT_RESULT(state, workoutResult: WorkoutResult) {
        state.newWorkoutResult = workoutResult;
    },
    SET_EXERCISE_SET_LOAD(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.loads[setResult.index] = setResult.load
    },
    SET_EXERCISE_SET_REPS(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.reps[setResult.index] = setResult.reps
    },
    SET_WORKOUT_TIME(state, timeOfWorkout: number) {
        state.newWorkoutResult.timeOfWorkout = timeOfWorkout;
    },
    SET_DAY_OF_WORKOUT(state, dayOfWorkout: Date) {
        state.newWorkoutResult.dayOfWorkout = dayOfWorkout;
    },
    ADD_EXERCISE_SET(state, payload: ExerciseSetPayload) {
        const setResult = payload.newSetResult
        const exerciseResultToEdit = state.newWorkoutResult.exerciseResults
            .find(result => result.exerciseId == payload.exerciseId)
        exerciseResultToEdit.loads.push(setResult.load)
        exerciseResultToEdit.reps.push(setResult.reps)
    },
    REMOVE_EXERCISE_SET(state, exerciseId: string) {
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
        commit('SET_WORKOUT_RESULT', newWorkoutResult)
        return Promise.resolve(newWorkoutResult)
    },
    async finishWorkout({state}) {
        console.log("state.newWorkoutResult", state.newWorkoutResult);
        return saveWorkoutResult(state.newWorkoutResult)
    },
    setDayOfWorkout({commit}, dayOfWorkout: Date) {
        commit('SET_DAY_OF_WORKOUT', dayOfWorkout)
    },
    setWorkoutTime({commit}, timeOfWorkout: number) {
        commit('SET_WORKOUT_TIME', timeOfWorkout)
    },
    removeExerciseSet({commit}, exerciseId) {
        commit('REMOVE_EXERCISE_SET', exerciseId)
    },
    addExerciseSet({commit}, payload: ExerciseSetPayload) {
        commit('ADD_EXERCISE_SET', payload)
    },
    setExerciseSetLoad({commit}, payload: ExerciseSetPayload) {
        commit('SET_EXERCISE_SET_LOAD', payload)
    },
    setExerciseSetReps({commit}, payload: ExerciseSetPayload) {
        commit('SET_EXERCISE_SET_REPS', payload)
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
