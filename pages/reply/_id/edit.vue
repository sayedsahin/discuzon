<template>
  <main id="tt-pageContent">
    <div class="container">
      <div class="tt-wrapper-inner">
        <a @click.prevent="$router.back()" class="tt-badge">Back</a> 
        <h1 class="tt-title-border">Edit Reply</h1>
        <form class="form-default form-create-topic" @submit.prevent="updateReply()">
          <div class="pt-editor pt-0">
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
            </div>

            <!-- Body -->
            <div class="form-group tt-value-wrapper">
              <div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.body">{{ errors.body[0] }}</div>
              <textarea v-model="body" name="body" class="form-control" rows="5" placeholder="Lets get started" :maxlength="2000"></textarea>
              <span class="tt-value-input" v-text="(2000 - body.length)"></span>
            </div>

            <!-- Submit -->
            <div class="row">
              <div class="col-auto ml-md-auto">
                <button type="submit" class="btn btn-secondary btn-width-lg">Edit Reply</button>
              </div>
            </div>
            <div v-if="success" class="fixed-bottom w3-panel w3-green p-2 w3-round" style="">{{success}}</div>
            <div v-if="errors.message" class="w3-panel w3-pale-red w3-border w3-round">{{errors.message}}</div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  // middleware: ['auth'],
  data () {
    return {
      success: false
    }
  },
  async asyncData ({$axios, params}) {
    let data = await $axios.$get(`/reply/${params.id}`);
    return { body: data.body };
  },

  methods: {
    async updateReply () {
      try{ 
        let data = await this.$axios.$patch(`/reply/${this.$route.params.id}`, {body: this.body})
        if (data === 1) {
          this.success = 'Updated Successful'
          setTimeout(() => this.success = false, 5000)
        }
        return
      }catch(e){
        return
      }
    },
  }
}
</script>

<style lang="css">
  .fixed-bottom{position: fixed; left: 10px; bottom: 5px;}
</style>