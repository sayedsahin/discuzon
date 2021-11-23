export default {

	state() {
		return {
			topics: [],
			current_page: 1,
			topic: [],
			replies: [],
			pages: [],
		}
	},

	getters: {

		topics(state){
			return state.topics;
		},

		topic(state){
			return state.topic;
		},

		replies(state){
			return state.replies;
		},

		pages(state){
			return state.pages;
		},
	},

	mutations: {
		SET_TOPICS (state, topics){
			state.topics = topics;
		},

		APPEND_TOPICS (state, topics){
			state.topics = [...state.topics, ...topics];
		},

		CURRENT_PAGE (state, current_page){
			state.current_page = current_page;
		},

		SET_TOPIC (state, topic){
			state.topic = topic;
		},

		SET_REPLY (state, replies){
			state.replies = replies;
		},

		SET_REPLY_PAGINATION (state, pages){
			state.pages = pages;
		},

		CHANGE_REPLY_REACT (state, reactable_id){
			console.log(reactable_id)
			state.replies = state.replies.map(reply => {
				if (reply.id === reactable_id) {
					return Object.assign({}, reply, 100)
				}
				return reply
			})
		},
	},

	actions: {
		async getTopics({ commit }) {
		    let {data, meta} = await this.$axios.$get('/topic');
	        commit('SET_TOPICS', data);
	        commit('CURRENT_PAGE', meta.current_page);
		},

		async getMoreTopics({ commit, state }) {
		    let {data, meta} = await this.$axios.$get(`/topic?page=${state.current_page+1}`);
	        commit('APPEND_TOPICS', data);
	        commit('CURRENT_PAGE', meta.current_page);
		},

		async getTopic({ commit }, id) {
			let {data} = await this.$axios.$get(`/topic/${id}`)
			commit('SET_TOPIC', data.topic);
			commit('SET_REPLY', data.replies.data);
			commit('SET_REPLY_PAGINATION', data.replies.meta.links);
		},

		async toggle({ commit }, react) {
			
			let data = await this.$axios.$post(`/${react.section}/${react.id}/reaction`, { reaction: react.type });
			if (data) {
				commit('CHANGE_REPLY_REACT', data.reactable_id);
			}
		},
	}
}