export default {

	state() {
		return {
			replies: [],
			pages: [],
		}
	},

	getters: {
		replies(state){
			return state.replies;
		},
		pages(state){
			return state.pages;
		},
	},

	mutations: {

		SET_REPLIES (state, replies){
			state.replies = replies;
		},

		SET_REPLIES_PAGINATION (state, pages){
			state.pages = pages;
		},

		APPEND_REPLY (state, reply) {
			state.replies = [...state.replies, reply]
		},

		DELETE_REPLY (state, index) {
			state.replies.splice(index, 1);
		},

		CHANGE_REPLY_REACT (state, value){

			let old_reaction = state.replies[value.index].reacted ? state.replies[value.index].reacted.type : null;
			let type = value.reaction.type

			state.replies[value.index].reacted = {'type': value.reaction.type};

			if (old_reaction !== null) {
	    		state.replies[value.index].reaction[old_reaction]--;
	    	}

		    if (type && type !== old_reaction) {
		        if (!state.replies[value.index].reaction[type]) {
		          state.replies[value.index].reaction[type] = 1;
		          return;
		        }

		      	state.replies[value.index].reaction[type]++;
		    }
		},
	},

	actions: {

		async getReplies({ commit }, topic) {
			let { data, meta } = await this.$axios.$get(`/topic/${topic.id}${topic.reply}/replies`)
			commit('SET_REPLIES', data);
			commit('SET_REPLIES_PAGINATION', meta.links);
		},

		async getMoreReplies({ commit }, link) {
			let { data, meta } = await this.$axios.$get(link)
			commit('SET_REPLIES', data);
			commit('SET_REPLIES_PAGINATION', meta.links);
		},

		async createReply ({ commit }, reply) {
			let { data } = await this.$axios.$post(`/topic/${reply.id}/reply`, {
					body: reply.body
				});
	        commit('APPEND_REPLY', data);
		},

		async deleteReply ({ commit }, reply) {
			await this.$axios.$delete(`reply/${reply.id}`)
	        commit('DELETE_REPLY', reply.index);
		},

		async toggleReaction({ commit, state }, reply) {
			
			let data = await this.$axios.$post(`/reply/${reply.id}/reaction`, { reaction: reply.reaction });
			commit('CHANGE_REPLY_REACT', {
				reaction: data,
				index: reply.index
			});
		},

		
	}
}