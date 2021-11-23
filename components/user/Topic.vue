<template>
	<div class="tab-pane active show">
		<div class="tt-topic-list" v-if="topics.length !== 0">
			<div class="tt-list-header">
				<div class="tt-col-topic">Topic</div>
				<div class="tt-col-category">Category</div>
				<div class="tt-col-value hide-mobile">Likes</div>
				<div class="tt-col-value hide-mobile">Replies</div>
				<div class="tt-col-value hide-mobile">Views</div>
				<div class="tt-col-value">Activity</div>
			</div>
			<Topics v-for="topic in topics" :key="topic.id" :topic="topic" />

			<div v-observe-visibility="visibilityChange"></div>
  		<div v-if="loader" class="loader"></div>
		</div>
		<div class="tt-topic-list" v-else>
			<p class="tt-wrapper-inner">has no post</p>
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
		await this.$store.dispatch('profile/getUserTopics', this.$route.params.id);
	},

	computed: {
	  ...mapGetters({
	  	topics: 'profile/topics'
	  })
	},

	methods: {
	  async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = true;
      ++this.page;
      await this.$store.dispatch('profile/getMoreUserTopics', {
      	id: this.$route.params.id,
      	page: this.page 
      });
      this.loader = false;
    }
	},
}
</script>

<style lang="css" scoped>
</style>