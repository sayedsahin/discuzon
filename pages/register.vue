</template>
<template>
	<main id="tt-pageContent" class="tt-offset-none mt-5">
	    <div class="container">
	        <div class="tt-loginpages-wrapper">
	            <div class="tt-loginpages">
	                <NuxtLink to="/" class="tt-block-title">
	                    <img src="/favicon.ico" width="80px">
	                    <div class="tt-title">
	                        Welcome to Forum19
	                    </div>
	                    <div class="tt-description">
	                       Join the forum to unlock true power of community.
	                    </div>
	                </NuxtLink>
	                <form @submit.prevent="submit" class="form-default">
	                	<div v-if="errors.message" class="w3-panel w3-pale-red w3-border w3-round">{{errors.message}}</div>
	                    <div class="form-group">
	                        <label for="registerUserName">Name</label>
	                        <input v-model.trim="form.name" type="text" name="name" class="form-control" id="registerUserName" placeholder="Mr. Sayed" required>
	                        <small class="w3-red" v-if="errors.name">{{ errors.name[0] }}</small>
	                    </div>
	                    <div class="form-group">
	                        <label for="registerUserName">Email</label>
	                        <input v-model.trim="form.email" type="email" name="email" class="form-control" id="registerUserName" placeholder="email@example.com" required>
	                        <small class="w3-red" v-if="errors.email">{{ errors.email[0] }}</small>
	                    </div>
	                    <div class="form-group">
	                        <label for="registerUserPassword">Password</label>
	                        <input v-model.trim="form.password" type="password" name="password" class="form-control" id="registerUserPassword" placeholder="************" required>
	                        <small class="w3-red" v-if="errors.password">{{ errors.password[0] }}</small>
	                    </div>
	                    <div class="form-group">
	                        <label for="registerPasswordConfirm">Confirm Password</label>
	                        <input v-model.trim="form.password_confirmation" type="password" name="password" class="form-control" id="registerPasswordConfirm" placeholder="************" required>
	                        <small class="w3-red" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
	                    </div>
	                    <div class="form-group">
	                        <button type="submit" class="btn btn-secondary btn-block">Create my account</button>
	                    </div>
	                    <p>Or singup with social network</p>
	                    <div class="row">
	                        <div class="col">
	                            <div class="form-group">
	                                <a href="#" class="btn btn-color01 btn-secondary btn-block">
	                                    <i>
	                                        <svg class="icon">
	                                          <use xlink:href="#facebook-f-brands"></use>
	                                        </svg>
	                                    </i>
	                                    Facebook
	                                </a>
	                            </div>
	                        </div>
	                        <div class="col">
	                            <div class="form-group">
	                                <a href="#" class="btn btn-color02 btn-block">
	                                    <i>
	                                        <svg class="icon">
	                                          <use xlink:href="#twitter-brands"></use>
	                                        </svg>
	                                    </i>
	                                    Twitter
	                                </a>
	                            </div>
	                        </div>
	                    </div>
	                    <p>Already have an account? <NuxtLink to="/login" class="tt-underline">Login here</NuxtLink></p>
	                    <div class="tt-notes">
	                        By signing up, signing in or continuing, I agree to
	                        Forum19’s <a href="#" class="tt-underline">Terms of Use</a> and <a href="#" class="tt-underline">Privacy Policy.</a>
	                    </div>
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
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			}
		}
	},
	methods: {
		async submit() {
			try{
				await this.$axios.$post('register', this.form);
				await this.$auth.loginWith('local', {
				  data: {
				  	'email': this.form.email,
				  	'password': this.form.password
				  }
				});
			}catch(e){
			    //Errors
			 }

		}
	}
}
</script>