<template>
	<div>
		<Navbar />
		<Nuxt />
	</div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
	components: {Navbar},
	name: 'default',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>