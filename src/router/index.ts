import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterUser.vue";
import LogIn from "@/views/LogIn.vue";
import ExploreExercises from "@/views/ExploreExercises.vue";
import {currentUser} from "@/services/authService";
import MyWorkoutsView from "@/views/MyWorkouts.vue";
import WorkoutResultsView from "@/views/MyWorkoutResults.vue";
import NotFound from "@/views/NotFound.vue";
import DoWorkout from "@/views/DoWorkout.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
        path: "/register",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/logIn",
        name: "logIn",
        component: LogIn,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = currentUser();

    if (requiresAuth && !isAuthenticated) {
        next("/logIn");
    } else {
        next();
    }
})

export {routes};
export default router;
