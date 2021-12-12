<template>
<div>
  <div class="tt-single-topic-list py-4" id="reply">
    <div class="tt-item" v-for="(reply, index) in replies" :key="index">
      <div class="tt-single-topic">
        <div class="tt-item-header pt-noborder">
          <div class="tt-item-info info-top">
            <div class="tt-avatar-icon">
              <NuxtLink :to="{ name: 'user-id', params: {id: reply.user.id} }">
                <img :src="reply.user.avatar" alt="" class="w3-round-xxlarge" width="40px">
              </NuxtLink>
            </div>
            <div class="tt-avatar-title">
              <a href="#">{{ reply.user.name }}</a>
            </div>
            <a href="#" class="tt-info-time">
              <i class="tt-icon"><svg><use xlink:href="#icon-time"></use></svg></i>
              <TimeFixed :timestamp="reply.created_at" />
            </a>
          </div>
        </div>
        <div class="tt-item-description" v-html="reply.body">
        </div>

        <ReplyReaction :reaction="reply.reaction" :reacted="reply.reacted" :id="reply.id" :index="index"/>
        <div class="f-right" v-if="authenticated && reply.user.id === user.id">
          <NuxtLink :to="`/reply/${reply.id}/edit`" class="ed">Edit</NuxtLink>
          <a @click.prevent="deleteReply(reply.id, index)" href="" class="ed"><svg v-if="spin == reply.id" style="width: 14px;" class="w3-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 48c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-40 376c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm248-168c0-22.091-17.909-40-40-40s-40 17.909-40 40 17.909 40 40 40 40-17.909 40-40zm-416 0c0-22.091-17.909-40-40-40S8 233.909 8 256s17.909 40 40 40 40-17.909 40-40zm20.922-187.078c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40c0-22.092-17.909-40-40-40zm294.156 294.156c-22.091 0-40 17.909-40 40s17.909 40 40 40c22.092 0 40-17.909 40-40s-17.908-40-40-40zm-294.156 0c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40z"/></svg> Delete</a>
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
  data () {
    return {
      order: '',
      spin:false,
    }
  }, 
  computed: {
    ...mapGetters ({
      replies: 'reply/replies',
      pages: 'reply/pages',
    })
  },
  methods: {
    // Child To Parent
    async getReplies (link, order) {
      this.order = order
      let order_by = order !== '' ? `&order=${order}` : '' ;
      await this.$store.dispatch('reply/getMoreReplies', link+order_by);
    },

    async deleteReply(replyId, index){
      if (confirm('Do you really want to delete?')) {
        try{
          this.spin = replyId
          await this.$store.dispatch('reply/deleteReply', {
            id: replyId,
            index: index
          });
        }catch(e){
          return this.spin = false
        }
      }
      
    }
  }
}
</script>
<style lang="css">
  .ed {color: #666f74; font-size: 14px;}
</style>