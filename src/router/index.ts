import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from "@/views/SignUp.vue";
import SignIn from "@/views/SignIn.vue";
import ExploreExercises from "@/views/ExploreExercises.vue";
import {currentUser} from "@/services/authService";
import MyWorkoutsView from "@/views/MyWorkouts.vue";
import WorkoutResultsView from "@/views/MyWorkoutResults.vue";
import NotFound from "@/views/NotFound.vue";
import DoWorkout from "@/views/DoWorkout.vue";
import DoneWorkout from "@/views/DoneWorkout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: "/exploreExercises",
        name: "exploreExercises",
        component: ExploreExercises,
        meta: {requiresAuth: true}

    },
    {
        path: "/myWorkouts",
        name: "myWorkouts",
        component: MyWorkoutsView,
        meta: {requiresAuth: true}
    },
    {
        path: "/workoutResults",
        name: "workoutResults",
        component: WorkoutResultsView,
        meta: {requiresAuth: true}
    },
    {
        path: "/doWorkout",
        name: "doWorkout",
        component: DoWorkout,
        meta: {requiresAuth: true}
    },
    {
        path: "/doneWorkout",
        name: "doneWorkout",
        component: DoneWorkout,
        meta: {requiresAuth: true}
    },
    {
        path: "/signUp",
        name: "signUp",
        component: SignUp,
    },
    {
        path: "/signIn",
        name: "signIn",
        component: SignIn,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = currentUser(); //store.getters['auth/isUserAuth']

    if (requiresAuth && !isAuthenticated) {
        next("/signIn");
    } else {
        next();
    }
})

export default router;
