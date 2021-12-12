<template>
	<time :datetime="parsed">{{ fromNow }}</time>
</template>

<script>
import dayjs from 'dayjs'

// From Documentation: https://day.js.org/docs/en/plugin/relative-time
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {

  data () {
    return {
    	parsed: null
    }
  },

  props: {
    timestamp: {
      required: true
    }
  },


  computed: {
    fromNow() {
    	return dayjs(this.timestamp).fromNow()
    }
  },

  methods: {
    parse () {
      this.parsed = dayjs(this.timestamp);
    }
  },

  created(){
  	this.parse();
  }
}
</script>