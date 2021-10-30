<template>
	<div class="col-md-4 mt-2 mt-md-5 mx-auto">
		<h2 class="text-center">Create a new Topic</h2>
		<form @submit.prevent="create">
			<div class="form-group">
				<label>Topic Title:</label>
				<input v-model.trim="form.title" type="title" name="title" class="form-control" placeholder="Enter title">
				<small class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
			</div>
			<div class="form-group">
				<label>Topic Body</label>
				<textarea v-model.trim="form.body" name="body" class="form-control" placeholder="Write this..." rows="5"></textarea>
				<small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
			</div>
			<button type="submit" name="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>

<script>
export default {
	middleware: ['auth'],
	data() {
		return {
			form: {
				title: '',
				body: ''
			}
		}
	},
	methods: {
		async create() {
			try{
				await this.$axios.$post('topic', this.form);
				this.$router.push('/');
			}catch(e){
				// Error
			}
		}
	}
}
</script>
