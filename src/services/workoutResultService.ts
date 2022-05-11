import {collection, getFirestore, limit, orderBy, query, where} from "firebase/firestore";
import WorkoutResult from "@/model/WorkoutResult";
import ExerciseResult from "@/model/ExerciseResult";
import {firebaseFetchDocs, firebaseSave} from "@/services/http";
import {firebaseApp} from "@/plugins/firebase";

const db = getFirestore(firebaseApp);

export async function saveWorkoutResult(workoutResult: WorkoutResult) {
    const workoutResultToSave = mapToSnapshot(workoutResult)
    try {
        return firebaseSave("workout_results", workoutResultToSave)
    } catch (e) {
        console.log("Error while saving workout in firestore: " + e)
    }
}

export async function getResultsByWorkoutId(id: string, resultLimit?: number) {
    const workoutResults: Array<WorkoutResult> = []
    const q = query(
        collection(db, "workout_results"),
        where('workoutId', '==', id),
        orderBy('dayOfWorkout'))
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        querySnapshot.forEach((doc) => {
            const workoutResult = mapToWorkoutResult(doc.data())
            workoutResults.push(workoutResult);
        });
    } catch (e) {
        console.log("Error while getting workouts from firestore:" + e)
    }
    return resultLimit ? workoutResults.slice(-resultLimit) : workoutResults;
}

export async function getLastWorkoutResult(id: string) {
    const workoutResults: Array<WorkoutResult> = []
    const q = query(
        collection(db, "workout_results"),
        where('workoutId', '==', id),
        orderBy('dayOfWorkout', 'desc'),
        limit(1))
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        querySnapshot.forEach((doc) => {
            const workoutResult = mapToWorkoutResult(doc.data())
            workoutResults.push(workoutResult);
        });
    } catch (e) {
        console.log("Error while getting workouts from firestore:" + e)
    }
    return workoutResults[0]
}

function mapToWorkoutResult(response) {
    return {
        ...response,
        dayOfWorkout: new Date(response.dayOfWorkout),
        exerciseResults: response.exerciseResults as ExerciseResult[]
    } as WorkoutResult
}

function mapToSnapshot(workoutResult: WorkoutResult) {
    const dayOfWorkout = typeof workoutResult.dayOfWorkout === 'string'
        ? new Date(workoutResult.dayOfWorkout)
        : workoutResult.dayOfWorkout
    return {...workoutResult, dayOfWorkout: dayOfWorkout.getTime()}
}
