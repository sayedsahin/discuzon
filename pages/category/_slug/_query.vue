<template>
	<main id="tt-pageContent">
		<div class="container">
			<div class="tt-catSingle-title">
				<div class="d-block d-sm-flex tt-innerwrapper tt-row">
					<div class="tt-col-left">
						<ul class="tt-list-badge">
							<li><NuxtLink :to="{ name: 'category-slug', params: { slug: $route.params.slug }}"><span class="tt-color01 tt-badge">{{ $route.params.slug }}</span></NuxtLink></li>
						</ul>
					</div>
					<div class="ml-left tt-col-right">
						<div class="d-block d-sm-inline-block tt-col-item">
							<div class="tt-search">
								<form @submit.prevent="search()" class="d-block search-wrapper">
									<div class="search-form">
										<input v-model.trim="category_search" type="text" class="tt-search__input" :placeholder="`Search in ${$route.params.slug}`" required>

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
					Search result in "{{ $route.params.slug }}" category.
				</div>
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

				<Topics v-if="search_result.length !== 0" v-for="topic in search_result" :key="topic.id" :topic="topic" />
				<div class="col-12" v-if="search_result.length === 0 && !errors.query">"{{ category_search }}" not found! Try another word</div>
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
    	category_search: this.$route.params.query,
    }
  },

  async asyncData({ $axios, params }) { 
  	try{
	    let { data } = await $axios.$get(`category/${params.slug}/search?query=${params.query}`);
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
      let { data } = await this.$axios.$get(`category/${this.$route.params.slug}/search?query=${this.$route.params.query}&page=${this.page}`);
      this.search_result = [...this.search_result, ...data];
      this.loader = '';
    },

    search(){
    	if (this.category_search) {
    		this.$router.push({name: 'category-slug-query', params: {query: this.category_search}})
    	}
    }
  },
}
</script>