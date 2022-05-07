import {
    onAuthStateChanged as onAuthStateChangedFromService,
    signIn,
    signOut as signOutFromService,
    signUp as signUpFromService
} from "@/services/authService";
import firebase from "firebase/compat";
import User = firebase.User;

const commitStartLoading = (commit) => commit('loader/START_LOADING', null, {root:true})
const commitFinishLoading = (commit) => commit('loader/FINISH_LOADING', null, {root:true})

const state = {
    user: null,
    error: null,
};
const getters = {
    isUserAuth(state) {
        return !!state.user
    }
}
const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_ERROR(state, error) {
        state.error = error
    }
};

const actions = {
    onAuthStateChanged({commit}) {
        return onAuthStateChangedFromService((user: User) => {
            if (user) {
                commit("SET_USER", {id: user.uid, email: user.email})
            } else {
                commit("SET_USER", null)
            }
            commit('SET_ERROR', null)
        });
    },
    async signUp({commit}, {email, password}) {
        try {
            commitStartLoading(commit)
            await signUpFromService(email, password)
            commit('SET_ERROR', null)
        } catch (e) {
            commit('SET_ERROR', e)
        } finally {
            commitFinishLoading(commit)
        }
    },
    async signIn({commit}, {email, password}) {
        try {
            commitStartLoading(commit)
            await signIn(email, password)
        } catch (e) {
            commit('SET_ERROR', e)
        } finally {
            commitFinishLoading(commit)
        }
    },
    async signOut({commit}) {
        try {
            commitStartLoading(commit)
            await signOutFromService()
        } catch (e) {
            commit('SET_ERROR', e)
        } finally {
            commitFinishLoading(commit)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
