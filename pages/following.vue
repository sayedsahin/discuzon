<template>
	<main id="tt-pageContent" class="tt-offset-small">
    <div class="container">
      <div class="tt-topic-list">
        <div class="tt-list-header">
          <div class="tt-col-topic">Topic</div>
          <div class="tt-col-category">Category</div>
          <div class="tt-col-value hide-mobile">Likes</div>
          <div class="tt-col-value hide-mobile">Replies</div>
          <div class="tt-col-value hide-mobile">Views</div>
          <div class="tt-col-value">Activity</div>
        </div>
        <Topics v-for="topic in topics" :key="topic.id" :topic="topic" />

        <div class="tt-row-btn" v-if="more">
					<button type="button" class="btn-icon js-topiclist-showmore">
						<svg :class="`tt-icon${loader}`">
							<use xlink:href="#icon-load_lore_icon"></use>
						</svg>
					</button>
					<div v-observe-visibility="visibilityChange"></div>
				</div>

      </div>
    </div>
  </main>
</template>

<script>
export default {
	middleware: ['auth'],
  data () {
    return {
    	loader: '',
    	page: 1,
    	more: true
    }
  },

  head() {
    return{
      title: 'My Following Topics'
    }
  },

  async asyncData({ $axios, params }) { 
    let { data } = await $axios.$get(`/following`);
    return { topics: data };
  },

  methods: {
    async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      let { data } = await this.$axios.$get(`/following?page=${++this.page}`);
      this.topics = [...this.topics, ...data];
      this.loader = '';
      if (data.length < 10) {
        this.more = false
      }

    },
  },
}
</script>

<style lang="css" scoped>
</style>