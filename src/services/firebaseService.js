import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDocs, query, where, collection } from "firebase/firestore";

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
/*
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCScbP0uh0vuV9aOixklfEwFAFIpXR4IAM",
  authDomain: "coach-db-47391.firebaseapp.com",
  projectId: "coach-db-47391",
  storageBucket: "coach-db-47391.appspot.com",
  messagingSenderId: "157123462234",
  appId: "1:157123462234:web:e5f4bd48221ad984d9c463",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const exerciseCollection = db.collection("exercises");

export const getExercise = async (id) => {
  const exercise = await exerciseCollection.doc(id).get();
  return exercise.exists ? exercise.data : null;
};
*/
