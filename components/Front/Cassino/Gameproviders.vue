<template>
  <div>
    <div class="row pl-2 mt-3">
      <div class="col-md-12 d-flex justify-content-between">
        <div>
          <h4 class="text-white">Estúdios</h4>
        </div>
        <nuxt-link :to="{ name:'cassino-provedores' }" class="btn btn-xs btn-soft-dark" style="height: fit-content;">
          <span class="text-warning">Ver todos</span>
        </nuxt-link>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2" v-for="(item, index) in this.providers">
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
export default {

  data(){
    return {
      providers: [],
    };
  },
  computed: {
  },
  async mounted() {
    await this.getProviders()
  },
  methods: {
    async getProviders() {
      await this.$axios.get("/laravel/api/cassino/providers")
        .then(res => {
          console.log(res.data.data)
          this.providers = res.data.data;
          console.log(this.providers)
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
