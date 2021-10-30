<template>
  <div class="tt-item">
    <div class="tt-col-avatar">
      <!-- <svg class="tt-icon">
        <use xlink:href="#icon-ava-c"></use>
      </svg> -->
      <img :src="topic.user.avatar" alt="" class="w3-round-xxlarge">
    </div>
    <div class="tt-col-description">
      <h6 class="tt-title">
        <nuxt-link :to="{ name: 'topic-id', params: {id: topic.id }}">{{topic.title}}</nuxt-link></h6>
      <div class="row align-items-center no-gutters">
        <div class="col-11">
          <ul class="tt-list-badge">
            <li class="show-mobile"><a href="#"><span class="tt-color04 tt-badge">{{topic.category.name}}</span></a></li>
            <li v-for="(tag, index) in topic.tags.slice(0, 2)" :key="index">
              <nuxt-link :to="`/tag/${tag.name}`"><span class="tt-badge">{{tag.name}}</span></nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-1 ml-auto show-mobile">
          <div class="tt-value">1d</div>
        </div>
      </div>
    </div>
    <div class="tt-col-category"><span class="tt-color04 tt-badge">{{topic.category.name}}</span></div>
    <div class="tt-col-value  hide-mobile">308</div>
    <div class="tt-col-value tt-color-select  hide-mobile">660</div>
    <div class="tt-col-value  hide-mobile">{{topic.view}}</div>
    <div class="tt-col-value hide-mobile">1d</div>
  </div>
</template>
<script>
export default{
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  computed: {
    /*tags () {
      let tag = this.topic.tags;
      return tag.split(',', 2).map(item => item.trim());
    }*/
  },

}
</script>
<style scoped>
.tt-col-avatar img{
    width: 40px;
    height: 40px;
}
</style>