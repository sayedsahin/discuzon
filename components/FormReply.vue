<template>
	<div class="tt-wrapper-inner">
    <div class="pt-editor form-default">
      <h6 class="pt-title" id="replyForm">Post Your Reply</h6>
      <div class="pt-row">
        <div class="col-left">
          <ul class="pt-edit-btn">
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-quote"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-bold"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-italic"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-share_topic"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-blockquote"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-performatted"></use>
              </svg>
            </button></li>
            <li class="hr"></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-upload_files"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-bullet_list"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-heading"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-horizontal_line"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-emoticon"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-settings"></use>
              </svg>
            </button></li>
            <li><button type="button" class="btn-icon">
              <svg class="tt-icon">
                <use xlink:href="#icon-color_picker"></use>
              </svg>
            </button></li>
          </ul>
        </div>
        <div class="col-right tt-hidden-mobile">
          <a href="#" class="btn btn-primary">Preview</a>
        </div>
      </div>
      <div class="w3-panel w3-pale-red w3-border w3-round" v-if="errors.body">{{ errors.body[0] }}</div>
      <div class="form-group">
        <textarea v-model.trim="body" name="message" class="form-control" rows="5" placeholder="Lets get started"></textarea>
      </div>
      <div class="pt-row">
        <div class="col-auto">
          <div class="checkbox-group">
            <input type="checkbox" id="checkBox21" name="checkbox" checked="">
            <label for="checkBox21">
              <span class="check"></span>
              <span class="box"></span>
              <span class="tt-text">Subscribe to this topic.</span>
            </label>
          </div>
        </div>
        <div class="col-auto">
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
      success: false,
    }
  },

  methods: {
    async createReply () {
    	try{
	      let data = await this.$axios.$post(`/topic/${this.$route.params.id}/reply`, {
					body: this.body
				});
				this.$emit('Replies', data.data);
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