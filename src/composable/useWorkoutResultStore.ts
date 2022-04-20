import {useStore} from "vuex";
import useCoachRouter from "@/composable/useCoachRouter";
import {ExerciseSetPayload} from "@/store/modules/workoutResult";
import WorkoutResult from "@/model/WorkoutResult";

export default function useWorkoutResultStore() {
    const store = useStore()
    const {workoutIdFromRoute} = useCoachRouter()

    const dispatchInitNewWorkoutResult = async () =>
        store.dispatch('workoutResult/initNewWorkoutResult', workoutIdFromRoute)

    const dispatchFinishWorkout = () =>
        store.dispatch('workoutResult/finishWorkout')

    const dispatchSetDayOfWorkout = (dayOfWorkout: Date) =>
        store.dispatch('workoutResult/setDayOfWorkout', dayOfWorkout)

    const dispatchSetWorkoutTime = (timeOfWorkout: number) =>
        store.dispatch('workoutResult/setWorkoutTime', timeOfWorkout)

    const dispatchSetExerciseSetLoad = (payload: ExerciseSetPayload) =>
        store.dispatch('workoutResult/setExerciseSetLoad', payload)

    const dispatchSetExerciseSetReps = (payload: ExerciseSetPayload) =>
        store.dispatch('workoutResult/setExerciseSetReps', payload)

    const dispatchAddExerciseSet = (payload: ExerciseSetPayload) =>
        store.dispatch('workoutResult/addExerciseSet', payload)

    const dispatchRemoveExerciseSet = (exerciseId: string) =>
        store.dispatch('workoutResult/removeExerciseSet', exerciseId)

    const timeOfWorkoutState: number = store.state.workoutResult.newWorkoutResult.timeOfWorkout
    const newWorkoutResultState: WorkoutResult = store.state.workoutResult.newWorkoutResult
    const dayOfWorkoutState:Date = store.state.workoutResult.newWorkoutResult.dayOfWorkout
    const getExerciseResultByIdGetter = (id: string) =>
        store.getters["workoutResult/getExerciseResultById"](id)

    return {
        dispatchInitNewWorkoutResult,
        dispatchFinishWorkout,
        dispatchSetDayOfWorkout,
        dispatchSetWorkoutTime,
        dispatchSetExerciseSetLoad,
        dispatchSetExerciseSetReps,
        dispatchAddExerciseSet,
        dispatchRemoveExerciseSet,
        getExerciseResultByIdGetter,
        newWorkoutResultState,
        timeOfWorkoutState,
        dayOfWorkoutState
    }
}
