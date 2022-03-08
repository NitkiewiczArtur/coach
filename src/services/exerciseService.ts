import {
    collection, getDocs, getFirestore,
    query, where, limit, orderBy, startAt, endAt
} from "firebase/firestore";
import {Exercise} from "@/model/Exercise";
import {Workout} from "@/model/Workout";

const db = getFirestore();

export const getExerciseById = async (id) => {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    const exercises: Array<Exercise> = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
};

export const getExercises = async () => {
    const exercises: Array<Exercise> = []
    const q = query(collection(db, "exercises"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
};

export const searchExercises = async (searchValue: string) => {
    const exercises: Array<Exercise> = []

    const q = query(
        collection(db, "exercises"),
        orderBy('name'),
        startAt(searchValue),
        endAt(searchValue + '~'),
        limit(10));
    const querySnapshot = await getDocs(q);
    console.log("snap")
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
};

export const getWorkouts = async () => {
    const workouts: Array<Workout> = []
    const q = query(collection(db, "workouts"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        workouts.push(doc.data() as Workout);
    });
    return workouts;
};