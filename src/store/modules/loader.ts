const state = {
    loading: 0
};
const getters = {
    isLoading: (state) => {
        return state.loading > 0},
};

const mutations = {
    START_LOADING: state => state.loading++,
    FINISH_LOADING: state => state.loading--,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
