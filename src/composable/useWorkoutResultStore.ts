import {useStore} from "vuex";
import {useCoachRouter} from "@/composable/useCoachRouter";
import {ExerciseSetPayload} from "@/store/modules/workoutResult";

export function useWorkoutResultStore() {
    const store = useStore()
    const {workoutIdFromRoute} = useCoachRouter()

    const getNewWorkoutResultFromStore = () => {
        return store.state.workoutResult.newWorkoutResult
    }
    const dispatchInitNewWorkoutResult = async () => {
        return store.dispatch('workoutResult/initNewWorkoutResult', workoutIdFromRoute);
    }
    const dispatchFinishWorkout = () => {
        return store.dispatch('workoutResult/finishWorkout');
    }
    const commitSetWorkoutTime = (timeOfWorkout: number) => {
        store.commit('workoutResult/setWorkoutTime', timeOfWorkout);
    }
    const commitSetExerciseSetLoad = (payload: ExerciseSetPayload) => {
        store.commit('workoutResult/setExerciseSetLoad', payload)
    }
    const commitSetExerciseSetReps = (payload: ExerciseSetPayload) => {
        store.commit('workoutResult/setExerciseSetReps', payload)
    }
    const commitAddExerciseSet = (payload: ExerciseSetPayload) =>{
        store.commit('workoutResult/addSet', payload)
    }
    const commitRemoveExerciseSet = (exerciseId: string) =>{
        store.commit('workoutResult/removeSet', exerciseId)
    }
    const getNewWorkoutResultsTimeOfWorkout = () => {
        return store.state.workoutResult.newWorkoutResult.timeOfWorkout as number
    }
    const getExerciseResultById = (id: string) => {
        return store.getters["workoutResult/getExerciseResultById"](id)
    }

    return {
        getNewWorkoutResultsTimeOfWorkout,
        dispatchInitNewWorkoutResult,
        dispatchFinishWorkout,
        commitSetWorkoutTime,
        commitSetExerciseSetLoad,
        commitSetExerciseSetReps,
        commitAddExerciseSet,
        commitRemoveExerciseSet,
        getExerciseResultById,
        getNewWorkoutResultFromStore
    }
}
