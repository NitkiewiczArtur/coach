import {
    createUserWithEmailAndPassword,
    onAuthStateChanged as onAuthStateChangedFromFirebase,
    signInWithEmailAndPassword,
    signOut as signOutFromFirebase
} from "firebase/auth";
import {auth} from "@/plugins/firebase";

export const signIn = (email:string, password:string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOut = () => {
    return signOutFromFirebase(auth)
}

export const signUp = (email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChanged = (nextOrObserver) => {
    return onAuthStateChangedFromFirebase(auth, nextOrObserver)
}

export const currentUser = () => {
    return auth.currentUser
}
export const currentUserId = () => {
    return auth.currentUser?.uid
}
