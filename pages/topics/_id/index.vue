<template>
	<div class="container mt-5">
		<div class="jumbotron">
			<h4 class="display-4">{{ topic.title }}</h4>
			<p class="text-secondary">{{topic.created_at}} by {{topic.user.name}}</p>
			<div v-for="(post, index) in topic.posts" :key="index" class="ml-5">
				<div class="lead">{{post.body}}</div>
				<div v-if="user.id === post.user.id" class="float-right">
					<NuxtLink :to="{name: 'topics-posts-edit', params: {topicid: topic.id, postid: post.id}}" class="btn btn-outline-dark btn-sm">Edit</NuxtLink>
					<button @click="deletePost(topic.id, post.id)" class="btn btn-danger btn-sm">x</button>
				</div>
				<p class="text-secondary">{{post.created_at}} by {{post.user.name}}</p>
				<div @click="likePost(topic.id, post)" class="btn btn-outline-secondary btn-sm">Like <span>{{post.like_count}}</span></div>
			</div>
		</div>
		<div v-if="authenticated" class="mt-5 ml-5">
			<form @submit.prevent="create(topic.id)">
				<div class="form-group">
					<label for=""></label>
					<textarea v-model.trim="body" name="body" class="form-control" placeholder="Write this..." rows="5"></textarea>
				
					<small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
				</div>
				<button type="submit" name="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			topic: '',
			body: ''
		}
	},
	async asyncData({$axios, params}){
		const {data} = await $axios.$get(`/topic/${params.id}`)
		return {
			topic: data
		}
	},
	methods: {
		async create (id) {
			await this.$axios.$post(`/topic/${this.$route.params.id}/posts`, {
				body: this.body
			})
			// this.$router.push('/topic');
			const {data} = await this.$axios.$get(`/topic/${id}`)
			this.topic = data
		},
		async deletePost (topicid, id) {
			await this.$axios.$delete(`/topic/${this.$route.params.id}/posts/${id}`)
	    	// this.$router.push(`/topic`)
	    	const {data} = await this.$axios.$get(`/topic/${topicid}`)
			this.topic = data
		},
		async likePost(topicid, post) {
			const userFromVuex = this.$store.getters['user'];
			if (userFromVuex) {
				//can like your own post
				if (userFromVuex.id === post.user.id) {
					alert('You cant like your own post');
					return;
				}
				// if user have already liked
				if (post.users) {
					if (post.users.some(user=> user.id === userFromVuex.id)) {
						alert('you have already liked this post')
					}else{
						await this.$axios.$post(`/topic/${topicid}/posts/${post.id}/likes`)
						const {data} = await this.$axios.$get(`/topic/${topicid}`)
						this.topic = data
					}
				}
			}else{
				alert('Please log in');
				this.$router.push(`/login`)
			}


		}
	}
}
</script>