import {WorkoutResult} from "@/model/WorkoutResult";
import {SetResult} from "@/model/SetResult";
import {saveWorkoutResult} from "@/services/workoutResultService";

const state = {
    newWorkoutResult: {},
};
const getters = {};
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
    async finishWorkout({state}) {
        console.log("state.newWorkoutResult");
        console.log(state.newWorkoutResult);
        await saveWorkoutResult(state.newWorkoutResult)
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
