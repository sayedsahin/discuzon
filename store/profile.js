export default {

	state() {
		return {
			user: [],
			activities: [],
			current_page: 1,
			topics: [],
			replies: [],
			follow: [],
			followings: [],
			followers: [],
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

		follow(state){
			return state.follow;
		},

		followings(state){
			return state.followings;
		},

		followers(state){
			return state.followers;
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

		// Following
		SET_FOLLOW (state, follow){
			state.follow = follow;
		},

		SET_FOLLOWINGS (state, followings){
			state.followings = followings;
		},

		APPEND_FOLLOWINGS (state, followings) {
			state.followings = [...state.followings, ...followings]
		},

		// Followers
		SET_FOLLOWERS (state, followers){
			state.followers = followers;
		},

		APPEND_FOLLOWERS (state, followers) {
			state.followers = [...state.followers, ...followers]
		},
	},

	actions: {
		async getUser({ commit }, id) {
		    let data = await this.$axios.$get(`/user/${id}`);
	        commit('SET_USER', data.data);
	        commit('SET_FOLLOW', data.follow);
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
		},

		// Following
		async following({ commit }, id) {
			let { data } = await this.$axios.$post(`user/${id}/following`);
			commit('SET_FOLLOW', data);
		},

		async getFollowings({ commit }, id) {
			let { data } = await this.$axios.$get(`user/${id}/following`);
			commit('SET_FOLLOWINGS', data);
		},

		async getMoreFollowings({ commit }, value) {
			let { data } = await this.$axios.$get(`user/${value.id}/following?page=${value.page}`);
			commit('APPEND_FOLLOWINGS', data);
		},

		// Followers
		async getFollowers({ commit }, id) {
			let { data } = await this.$axios.$get(`user/${id}/followers`);
			commit('SET_FOLLOWERS', data);
		},

		async getMoreFollowers({ commit }, value) {
			let { data } = await this.$axios.$get(`user/${value.id}/followers?page=${value.page}`);
			commit('APPEND_FOLLOWERS', data);
		},
	}
}