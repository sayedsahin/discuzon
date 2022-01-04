<template>
  <div class="tt-item">
    <div class="tt-col-avatar">
      <!-- <svg class="tt-icon">
        <use xlink:href="#icon-ava-c"></use>
      </svg> -->
      <NuxtLink :to="{ name: 'user-id', params: {id: topic.user.id} }">
        <img :src="topic.user.avatar" alt="" class="w3-round-xxlarge">
      </NuxtLink>
    </div>
    <div class="tt-col-description">
      <h6 class="tt-title">
        <NuxtLink :to="{ name: 'topic-id', params: {id: topic.id }}">{{topic.title}}</NuxtLink>
      </h6>
      <div class="row align-items-center no-gutters">
        <div class="col-9">
          <ul class="tt-list-badge">
            <li class="show-mobile"><NuxtLink :to="{ name: 'category-slug', params: { slug: topic.category.slug }}"><span :class="`${topic.category.color} tt-badge`">{{topic.category.name}}</span></NuxtLink></li>
            <li v-for="(tag, index) in topic.tags.slice(0, 2)" :key="index">
              <NuxtLink :to="{ name: 'tags-name', params: { name: tag.name }}"><span class="tt-badge">{{tag.name}}</span></NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-3 ml-auto show-mobile">
          <div class="tt-value"><Time :timestamp="topic.last_activity ? topic.last_activity.created_at : topic.created_at"/></div>
        </div>
      </div>
    </div>
    <div class="tt-col-category"><NuxtLink :to="{ name: 'category-slug', params: { slug: topic.category.slug }}"><span :class="`${topic.category.color} tt-badge`">{{topic.category.name}}</span></NuxtLink></div>
    <div class="tt-col-value  hide-mobile">{{ topic.reaction_count }}</div>
    <div class="tt-col-value tt-color-select  hide-mobile">{{ topic.reply_count }}</div>
    <div class="tt-col-value  hide-mobile">{{topic.view}}</div>
    <div class="tt-col-value hide-mobile"><Time :timestamp="topic.last_activity ? topic.last_activity.created_at : topic.created_at"/></div>
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
    /*categoryr(){
      let cat = ['tt-color01', 'tt-color02', 'tt-color03', 'tt-color04', 'tt-color05', 'tt-color06', 'tt-color07', 'tt-color08', 'tt-color09', 'tt-color10', 'tt-color11', 'tt-color12', ]
      return cat[Math.floor(Math.random()*cat.length)];
    }*/
  },

}
</script>
<style scoped>

</style>