<template>
	<main id="tt-pageContent">
		<div class="container">
			<div class="tt-catSingle-title">
				<div class="tt-innerwrapper tt-row">
					<div class="tt-col-left">
						<ul class="tt-list-badge">
							<li><NuxtLink :to="{ name: 'tags-name', params: { name: $route.params.name }}"><span class="tt-color01 tt-badge">{{ $route.params.name }}</span></NuxtLink></li>
						</ul>
					</div>
					<div class="ml-left tt-col-right">
						<div class="tt-col-item">
							<div class="tt-search">
								<form @submit.prevent="search()" class="search-wrapper d-block">
									<div class="search-form">
										<input v-model.trim="tags_search" type="text" class="tt-search__input" :placeholder="`Search in ${$route.params.name}`" required>

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
					Search result in "{{ $route.params.name }}" tags.
				</div>
			</div>

			<div class="tt-topic-list">
				<div class="tt-list-header">
					<div class="tt-col-topic">Topic</div>
					<div class="tt-col-tags">Category</div>
					<div class="tt-col-value hide-mobile">Likes</div>
					<div class="tt-col-value hide-mobile">Replies</div>
					<div class="tt-col-value hide-mobile">Views</div>
					<div class="tt-col-value">Activity</div>
				</div>

				<Topics v-if="search_result.length !== 0" v-for="topic in search_result" :key="topic.id" :topic="topic" />
				<NotFound :error="'Try Another Word'" v-if="search_result.length === 0 && !errors.query" />
				
				<div class="ml-4 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.query">{{ errors.query[0] }}</div>
				<div v-if="search_result.length > 9" class="tt-row-btn">
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

  data () {
    return {
    	loader: '',
    	page: 1,
    	tags_search: this.$route.params.query,
    }
  },

  head() {
    return{
      title: this.$route.params.name+' tag - search'
    }
  },

  async asyncData({ $axios, params }) { 
  	try{
	    let { data } = await $axios.$get(`tags/${params.name}/search?query=${params.query}`);
      return {search_result: data}
    }catch(e){
    	return {search_result: []}
  	}
  },

  methods: {
	  async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      ++this.page;
      let { data } = await this.$axios.$get(`tags/${this.$route.params.name}/search?query=${this.$route.params.query}&page=${this.page}`);
      this.search_result = [...this.search_result, ...data];
      this.loader = '';
    },

    search(){
    	if (this.tags_search) {
    		this.$router.push({name: 'tags-name-query', params: {query: this.tags_search}})
    	}
    }
  },
}
</script>