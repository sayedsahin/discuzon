<template>
	<div class="tab-pane active show">
		<div class="tt-topic-list" v-if="activities.length !== 0">
			<div class="tt-list-header">
				<div class="tt-col-topic col-lg-9">Topic</div>
				<div class="tt-col-value-large hide-mobile col-lg-1">Category</div>
				<!-- <div class="tt-col-value-large hide-mobile">Status</div> -->
				<div class="tt-col-value-large hide-mobile col-lg-2 w3-right-align">Activity</div>
			</div>
			<component :is="`User${activity.activity_hint}`" v-for="activity in activities" :key="activity.id" :activity="activity" :username="profileUser.name" v-if="activity.activity"/>
			<div v-observe-visibility="visibilityChange"></div>
  		<div v-if="loader" class="loader"></div>
		</div>
		<div class="tt-topic-list" v-else>
			<p class="tt-wrapper-inner">{{profileUser.name.split(' ')[0]}}'s no activity</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

	data () {
		return {
			loader: false
		}
	},

	async fetch() {
  	await this.$store.dispatch('profile/getActivities', this.$route.params.id);
  },

  computed: {
    ...mapGetters ({
      activities: 'profile/activities',
      profileUser: 'profile/profileUser',
    })
  },

  methods: {
    async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = true;
      await this.$store.dispatch('profile/getMoreActivities', this.$route.params.id);
      this.loader = false;
    }
  }
}
</script>

<style lang="css" scoped>
</style>