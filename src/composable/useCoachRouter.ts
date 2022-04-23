import {useRoute, useRouter} from "vue-router";

export default function useCoachRouter() {
    const route = useRoute();
    const router = useRouter()

    const workoutIdFromRoute = route.params.workoutId as string
    const navigateBackward = () => router.back()
    const navigateHome = () => router.push({name: 'home'})
    const navigateToWorkoutResults = (workoutId) =>
        router.push({name: "workoutResults", params: {workoutId: workoutId}})
    const navigateToDoWorkout = (workoutId) =>
        router.push({name: "doWorkout", params: {workoutId: workoutId}})
    const navigateToDoneWorkout = (workoutId) =>
        router.push({name: "doneWorkout", params: {workoutId: workoutId}})
    const navigateToLogin = () =>
        router.push({name: "logIn"})
    const navigateToSignup = () =>
        router.push({name: "signUp"})
    const navigateToExploreExercises = () =>
        router.push({name: "exploreExercises"})
    const navigateToMyWorkouts = () =>
        router.push({name: "myWorkouts"})

    return {
        workoutIdFromRoute,
        navigateBackward,
        navigateHome,
        navigateToWorkoutResults,
        navigateToDoWorkout,
        navigateToDoneWorkout,
        navigateToLogin,
        navigateToSignup,
        navigateToExploreExercises,
        navigateToMyWorkouts
    }
}
