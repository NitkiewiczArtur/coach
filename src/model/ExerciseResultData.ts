export default interface ExerciseResultData {
    exerciseName: string,
    gifUrl: string,
    volumePerDay: Map<string, number>,
    maxRepPerDay: Map<string, number>,
    smallestVolume: number,
    smallestMax:number,
    exerciseId: string,
}
