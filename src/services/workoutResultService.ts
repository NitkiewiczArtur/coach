import {collection, doc, getDocs, getFirestore, limit, query, addDoc, where} from "firebase/firestore";
import WorkoutResult from "@/model/WorkoutResult";
import ExerciseResult from "@/model/ExerciseResult";

const db = getFirestore();

export async function saveWorkoutResult(workoutResult: WorkoutResult) {
    try {
        return await addDoc(collection(db, "workout_results"), workoutResult);
    } catch (e) {
        console.log("Error while saving workout in firestore: " + e)
    }
}

export async function getResultsByWorkoutId(id: string, resultLimit: number) {
    const workoutResults: Array<WorkoutResult> = []
    const q = query(
        collection(db, "workout_results"),
        where('workout_id', '==', id),
        limit(resultLimit));
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const workoutResult = mapToWorkoutResult(doc.data())
            workoutResults.push(workoutResult);
        });
    } catch (e) {
        console.log("Error while getting workouts from firestore:" + e)
    }
    return workoutResults;
}

function mapToWorkoutResult(response) {
    return{
        userId: response.user_id,
        workoutId: response.workout_id,
        dayOfWorkout: new Date(response.day_of_workout),
        timeOfWorkout: response.time_of_Workout,
        exerciseResults: response.exercise_results as ExerciseResult[]
    } as WorkoutResult
}
//TODO: get Real LAST WORKOUT RESULT!
export function getLastWorkoutResultsExerciseResults(workoutResults: WorkoutResult[]) {
    return workoutResults[workoutResults.length - 1].exerciseResults
}
