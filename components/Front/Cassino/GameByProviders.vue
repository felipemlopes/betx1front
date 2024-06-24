<template>
  <div>
    <div class="row pl-2 mt-3">
      <div class="col-md-12">
        <div class="col-md-12 d-flex justify-content-between">
          <div>
            <h4 class="text-white">Jogos da PG Soft</h4>
          </div>
          <nuxt-link :to="{ name:'cassino-game-provedores-slug', params:{slug:'pg-soft'} }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
            <span class="text-warning">Ver todos</span>
          </nuxt-link>

        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-4 col-md-3" v-for="(item, index) in this.gamespg">
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
            <h4 class="text-white">Jogos da Mancala Gaming</h4>
          </div>
          <nuxt-link :to="{ name:'cassino-game-provedores-slug', params:{slug:'mancala-gaming'} }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
            <span class="text-warning">Ver todos</span>
          </nuxt-link>

        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-4 col-md-3" v-for="(item, index) in this.gamesmancalagaming">
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
            <h4 class="text-white">Jogos da PragmaticPlay</h4>
          </div>
          <nuxt-link :to="{ name:'cassino-game-provedores-slug', params:{slug:'pragmatic-play'} }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
            <span class="text-warning">Ver todos</span>
          </nuxt-link>

        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-4 col-md-3" v-for="(item, index) in this.gamespragmatic">
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
  </div>
</template>

<script>
import {faPlay} from "@fortawesome/free-solid-svg-icons";
export default {
  data(){
    return {
      gamespg: [],
      gamespragmatic: [],
      gamesmancalagaming: []
    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
  },
  async mounted() {
    await this.getGamesPGSoft()
    await this.getGamesPragmaticPlay()
    await this.getGamesMancalaGaming()
  },
  methods: {
    async getGamesPGSoft() {
      await this.$axios.get("/laravel/api/cassino/provider/pg-soft/gamesfeatured")
        .then(res => {
          this.gamespg = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getGamesPragmaticPlay() {
      await this.$axios.get("/laravel/api/cassino/provider/pragmatic-play/gamesfeatured")
        .then(res => {
          this.gamespragmatic = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getGamesMancalaGaming() {
      await this.$axios.get("/laravel/api/cassino/provider/mancala-gaming/gamesfeatured")
        .then(res => {
          this.gamesmancalagaming = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },

};
</script>

<style scoped>

</style>
