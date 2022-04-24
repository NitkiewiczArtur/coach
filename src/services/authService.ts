import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged as onAuthStateChangedFromFirebase,
    signInWithEmailAndPassword,
    signOut as signOutFromFirebase
} from "firebase/auth";

export const signIn = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOut = () => {
    const auth = getAuth();
    return signOutFromFirebase(auth)
}

export const signUp = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email.value, password.value)
}

export const onAuthStateChanged = (nextOrObserver) => {
    const auth = getAuth();
    return onAuthStateChangedFromFirebase(auth, nextOrObserver)
}

export const currentUser = () => {
    return getAuth().currentUser
}
export const currentUserId = () => {
    return getAuth().currentUser?.uid
}
