<template>
  <main id="tt-pageContent">
    <div class="container">
      <div class="tt-single-topic-list">
        <!-- Topic Component -->
        <TopicSingle :topic="topic" />
        <!-- /Topic Component -->
      </div>

      <div class="tt-single-topic-list pt-4">
        <div class="tt-item">
          <div class="tt-info-box">
              <h6 class="tt-title">Thread Status</h6>
              <div class="tt-row-icon">
                  <div class="tt-item">
                      <a href="#" class="tt-icon-btn tt-position-bottom">
                          <i class="tt-icon"><svg><use xlink:href="#icon-reply"></use></svg></i>
                          <span class="tt-text">{{ topic.reply_count }}</span>
                      </a>
                  </div>
                  <div class="tt-item">
                      <a href="#" class="tt-icon-btn tt-position-bottom">
                          <i class="tt-icon"><svg><use xlink:href="#icon-view"></use></svg></i>
                          <span class="tt-text">{{ topic.view }}</span>
                      </a>
                  </div>
                  <div class="tt-item">
                      <a href="#" class="tt-icon-btn tt-position-bottom">
                          <i class="tt-icon"><svg><use xlink:href="#icon-user"></use></svg></i>
                          <span class="tt-text">168</span>
                      </a>
                  </div>
                  <div class="tt-item">
                      <a href="#" class="tt-icon-btn tt-position-bottom">
                          <i class="tt-icon"><svg><use xlink:href="#icon-like"></use></svg></i>
                          <span class="tt-text">2.4k</span>
                      </a>
                  </div>
                  <div class="tt-item">
                      <a href="#" class="tt-icon-btn tt-position-bottom">
                          <i class="tt-icon"><svg><use xlink:href="#icon-favorite"></use></svg></i>
                          <span class="tt-text">951</span>
                      </a>
                  </div>
                  <div class="tt-item">
                        <a href="#" class="tt-icon-btn tt-position-bottom">
                          <i class="tt-icon"><svg><use xlink:href="#icon-share"></use></svg></i>
                          <span class="tt-text">32</span>
                      </a>
                  </div>
              </div>
              <hr>
              <h6 class="tt-title">Some Reply's User</h6>
              <div class="tt-row-icon">
                <div class="tt-item" v-for="(replyUser, index) in replies.slice(0, 7)" :key="index">
                    <NuxtLink :to="{ name: 'user-id', params: { id: replyUser.user.id }}" class=" tt-icon-avatar">
                        <!-- <svg><use xlink:href="#icon-ava-d"></use></svg> -->
                        <img :src="replyUser.user.avatar" alt="" class="w3-round-xxlarge" width="40px">
                    </NuxtLink>
                </div>
              </div>
              <hr>
              <div class="row-object-inline form-default">
                  <h6 class="tt-title">Sort replies:</h6>
                  <ul class="tt-list-badge tt-size-lg">
                      <li><a @click.prevent="getMoreReplies(url, 'recent')" href=""><span :class="`${order === 'recent' || order === '' ? 'tt-color02 ' : ''}tt-badge`">Recent</span></a></li>
                      <li><a @click.prevent="getMoreReplies(url, 'old')" href=""><span :class="`${order === 'old' ? 'tt-color02 ' : ''}tt-badge`">Oldest</span></a></li>
                      <li><a @click.prevent="getMoreReplies(url, 'react')" href=""><span :class="`${order === 'react' ? 'tt-color02 ' : ''}tt-badge`">Most Reacted</span></a></li>
                  </ul>
                  <select @change="getMoreReplies(url, $event.target.value)" class="tt-select form-control">
                      <option value="recent">Recent</option>
                      <option value="old">Oldest</option>
                      <option value="react">Most Reacted</option>
                  </select>
              </div>
          </div>
        </div>
      </div>

        <div v-if="loader" class="loader mx-auto my-4" style="position: unset;"></div>
        <!-- Reply Component -->
        <!-- <Reply
          ref="reply"
          :order='order'
          :replies="replies"
          :pages="pages"
          @changeReplies="replies = $event"
          @changePages="pages = $event"
        /> -->
          <!-- @deleteReply="replies = replies.splice($event, 1)" -->
        <!-- /Reply Component -->
        <Reply ref="reply"/>

      <div class="tt-topic-list" v-if="!authenticated">
        <div class="tt-item tt-item-popup">
          <div class="tt-col-avatar">
            <svg class="tt-icon">
              <use xlink:href="#icon-ava-f"></use>
            </svg>
          </div>
          <div class="tt-col-message">
            Looks like you are new here. Register for free, learn and contribute.
          </div>
          <div class="tt-col-btn">
            <button @click.prevent="$router.push('/login')" type="button" class="btn btn-primary">Log in</button>
            <button @click.prevent="$router.push('/register')" type="button" class="btn btn-secondary">Sign up</button>
            <button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-cancel"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <FormReply v-if="authenticated" @Replies="replies = [...replies, $event]"/>
      <TopicSuggestion/>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      order: '',
      url: `/topic/${this.$route.params.id}/replies?page=1`,
      // replies: [],
      pages: [],
      loader: true,
    }
  },

  head() {
    return{
      title: this.topic.title
    }
  },
  
  async asyncData({$axios, params}){
    const {data} = await $axios.$get(`/topic/${params.id}`)
    return {
      topic: data.topic,
    }
  },
  computed: {
    ...mapGetters ({
      replies: 'reply/replies',
    }),

    async getReplies(){
      let reply = this.$route.query.reply ? `?reply=${this.$route.query.reply}` : ''
      await this.$store.dispatch('reply/getReplies', {
        id: this.$route.params.id,
        reply: reply,
      });
      this.loader = false
    }
  },

  methods: {
    async getMoreReplies(url, type){
      this.order = type
      this.$refs.reply.getReplies(url, type)
    },
  },

  mounted() {
    this.getReplies
  }
  
}
</script>

<style lang="css" scoped>
</style>