<template>

  <div class="container" style="">

    <div class="row pl-2 mt-5">
      <div class="col-md-12">
        <input type="text" class="form-control" v-model="searchValue" placeholder="Pesquise um provedor ...">
      </div>
      <div class="col-md-12 mt-3">
        <h4 class="text-white">Todos os provedores</h4>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2" v-for="(item, index) in this.searchResult">
            <nuxt-link :to="{ name:'cassino-game-provedores-slug', params:{slug:item.slug}  }">
              <div class="bg-soft-dark text-center p-2" style="height: 120px;">
                <img :src="item.logo" style="height: 35px;" :alt="item.name" class="mt-3"/>
              </div>
            </nuxt-link>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'cassino',
  data(){
    return {
      providers: [],
      searchValue: null
    };
  },
  mounted() {
    this.getProviders()
  },
  computed:{
    searchResult() {
      let providerssearched = this.providers

      if (this.searchValue != '' && this.searchValue) {
        providerssearched = providerssearched.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }
      return providerssearched
    }
  },
  methods: {
    async getProviders() {
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

