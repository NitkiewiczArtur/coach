import {addDoc, collection, doc, getDoc, getDocs, getFirestore, Query} from "firebase/firestore";
import firebase from "firebase/compat";
import {store} from "@/store"
import DocumentData = firebase.firestore.DocumentData;
import {firebaseApp} from "@/plugins/firebase";

//TODO: use Axios for requests and use interceptors instead all those methods...

const db = getFirestore(firebaseApp);

export const firebaseFetchDocs = async (query: Query<DocumentData>) => {
    let querySnapshot
    store.commit('loader/START_LOADING')
    try {
        querySnapshot = await getDocs(query);
    } finally {
        store.commit('loader/FINISH_LOADING')
    }
    return querySnapshot
}
export const firebaseGetDoc = async (collectionName: string, id: string) => {
    let snap
    store.commit('loader/START_LOADING')
    try {
        snap = await getDoc(doc(db, collectionName, id))
    } finally {
        store.commit('loader/FINISH_LOADING')
    }
    return snap
}
export const firebaseSave = async (collectionName: string, data) => {
    let save
    store.commit('loader/START_LOADING')
    try {
        save = await addDoc(collection(db, collectionName), data)
    } finally {
        store.commit('loader/FINISH_LOADING')
    }
    return save
}
