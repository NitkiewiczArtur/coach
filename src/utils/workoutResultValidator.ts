//TODO: think about oop, types? isPositiveNumber and .. are like from validators...

const isPositiveNumber = input => input > 0
const isNoNegativeNumber = input => input >= 0

const isTimeOfWorkoutValid = timeOfWorkout => {
    return isPositiveNumber(timeOfWorkout)
}
const areLoadsValid = (loads:[]) => {
    return loads.map(load => isNoNegativeNumber(load)).every(isTrue => isTrue)
}
const areRepsValid = (reps:[]) => {
    return reps.map(reps => isPositiveNumber(reps)).every(isTrue => isTrue)
}

const areExerciseResultsValid = (exerciseResults) => {
    const areExerciseResultsLoadsValid = exerciseResults.map(result => areLoadsValid(result.loads)).every(isTrue => isTrue)
    const areExerciseResultsRepsValid = exerciseResults.map(result => areRepsValid(result.reps)).every(isTrue => isTrue)
    return areExerciseResultsRepsValid && areExerciseResultsLoadsValid
}

export const isValidWorkoutResult = ({exerciseResults, timeOfWorkout}) => {
    return areExerciseResultsValid(exerciseResults) && isTimeOfWorkoutValid(timeOfWorkout)
}
