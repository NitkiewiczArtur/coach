import {collection, endAt, getFirestore, limit, orderBy, query, startAt, where} from "firebase/firestore";
import Exercise from "@/model/Exercise";
import Workout from "@/model/Workout";
import {firebaseFetchDocs} from "@/services/http";
import {firebaseApp} from "@/plugins/firebase";

const db = getFirestore(firebaseApp);

export async function getExerciseById(id: string) {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        if (querySnapshot.docs[0].exists()) {
            return querySnapshot.docs[0].data() as Exercise
        }
        console.log("Exercise with id " + id + " does not exist")
    } catch (e) {
        console.log("Error while getting exercise from firestore:" + e)
    }
}

export async function getExercisesByIds(ids: Array<string>) {
    const exercisePromises = ids.map(exerciseId => getExerciseById(exerciseId))
    return Promise.all(exercisePromises)
}

export const getExercises = async () => {
    const exercises: Array<Exercise> = []
    const q = query(collection(db, "exercises"), limit(10));
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        querySnapshot.forEach((doc) => {
            exercises.push(doc.data() as Exercise);
        });
    } catch (e) {
        console.log("Error while getting exercises from firestore:" + e)
    }
    return exercises;
};

export async function searchExercisesStrict(searchValue: string) {
    const exercises: Array<Exercise> = []
    const q = query(
        collection(db, "exercises"),
        orderBy('name'),
        startAt(searchValue),
        endAt(searchValue + '~'),
        limit(10));
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        querySnapshot.forEach((doc) => {
            exercises.push(doc.data() as Exercise);
        });
    }catch (e){
        console.log("Error while getting exercises from firestore:" + e)
    }
    return exercises;
}

export async function searchExercises(searchValue: string) {
    const exercises: Array<Exercise> = []
    const q = query(
        collection(db, "exercises"),
        orderBy('name'),
        where('name', '>=', searchValue),
        limit(10));
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        querySnapshot.forEach((doc) => {
            exercises.push(doc.data() as Exercise);
        });
    } catch (e) {
        console.log("Error while getting exercises from firestore:" + e)
    }
    return exercises;
}

export async function getWorkoutsExercises(workouts: Workout[]) {
    const exercisePromises = workouts.map(workout => getExercisesByIds(workout.exercises))
    return Promise.all(exercisePromises)
}
