<template>
	<div class="tab-pane active show">
		<div class="tt-topic-list">
			<div class="tt-list-header">
				<div class="tt-col-topic">Topic</div>
				<div class="tt-col-category">Category</div>
				<div class="tt-col-value">Activity</div>
			</div>

			<div class="tt-item" v-for="reply in replies" :key="reply.id">
				<div class="tt-col-avatar">
					<NuxtLink :to="{ name: 'user-id', params: {id: reply.user.id} }">
		        <img :src="reply.user.avatar" alt="" class="w3-round-xxlarge">
		      </NuxtLink>
				</div>
				<div class="tt-col-description">
					<h6 class="tt-title">
						<NuxtLink :to="{ name: 'topic-id', params: {id: reply.topic_id }}">{{reply.title}}</NuxtLink>
					</h6>
					<div class="row align-items-center no-gutters hide-desktope">
						<div class="col-9">
							<ul class="tt-list-badge">
								<li class="show-mobile"><NuxtLink :to="{ name: 'category-slug', params: { slug: reply.category.slug }}"><span :class="`${reply.category.color} tt-badge`">{{reply.category.name}}</span></NuxtLink></li>
							</ul>
						</div>
						<div class="col-3 ml-auto show-mobile">
							<div class="tt-value"><Time :timestamp="reply.created_at"/></div>
						</div>
					</div>
					<div class="tt-content" v-html="reply.body"></div>
				</div>
				<div class="tt-col-category"><NuxtLink :to="{ name: 'category-slug', params: { slug: reply.category.slug }}"><span :class="`${reply.category.color} tt-badge`">{{reply.category.name}}</span></NuxtLink></div>
				<div class="tt-col-value-large hide-mobile"><Time :timestamp="reply.created_at"/></div>
			</div>

			<div v-observe-visibility="visibilityChange"></div>
  		<div v-if="loader" class="loader"></div>
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
		await this.$store.dispatch('profile/getUserReplies', this.$route.params.id);
	},

	computed: {
	  ...mapGetters({
	  	replies: 'profile/replies'
	  })
	},

	methods: {
	  async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = true;
      ++this.page;
      await this.$store.dispatch('profile/getMoreUserReplies', {
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