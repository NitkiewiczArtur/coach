import {collection, getDocs, getFirestore, query, where, limit} from "firebase/firestore";
import {Exercise} from "@/model/Exercise";

const db = getFirestore();

export const getExerciseById = async (id) => {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    const exercises:Array<Exercise> = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
};

export const searchExercises = async () => {
    const exercises:Array<Exercise> = []
    const q = query(collection(db, "exercises"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
};