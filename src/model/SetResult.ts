import {ExerciseResult} from "@/model/ExerciseResult";

export interface SetResult {
    load: number,
    reps: number,
    index: number
}
export const getSetResults = (exerciseResult: ExerciseResult) => {
    return exerciseResult.loads.map((load, index) => {
        return {
            load,
            reps: exerciseResult.reps[index] as number,
            index: index as number
        } as SetResult
    })
}
