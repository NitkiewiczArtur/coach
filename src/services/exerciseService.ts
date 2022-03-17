import {collection, endAt, getDocs, getFirestore, limit, orderBy, query, startAt, where} from "firebase/firestore";
import {Exercise} from "@/model/Exercise";
import {Workout} from "@/model/Workout";

const db = getFirestore();

export async function getExerciseById(id: string): Promise<Exercise> {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return Promise.resolve(querySnapshot.docs[0].data() as Exercise)
}
//TODO:memoization
export async function getExercisesByIds(ids: Array<Exercise | string>): Promise<Array<Exercise | undefined>> {
    const exercisePromises = ids.map(async exerciseId => {
        if (typeof exerciseId === 'string') {
            return await getExerciseById(exerciseId)
        }
    })
    if (exercisePromises) {
        return await Promise.all(exercisePromises)
    }
    return Promise.resolve([])
}

export const getExercises = async () => {
    const exercises: Array<Exercise> = []
    const q = query(collection(db, "exercises"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exercises.push(doc.data() as Exercise);
    });
    return exercises;
};

export async function searchExercises(searchValue: string) {
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