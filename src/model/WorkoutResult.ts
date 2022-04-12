import ExerciseResult from "@/model/ExerciseResult";

export default interface WorkoutResult{
    dayOfWorkout: Date,
    exerciseResults: ExerciseResult[],
    timeOfWorkout: number,
    workoutId: string,
    userId: string
}
