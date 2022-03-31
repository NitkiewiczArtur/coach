import {ExerciseResult} from "@/model/ExerciseResult";

export interface ExerciseResultData {
    exerciseName: string,
    gifUrl: string,
    volumePerDay: Map<string, number>,
    maxRepPerDay: Map<string, number>,
    smallestVolume: number,
    smallestMax:number,
    lastExerciseResult: ExerciseResult,
}

type DayOfMonth = keyof string
