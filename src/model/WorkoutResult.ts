export interface WorkoutResult{
    dayOfWorkout:Date,
    exerciseResults:Map<string, Array<number>>,
    timeOfWorkout:number,
    workoutId:string
}