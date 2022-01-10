<template>
	<main id="tt-pageContent" class="tt-offset-none mt-5">
		<div class="container">
			<div class="tt-loginpages-wrapper">
				<div class="tt-loginpages">
					<NuxtLink to="/" class="tt-block-title">
						<svg class="logo-lg">
						  <use xlink:href="#logo"></use>
						</svg>
						<div class="tt-title">
							Recover your password
						</div>
					</NuxtLink>
					<div v-if="reset_message" class="w3-panel w3-green w3-border w3-round" style="">{{reset_message}}</div>
					<form @submit.prevent="submit" class="form-default">
						<div class="form-group">
							<label for="loginUserName">Email</label>
							<input v-model.trim="form.email" type="email" name="email" class="form-control" id="loginUserName" placeholder="email@example.com" autocomplete="email" required>
							<small class="d-block w3-panel w3-pale-red w3-border w3-round" v-if="errors.email">{{ errors.email[0] }}</small>
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-secondary btn-block">Submit</button>
						</div>
						<p>You want to login? <NuxtLink to="/login" class="tt-underline">Sign in here</NuxtLink></p>
					</form>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	export default {
		middleware: ['guest'],
		data() {
			return {
				form: {
					email: '',
				},
				reset_message: '',
			}
		},
		head() {
	    return{
	      title: 'Forgot Password'
	    }
	  },
		methods: {
			async submit() {
				try{
					// await this.$axios.$get('sanctum/csrf-cookie')
					this.reset_message = ''
					let data = await this.$axios.$post('/forgot-password', this.form)
					this.reset_message = data.message

				}catch(e){
					return;
				}

			}
		}
	}
</script>