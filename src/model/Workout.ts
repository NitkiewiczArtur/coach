import {Exercise} from "@/model/Exercise";

export interface Workout {
    userId: string,
    exercises: Array<string | Exercise>,
    name: string,
}