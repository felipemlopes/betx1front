<template>

  <div class="container">

    <div class="row mt-3">
      <div class="col-md-12">
        <FrontBanner></FrontBanner>
      </div>
    </div>

    <div class="row">

      <FrontLoadspinner v-if="this.showHideSpinner"/>

      <div class="mt-0 py-1" v-else>
        <a class="text-white font-weight-bold d-flex justify-content-between">
          <span class="text-dark fw-bold fs-16">
            <img :src="country.flag" style="width: 20px;">
            {{country.name}}
          </span>
          <span class="badge text-warning">
            {{ this.championships.length }}
          </span>
        </a>
        <div>
          <div class="card bg-dark">
            <div class="card-body p-0">
              <div class="mb-0 mt-0 px-2 py-1 border-bottom text-white-50" v-for="(item,index) in this.championships">
                <nuxt-link :to="{ name:'esportes-slug-competicoes-id', params:{slug:sport.slug,id:item.id}}" class="text-white-50">{{item.name}}</nuxt-link>
              </div>
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
  layout: 'default',
  data(){
    return {
      championships: [],
      sport: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
        meta: "",
      },
      country: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
      },
      showHideSpinner: true,
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
    await this.getCountry()
    await this.getChampionships()
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
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
    getCountry() {
      this.$axios.get("/laravel/api/sportsbook/countries/"+this.$route.params.slugpais)
        .then(res => {
          this.country.id = res.data.data.id;
          this.country.name = res.data.data.name;
          this.country.name_display = res.data.data.name;
          this.country.slug = res.data.data.slug;
          this.country.icon = res.data.data.flag;
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
    getChampionships() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/championship/country/"+this.$route.params.slugpais)
        .then(res => {
          this.championships = res.data.data;
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
  },
}
</script>
