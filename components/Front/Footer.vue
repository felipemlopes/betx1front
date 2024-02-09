<template>
  <div>
    <footer class="footer" style="border-top-color: #fff3;">
      <div class="container-fluid">
        <div class="row mt-3 mb-5">
          <div class="col-md-4">
            <NuxtLink to="/" class="logo">
              <img alt="LOGO" src="~assets/images/jogosbr.png" style="height: 75px;">
            </NuxtLink>
          </div>
          <div class="col-md-4">
            <ul class="list-unstyled">
              <li>
                <strong class="fs-5">Link Úteis</strong>
              </li>
              <li class="mt-3" v-for="(item, index) in this.pages" v-if="pages.length">
                <NuxtLink :to="{ name:'pagina-slug', params:{slug:item.slug}}" class="fw-bold footer-links link-light">
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <ul class="list-unstyled">
              <li>
                <strong class="fs-5">Sobre Nós</strong>
              </li>
              <li class="mt-3">
                <NuxtLink :to="{ name:'pagina-slug', params:{slug:'termos-de-uso'}}" class="fw-bold footer-links link-light">
                  Termos de uso
                </NuxtLink>
              </li>
              <li class="mt-3">
                <NuxtLink :to="{ name:'pagina-slug', params:{slug:'politica-de-privacidade'}}" class="fw-bold footer-links link-light">
                  Política de privacidade
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            Copyright © 2024 - Jogosbr Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {

  data(){
    return {
      pages: []
    };
  },
  computed: {
    isLogged(){
      //return this.$store.state.auth.loggedIn
    },

  },
  async mounted() {
    //this.$auth.fetchUser()
    await this.getPages()
  },
  methods: {
    async getPages() {
      await this.$axios.get("/laravel/api/pages")
        .then(res => {
          if(res.data.data){
            this.pages = res.data.data;
          }
        })
        .catch(err => {
          this.$toast.error('Erro!',{duration:600})
        });
    },
  },

};
</script>

<style scoped>

</style>
