<template>

  <div class="container">
    <div class="row pl-2 mt-5">
      <div class="col-md-12 d-inline-flex">
        <input type="text" class="form-control" v-model="searchValue" placeholder="Pesquise por um jogo ...">
        <!--<multiselect
          v-model="categoryselected"
          :options="categories"
          :preserve-search="true"
          placeholder="Categoria"
          label="name"
          track-by="name"
          id="categoryfield"
          @select="onSelect"
          :multiple="false"
          :taggable="false"
          selectLabel="Selecione"
          selectedLabel="Selecionado"
          deselectLabel="Remover"
        ></multiselect>-->

      </div>
      <div class="col-md-12 mt-3">
        <h4 class="text-white">Jogos Crash</h4>
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
import {faPlay} from '@fortawesome/free-solid-svg-icons'

export default {
  name: '',
  layout: 'cassino',
  data(){
    return {
      searchValue: "",
      categoryselected: "",
      games: [],
      categories: [{id:1,name:"Slot"},{id:2,name:"Crash"}],
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
  mounted() {
    this.getCategory()
    this.getGames()
  },
  methods: {
    customLabel ({ title, desc }) {
      return `${title} – ${desc}`
    },
    myChangeEvent(val){
      console.log(val);
    },
    mySelectEvent({id, text}){
      console.log({id, text})
    },
    async getGames() {
      await this.$axios.get("/laravel/api/cassino/crashgames?qtd=40&random=0&search="+this.searchValue)
        .then(res => {
          this.games = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getCategory() {
      await this.$axios.get("/laravel/api/cassino/categories")
        .then(res => {
          //this.categories = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    onSelect(option, id) {
      console.log(option, id);
    }
  },
}
</script>
