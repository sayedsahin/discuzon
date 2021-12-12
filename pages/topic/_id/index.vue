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

      <div class="tt-topic-list tt-ofset-30">
        <div class="tt-list-search">
          <div class="tt-title">Suggested Topics</div>
          <!-- tt-search -->
          <div class="tt-search">
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
          </div>
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
        <div class="tt-item">
          <div class="tt-col-avatar">
            <svg class="tt-icon">
              <use xlink:href="#icon-ava-n"></use>
            </svg>
          </div>
          <div class="tt-col-description">
            <h6 class="tt-title"><a href="#">
              Does Envato act against the authors of Envato markets?
            </a></h6>
            <div class="row align-items-center no-gutters hide-desktope">
              <div class="col-11">
                <ul class="tt-list-badge">
                  <li class="show-mobile"><a href="#"><span class="tt-color05 tt-badge">music</span></a></li>
                </ul>
              </div>
              <div class="col-1 ml-auto show-mobile">
                <div class="tt-value">1d</div>
              </div>
            </div>
          </div>
          <div class="tt-col-category"><span class="tt-color05 tt-badge">music</span></div>
          <div class="tt-col-value hide-mobile">358</div>
          <div class="tt-col-value tt-color-select hide-mobile">68</div>
          <div class="tt-col-value hide-mobile">8.3k</div>
          <div class="tt-col-value hide-mobile">1d</div>
        </div>

        <div class="tt-row-btn">
          <button type="button" class="btn-icon js-topiclist-showmore">
            <svg class="tt-icon">
              <use xlink:href="#icon-load_lore_icon"></use>
            </svg>
          </button>
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
      order: '',
      url: `/topic/replies/${this.$route.params.id}?page=1`,
      // replies: [],
      pages: [],
      loader: true,
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