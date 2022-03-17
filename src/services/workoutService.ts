import {Workout} from "@/model/Workout";
import {collection, getDocs, getFirestore, limit, query} from "firebase/firestore";

const db = getFirestore();

export async function getWorkouts(): Promise<Array<Workout>> {
    const workouts: Array<Workout> = []
    const q = query(collection(db, "workouts"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        workouts.push(doc.data() as Workout);
    });
    return workouts;
}