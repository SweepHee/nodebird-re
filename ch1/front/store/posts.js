export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: [],
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
        state.imagePaths = [];
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex( v => v.id === payload.postId);
        state.mainPosts.splice(index, 1);
    },
    loadComments(state, payload) {
        const index = state.mainPosts.findIndex( v => v.id === payload.postId);
        state.mainPosts[index].Comments = payload;
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex( v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state, payload) {
        state.mainPosts = state.mainPosts.concat(payload);
        state.hasMorePost = payload.length === limit;
    },
    concatImagePaths(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePath(state, payload) {
        state.imagePaths.splice(payload, 1);
    }
};

export const actions = {
    add({commit, state}, payload) {
        this.$axios.post("http://localhost:3085/post", {
            content: payload.content,
            image: state.imagePaths,
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit("addMainPost", res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    },
    remove( { commit }, payload) {
        this.$axios.delete(`http://localhost:3085/post/${payload.postId}`, {
            // $axios.delete 기 때문에 2번째 인자가 다르다
            // 마찬가지로 get도 다름
            withCredentials: true,
        })
        .then(() => {
            commit("removeMainPost", payload);
        })
        .catch(() => {

        })
        commit("removeMainPost", payload);
    },
    addComment({commit}, payload) {
        this.$axios.post(`http://localhost:3085/posts/${payload.postId}/comment`, {
            content: payload.content
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit("addComment", res.data);            
        })
        .catch(() => {

        })
    },
    loadComment({commit}, payload) {
        this.$axios.get(`http://localhost:3085/post/${payload.postId}/comments`)
        .then((res) => {
            commit("loadComments", res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    },
    loadPosts({commit, state}, payload) {
        if(state.hasMorePost) {
            this.$axios.get(`http://localhost:3085/posts?offset=${state.mainPosts.length}&limit=10`)
            .then((res) => {
                commit("loadPosts", res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    },
    uploadImages({ commit }, payload) {
        this.$axios.post("http://localhost:3085/post/images", payload, { withCredentials: true })
        .then((res) => {
            commit("concatImagePaths", res.data);
        })
        .catch(() => {

        })
    }
};