import {Workout} from "@/model/Workout";
import {collection, getDocs, getFirestore, limit, query} from "firebase/firestore";

const db = getFirestore();

export async function getWorkouts() {
    const workouts: Array<Workout> = []
    const q = query(collection(db, "workouts"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const workout = doc.data() as Workout;
        workout.id = doc.id;
        workouts.push(workout);
    });
    return workouts;
}
