<template>

  <div class="container">
    <div class="row pl-2 mt-5">
      <div class="col-md-12">
        <input type="text" class="form-control" v-model="searchValue" placeholder="Pesquise por um jogo ...">
      </div>
      <div class="col-md-12 mt-3">
        <h4 class="text-white">Todos os jogos</h4>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3" v-for="(item, index) in this.searchResult">
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
  name: '',
  layout: 'defaultcassino',
  data(){
    return {
      searchValue: "",
      games: [],
    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
    searchResult() {
      let gamessearched = this.games
      if (this.searchValue != '' && this.searchValue) {
        gamessearched = gamessearched.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }
      return gamessearched
    }
  },
  async mounted() {
    await this.getGames()
  },
  methods: {
    async getGames() {
      await this.$axios.get("/laravel/api/cassino/games?qtd=40&random=0&search="+this.searchValue)
        .then(res => {
          this.games = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
