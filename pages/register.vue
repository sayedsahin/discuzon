<template>
	<div class="col-md-4 mt-2 mt-md-5 mx-auto">
		<h2 class="text-center">Create Account</h2>
		<form @submit.prevent="submit">
			<div class="form-group">
				<label>Name</label>
				<input v-model.trim="form.name" type="text" class="form-control" placeholder="Enter your name">
				<small class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
			</div>
			<div class="form-group">
				<label>Email address</label>
				<input v-model.trim="form.email" type="email" class="form-control" placeholder="Enter email">
				<small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input v-model.trim="form.password" type="password" class="form-control" placeholder="Password">
				<small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
			</div>
			<div class="form-group">
				<label>Confirm Password</label>
				<input v-model.trim="form.password_confirmation" type="password" class="form-control" placeholder="Password">
				<small class="form-text text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
			</div>
			<div class="form-check mb-1">
				<input type="checkbox" class="form-check-input">
				<label class="form-check-label">You agree terms and conditions</label>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>

<script>
export default {
	middleware: ['guest'],
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			}
		}
	},
	methods: {
		async submit() {
			await this.$axios.$post('register', this.form);
			await this.$auth.loginWith('local', {
			  data: {
			  	'email': this.form.email,
			  	'password': this.form.password
			  }
			});

		}
	}
}
</script>