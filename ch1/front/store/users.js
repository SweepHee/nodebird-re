export const state = () => ({
    me: null,
})

// 동기처리
export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    }
}

// 비동기처리    
export const actions = {
    signUp({ commit, state }, payload) {
        commit("setMe", payload);
    },
    logIn({commit, state}, payload) {
        commit("setMe", payload);
    },
    logOut({commit, state}, payload) {
        commit("setMe", null);
    },
}