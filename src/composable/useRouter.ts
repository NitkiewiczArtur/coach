import {useRoute, useRouter} from "vue-router";

export function useCoachRouter(){
    const route = useRoute();
    const router = useRouter()

    const workoutIdFromRoute = route.params.workoutId as string
    const navigateBackward = () => router.back()
    const navigateHome = () => router.push({name: 'home'})
    const navigateToWorkoutResults = (workoutId) =>
        router.push({name: "workoutResults", params: {workoutId: workoutId}})
    const navigateToDoExercise = (workoutId) =>
        router.push({name: "doExercise", params: {workoutId: workoutId}})
    return {
        workoutIdFromRoute,
        navigateBackward,
        navigateHome,
        navigateToWorkoutResults,
        navigateToDoExercise
    }
}
