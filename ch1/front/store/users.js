export const state = () => ({
    me: null,
    followerList: [{
        id: 1,
        nickname: "제로초",
    }, {
        id: 2,
        nickname: "네로"
    }, {
        id: 3,
        nickname: "히어로"
    }],
    followingList: [{
        id: 1,
        nickname: "제로초",
    }, {
        id: 2,
        nickname: "네로"
    }, {
        id: 3,
        nickname: "히어로"
    }],
})

// 동기처리
export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    },
    addFollower(state, payload) {
        state.followerList.push(payload);
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },
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
    changeNickname({commit}, payload) {
        commit("changeNickname", payload);
    },
    addFollowing({commit}, payload) {
        commit("addFollowing", payload);
    },
    addFollower({commit}, payload) {
        commit("addFollower", payload);
    },
    removeFollowing({commit}, payload) {
        commit("removeFollowing", payload);
    },
    removeFollower({commit}, payload) {
        commit("removeFollower", payload);
    }
}