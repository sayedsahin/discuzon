<template>
	<div :class="`tt-item-info info-bottom ${this.reacted ? this.reacted.type : null}`">

		<a @click.prevent="toggleReaction('like')" href="" class="tt-icon-btn">
			<i class="tt-icon"><svg class="like"><use xlink:href="#icon-like"></use></svg></i>
			<span class="tt-text">{{ reaction.like }}</span>
		</a>
		<a @click.prevent="toggleReaction('dislike')" href="" class="tt-icon-btn">
			<i class="tt-icon"><svg class="dislike"><use xlink:href="#icon-dislike"></use></svg></i>
			<span class="tt-text">{{ reaction.dislike }}</span>
		</a>
		<a @click.prevent="toggleReaction('love')" href="" class="tt-icon-btn">
			<i class="tt-icon"><svg class="love"><use xlink:href="#icon-favorite"></use></svg></i>
			<span class="tt-text">{{ reaction.love }}</span>
		</a>
		<div class="col-separator"></div>
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

	  id: {
	  	type: Number,
	  	required: true
	  },
	  index: {
	  	type: Number,
	  	required: true
	  },

	},
	// props: ['reaction', 'reacted', 'section', 'id'],

  methods: {
    async toggleReaction(reaction) {

    	if (!this.$auth.loggedIn) {
		    return this.$router.push('/login')
		  }
		  await this.$store.dispatch('reply/toggleReaction', {
		  	id: this.id,
		  	index: this.index,
		  	reaction: reaction
		  });
    }
  },
}
</script>
<style>
	.like svg.like{fill: #0056b3 !important;}
	.dislike svg.dislike{fill: #0056b3 !important;}
	.love svg.love{fill: #0056b3 !important;}
</style>