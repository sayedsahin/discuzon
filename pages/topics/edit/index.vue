<template>
	<div class="container">
		<h2>Update Topic Title</h2>
		<form @submit.prevent="update">
			<div class="form-group">
				<input type="text" v-model="topic.title" class="form-control">
				<small v-if="errors.title" class="form-text text-danger">{{errors.title[0]}}</small>
			</div>
			<button type="submit" name="submit" class="btn btn-primary">Submit</button>
		</form>
		<NuxtLink to="/topics" class="btn btn-info btn-sm mt-5">Back</NuxtLink>
	</div>
</template>

<script>
export default {
	middleware: ['auth'],
	data () {
		return {
			topic: {
				title: ''
			}
		}
	},
	async asyncData({$axios, params}){
		const {data} = await $axios.$get(`/topics/${params.id}`)
		return {
			topic: data
		}
	},
	methods: {
		async update () {
			await this.$axios.patch(`/topics/${this.$route.params.id}`, {
				title: this.topic.title
			})
			this.$router.push('/topics')
		}
	}
}
</script>

<style lang="css" scoped>
</style>