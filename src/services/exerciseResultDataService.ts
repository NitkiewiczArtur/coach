import {WorkoutResult} from "@/model/WorkoutResult";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {ExerciseResult} from "@/model/ExerciseResult";
import {getExerciseById} from "@/services/exerciseService";

export async function getExerciseResultData(exerciseId: string, workoutResults: WorkoutResult[]) {
    const volumePerDay = getExerciseVolumePerDay(exerciseId, workoutResults)
    const maxRepPerDay = getExerciseMaxRepPerDay(exerciseId, workoutResults)
    //TODO: getLastWorkoutResult.. data!
    const lastWorkoutResult = workoutResults[workoutResults.length - 1]
    const lastExerciseResult = lastWorkoutResult?.exerciseResults
        .find(exerciseResult => exerciseResult.exerciseId === exerciseId)

    try {
        const exercise = await getExerciseById(exerciseId)
        if (exercise) {
            return {
                volumePerDay,
                maxRepPerDay,
                exerciseName: exercise.name,
                gifUrl: exercise.gifUrl,
                smallestMax: getMinValue(maxRepPerDay),
                smallestVolume: getMinValue(volumePerDay),
                lastExerciseResult: lastExerciseResult
            } as ExerciseResultData
        }
    } catch (e) {
        console.log("Error while getting exercise from firestore:" + e)
    }
}

function getExerciseVolumePerDay(exerciseId: string, workoutResults: WorkoutResult[]) {
    return new Map(workoutResults.map(workoutResult => {
        const exerciseResult = workoutResult.exerciseResults
            .find(exerciseResult => exerciseResult.exerciseId == exerciseId)
        const volume = getExerciseVolume(exerciseResult)
        return [getDateString(workoutResult.dayOfWorkout), volume]
    }))
}

function getExerciseVolume(exerciseResult: ExerciseResult | undefined) {
    if (exerciseResult) {
        return exerciseResult.loads.reduce((total, amount, index) => {
            total += amount * exerciseResult.reps[index]
            return total
        }, 0)
    }
}

function getExerciseMaxRepPerDay(exerciseId: string, workoutResults: WorkoutResult[]) {
    return new Map(workoutResults.map(workoutResult => {
        const exerciseResult = workoutResult.exerciseResults
            .find(exerciseResult => exerciseResult.exerciseId == exerciseId)
        const max = exerciseResult ? Math.max(...exerciseResult.loads) : undefined
        return [getDateString(workoutResult.dayOfWorkout), max]
    }))
}

function getMinValue(map: Map<string, number | undefined>) {
    const values = [...map.values()]
    const numberOnlyValues = values.filter(value => value) as number[]
    return Math.min(...numberOnlyValues)
}

function getDateString(date: Date) {
    return date.getDate() + ':' + (date.getMonth() + 1)
}
