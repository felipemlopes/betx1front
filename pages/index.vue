<template>

  <div class="container">



    <div class="row mt-3 p-2">
      <FrontBanner></FrontBanner>
    </div>

    <div class="row">

      <div class="col-md-12 mt-3">
        <div class="card bg-dark">
          <div class="card-body py-2 px-2">
            <h4 class="text-white-50 m-0">
              <svg v-html="this.sport.icon" class="bt248" width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: #ffee59; width: 18px; height: 18px;">
              </svg>
              {{this.sport.name_display}}
            </h4>

            <div class="mt-2">

              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <nuxt-link :to="{ name:'esportes-slug-aovivo', params:{slug:this.slugSport}}" class="nav-link active">Ao vivo</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link :to="{ name:'esportes-slug-proximos', params:{slug:this.slugSport}}" class="nav-link">Próximos</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link :to="{ name:'esportes-slug-paises', params:{slug:this.slugSport}}" class="nav-link">Países</nuxt-link>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div>



      <div class="col-md-12">

        <div class="row">
          <FrontFeaturedmatches :sport_slug="this.slugSport"></FrontFeaturedmatches>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'default',
  data(){
    return {
      promotion: null,
      left: 0,
      originX: 0,
      originLeft: 0,
      sport: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
        meta: "",
      },
    };
  },
  computed: {
    games () {
      return this.$store.state.games.games
    },
    faPlay () {
      return faPlay
    },
    slugSport(){
      return "soccer";
    },
  },
  async mounted() {
    await this.getSport()
  },
  methods: {
    getSport() {
      try {
        this.$axios.get("/laravel/api/sportsbook/sports/"+this.slugSport)
          .then(res => {
            this.sport.id = res.data.data.sport.id;
            this.sport.name = res.data.data.sport.name;
            this.sport.name_display = res.data.data.sport.name_display;
            this.sport.slug = res.data.data.sport.slug;
            this.sport.icon = res.data.data.sport.icon;
            this.sport.meta = res.data.data.sport.meta;
          })
          .catch(err => {
            this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          });
      }catch (e){
        console.log("fail", e)
      }
    },
  },
}
</script>

