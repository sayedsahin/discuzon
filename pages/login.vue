<template>
	<div class="col-md-4 mt-2 mt-md-5 mx-auto">
		<h2 class="text-center">User Login</h2>
		<form @submit.prevent="submit">
			<div v-if="errors.message" class="alert alert-danger">{{ errors.message }}</div>
			<div class="form-group">
				<label>Email address</label>
				<input v-model.trim="form.email" type="email" name="email" class="form-control" placeholder="Enter email">
				<small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input v-model.trim="form.password" type="password" name="password" class="form-control" placeholder="Password">
				<small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
			</div>
			<div class="form-check mb-1">
				<input type="checkbox" class="form-check-input">
				<label class="form-check-label">Remember Me</label>
			</div>
			<button type="submit" name="submit" class="btn btn-primary">Submit</button>
		</form>
		<!-- <a href="#" @click.prevent="submit">Click</a> -->
	</div>
</template>

<script>
export default {
	middleware: ['guest'],
	data() {
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		async submit() {
			try{
				await this.$auth.loginWith('local', {
			  		data: this.form
				})
			 }catch(e){
			    return;
			 }

		}
	}
}
</script>