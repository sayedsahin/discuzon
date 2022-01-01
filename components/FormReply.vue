<template>
	<div class="tt-wrapper-inner">
    <div class="pt-editor form-default">
      <h6 class="pt-title" id="replyForm">Post Your Reply</h6>
      <client-only>
        <Editor v-model="body" :limit="2000"/>
      </client-only>
      <div class="w3-panel w3-pale-red w3-border w3-round" v-if="errors.body">{{ errors.body[0] }}</div>
      <div class="mt-3 pt-row">
        <!-- <div class="col-auto">
          <div class="checkbox-group">
            <input type="checkbox" id="checkBox21" name="checkbox" checked="">
            <label for="checkBox21">
              <span class="check"></span>
              <span class="box"></span>
              <span class="tt-text">Subscribe to this topic.</span>
            </label>
          </div>
        </div> -->

        <div class="col-auto pl-0">
          <a @click.prevent="createReply()" href="#" class="btn btn-secondary btn-width-lg">Reply</a>
        </div>
      </div>
      <div v-if="success" class="fixed-bottom w3-panel w3-green p-2 w3-round" style="">{{success}}</div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      body: '',
      trix: '',
      success: false,
    }
  },

  methods: {
    async createReply () {
    	try{

        await this.$store.dispatch('reply/createReply', {
          body: this.body,
          id: this.$route.params.id
        });
				this.body = '';
        this.success = 'Reply successful created'
        setTimeout(() => this.success = false, 5000)
    	}catch(e){
    	   return;
    	}
    }
  }
}
</script>

<style lang="css" scoped>
</style>