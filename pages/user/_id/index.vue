<template>
	<div>
		<main id="tt-pageContent" class="tt-offset-small">
			<div class="tt-wrapper-section">
				<div class="container">
					<div class="tt-user-header">
						<div class="tt-col-avatar">
							<div class="tt-icon">
								<img :src="profileUser.avatar" alt="" class="w3-round-xxlarge">
								<!-- <svg class="tt-icon">
									<use xlink:href="#icon-ava-d"></use>
								</svg> -->
							</div>
						</div>
						<div class="tt-col-title">
							<div class="tt-title">
								<a href="#">{{ profileUser.name }}</a>
							</div>
							<ul class="tt-list-badge">
								<li><a href="#"><span class="tt-color14 tt-badge">LVL : {{ profileUser.level }}</span></a></li>
							</ul>
						</div>
						<div class="tt-col-btn" id="js-settings-btn">
							<div class="tt-list-btn">
								<a v-if="authenticated && user.id === profileUser.id" @click.prevent="setting = true" href="" class="tt-btn-icon">
									<svg class="tt-icon">
										<use xlink:href="#icon-settings_fill"></use>
									</svg>
								</a>
								<a href="#" class="btn btn-primary">Message</a>
								<a href="#" class="btn btn-secondary">Follow</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="tt-tab-wrapper">
					<div class="tt-wrapper-inner">
						<ul class="nav nav-tabs pt-tabs-default" role="tablist">
							<li class="nav-item show">
								<a @click.prevent="show = 'activity'" :class="`nav-link${ show === 'activity' ? ' active' : '' }`" href=""><span>Activity</span></a>
							</li>
							<li class="nav-item">
								<a @click.prevent="show = 'topic'" :class="`nav-link${ show === 'topic' ? ' active' : '' }`" href=""><span>Topic</span></a>
							</li>
							<li class="nav-item">
								<a @click.prevent="show = 'reply'" :class="`nav-link${ show === 'reply' ? ' active' : '' }`" href=""><span>Replies</span></a>
							</li>
							<li class="nav-item tt-hide-xs">
								<a @click.prevent="show = 'followers'" :class="`nav-link${ show === 'followers' ? ' active' : '' }`" href=""><span>526 Followers</span></a>
							</li>
							<li class="nav-item tt-hide-md">
								<a @click.prevent="show = 'following'" :class="`nav-link${ show === 'following' ? ' active' : '' }`" href=""><span>489 Following</span></a>
							</li>
						</ul>
					</div>
					<div class="tab-content">
						<UserActivity v-if="show === 'activity'" />
						<UserTopic v-if="show === 'topic'" />
						<UserReply v-if="show === 'reply'" />
						<UserFollowers v-if="show === 'followers'" />
						<UserFollowing v-if="show === 'following'" />
					</div>
				</div>
			</div>
		</main>
		<UserSetting
			v-if="authenticated && user.id === profileUser.id && setting" 
			@closeSetting="setting = false"
			:profileUser="profileUser"
			class="w3-animate-right"
		/>
		<div @click="setting = false" v-if="setting" class="modal-filter" style="opacity: 1;"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data () {
    return {
    	show: 'activity',
    	setting: false
    }
  },

  async asyncData({ store, params }) {
  	await store.dispatch('profile/getUser', params.id);
  },

  computed: {
    ...mapGetters ({
      profileUser: 'profile/profileUser',
    })
  },

  methods: {
    settings () {
      alert('hellow')
      if (this.setting == true) {
      	this.setting = false
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>