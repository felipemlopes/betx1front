<template>
  <div>
    <div class="row pl-2 mt-3">
      <div class="col-md-12">
        <div class="col-md-12 d-flex justify-content-between">
          <div>
            <h4 class="text-white">Jogos da {{this.featuredprovider.name}}</h4>
          </div>
          <nuxt-link :to="{ name:'cassino-game-provedores-slug', params:{slug:this.featuredprovider.slug} }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
            <span class="text-warning">Ver todos</span>
          </nuxt-link>

        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3" v-for="(item, index) in this.games">
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
export default {

  data(){
    return {
      featuredprovider: {
        id: null,
        name: null,
        slug: null,
        logo: null,
      },
      games: []
    };
  },
  computed: {
  },
  mounted() {
    this.getFeaturedProvider()
    this.getFeaturedGames()
  },
  methods: {
    async getFeaturedProvider() {
      await this.$axios.get("/laravel/api/cassino/providers/featured")
        .then(res => {
          this.featuredprovider = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getFeaturedGames() {
      await this.$axios.get("/laravel/api/cassino/slotgames?qtd=6")
        .then(res => {
          this.games = res.data.data;
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
