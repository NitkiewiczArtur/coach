import {useStore} from "vuex";
import {getCurrentDateString} from "@/utils/utils";
import {getLastWorkoutResultsExerciseResults, getResultsByWorkoutId} from "@/services/workoutResultService";
import {currentUserId} from "@/services/authService";
import {useCoachRouter} from "@/composable/useRouter";
import {SetResult} from "@/model/SetResult";
import {ExerciseSetPayload} from "@/store/modules/workoutResult";
import {ExerciseResult} from "@/model/ExerciseResult";

const DEFAULT_TIME_OF_WORKOUT = 65

export function useWorkoutResultStore() {
    const store = useStore()
    const {workoutIdFromRoute} = useCoachRouter()

    const getSetResults = (exerciseResult: ExerciseResult) => {
        return exerciseResult.loads.map((load, index) => {
            return {
                load,
                reps: exerciseResult.reps[index] as number,
                index: index as number
            } as SetResult
        })
    }
    const initNewWorkoutResult = async () => {
        const workoutResults = await getResultsByWorkoutId(workoutIdFromRoute, 5)
        const newWorkoutResult = {
            dayOfWorkout: getCurrentDateString(),
            exerciseResults: getLastWorkoutResultsExerciseResults(workoutResults),
            timeOfWorkout: DEFAULT_TIME_OF_WORKOUT,
            workoutId: workoutIdFromRoute,
            userId: currentUserId(),
        }
        store.commit('workoutResult/setWorkoutResult', newWorkoutResult)
        return newWorkoutResult;
    }
    const finishWorkout = () => {
        return store.dispatch('workoutResult/finishWorkout');
    }
    const setWorkoutTime = (timeOfWorkout: number) => {
        store.commit('workoutResult/setWorkoutTime', timeOfWorkout);
    }
    const commitAddSet = (exerciseId: string, setResult: SetResult) => {
        const payload = {
            exerciseId,
            newSetResult: setResult
        }
        store.commit('workoutResult/addSet', payload)
    }
    const setExerciseSetLoad = (payload: ExerciseSetPayload) => {
        store.commit('workoutResult/setExerciseSetLoad', payload)
    }
    const setExerciseSetReps = (payload: ExerciseSetPayload) => {
        store.commit('workoutResult/setExerciseSetReps', payload)
    }
    const addExerciseSet = (payload: ExerciseSetPayload) =>{
        store.commit('workoutResult/addSet', payload)
    }
    const removeExerciseSet = (exerciseId: string) =>{
        store.commit('workoutResult/removeSet', exerciseId)
    }
    return {
        initNewWorkoutResult,
        finishWorkout,
        setWorkoutTime,
        commitAddSet,
        setExerciseSetLoad,
        setExerciseSetReps,
        addExerciseSet,
        removeExerciseSet,
        getSetResults
    }
}
