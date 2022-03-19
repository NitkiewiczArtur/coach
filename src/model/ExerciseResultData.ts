export interface ExerciseResultData {
    exerciseName: string,
    gifUrl: string,
    volumePerDay: Map<Date, number>,
    maxPerDay: Map<Date, number>
}
