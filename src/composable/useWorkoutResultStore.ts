import {useStore} from "vuex";
import {useCoachRouter} from "@/composable/useCoachRouter";
import {ExerciseSetPayload} from "@/store/modules/workoutResult";

export function useWorkoutResultStore() {
    const store = useStore()
    const {workoutIdFromRoute} = useCoachRouter()

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
    const timeOfWorkoutState = () => {
        return store.state.workoutResult.newWorkoutResult.timeOfWorkout as number
    }
    const newWorkoutResultState = () => {
        return store.state.workoutResult.newWorkoutResult
    }
    const getExerciseResultByIdGetter = (id: string) => {
        return store.getters["workoutResult/getExerciseResultById"](id)
    }

    return {
        timeOfWorkoutState,
        dispatchInitNewWorkoutResult,
        dispatchFinishWorkout,
        commitSetWorkoutTime,
        commitSetExerciseSetLoad,
        commitSetExerciseSetReps,
        commitAddExerciseSet,
        commitRemoveExerciseSet,
        getExerciseResultByIdGetter,
        newWorkoutResultState
    }
}
