<template>
  <footer class="footer custom-footer" style="border-top-color: #fff3;">
    <div class="container-fluid">
      <div class="row mt-3 mb-5">
        <div class="col-md-4">
          <NuxtLink to="/" class="logo">
            <img alt="LOGO" src="/logo.png" style="height: 35px;">
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
          Copyright © 2024 - VemX1 Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
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
    await this.getPages()
  },
  methods: {
    async getPages() {
      try {
        await this.$axios.get("/laravel/api/pages")
          .then(res => {
            if(res.data.data){
              this.pages = res.data.data;
            }
          })
          .catch(err => {
            this.$toast.error('Erro!',{duration:600})
          });
      }catch (e){
        console.log("fail", e)
      }
    },
  },

};
</script>

<style scoped>

</style>
