<template>

  <div class="container" style="">

    <div class="row m-0 pl-2 pr-2">
      <div class="col-md-12">
        <div class="carossel">
          <div class="mt-1" @mousedown.left="onMouseDown">
            <vue-horizontal  class="row horizontal prevent-select" ref="horizontal" snap="none" :button="true">

              <div class="col-12 col-sm-6 col-md-12 col-lg-12 prevent-select" style="height: 250px;">
                <nuxt-link to="/">
                  <img src="https://placehold.co/1300x250" style="width:100%;">
                </nuxt-link>
              </div>

              <div class="col-12 col-sm-6 col-md-12 col-lg-12 prevent-select" style="height: 250px;">
                <nuxt-link to="/">
                  <img src="https://placehold.co/1300x250" style="width:100%;">
                </nuxt-link>
              </div>

            </vue-horizontal>
          </div>
        </div>
      </div>
    </div>

    <div class="row pl-2 mt-0">
      <div class="col-md-12">
        <h4 class="text-white">Recomendados</h4>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <nuxt-link to="/">
              <img class="recommended-game" src="https://static.bet7k.com/deploy-96f578a748ff285525db0f8cc5eab07e0a62fd3d-733a5c3d3e60d2ca7769/img/bet7k_gatesofbet7k_desktop.vX-uKBFl8Q3aJ.cdcf8e8.png?v=vX-VmcY3WJFv9" style="width:100%;height: 105px;">
            </nuxt-link>
          </div>
          <div class="col-md-4 ">
            <nuxt-link to="/">
              <img class="recommended-game" src="https://static.bet7k.com/deploy-96f578a748ff285525db0f8cc5eab07e0a62fd3d-733a5c3d3e60d2ca7769/img/bet7k_gatesofbet7k_desktop.vX-uKBFl8Q3aJ.cdcf8e8.png?v=vX-VmcY3WJFv9" style="width:100%;height: 105px;">
            </nuxt-link>
          </div>
          <div class="col-md-4">
            <nuxt-link to="/">
              <img class="recommended-game" src="https://static.bet7k.com/deploy-96f578a748ff285525db0f8cc5eab07e0a62fd3d-733a5c3d3e60d2ca7769/img/bet7k_gatesofbet7k_desktop.vX-uKBFl8Q3aJ.cdcf8e8.png?v=vX-VmcY3WJFv9" style="width:100%;height: 105px;">
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <FrontCassinoGameprovidersfeatured></FrontCassinoGameprovidersfeatured>

    <div class="row pl-2 mt-3">
      <div class="col-md-12">
        <div class="col-md-12 d-flex justify-content-between">
          <div>
            <h4 class="text-white">Jogos Crash</h4>
          </div>
          <nuxt-link :to="{ name:'cassino-game-crash' }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
            <span class="text-warning">Ver todos</span>
          </nuxt-link>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3" v-for="(item, index) in this.crashgames">
            <div class="card game-box">
              <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }" class="game-box">
                <img :src="item.image" class="game-img">
                <div class="button-wrapper">
                  <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }" class="btn btn-primary">
                    <fa-icon :icon="faPlay" class="pr-5" />
                    Jogue
                  </NuxtLink>
                </div>
                <div class="game-top-text">
                  <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }">
                    <h4 class="fw-bold text-white">{{ item.name }}</h4>
                  </NuxtLink>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row pl-2 mt-3">
      <div class="col-md-12">
        <div class="col-md-12 d-flex justify-content-between">
          <div>
            <h4 class="text-white">Jogos Slot</h4>
          </div>
          <nuxt-link :to="{ name:'cassino-game-slot' }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
            <span class="text-warning">Ver todos</span>
          </nuxt-link>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3" v-for="(item, index) in this.slotgames">
            <div class="card game-box">
              <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }" class="game-box">
                <img :src="item.image" class="game-img">
                <div class="button-wrapper">
                  <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }" class="btn btn-primary">
                    <fa-icon :icon="faPlay" class="pr-5" />
                    Jogue
                  </NuxtLink>
                </div>
                <div class="game-top-text">
                  <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }">
                    <h4 class="fw-bold text-white">{{ item.name }}</h4>
                  </NuxtLink>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FrontCassinoGameproviders></FrontCassinoGameproviders>

  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'defaultcassino',
  data(){
    return {
      promotion: null,
      crashgames: [],
      slotgames: [],
      left: 0,
      originX: 0,
      originLeft: 0,
    };
  },
  computed: {
    games () {
      return this.$store.state.games.games
    },
    faPlay () {
      return faPlay
    },
  },
  mounted() {
    this.$refs.horizontal.scrollToIndex(1);
    this.getCrashGames()
    this.getSlotGames()
  },
  destroyed() {
    this.onMouseUp()
  },
  methods: {
    async getPromotion() {
      await this.$axios.get("/laravel/api/promotion")
        .then(res => {
          this.promotion = res.data.data.thumb;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getCrashGames() {
      await this.$axios.get("/laravel/api/cassino/crashgames?qtd=6")
        .then(res => {
          this.crashgames = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getSlotGames() {
      await this.$axios.get("/laravel/api/cassino/slotgames?qtd=6")
        .then(res => {
          this.slotgames = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getFeaturedGames() {
      await this.$axios.get("/laravel/api/cassino/slotgames?qtd=6")
        .then(res => {
          this.slotgames = res.data.data;
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

