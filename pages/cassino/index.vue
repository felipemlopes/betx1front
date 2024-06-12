<template>

  <div class="container" style="">

    <div class="row m-0 pl-2 pr-2">
      <div class="col-md-12">
        <div class="carossel" v-show="this.$store.state.banners.banners.length">
          <div class="mt-1" @mousedown.left="onMouseDown">
            <vue-horizontal  class="row horizontal prevent-select" ref="horizontal" snap="none" :button="true" >

              <div class="col-12 col-sm-6 col-md-12 col-lg-12 prevent-select carrossel-item" v-for="(item, index) in this.$store.state.banners.banners">
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
      </div>
    </div>


    <FrontCassinoGameByProviders></FrontCassinoGameByProviders>

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
  layout: 'cassino',
  data() {
    return {
      crashgames: [],
      slotgames: [],
    }
  },
  computed: {
    faPlay () {
      return faPlay
    },
  },
  mounted() {
    this.getCrashGames()
    this.getSlotGames()
  },
  methods: {
    async getCrashGames() {
      await this.$axios.get("/laravel/api/cassino/crashgames?qtd=4")
        .then(res => {
          this.crashgames = res.data.data;
        })
        .catch(err => {
          this.$toast.error('Erro!',{duration:600})
        });
    },
    async getSlotGames() {
      await this.$axios.get("/laravel/api/cassino/slotgames?qtd=4")
        .then(res => {
          this.slotgames = res.data.data;
        })
        .catch(err => {
          this.$toast.error('Erro!',{duration:600})
        });
    },
  },
}
</script>
