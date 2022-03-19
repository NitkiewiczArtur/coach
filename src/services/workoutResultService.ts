import {collection, getDocs, getFirestore, limit, orderBy, query, where} from "firebase/firestore";
import {WorkoutResult} from "@/model/WorkoutResult";
import {ExerciseResult} from "@/model/ExerciseResult";

const db = getFirestore();

export async function getResultsByWorkoutId(id: string) {
    const workoutResults: Array<WorkoutResult> = []
    const q = query(
        collection(db, "workout_results"),
        where('workout_id', '==', id),
        limit(30));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const result = mapToWorkoutResult(doc.data())
        workoutResults.push(result);
    });
    return workoutResults;
}

function mapToWorkoutResult(response) {
    return{
        userId: response.user_id,
        workoutId: response.workout_id,
        dayOfWorkout: response.day_of_workout,
        timeOfWorkout: response.time_of_Workout,
        exerciseResults: response.exercise_results as ExerciseResult[]
    } as WorkoutResult
}
