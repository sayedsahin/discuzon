<template>
	<div id="js-popup-settings" class="tt-popup-settings column-open ps-container ps-theme-default ps-active-y scroll" style="overflow: scroll !important;">
		<div class="tt-btn-col-close">
			<a @click.prevent="$emit('closeSetting')" href="">
				<span class="tt-icon-title">
					<svg>
						<use xlink:href="#icon-settings_fill"></use>
					</svg>
				</span>
				<span class="tt-icon-text">
					Settings
				</span>
				<span class="tt-icon-close">
					<svg>
						<use xlink:href="#icon-cancel"></use>
					</svg>
				</span>
			</a>
		</div>
		<form @submit.prevent="update()" class="form-default" enctype="multipart/form-data">
			<div v-if="errors.message" class="w3-panel w3-pale-red w3-border w3-round">{{errors.message}}</div>
			<div class="mb-2 px-2 w3-pale-red w3-border w3-round" v-if="errors.profile_photo_path">{{ errors.profile_photo_path[0] }}</div>
			<div class="tt-form-upload">
				<div class="row no-gutter">
					<div class="col-auto">
						<div class="tt-col-avatar">
							<img :src="avatar" alt="" class="w3-round-xxlarge">
						</div>
					</div>
					<div class="col-auto ml-auto">
						<label for="imageUpload" class="btn btn-primary">Upload Picture</label>
						<input type="file" id="imageUpload" @change="profilePhoto($event)" accept="image/*" hidden>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="settingsName">Name</label>
				<input type="text" name="name" class="form-control" id="settingsName" v-model="name" autocomplete="name">
				<div class="mt-1 px-2 w3-pale-red w3-border w3-round" v-if="errors.name">{{ errors.name[0] }}</div>
			</div>
			<div class="form-group">
				<label for="settingsUserName">Username</label>
				<input type="text" name="username" class="form-control" v-model="username" id="settingsUserName" autocomplete="username">
				<div class="mt-1 px-2 w3-pale-red w3-border w3-round" v-if="errors.username">{{ errors.username[0] }}</div>
			</div>
			<div class="form-group">
				<label for="settingsUserEmail">Email</label>
				<input type="text" name="email" class="form-control" v-model="email" id="settingsUserEmail" autocomplete="email">
				<div class="mt-1 px-2 w3-pale-red w3-border w3-round" v-if="errors.email">{{ errors.email[0] }}</div>
			</div>
			
			<!-- <div class="form-group">
				<label for="settingsUserLocation">Location</label>
				<input type="text" name="name" class="form-control" id="settingsUserLocation" placeholder="Slovakia">
			</div>
			<div class="form-group">
				<label for="settingsUserWebsite">Website</label>
				<input type="text" name="name" class="form-control" id="settingsUserWebsite" placeholder="Sample.com">
			</div>
			<div class="form-group">
				<label for="settingsUserAbout">About</label>
				<textarea name="" placeholder="Few words about you" class="form-control" id="settingsUserAbout"></textarea>
			</div> -->
			<!-- <div class="form-group">
				<label for="settingsUserAbout">Notify me via Email</label>
				<div class="checkbox-group">
					<input type="checkbox" id="settingsCheckBox01" name="checkbox">
					<label for="settingsCheckBox01">
						<span class="check"></span>
						<span class="box"></span>
						<span class="tt-text">When someone replies to my thread</span>
					</label>
				</div>
				<div class="checkbox-group">
					<input type="checkbox" id="settingsCheckBox02" name="checkbox">
					<label for="settingsCheckBox02">
						<span class="check"></span>
						<span class="box"></span>
						<span class="tt-text">When someone likes my thread or reply</span>
					</label>
				</div>
				<div class="checkbox-group">
					<input type="checkbox" id="settingsCheckBox03" name="checkbox">
					<label for="settingsCheckBox03">
						<span class="check"></span>
						<span class="box"></span>
						<span class="tt-text">When someone mentions me</span>
					</label>
				</div>
			</div> -->
			<div class="form-group">
				<button type="submit" class="btn btn-secondary">Save</button>
			</div>
		</form>

		<form @submit.prevent="updatePassword()" method="post" class="form-default">
			<div class="form-group">
				<label for="oldPassword">Old Password</label>
				<input type="password" name="current_password" v-model="password.current_password" class="form-control" id="oldPassword" autocomplete="current-password">
				<div class="mt-1 px-2 w3-pale-red w3-border w3-round" v-if="errors.current_password">{{ errors.current_password }}</div>
			</div>
			<div class="form-group">
				<label for="newPassword">New Password</label>
				<input type="password" name="password" v-model="password.password" class="form-control" id="newPassword" autocomplete="new-password">
				<div class="mt-1 px-2 w3-pale-red w3-border w3-round" v-if="errors.password">{{ errors.password[0] }}</div>
			</div>
			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" name="password_confirmation" v-model="password.password_confirmation" class="form-control" id="confirmPassword" autocomplete="new-password">
				<div class="mt-1 px-2 w3-pale-red w3-border w3-round" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</div>
			</div>

			<div class="form-group">
				<button type="submit" href="#" class="btn btn-secondary">Save</button>
			</div>
		</form>
		<div v-if="success" class="fixed-bottom w3-panel w3-green p-2 w3-round">{{success}}</div>
	</div>
</template>

<script>
export default {
	middleware: ['auth'],
	props: {
	  profileUser: {
	    type: Object,
	    required: true
	  },
	},

	data () {
		return {
			avatar: this.profileUser.avatar,

			name: this.profileUser.name,
			username: this.profileUser.username,
			email: this.profileUser.email,
			image: '',

			password: {
				current_password: '',
				password: '',
				password_confirmation: '',
			},
			success: false
		}
	},
	methods: {
	  profilePhoto (event) {
	  	if (event.target.files.length === 0) {
	  		return;
	  	}
	  	this.image = event.target.files[0];

	  	// For Preview
	    let reader = new FileReader();
      reader.onload = event => {
        this.avatar = event.target.result;
      }
    	reader.readAsDataURL(event.target.files[0]);
	  },


	  async update() {
	  	const formData = new FormData;
			formData.append('name', this.name);
			formData.append('username', this.username);
			formData.append('email', this.email);
			formData.append('profile_photo_path', this.image);
			try{
		  	await this.$store.dispatch('profile/userUpdate', formData);
      	this.success = 'Profile updated successful';
      	setTimeout(() => this.success = false, 5000);
      }catch(e){
			  return
			}
	  },

	  async updatePassword() {
			try{
		  	let data = await this.$axios.$patch(`/user/password`, this.password);
		  	if (data === 1) {
		  		this.password = {};
			  	// this.$auth.logout()
	      	this.success = 'Password updated successful';
	      	setTimeout(() => this.success = false, 5000);
		  	}
      }catch(e){
			  return
			}
	  },
	},
}
</script>

<style lang="css" scoped>
</style>