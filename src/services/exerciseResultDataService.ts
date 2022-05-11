import WorkoutResult from "@/model/WorkoutResult";
import ExerciseResultData from "@/model/ExerciseResultData";
import ExerciseResult from "@/model/ExerciseResult";
import {getExerciseById} from "@/services/exerciseService";

export async function getExerciseResultData(exerciseId: string, workoutResults: WorkoutResult[]) {
    const volumePerDay = getExerciseVolumePerDay(exerciseId, workoutResults)
    const maxRepPerDay = getExerciseMaxRepPerDay(exerciseId, workoutResults)
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
                exerciseId: exerciseId
            } as ExerciseResultData
        }
    } catch (e) {
        console.log("Error while getting exercise from firestore:" + e)
    }
}
//TODO: optimization of data structure to eliminate find
function getExerciseVolumePerDay(exerciseId: string, workoutResults: WorkoutResult[]) {
    return new Map(workoutResults.map(({exerciseResults, dayOfWorkout}) => {
        const exerciseResult = exerciseResults
            .find(exerciseResult => exerciseResult.exerciseId == exerciseId)
        const volume = getExerciseVolume(exerciseResult)
        return [getDateString(dayOfWorkout), volume]
    }))
}
//TODO: saving to db
function getExerciseVolume(exerciseResult: ExerciseResult | undefined) {
    if (exerciseResult) {
        return exerciseResult.loads.reduce((total, amount, index) => {
            const increment = amount > 0 ? amount * exerciseResult.reps[index] : exerciseResult.reps[index]
            total += increment
            return total
        }, 0)
    }
}
//TODO: saving to db
function getExerciseMaxRepPerDay(exerciseId: string, workoutResults: WorkoutResult[]) {
    return new Map(workoutResults.map(({exerciseResults, dayOfWorkout}) => {
        const exerciseResult = exerciseResults
            .find(exerciseResult => exerciseResult.exerciseId == exerciseId)
        const max = exerciseResult?.loads.length ? Math.max(...exerciseResult.loads) : 0
        return [getDateString(dayOfWorkout), max]
    }))
}

function getMinValue(map: Map<string, number | undefined>) {
    const values = [...map.values()]
    const numberOnlyValues = values.filter(value => value) as number[]
    return Math.min(...numberOnlyValues)
}

function getDateString(date: Date) {
    return `${date.getDate()}/${(date.getMonth() + 1)}`
}
