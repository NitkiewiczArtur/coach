import {Exercise} from "@/model/Exercise";
import {Workout} from "@/model/Workout";
import {SetResult} from "@/model/SetResult";

export function getTestExercises(): Array<Exercise> {
    return [{
        "target": "upper back",
        "bodyPart": "back",
        "id": "1",
        "name": "bodyweight squatting row (with towel)",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/3167.gif",
        "equipment": "body weight"
    }, {
        "bodyPart": "lower legs",
        "equipment": "body weight",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/1373.gif",
        "target": "calves",
        "id": "2",
        "name": "bodyweight standing calf raise"
    }, {
        "id": "3",
        "equipment": "body weight",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/3156.gif",
        "name": "bodyweight standing close-grip one arm row",
        "target": "upper back",
        "bodyPart": "back"
    }, {
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/3158.gif",
        "equipment": "body weight",
        "target": "upper back",
        "name": "bodyweight standing close-grip row",
        "id": "4",
        "bodyPart": "back"
    }, {
        "name": "bodyweight standing one arm row",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/3162.gif",
        "equipment": "body weight",
        "id": "5",
        "bodyPart": "back",
        "target": "upper back"
    }]
}

export function getTestExercise() {
    return {
        "target": "upper back",
        "bodyPart": "back",
        "id": "1",
        "name": "bodyweight squatting row (with towel)",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/3167.gif",
        "equipment": "body weight"
    } as Exercise
}

export function getTestWorkouts(): Array<Workout> {
    return [
        {"exercises": ["1", "2"], "userId": "1", "name": "trening 1", "id": "1"},
        {"exercises": ["3", "4"], "userId": "1", "name": "trening 2", "id": "2"},
        {"exercises": ["5", "1"], "userId": "1", "name": "trening 3", "id": "3"},
        {"exercises": ["2", "3"], "userId": "1", "name": "trening 4", "id": "4"},
        {"exercises": ["4", "5"], "userId": "1", "name": "trening 5", "id": "5"},
    ]
}

export function getTestWorkout() {
    return {"exercises": ["1", "2"], "userId": "1", "name": "trening 1", "id": "1"} as Workout
}
export function getTestSetResult() {
    return {
        load: 100,
        reps: 5,
        index:0
    } as SetResult
}

export function getEmittedEventValue(event: []) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return event[0][0]
}

export function getEventEmitCount(event: []) {
    return event.length;
}
