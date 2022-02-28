import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCScbP0uh0vuV9aOixklfEwFAFIpXR4IAM",
    authDomain: "coach-db-47391.firebaseapp.com",
    projectId: "coach-db-47391",
    storageBucket: "coach-db-47391.appspot.com",
    messagingSenderId: "157123462234",
    appId: "1:157123462234:web:e5f4bd48221ad984d9c463",
});

const db = getFirestore();
export const getExerciseById = async (id) => {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    const exercises = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        exercises.push(doc.data());
    });
    return exercises;
};
export const searchExercise = async (id) => {
    const q = query(collection(db, "exercises"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
};
export const signIn = (email, password) =>{
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}

export const signUp = (email, password) =>{
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email.value, password.value)
}