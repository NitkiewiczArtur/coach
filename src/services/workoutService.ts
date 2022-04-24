import Workout from "@/model/Workout";
import {collection, doc, getDoc, getFirestore, query, Query, where} from "firebase/firestore";
import {firebaseFetchDocs, firebaseGetDoc} from "@/services/http";

const db = getFirestore();

export async function getWorkoutById(id: string) {
    try {
        const snap = await firebaseGetDoc('workouts', id)
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
    return getWorkouts(q)
}

export async function getWorkouts(query: Query) {
    const workouts: Array<Workout> = []
    try {
        const querySnapshot = await firebaseFetchDocs(query);
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
