<template>

  <div class="container">

    <div class="row mt-3">
      <div class="col-md-12">
        <img src="~/assets/images/banner.jpg" class="card-img-top img-fluid" style="height: 200px;object-fit: cover;opacity:1;border-radius: 10px;">
      </div>
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
                  <nuxt-link :to="{ name:'esportes-slug-aovivo', params:{slug:this.$route.params.slug}}" class="nav-link">Ao vivo</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link :to="{ name:'esportes-slug-proximos', params:{slug:this.$route.params.slug}}" class="nav-link active">Próximos</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link :to="{ name:'esportes-slug-paises', params:{slug:this.$route.params.slug}}" class="nav-link">Países</nuxt-link>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div>


      <div class="col-md-12">

        <div class="row">
          <FrontNextmatches :sport_slug="this.$route.params.slug"></FrontNextmatches>
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
      countries: [],
      sport: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
        meta: "",
      },
      selected_championship: "1"
    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
    slugSport(){
      return this.$route.params.slug;
    },
  },
  async mounted() {
    await this.getSport()
  },
  methods: {
    getSport() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug)
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
    },
    getCountries() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/championship/countries/list")
        .then(res => {
          this.countries = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
