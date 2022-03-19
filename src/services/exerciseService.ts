import {collection, endAt, getDocs, getFirestore, limit, orderBy, query, startAt, where} from "firebase/firestore";
import {Exercise} from "@/model/Exercise";

const db = getFirestore();

export async function getExerciseById(id: string) {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data() as Exercise
}
//TODO:memoization
export async function getExercisesByIds(ids: Array<string>) {
    const exercisePromises = ids.map(exerciseId => getExerciseById(exerciseId))
    return await Promise.all(exercisePromises)
}

export const getExercises = async () => {
    const exercises: Array<Exercise> = []
    const q = query(collection(db, "exercises"), limit(15));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
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
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
}

export async function searchExercises(searchValue: string) {
    const exercises: Array<Exercise> = []
    const q = query(
        collection(db, "exercises"),
        orderBy('name'),
        where('name', '>=', searchValue),
        limit(15));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
}
