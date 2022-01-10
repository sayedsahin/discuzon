<template>
  <div class="tt-layout-404">
   <span class="tt-icon">
    <svg class="icon">
      <use xlink:href="#icon-error_404"></use>
    </svg>
  </span>
  <h6 class="tt-title">{{error}}</h6>
  <p>Sorry we can’t found<br>
    <!-- <a href="index.html" class="tt-color-dark tt-underline-02">suggested topics</a> for you. -->
  </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: 'ERROR 404'
    },
  },
  data () {
    return {

    }
  }
}
</script>
