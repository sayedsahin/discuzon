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
    	// return this.parsed.fromNow() //4 days ago
      return dayjs().from(dayjs(this.parsed), true) //4 days
    }
  },

  methods: {
    parse () {
      this.parsed = dayjs(this.timestamp);
    }
  },

  created(){
  	this.parse();

  	setInterval(() => {
  	    this.parse()
  	}, 60000);
  }
}
</script>