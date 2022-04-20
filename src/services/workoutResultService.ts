import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import WorkoutResult from "@/model/WorkoutResult";
import ExerciseResult from "@/model/ExerciseResult";

const db = getFirestore();

//TODO: return await?
export async function saveWorkoutResult(workoutResult: WorkoutResult) {
    const workoutResultToSave = mapToSnapshot(workoutResult)
    try {
        const save = await addDoc(collection(db, "workout_results"), workoutResultToSave);
        return save
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
        const querySnapshot = await getDocs(q);
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

//TODO: get Real LAST WORKOUT RESULT!
export function getLastWorkoutResultsExerciseResults(workoutResults: WorkoutResult[]) {
    return workoutResults[workoutResults.length - 1].exerciseResults
}

function sortBy(arr, prop) {
    return arr.sort((a, b) => a[prop] - b[prop]);
}
