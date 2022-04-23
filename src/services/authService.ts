import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: "coach-db-47391.firebaseapp.com",
    projectId: "coach-db-47391",
    storageBucket: "coach-db-47391.appspot.com",
    messagingSenderId: "157123462234",
    appId: "1:157123462234:web:e5f4bd48221ad984d9c463",
});

export const signIn = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser = () => {
    const auth = getAuth();
    return signOut(auth)
}

export const signUp = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email.value, password.value)
}

export const onAuthStateChange = (nextOrObserver) => {
    const auth = getAuth();
    return onAuthStateChanged(auth, nextOrObserver)
}

export const currentUser = () => {
    return getAuth().currentUser
}
export const currentUserId = () => {
    return getAuth().currentUser?.uid
}
