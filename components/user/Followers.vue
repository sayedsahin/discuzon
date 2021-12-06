<template>
	<div class="tab-pane active show">
		<div class="tt-followers-list" v-if="followers.length !== 0">
			<div class="tt-list-header">
				<div class="tt-col-name">User</div>
				<div class="tt-col-value-large hide-mobile">Follow date</div>
				<div class="tt-col-value-large hide-mobile">Last Activity</div>
				<div class="tt-col-value-large hide-mobile">Threads</div>
				<div class="tt-col-value-large hide-mobile">Replies</div>
				<div class="tt-col-value">Level</div>
			</div>
			<div class="tt-item" v-for="follower in followers" :key="follower.id">
				<div class="tt-col-merged">
					<div class="tt-col-avatar">
						<NuxtLink :to="{ name: 'user-id', params: {id: follower.id} }">
							<img :src="follower.avatar" alt="" class="w3-round-xxlarge">
						</NuxtLink>
					</div>
					<div class="tt-col-description">
						<h6 class="tt-title"><NuxtLink :to="{ name: 'user-id', params: {id: follower.id} }">{{follower.name}}</NuxtLink></h6>
						<ul>
							<li><NuxtLink :to="{ name: 'user-id', params: {id: follower.id} }">@{{follower.username}}</NuxtLink></li>
						</ul>
					</div>
				</div>
				<div class="tt-col-value-large hide-mobile"><TimeDate :timestamp="follower.follower_at"/></div>
				<div class="tt-col-value-large hide-mobile tt-color-select"><Time :timestamp="follower.last_activity ? follower.last_activity.created_at : null"/></div>
				<div class="tt-col-value-large hide-mobile">{{ follower.topics }}</div>
				<div class="tt-col-value-large hide-mobile">{{ follower.replies }}</div>
				<div class="tt-col-value"><span class="tt-color14 tt-badge">LVL : {{ follower.level }}</span></div>
			</div>
			<div v-observe-visibility="visibilityChange"></div>
  		<div v-if="loader" class="loader"></div>
		</div>
		<div class="tt-topic-list" v-else>
			<p class="tt-wrapper-inner"></p>
		</div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {

	data () {
		return {
			loader: false,
			page: 1
		}
	},

	async fetch() {
		await this.$store.dispatch('profile/getFollowers', this.$route.params.id);
	},

	computed: {
	  ...mapGetters({
	  	followers: 'profile/followers'
	  })
	},

	methods: {
	  async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = true;
      ++this.page;
      await this.$store.dispatch('profile/getMoreFollowers', {
      	id: this.$route.params.id,
      	page: this.page 
      });
      this.loader = false;
    },
	},
}
</script>