import {useRoute, useRouter} from "vue-router";

export function useCoachRouter(){
    const route = useRoute();
    const router = useRouter()

    const workoutIdFromRoute = route.params.workoutId as string
    const navigateBackward = () => router.back()
    const navigateHome = () => router.push({name: 'home'})
    const navigateToWorkoutResults = (workoutId) =>
        router.push({name: "workoutResults", params: {workoutId: workoutId}})
    const navigateToDoWorkout = (workoutId) =>
        router.push({name: "doWorkout", params: {workoutId: workoutId}})
    return {
        workoutIdFromRoute,
        navigateBackward,
        navigateHome,
        navigateToWorkoutResults,
        navigateToDoWorkout
    }
}
