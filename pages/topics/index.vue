<template>
	<div class="mt-2 mt-md-5 container">
		<h2 class="text-center">Letest Topic</h2>
		<div v-for="(topic, index) in topics" :key="index" class="jumbotron">
			<h4 class="display-4"><nuxt-link :to="{name: 'topics-id', params: {id: topic.id}}">{{ topic.title }}</nuxt-link></h4>
			<div v-if="user.id === topic.user.id" class="float-right">
				<nuxt-link :to="{name: 'topics-edit', params: {id: topic.id}}" class="btn btn-outline-dark btn-sm">Edit</nuxt-link>
				<button @click="deleteTopic(topic.id)" class="btn btn-danger btn-sm">Delete</button>
			</div>
			<p class="text-secondary">{{topic.created_at}} by {{topic.user.name}}</p>
			<div v-for="(post, index) in topic.posts" :key="index" class="ml-5">
				<div class="lead">{{post.body}}</div>
				<p class="text-secondary">{{post.created_at}} by {{post.user.name}}</p>
			</div>
		</div>
		<nav>
			<ul class="pagination justify-content-center">
				<li v-for="(key, value) in links">
					<a @click="loadMore(key)" href="#" class="page-link">{{value}}</a>
				</li>
			</ul>
		</nav>
	</div>
	
</template>

<script>
export default {
	middleware: ['auth'],
	data() {
		return {
			topics: [],
			links: []
		}
	},
	async asyncData({$axios}) {
		let {data, links} = await $axios.$get('/topic');
		return {
			topics: data,
			links: links
		}

	},
	methods: {
	  async loadMore (key) {
	    let {data} = await this.$axios.$get(key)
	    return this.topics = {...this.topics, ...data}
	  },
	  async deleteTopic (id) {
	    await this.$axios.$delete(`/topic/${id}`)
	    this.$router.push('/')
	  }
	}
}
</script>