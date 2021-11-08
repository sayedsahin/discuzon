<template>
<div>
  <div class="tt-single-topic-list">
    <div class="tt-item" v-for="reply in replies" :key="reply.id">
      <div class="tt-single-topic">
        <div class="tt-item-header pt-noborder">
          <div class="tt-item-info info-top">
            <div class="tt-avatar-icon">
              <!-- <i class="tt-icon"><svg><use xlink:href="#icon-ava-t"></use></svg></i> -->
              <img :src="reply.user.avatar" alt="" class="w3-round-xxlarge" width="40px">
            </div>
            <div class="tt-avatar-title">
              <a href="#">{{ reply.user.name }}</a>
            </div>
            <a href="#" class="tt-info-time">
              <i class="tt-icon"><svg><use xlink:href="#icon-time"></use></svg></i>{{ reply.created_at }}
            </a>
          </div>
        </div>
        <div class="tt-item-description" v-html="reply.body">
        </div>

        <Reaction :reaction="reply.reaction" :reacted="reply.reacted" :id="reply.id" :section="'reply'"/>
        <div class="f-right" v-if="reply.user.id === $auth.user.id">
          <nuxt-link :to="`/reply/${reply.id}/edit`" class="ed">Edit</nuxt-link>
          <a href="" class="ed">Delete</a>
        </div>
      </div>
    </div>
  </div>
  <div class="tt-single-topic-list">
    <div class="tt-item">
      <div class="tt-single-topic w3-center">
        <div v-for="(link, index) in pages" :key="index" class="w3-bar w3-border w3-round">
          <a :class="`w3-bar-item w3-button${link.active ? ' w3-indigo' : ''}`" @click.prevent="getReplies(link.url, order)" href="" v-html="link.label" :style="link.url === null ? 'pointer-events: none' : ''"></a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: {
	  replies: {
	    type: [Object, Array],
	    required: true,
	  },
    pages: {
      type: Array,
      required: true,
    },
    order: {
      type: String,
      default: ''
    }
	},

  data () {
    return {
      older: '',
    }
  }, 
  /*computed: {
    ...mapGetters ({
      replies: 'topic/replies',
      pages: 'topic/pages',
    })
  },*/
  methods: {
    async getReplies (link, order) {
      let order_by = order !== '' ? `&order=${order}` : '' ;
      let data = await this.$axios.$get(link+order_by);
      this.$emit('changeReplies', data.data)
      this.$emit('changePages', data.meta.links)
    }
  }
}
</script>
<style lang="css">
  .ed {color: #666f74; font-size: 14px;}
</style>