export default {

	state() {
		return {
			user: [],
			activities: [],
			current_page: 1,
			topics: [],
			replies: [],
		}
	},

	getters: {

		profileUser(state){
			return state.user;
		},

		activities(state){
			return state.activities;
		},

		topics(state){
			return state.topics;
		},

		replies(state){
			return state.replies;
		},

	},

	mutations: {
		SET_USER (state, user){
			state.user = user;
		},

		// ACTIVITIES
		SET_ACTIVITIES (state, activities){
			state.activities = activities;
		},

		APPEND_ACTIVITIES (state, activities){
			state.activities = [...state.activities, ...activities];
		},

		CURRENT_PAGE (state, current_page){
			state.current_page = current_page;
		},

		// TOPICS
		SET_TOPICS (state, topics){
			state.topics = topics;
		},

		APPEND_TOPICS (state, topics) {
			state.topics = [...state.topics, ...topics]
		},

		// REPLIES
		SET_REPLIES (state, replies){
			state.replies = replies;
		},

		APPEND_REPLIES (state, replies) {
			state.replies = [...state.replies, ...replies]
		},
	},

	actions: {
		async getUser({ commit }, id) {
		    let {data} = await this.$axios.$get(`/user/${id}`);
	        commit('SET_USER', data);
		},

		// Activities
		async getActivities({ commit }, id) {
		    let { data, meta } = await this.$axios.$get(`/user/${id}/activity`);
	        commit('SET_ACTIVITIES', data);
	        commit('CURRENT_PAGE', meta.current_page);
		},

		async getMoreActivities({ commit, state }, id) {
		    let {data, meta} = await this.$axios.$get(`/user/${id}/activity?page=${state.current_page+1}`);
	        commit('APPEND_ACTIVITIES', data);
	        commit('CURRENT_PAGE', meta.current_page);
		},

		// Topics
		async getUserTopics({ commit }, id) {
		    let { data } = await this.$axios.$get(`/user/${id}/topic`);
	        commit('SET_TOPICS', data);
		},

		async getMoreUserTopics({ commit, state }, value) {
		    let { data } = await this.$axios.$get(`/user/${value.id}/topic?page=${value.page}`);
	        commit('APPEND_TOPICS', data);
		},

		// Replies
		async getUserReplies({ commit }, id) {
		    let { data } = await this.$axios.$get(`/user/${id}/reply`);
	        commit('SET_REPLIES', data);
		},

		async getMoreUserReplies({ commit, state }, value) {
		    let { data } = await this.$axios.$get(`/user/${value.id}/reply?page=${value.page}`);
	        commit('APPEND_REPLIES', data);
		},

		// User
		// Javascript FormData Not Support with axios patch
		async userUpdate({ commit }, formData) {
			let { data } = await this.$axios.$post(`/user`, formData);
			commit('SET_USER', data);
		}
	}
}