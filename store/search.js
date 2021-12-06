export default {

	state() {
		return {
			search: [],
		}
	},

	getters: {

		search(state){
			return state.search;
		}
	},

	mutations: {

		SET_SEARCH (state, search){
			state.search = search;
		},

		APPEND_SEARCH (state, search){
			state.search = [...state.search, ...search];
		},

	},

	actions: {
		async getSearch({ commit }, query) {
		    let data = await this.$axios.$get(`/search?query=${query}`);
	        commit('SET_SEARCH', data);
		},

		async getMoreSearch({ commit }, value) {
		    let data = await this.$axios.$get(`/search?query=${value.query}&page=${value.page}`);
	        commit('APPEND_SEARCH', data);
	        console.log(value)
		},
	}
}