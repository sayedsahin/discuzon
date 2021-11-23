<template>
	<div class="container">
		<h2>Update Post Title</h2>
		<form @submit.prevent="update">
			<div class="form-group">
				<input type="text" v-model="post.body" class="form-control">
				<small v-if="errors.body" class="form-text text-danger">{{errors.body[0]}}</small>
			</div>
			<button type="submit" name="submit" class="btn btn-primary">Submit</button>
		</form>
		<NuxtLink :to="`/topics/`+$route.params.topicid" class="btn btn-info btn-sm mt-5">Back</NuxtLink>
	</div>
</template>

<script>
export default {
	middleware: ['auth'],
	data () {
		return {
			post: {
				body: ''
			}
		}
	},
	async asyncData({$axios, params}){
		const {data} = await $axios.$get(`topics/${params.topicid}/posts/${params.postid}`)
		return {
			post: data
		}
	},
	methods: {
		async update () {
			await this.$axios.$patch(`topics/${this.$route.params.topicid}/posts/${this.$route.params.postid}`, {
				body: this.post.body
			})
			this.$router.push(`/topics/${this.$route.params.topicid}`)
		}
	}
}
</script>

<style lang="css" scoped>
</style>