import {getAuth, onAuthStateChanged} from "firebase/auth";

const firebaseApp = {}

const db = {}

export const signIn = jest.fn(() => {
    return new Promise((resolve)=>resolve(null));
});

export const signUp = jest.fn(() => {
  return new Promise((resolve)=>resolve(null));
});

export const currentUser = jest.fn(() => {
    return {}
});

export const onAuthStateChange = (nextOrObserver) => {
    return {}
}
