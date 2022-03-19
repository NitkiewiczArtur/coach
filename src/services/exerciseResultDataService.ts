import {WorkoutResult} from "@/model/WorkoutResult";
import {ExerciseResultData} from "@/model/ExerciseResultData";
import {ExerciseResult} from "@/model/ExerciseResult";
import {getExerciseById} from "@/services/exerciseService";

export async function getExerciseResultData(exerciseId: string, workoutResults: WorkoutResult[]) {
    const volumePerDay = getVolumePerDay(exerciseId, workoutResults)
    const maxPerDay = getMaxPerDay(exerciseId, workoutResults)
    try {
        const exercise = await getExerciseById(exerciseId)
        if (exercise) {
            return {
                volumePerDay,
                maxPerDay,
                exerciseName: exercise.name,
                gifUrl: exercise.gifUrl
            } as ExerciseResultData
        }
    } catch (e) {
        console.log("Error while getting exercise from firestore:" + e)
    }
}

function getVolumePerDay(exerciseId: string, workoutResults: WorkoutResult[]) {
    return new Map(workoutResults.map(workoutResult => {
        const exerciseResult = workoutResult.exerciseResults
            .find(exerciseResult => exerciseResult.exercise_id == exerciseId)
        const volume = getVolume(exerciseResult)
        return [workoutResult.dayOfWorkout, volume]
    }))
}

function getVolume(exerciseResult: ExerciseResult | undefined) {
    if (exerciseResult) {
        return exerciseResult.load.reduce((total, amount, index) => {
            total += amount * exerciseResult.reps[index]
            return total
        }, 0)
    }
}

function getMaxPerDay(exerciseId: string, workoutResults: WorkoutResult[]) {
    return new Map(workoutResults.map(workoutResult => {
        const exerciseResult = workoutResult.exerciseResults
            .find(exerciseResult => exerciseResult.exercise_id == exerciseId)
        const max = exerciseResult ? Math.max(...exerciseResult.load) : undefined
        return [workoutResult.dayOfWorkout, max]
    }))
}
