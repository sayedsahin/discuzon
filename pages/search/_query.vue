<template>
	<main id="tt-pageContent" class="tt-offset-small">
		<div class="container">
			<div class="tt-topic-list">
				<div class="tt-categories-title mt-3 mb-0">
					<div class="tt-title">Search Result</div>
					<div class="tt-search" style="width: unset;">
						<form @submit.prevent="search()" class="search-wrapper d-flex">
							<div class="search-form">
								<input v-model.trim="query" type="text" class="tt-search__input" placeholder="Search Categories" required>
								<button class="tt-search__btn" type="submit">
									<svg class="tt-icon">
										<use xlink:href="#icon-search"></use>
									</svg>
								</button>
								<button class="tt-search__close">
									<svg class="tt-icon">
										<use xlink:href="#icon-cancel"></use>
									</svg>
								</button>
							</div>
								<button type="submit" class="btn btn-primary ml-1">Search</button>
						</form>
					</div>
				</div>
				
				<div class="tt-list-header">
					<div class="tt-col-topic col-lg-9">Topic</div>
					<div class="tt-col-value-large hide-mobile col-lg-1">Category</div>
					<div class="tt-col-value-large hide-mobile col-lg-2 w3-right-align">Created</div>
				</div>

				<div class="tt-item" v-for="(search, index) in searches" :key="index">
					<div class="tt-col-avatar col-lg-1">
						<NuxtLink :to="{ name: 'user-id', params: {id: search.user_id} }">
		        <img :src="avatar(search.profile_photo_path, search.email)" alt="" class="w3-round-xxlarge">
		      </NuxtLink>
					</div>
					<div class="tt-col-description col-lg-8">
						<h6 class="tt-title">
							<svg class="tt-icon">
								<use v-if="!search.reply_id" xlink:href="#icon-verified"></use>
								<use v-if="search.reply_id" xlink:href="#icon-reply"></use>
							</svg>
							<NuxtLink v-if="!search.reply_id" :to="{name: 'topic-id', params: {id: search.id }}">{{ search.title }}</NuxtLink>
							<NuxtLink v-if="search.reply_id" :to="{name: 'topic-id', params: {id: search.id }, query: {reply: search.reply_id}, hash: '#reply'}">{{ search.title }}</NuxtLink>
						</h6>
						<div class="tt-col-message">
							<span v-html="search.body"></span>
						</div>
						<div class="row align-items-center no-gutters hide-desktope">
							<div class="col-9">
								<ul class="tt-list-badge">
									<li class="show-mobile"><NuxtLink :to="{ name: 'category-slug', params: { slug: search.slug }}"><span :class="`${search.color} tt-badge`">{{ search.name }}</span></NuxtLink></li>
								</ul>

							</div>
							<div class="col-3 ml-auto show-mobile">
								<div class="tt-value"><Time :timestamp="search.created_at"/></div>
							</div>
						</div>
					</div>
					<div class="tt-col-category tt-col-value-large hide-mobile col-lg-1"><NuxtLink :to="{ name: 'category-slug', params: { slug: search.slug }}"><span :class="`${search.color} tt-badge`">{{ search.name }}</span></NuxtLink></div>

					<div class="tt-col-value-large hide-mobile col-lg-2 w3-right-align"><Time :timestamp="search.created_at"/></div>
				</div>

				<div class="tt-row-btn" v-if="searches.length !== 0">
					<button type="button" class="btn-icon js-topiclist-showmore">
						<svg :class="`tt-icon${loader}`">
							<use xlink:href="#icon-load_lore_icon"></use>
						</svg>
					</button>
					<div v-observe-visibility="visibilityChange"></div>
				</div>
				<div v-else>"{{$route.params.query}}" Result Not Found, Try another word</div>

			</div>
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data () {
    return {
    	query: this.$route.params.query,
    	loader: '',
    	page: 1,
    }
  },

  head() {
    return{
      title: 'Search - '+this.$route.params.query
    }
  },

  async asyncData({store, params}) {
  	await store.dispatch('search/getSearch', params.query);
  },

  computed: {
    ...mapGetters({
    	searches: 'search/search',
    })
  },

  methods: {
  	search() {
  		if (this.query) {
	  		this.$router.push({ name: 'search-query', params: {query: this.query }})
	  	}
  	},
    avatar(photo, email){
    	if (photo) {
        return `http://nuxt.test/${photo}`
      }else{
        return `https://www.gravatar.com/avatar/${email}?s=80&d=mp`;
      }
    },
    async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      ++this.page;
      await this.$store.dispatch('search/getMoreSearch', {
      	query: this.$route.params.query,
      	page: this.page
      });
      this.loader = '';
    }
  },

}
</script>