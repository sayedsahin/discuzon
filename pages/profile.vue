<template>
	<div class="container">
		<h1>Profile</h1>
	</div>
</template>

<script>
export default {
  middleware: ['auth'],
  name: 'profile',

  data () {
    return {

    }
  }
}
</script>