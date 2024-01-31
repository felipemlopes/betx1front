<template>

  <div class="">
      <div class="container">

        <div class="carossel">
          <div class="mt-1" @mousedown.left="onMouseDown">
            <vue-horizontal  class="row horizontal prevent-select" ref="horizontal" snap="none" :button="true">
              <div class="col-12 col-sm-6 col-md-12 col-lg-12 prevent-select" style="height: 250px;">
                <nuxt-link to="/">
                  <img src="https://placehold.co/1300x250" style="width:-webkit-fill-available;">>
                </nuxt-link>
              </div>

              <div class="col-12 col-sm-6 col-md-12 col-lg-12 prevent-select" style="height: 250px;">
                <nuxt-link to="/">
                  <img src="https://placehold.co/1300x250" style="width:-webkit-fill-available;">
                </nuxt-link>
              </div>

            </vue-horizontal>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mt-5">
            <h1 class="text-warning">
              Bem-vindo ao <strong class="text-white">JogosBr!</strong>
            </h1>
          </div>
        </div>

        <!--<div class="row">
          <div class="col-md-12 d-flex justify-content-center" v-show="promotion.thumb!==null" style="">
            <img :src="promotion.thumb" style="width: auto; height:200px;">
          </div>
        </div>-->

        <div class="row mt-3">
          <div class="col-md-6">
            <NuxtLink :to="{ name:'cassino'}">
              <div class="card bg-primary border-0">
                <img src="~/assets/images/cassino.jpg" class="card-img-top img-fluid" style="height: 150px;object-fit: cover;opacity: 0.4;">
                <div class="card-body p-1">
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fs-3 text-black">Cassino</p>
                    <NuxtLink :to="{ name:'cassino'}" class="btn btn-secondary" style="height: fit-content;background-color: #000000;">
                      Visitar Cassino
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="col-md-6">
            <div class="card bg-success border-0">
              <img src="~/assets/images/bet.jpg" class="card-img-top img-fluid" style="height: 150px;object-fit: cover;opacity: 0.4;">
              <div class="card-body p-1">
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fs-3 text-black">Apostas Esportivas</p>
                  <a href="" class="btn btn-secondary" style="height: fit-content;background-color: #000000;">
                    Em breve
                  </a>
                  <!--<NuxtLink :to="{ name:'apostas'}" class="btn btn-secondary" style="height: fit-content;background-color: #000000;">
                    Visitar Apostas Esportivas
                  </NuxtLink>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'default',
  data(){
    return {
      promotion: {
        thumb: null,
        left: 0,
        originX: 0,
        originLeft: 0,
      },

    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
  },
  mounted() {
    this.$refs.horizontal.scrollToIndex(1);
    this.getPromotion()
  },
  destroyed() {
    this.onMouseUp()
  },
  methods: {
    async getPromotion() {
      await this.$axios.get("/laravel/api/promotion")
        .then(res => {
          this.promotion.thumb = res.data.data.thumb;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
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
}
</script>
<style scoped>

</style>
