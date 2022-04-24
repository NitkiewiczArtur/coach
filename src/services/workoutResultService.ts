import {collection, getFirestore, query, where} from "firebase/firestore";
import WorkoutResult from "@/model/WorkoutResult";
import ExerciseResult from "@/model/ExerciseResult";
import {firebaseFetchDocs, firebaseSave} from "@/services/http";
import {firebaseApp} from "@/plugins/firebase";

const db = getFirestore(firebaseApp);

//TODO: return await?
export async function saveWorkoutResult(workoutResult: WorkoutResult) {
    const workoutResultToSave = mapToSnapshot(workoutResult)
    try {
        return firebaseSave("workout_results", workoutResultToSave)
    } catch (e) {
        console.log("Error while saving workout in firestore: " + e)
    }
}

export async function getResultsByWorkoutId(id: string, resultLimit?: number) {
    let workoutResults: Array<WorkoutResult> = []
    const q = query(
        collection(db, "workout_results"),
        where('workoutId', '==', id))
    try {
        const querySnapshot = await firebaseFetchDocs(q);
        querySnapshot.forEach((doc) => {
            const workoutResult = mapToWorkoutResult(doc.data())
            workoutResults.push(workoutResult);
            workoutResults = sortBy(workoutResults, 'dayOfWorkout')
        });
    } catch (e) {
        console.log("Error while getting workouts from firestore:" + e)
    }
    return resultLimit ? workoutResults.slice(-resultLimit) : workoutResults;
}

function mapToWorkoutResult(response) {
    return {
        ...response,
        dayOfWorkout: new Date(response.dayOfWorkout),
        exerciseResults: response.exerciseResults as ExerciseResult[]
    } as WorkoutResult
}

function mapToSnapshot(workoutResult: WorkoutResult) {
    console.log('workoutResult.dayOfWorkout', typeof workoutResult.dayOfWorkout);
    const dayOfWorkout = typeof workoutResult.dayOfWorkout === 'string'
        ? new Date(workoutResult.dayOfWorkout)
        : workoutResult.dayOfWorkout
    return {...workoutResult, dayOfWorkout: dayOfWorkout.getTime()}
}

export function getLastWorkoutResultsExerciseResults(workoutResults: WorkoutResult[]) {
    return workoutResults.length ? workoutResults[workoutResults.length - 1].exerciseResults : []
}

function sortBy(arr, prop) {
    return arr.sort((a, b) => a[prop] - b[prop]);
}
