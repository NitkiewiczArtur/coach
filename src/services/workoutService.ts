import {Workout} from "@/model/Workout";
import {collection, doc, getDoc, getDocs, getFirestore, limit, query, where, Query} from "firebase/firestore";


const db = getFirestore();

export async function getWorkoutById(id: string) {
    try {
        const snap = await getDoc(doc(db, 'workouts', id))
        if (snap.exists()) {
            return snap.data() as Workout
        }
        console.log("Workout with id = " + id + "does not exists")
    } catch (e) {
        console.log("Error while getting workout from firestore:" + e)
    }
}

export async function getWorkoutsByUserId(userId: string) {
    const q = query(collection(db, "workouts"), where("userId", "==", userId));
    return getWorkoutsForQuery(q)
}

export async function getSomeWorkouts() {
    const q = query(collection(db, "workouts"), limit(5));
    return getWorkoutsForQuery(q)
}

export async function getWorkoutsForQuery(query: Query) {
    const workouts: Array<Workout> = []
    try {
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
            const workout = doc.data() as Workout;
            workout.id = doc.id;
            workouts.push(workout);
        });
    } catch (e) {
        console.log("Error while getting workouts from firestore:" + e)
    }
    return workouts;
}
