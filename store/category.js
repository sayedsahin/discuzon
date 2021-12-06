export default {

	state() {
		return {
			categories: [],
			category: [],
		}
	},

	getters: {

		category(state){
			return state.category;
		},

		categories(state){
			return state.categories;
		},
	},

	mutations: {

		SET_CATEGORIES (state, categories){
			state.categories = categories;
		},

		APPEND_CATEGORIES (state, categories){
			state.categories = [...state.categories, ...categories];
		},

		SET_CATEGORY (state, category){
			state.category = category;
		},

		APPEND_TOPICS (state, topics){
			state.category.topics = [...state.category.topics, ...topics];
		},

		// access from page
		REACTED_CATEGORY (state, reacted){
			state.category.reacted = reacted;
		},

		REACTED_CATEGORIES (state, value){
			// Object.assign(state.categories[value.index], { reacted: value.reacted });
			// Alternative
			state.categories[value.index].reacted = value.reacted
		},
	},

	actions: {
		async getCategories({ commit }) {
		    let { data } = await this.$axios.$get(`/category`);
	        commit('SET_CATEGORIES', data);
		},

		async getMoreCategories({ commit }, page) {
		    let { data } = await this.$axios.$get(`/category?page=${page}`);
	        commit('APPEND_CATEGORIES', data);
		},

		async getCategory({ commit }, slug) {
		    let { data } = await this.$axios.$get(`/category/${slug}`);
	        commit('SET_CATEGORY', data);
		},

		async getMoreCategory({ commit, state }, value) {
		    let { data } = await this.$axios.$get(`/category/${value.slug}/topics?page=${value.page}`);
	        commit('APPEND_TOPICS', data);
		},
	}
}