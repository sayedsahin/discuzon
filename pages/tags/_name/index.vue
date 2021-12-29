<template>
	<main id="tt-pageContent">
		<div class="container">
			<div class="tt-catSingle-title">
				<div class="tt-innerwrapper tt-row">
					<div class="tt-col-left">
						<ul class="tt-list-badge">
							<li><NuxtLink :to="{ name: 'tags-name', params: { slug: $route.params.name }}"><span class="tt-badge">{{ $route.params.name }}</span></NuxtLink></li>
						</ul>
					</div>
					<div class="ml-left tt-col-right">
						<div class="tt-col-item">
							<h2 class="tt-value">Topics - {{ tag.topics_count }}</h2>
						</div>
						<div class="tt-col-item">
							<div class="tt-search">
								<form @submit.prevent="search()" class="search-wrapper d-block">
									<div class="search-form">
										<input v-model.trim="tags_search" type="text" class="tt-search__input" :placeholder="`Search in ${tag.name}`">
										<button class="tt-search__btn" type="submit">
											<svg class="tt-icon">
												<use xlink:href="#icon-search"></use>
											</svg>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="tt-innerwrapper">
					'{{ tag.name }}' tag's all result
				</div>
				<!-- <div class="tt-innerwrapper">
					<h6 class="tt-title">Similar TAGS</h6>
					<ul class="tt-list-badge">
						<li><a href="#"><span class="tt-badge">world politics</span></a></li>
					</ul>
				</div> -->
			</div>
			<div class="tt-topic-list">
				<div class="tt-list-header">
					<div class="tt-col-topic">Topic</div>
					<div class="tt-col-category">Category</div>
					<div class="tt-col-value hide-mobile">Likes</div>
					<div class="tt-col-value hide-mobile">Replies</div>
					<div class="tt-col-value hide-mobile">Views</div>
					<div class="tt-col-value">Activity</div>
				</div>

				<Topics v-for="topic in tag.topics" :key="topic.id" :topic="topic" />
				<div class="tt-row-btn">
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
import { mapGetters } from 'vuex'
export default {

  data () {
    return {
    	loader: '',
    	page: 1,
    	tags_search: ''
    }
  },

  async asyncData({ $axios, params }) { 
    let { data } = await $axios.$get(`/tags/${params.name}`);
    return { tag: data };
  },

  methods: {
	  async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      let { data } = await this.$axios.$get(`/tags/${this.$route.params.name}/topics?page=${++this.page}`);
      this.tag.topics = [...this.tag.topics, ...data];
      this.loader = '';
    },

    search(){
    	if (this.tags_search) {
    		this.$router.push({name: 'tags-name-query', params: {query: this.tags_search}})
    	}
    },
  },
}
</script>