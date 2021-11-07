<template>
  <div class="tt-item">
    <div class="tt-single-topic">
      <div class="tt-item-header">
        <div class="tt-item-info info-top">
          <div class="tt-avatar-icon">
            <!-- <i class="tt-icon"><svg><use xlink:href="#icon-ava-d"></use></svg></i> -->
            <img :src="topic.user.avatar" alt="" class="w3-round-xxlarge" width="40px">
          </div>
          <div class="tt-avatar-title">
            <a href="#">{{ topic.user.name }}</a>
          </div>
          <a href="#" class="tt-info-time">
            <i class="tt-icon"><svg><use xlink:href="#icon-time"></use></svg></i>{{ topic.created_at }}
          </a>
        </div>
        <h3 class="tt-item-title">
          <a href="#">{{ topic.title }}</a>
          
        </h3>
        <div class="tt-item-tag">
          <ul class="tt-list-badge">
            <li><nuxt-link :to="`/category/${topic.category.slug}`"><span class="tt-color03 tt-badge">{{ topic.category.name }}</span></nuxt-link></li>

            <li v-for="(tag, index) in topic.tags" :key="index"><nuxt-link :to="`/tag/${tag.name}`"><span class="tt-badge">{{ tag.name }}</span></nuxt-link></li>
          </ul>
        </div>
      </div>
      <div class="tt-item-description" v-html="topic.body"></div>
      <Reaction :reaction="topic.reaction" :reacted="topic.reacted" :id="topic.id"/>
      <div class="mt-2 f-right" v-if="$auth.user.id == topic.user.id">
        <nuxt-link :to="{ name: 'topic-id-edit', params: { id: topic.id } }" class="btn btn-primary">Edit</nuxt-link>
        <nuxt-link to="" class="btn btn-primary">Delete</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
  function myFunction() {
  var x = document.getElementById("Demo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}
export default{
	props: {
	  topic: {
	    type: Object,
	    required: true,
	  }
	},
	computed: {
    // tags () {
    //   let tag = this.topic.tags;
    //   return tag.split(',').map(item => item.trim());
    // }
    
  }
}
</script>
<style lang="css">
 .f-right{float: right;}
 .f-left{float: left;}
 .heroicon{height: 1.25rem; width: 1.25rem; color: #666f74;}
</style>