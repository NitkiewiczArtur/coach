import {getTestExercises, getTestWorkoutExercises} from "../../../tests/utils/testHelper";
import {Workout} from "@/model/Workout";

const firebaseApp = {}

const db = {};

export const getExerciseById = async (id: number) => {
    return new Promise((resolve) => resolve(null));
};
export const searchExercise = async (id: number) => {
    return new Promise((resolve) => resolve(null));
};
export const getWorkoutsExercises = async (workouts: Workout[]) => {
    return new Promise((resolve) => resolve(getTestWorkoutExercises()));
};
export const getExercisesByIds = jest.fn((ids: Array<string>) => {
    return new Promise((resolve) => resolve(getTestExercises()));
});
export const getExercises = async () => {
    return new Promise((resolve) => resolve(null));
};
