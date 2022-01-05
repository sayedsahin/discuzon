<template>
	<main id="tt-pageContent" class="tt-offset-none mt-5">
		<div class="container">
			<div class="tt-loginpages-wrapper">
				<div class="tt-loginpages">
					<NuxtLink to="/" class="tt-block-title">
						<img src="/favicon.ico" width="80px">
						<div class="tt-title">
							Reset your password
						</div>
					</NuxtLink>

					<form @submit.prevent="submit" class="form-default">
						<div class="form-group">
							<label for="loginUserName">Email</label>
							<input v-model.trim="form.email" type="email" name="email" class="form-control" placeholder="email@example.com" autocomplete="email" readonly>
						</div>
						<div class="form-group">
							<label for="loginUserName">Password</label>
							<input v-model.trim="form.password" type="password" name="password" class="form-control" placeholder="type a new password" autocomplete="new-password" required>
							<small class="d-block w3-panel w3-pale-red w3-border w3-round" v-if="errors.password">{{ errors.password[0] }}</small>
						</div>
						<div class="form-group">
							<label for="loginUserName">Cofirme Password</label>
							<input v-model.trim="form.password_confirmation" type="password" name="password_confirmation" class="form-control" placeholder="confirm your password" autocomplete="new-password" required>
							<small class="d-block w3-panel w3-pale-red w3-border w3-round" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
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
					email: this.$route.query.email,
					token: this.$route.params.token,
					password: '',
					password_confirmation: '',
				},
			}
		},
		methods: {
			async submit() {
				try{
					// await this.$axios.$get('sanctum/csrf-cookie')
					let data = await this.$axios.$post('/reset-password', this.form)
					this.$router.push('/login')

				}catch(e){
					return;
				}

			}
		}
	}
</script>