<template>
  <div class="carossel" v-show="this.$store.state.banners.banners.length">
    <div class="mt-1" @mousedown.left="onMouseDown">
      <vue-horizontal  class="row horizontal prevent-select" ref="horizontal" snap="none" :button="true" >

        <div class="col-12 col-sm-12 col-md-12 col-lg-12 prevent-select carrossel-item" v-for="(item, index) in this.$store.state.banners.banners">
          <a :href="item.url" v-if="item.url">
            <img :src="item.image">
          </a>

          <a v-else>
            <img :src="item.image">
          </a>
        </div>

      </vue-horizontal>
    </div>
  </div>
</template>

<script>
export default {

  data(){
    return {

    };
  },
  async mounted() {
    this.$refs.horizontal.scrollToIndex(1);
  },
  destroyed() {
    this.onMouseUp()
  },
  methods: {
    onScroll({left}) {
      this.left = left
    },
    onMouseDown(e) {
      this.originX = e.pageX
      this.originLeft = this.left

      window.addEventListener("mouseup", this.onMouseUp);
      window.addEventListener("mousemove", this.onMouseMove);
    },
    onMouseUp() {
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("mousemove", this.onMouseMove);
    },
    onMouseMove(e) {
      const offset = e.pageX - this.originX
      const left = this.originLeft - offset
      this.$refs.horizontal.scrollToLeft(left, 'auto')
    }
  },

};
</script>

<style scoped>

</style>
