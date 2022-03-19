import {ExerciseResult} from "@/model/ExerciseResult";

export interface WorkoutResult{
    dayOfWorkout: Date,
    exerciseResults: ExerciseResult[],
    timeOfWorkout: number,
    workoutId: string,
    userId: string
}
