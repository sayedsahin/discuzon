<template>
	<main id="tt-pageContent">
		<div class="tt-custom-mobile-indent container">
			<div class="tt-categories-title">
				<div class="tt-title">Tags</div>
				<div class="tt-search">
					<form class="search-wrapper">
						<div class="search-form">
							<input v-model.trim="filter" type="text" class="tt-search__input" placeholder="Filter Tags">
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
			<div>
				<div class="row">
					<div class="col-6 col-md-4 col-lg-3" v-for="(tag, index) in filterTags" :key="index">
						<div class="tt-item mb-1">
							<div class="d-flex">
								<ul class="tt-list-badge">
									<li><NuxtLink :to="{ name: 'tags-name', params: { name: tag.name }}"><span :class="`tt-color${cat[Math.floor(Math.random()*cat.length)]} tt-badge`">{{ tag.name }}</span></NuxtLink></li>
								</ul>
								<div class="tt-badge ml-auto">{{ tag.topics_count }}</div>
							</div>
						</div>
					</div>
					<div class="col-12" v-if="tags.length > 199">
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

  data () {
    return {
    	loader: '',
    	page: 1,
    	filter: '',
    	cat: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19' ]
    }
  },

  async asyncData({ $axios }) { 
  	// must be used axios directly withot vuex
    let { data } = await $axios.$get('/tags');
    return { tags: data };
  },

  computed: {
     filterTags() {
      return this.tags.filter(tag => {
        return tag.name.match(this.filter)
        // or return tag.name.include(this.filter)
      })
    }
  },

  methods: {
    async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      let { data } = await this.$axios.$get(`/tags?page=${++this.page}`);
      this.tags = [...this.tags, ...data];
      this.loader = '';
    },

    
  },
}
</script>