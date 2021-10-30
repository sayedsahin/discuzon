<template>
	<div class="tt-item-info info-bottom">
		<a href="#" class="tt-icon-btn">
			<i class="tt-icon"><svg><use xlink:href="#icon-like"></use></svg></i>
			<span class="tt-text">{{ reaction.like }}</span>
		</a>
		<a href="#" class="tt-icon-btn">
			<i class="tt-icon"><svg><use xlink:href="#icon-dislike"></use></svg></i>
			<span class="tt-text">{{ reaction.dislike }}</span>
		</a>
		<a href="#" class="tt-icon-btn">
			<i class="tt-icon"><svg><use xlink:href="#icon-favorite"></use></svg></i>
			<span class="tt-text">{{ reaction.love }}</span>
		</a>
		<div class="col-separator"></div>
		<a href="#" class="tt-icon-btn tt-hover-02 tt-small-indent">
			<i class="tt-icon"><svg><use xlink:href="#icon-share"></use></svg></i>
		</a>
		<a href="#" class="tt-icon-btn tt-hover-02 tt-small-indent">
			<i class="tt-icon"><svg><use xlink:href="#icon-flag"></use></svg></i>
		</a>
		<a href="#" class="tt-icon-btn tt-hover-02 tt-small-indent">
			<i class="tt-icon"><svg><use xlink:href="#icon-reply"></use></svg></i>
		</a>
	</div>
</template>

<script>
export default {
	props: {
	  reaction: {
	    type: Object,
	    required: true,
	  }
	},

  data () {
    return {

    }
  }
}
</script>