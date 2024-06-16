<template>

  <div class="row">

    <FrontLoadspinner v-if="this.showHideSpinner"/>

    <div class="mt-0 py-1" v-else v-for="(item, index) in this.countries">
      <a v-b-toggle="'collapse-'+index" class="text-white font-weight-bold d-flex justify-content-between">
          <span class="text-dark fw-bold fs-16">
            <img :src="item.flag" style="width: 20px;">
            {{item.country_displayname}}
          </span>
          <span class="badge text-warning">
            {{ getChampionshipsByCountry(item.id).length }}
          </span>
      </a>
      <b-collapse :id="'collapse-'+index">
        <div class="card bg-dark">
          <div class="card-body p-0">
            <div class="mb-0 mt-0 px-2 py-1 border-bottom text-white-50" v-for="(aux,i) in getChampionshipsByCountry(item.id)">
              <nuxt-link :to="{ name:'esportes-slug-competicoes-id', params:{slug:sport_slug,id:aux.id}}" class="text-white-50">{{aux.name}}</nuxt-link>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    sport_slug:String,
  },
  data(){
    return {
      countries: [],
      championships: [],
      sport: {
        soccer: "1",
        baseball: "2",
        handball: "3",
        basketball: "4",
        hockey: "5",
        nfl: "6",
        rugby: "7",
        volleyball: "8",
      },
      showHideSpinner: true,
    };
  },
  computed: {
    sport_id () {
      if(this.sport_slug==="soccer"){
        return this.sport.soccer
      }else if(this.sport_slug==="baseball"){
        return this.sport.baseball
      }else if(this.sport_slug==="handball"){
        return this.sport.handball
      }else if(this.sport_slug==="basketball"){
        return this.sport.basketball
      }else if(this.sport_slug==="hockey"){
        return this.sport.hockey
      }else if(this.sport_slug==="nfl"){
        return this.sport.nfl
      }else if(this.sport_slug==="rugby"){
        return this.sport.rugby
      }else if(this.sport_slug==="volleyball"){
        return this.sport.volleyball
      }
    },
  },
  async mounted() {
    await this.getCountries()
    await this.getChampionships()
  },
  methods: {
    getSport() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug)
        .then(res => {
          this.sport.id = res.data.data.id;
          this.sport.name = res.data.data.name;
          this.sport.slug = res.data.data.slug;
          this.sport.flag = res.data.data.flag;
          this.sport.meta = res.data.data.meta;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    getCountries() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/championship/countries/list")
        .then(res => {
          this.countries = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    getChampionships() {
      this.$axios.get("/laravel/api/sportsbook/leagues")
        .then(res => {
          this.championships = res.data.data;
          this.showHideSpinner=false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner=false
        });
    },
    getChampionshipsByCountry(id){
      let searched = this.championships
      searched = searched.filter((item) => {
        return item.country_id === id.toString() && item.sport_id === this.sport_id
      })
      return searched;
    }
  },

};
</script>

<style scoped>

</style>
