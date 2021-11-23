<template>
	<div class="tt-item">
    <div class="tt-col-avatar col-lg-1">
      <NuxtLink :to="{ name: 'user-id', params: {id: activity.activity.owner.id} }">
        <img :src="activity.activity.owner.avatar" alt="" class="w3-round-xxlarge">
      </NuxtLink>
    </div>
    <div class="tt-col-description col-lg-8">
      <h6 class="tt-title">
        <svg class="tt-icon">
          <use xlink:href="#icon-verified"></use>
        </svg>
        <span class="w3-medium">{{ username }} created <span class="w3-text-blue">new topic </span> </span>
        <NuxtLink :to="{name: 'topic-id', params: {id: activity.activity.topic_id }}">{{ activity.activity.topic_title }}</NuxtLink>
      </h6>
      <div class="row align-items-center no-gutters">
        <div class="col-9">
          <ul class="tt-list-badge">
            <li class="show-mobile"><a href=""><span class="tt-color12 tt-badge">{{ activity.activity.category.name }}</span></a></li>
          </ul>
        </div>
        <div class="col-3 ml-auto show-mobile">
          <div class="tt-value"><Time :timestamp="activity.created_at"/></div>
        </div>
      </div>
    </div>
    <div class="tt-col-category tt-col-value-large col-lg-1"><span class="tt-color12 tt-badge">{{ activity.activity.category.name }}</span></div>
    <div class="tt-col-value-large hide-mobile col-lg-2 w3-right-align"><Time :timestamp="activity.created_at"/></div>
  </div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Object,
      required: true,
    },
    username: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
    }
  }
}
</script>

<style lang="css" scoped>
</style>