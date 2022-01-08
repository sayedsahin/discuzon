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
        <div class="tt-topic-alert tt-alert-default" role="alert">
          <!-- <a href="#" target="_blank">4 new posts</a> are added recently, click here to load them. -->
        </div>

        <Topics v-for="(topic, index) in pinTopics" :key="index" :topic="topic" :select="'tt-itemselect'" />
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loader: '',
      more: true,
    }
  },
  head() {
    return{
      title: 'Welcome to forum'
    }
  },

  async asyncData({ store }) {
    await store.dispatch('topic/getTopics');
    await store.dispatch('topic/getPinTopics');
  },
  computed: {
    ...mapGetters ({
      topics: 'topic/topics',
      pinTopics: 'topic/pinTopics',
    })
  },

  methods: {
    async visibilityChange(isVisibale, { $store }){
      if (!isVisibale) {
        return;
      }
      this.loader = ' animate-flicker';
      await this.$store.dispatch('topic/getMoreTopics');
      this.loader = '';
    }
  }
}
</script>