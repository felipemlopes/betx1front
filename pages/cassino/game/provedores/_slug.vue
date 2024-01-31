<template>

  <div class="container">
    <div class="row pl-2 mt-5">
      <div class="col-md-12">
        <input type="text" class="form-control" v-model="searchValue" placeholder="Pesquise por um jogo ...">
      </div>
      <div class="col-md-12 mt-3">
        <h4 class="text-white">Jogos da {{this.provider.name}}</h4>
      </div>
      <div class="col-md-12">
        <div class="row">

        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: '',
  layout: 'defaultcassino',
  data(){
    return {
      searchValue: null,
      games: [],
      provider: {
        id: null,
        name: null,
        slug: null,
      },
    };
  },
  computed: {
    computed:{
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
  },
  mounted() {
    this.getProvider()
    this.getGames()
  },
  methods: {
    async getProvider() {
      await this.$axios.get("/laravel/api/cassino/provider/"+this.$route.params.slug)
        .then(res => {
          this.provider = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getGames() {
      await this.$axios.get("/laravel/api/cassino/providers/all")
        .then(res => {
          this.providers = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
