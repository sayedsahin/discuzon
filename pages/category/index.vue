<template>
	<main id="tt-pageContent">
		<div class="tt-custom-mobile-indent container">
			<div class="tt-categories-title">
				<div class="tt-title">Categories</div>
				<div class="tt-search">
					<form class="search-wrapper">
						<div class="search-form">
							<input type="text" class="tt-search__input" placeholder="Search Categories">
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
					</form>
				</div>
			</div>
			<div class="tt-categories-list">
				<div class="row">
					<div class="col-md-6 col-lg-4" v-for="(category, index) in categories" :key="index">
						<div class="tt-item">
							<div class="tt-item-header">
								<ul class="tt-list-badge">
									<li><NuxtLink :to="{ name: 'category-slug', params: { slug: category.slug }}"><span :class="`${category.color} tt-badge`">{{ category.name }}</span></NuxtLink></li>
								</ul>
								<h6 class="tt-title">Topics - {{ category.count_topic }}</h6>
							</div>
							<div class="tt-item-layout">
								<div class="innerwrapper">
									{{ category.description }}
								</div>
								<!-- <div class="innerwrapper">
									<h6 class="tt-title">Similar TAGS</h6>
									<ul class="tt-list-badge">
										<li><a href="#"><span class="tt-badge">world politics</span></a></li>
									</ul>
								</div> -->
								<a @click.prevent="toggleReaction(category.slug, index)" href="" class="tt-btn-icon">
									<i class="tt-icon"><svg :class="category.reacted ? 'active-fill' : ''"><use xlink:href="#icon-favorite"></use></svg></i>
								</a>
							</div>
						</div>
					</div>
					<div class="col-12">
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
			</div>
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  name: 'index',

  data () {
    return {
    	loader: '',
    	page: 1,
    }
  },

  async asyncData({ store, params }) { 
    await store.dispatch('category/getCategories', params.slug);
  },

  computed: {
    ...mapGetters ({
      categories: 'category/categories',
    })
  },

  methods: {
	  async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      ++this.page;
      await this.$store.dispatch('category/getMoreCategories', this.page);
      this.loader = '';
    },
	
		async toggleReaction(slug, index) {

	  	if (!this.$auth.loggedIn) {
		    return this.$router.push('/login')
		  }

	    let data = await this.$axios.$post(`/category/${slug}/reaction`);
	    let reacted = data ? true : false;
	    this.$store.commit('category/REACTED_CATEGORIES', {
	    	index: index,
	    	reacted: reacted
	    })
	    return;
	  }
  },
}
</script>