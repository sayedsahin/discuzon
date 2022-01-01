<template>
  <div class="tt-topic-list tt-ofset-30">
    <div class="tt-list-search">
      <div class="tt-title">Suggested Topics</div>
      <!-- tt-search -->
      <!-- <div class="tt-search">
        <form class="search-wrapper">
          <div class="search-form">
            <input type="text" class="tt-search__input" placeholder="Search for topics">
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
      </div> -->
      <!-- /tt-search -->
    </div>
    <div class="tt-list-header tt-border-bottom">
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
      <div v-observe-visibility="topicSuggestion"></div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      topics: [],
      loader: '',
      page: 0,
      more: true,
    }
  },

  methods: {
    async topicSuggestion(isVisibale){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker'
      ++this.page;
      let { data } = await this.$axios.$get(`/topic/${this.$route.params.id}/similar?page=${this.page}`)
      this.topics = [...this.topics, ...data]
      if (data.length < 10) {
        this.more = false
      }
      this.loader = ''
    },
  },
}
</script>

<style lang="css" scoped>
</style>