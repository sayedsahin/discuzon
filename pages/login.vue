<template>
	<main id="tt-pageContent" class="tt-offset-none mt-5">
	    <div class="container">
	        <div class="tt-loginpages-wrapper">
	            <div class="tt-loginpages">
	                <nuxt-link to="/" class="tt-block-title">
	                    <img src="/favicon.ico" width="80px">
	                    <div class="tt-title">
	                        Welcome to Forum19
	                    </div>
	                    <div class="tt-description">
	                       Log into your account to unlock true power of community.
	                    </div>
	                </nuxt-link>
	                <form @submit.prevent="submit" class="form-default">
	                	<div v-if="errors.message" class="w3-panel w3-pale-red w3-border w3-round">Incorrect email Or password.</div>
	                    <div class="form-group">
	                        <label for="loginUserName">Email</label>
	                        <input v-model.trim="form.email" type="email" name="email" class="form-control" id="loginUserName" placeholder="email@example.com" autocomplete="email">
	                        <small class="w3-red" v-if="errors.email">{{ errors.email[0] }}</small>
	                    </div>
	                    <div class="form-group">
	                        <label for="loginUserPassword">Password</label>
	                        <input v-model.trim="form.password" type="password" name="password" class="form-control" id="loginUserPassword" placeholder="************" autocomplete="current-password">
	                        <small class="w3-red" v-if="errors.password">{{ errors.password[0] }}</small>
	                    </div>
	                    <div class="row">
	                        <div class="col">
	                            <div class="form-group">
	                                <div class="">
	                                    <input type="checkbox" id="settingsCheckBox01" name="checkbox">
	                                    <label for="settingsCheckBox01">
	                                        <span class="check"></span>
	                                        <span class="box"></span>
	                                        <span class="tt-text">Remember me</span>
	                                    </label>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="col ml-auto text-right">
	                            <a href="#" class="tt-underline">Forgot Password</a>
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <button type="submit" class="btn btn-secondary btn-block">Log in</button>
	                    </div>
	                    <p>Or login with social network</p>
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
	                    <p>Don’t have an account? <nuxt-link to="/register" class="tt-underline">Signup here</nuxt-link></p>
	                    <div class="tt-notes">
	                        By Logging in, signing in or continuing, I agree to
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
				this.$router.back()
			 }catch(e){
			    return;
			 }

		}
	}
}
</script>