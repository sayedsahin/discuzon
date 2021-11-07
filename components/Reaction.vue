<template>
	<div :class="`tt-item-info info-bottom ${reactionType}`">

		<a @click.prevent="toggleReaction('like')" href="" class="tt-icon-btn">
			<i class="tt-icon"><svg class="like"><use xlink:href="#icon-like"></use></svg></i>
			<span class="tt-text">{{ reactionCount.like }}</span>
		</a>
		<a @click.prevent="toggleReaction('dislike')" href="" class="tt-icon-btn">
			<i class="tt-icon"><svg class="dislike"><use xlink:href="#icon-dislike"></use></svg></i>
			<span class="tt-text">{{ reactionCount.dislike }}</span>
		</a>
		<a @click.prevent="toggleReaction('love')" href="" class="tt-icon-btn">
			<i class="tt-icon"><svg class="love"><use xlink:href="#icon-favorite"></use></svg></i>
			<span class="tt-text">{{ reactionCount.love }}</span>
		</a>
		<div class="col-separator"></div>
		<a href="#" class="tt-icon-btn tt-hover-02 tt-small-indent" v-if="section === 'topic'">
			<i class="tt-icon"><svg><use xlink:href="#icon-share"></use></svg></i>
		</a>
		<a href="#" class="tt-icon-btn tt-hover-02 tt-small-indent" v-if="section === 'topic'">
			<i class="tt-icon"><svg><use xlink:href="#icon-flag"></use></svg></i>
		</a>
		<a href="#replyForm" class="tt-icon-btn tt-hover-02 tt-small-indent" v-if="section === 'topic'">
			<i class="tt-icon"><svg><use xlink:href="#icon-reply"></use></svg></i>
		</a>
	</div>
</template>

<script>
export default {
	props: {
	  reaction: {
	    type: [Object, Array],
	    required: true,
	  },
	  reacted: {
	  	type: Object,
	  	default: {type: null}
	  },
	  section: {
	  	type: String,
	  	default: 'topic',
	  },
	  id: {
	  	type: Number,
	  	required: true
	  }
	},
	// props: ['reaction', 'section', 'id'],

  data () {
    return {
    	reactionCount: this.reaction,
    	reactedBy: this.reacted,
    	reactionType: this.reacted ? this.reacted.type : null,
    }
  },

  methods: {
  	/*async reactions ({$store, ty}) {
  		await this.$store.dispatch('topic/toggle', {
  			section: this.section,
  			id: this.id,
  			type: ty
  		});
  	},*/
    async toggleReaction(reaction) {

    	if (!this.$auth.loggedIn) {
		    return this.$router.push('/login')
		  }

    	let old_reaction = this.reactionType;
      let data = await this.$axios.$post(`/${this.section}/${this.id}/reaction`, { reaction });
    	this.reactedBy = data;

    	this.reactionType = data.type;


    	if (old_reaction) {
    		this.reactionCount[old_reaction]--;
    	}

      if (data.type && data.type !== old_reaction) {
        if (!this.reactionCount[data.type]) {
          this.reactionCount[data.type] = 1;
          return;
        }

      	this.reactionCount[data.type]++;
    	}
    }
  },
}
</script>
<style>
	.like svg.like{fill: #0056b3 !important;}
	.dislike svg.dislike{fill: #0056b3 !important;}
	.love svg.love{fill: #0056b3 !important;}
</style>