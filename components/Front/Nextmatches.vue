<template>

  <div class="row">

    <FrontLoadspinner v-if="this.showHideSpinner"/>

    <div class="mt-0 py-1" v-else v-for="(item, index) in this.matches">
      <a v-b-toggle="'collapse-'+index" class="text-white font-weight-bold d-flex justify-content-between border-bottom">
          <span class="text-dark fw-bold fs-16">
            PAIS / {{ index }}

          </span>
          <span class="badge text-warning">
            <fa-icon :icon="faAngleDown" style="margin-right: 10px;"/>
          </span>
      </a>
      <b-collapse :id="'collapse-'+index">
        <div class="card bg-dark">
          <div class="card-body p-0">

            <div class="row table-header">
              <div class="col-sm-6 col-6">
                Evento
              </div>
              <div class="col-sm-2 col-2">
                Tempo
              </div>
              <div class="col-sm-4 col-4 text-center">
                Resultado
              </div>
            </div>

            <div class="row table-line" v-for="(subitem, i) in item">
              <div class="col-sm-6 col-6 ellipsis">
                <div class="d-flex">
                  <div class="text-warning">{{subitem.home_score}}</div>
                  <div class="fw-bold px-2">{{subitem.home_team}}</div>
                </div>
                <div class="d-flex">
                  <div class="text-warning">{{subitem.away_score}}</div>
                  <div class="fw-bold px-2">{{subitem.away_team}}</div>
                </div>
              </div>
              <div class="col-sm-2 col-2">
                {{subitem.elapsed}}
              </div>
              <div class="col-sm-4 col-4 text-center">
                <button class="btn btn-primary" v-on:click="addToBillet({'id':subitem.id,'home_team':subitem.home_team,'away_team':subitem.away_team,'market':'Home/Away','team':1,'team_name':subitem.home_team,'amount':'','odd':$store.state.settings.oddDefault})">
                  <strong>{{ $store.state.settings.oddDefault }}</strong>
                </button>
                <button class="btn btn-primary" v-on:click="addToBillet({'id':subitem.id,'home_team':subitem.home_team,'away_team':subitem.away_team,'market':'Home/Away','team':2,'team_name':subitem.away_team,'amount':'','odd':$store.state.settings.oddDefault})">
                  <strong>{{ $store.state.settings.oddDefault }}</strong>
                </button>
              </div>
            </div>

          </div>
        </div>
      </b-collapse>
    </div>
  </div>

</template>

<script>
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    sport_slug:String,
  },
  data(){
    return {
      matches: [],
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
    faAngleDown () {
      return faAngleDown
    },
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
    await this.getSport()
    await this.getLeagues()
    await this.getMatches()
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
    getLeagues() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/championship")
        .then(res => {
          this.championships = res.data.data.result;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });

    },
    getMatches() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/nextmatches")
        .then(res => {
          this.matches = res.data.data.result;
          this.showHideSpinner=false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner=false
        });
    },
    getChampionshipsNameById(value){
      let searched = this.championships
      searched = searched.filter((item) => {
        console.log("id: "+item.id)
        console.log("value: "+value)
        //return item.id === value
        return parseInt(item.id) === parseInt(value)
        return 122 === 122
      })
      //console.log(value)
      //console.log(this.championships)
      console.log(searched)
      return searched[0]?searched[0]?.name:null;
    },
    async addToBillet(payload) {
      if(this.$cookies.get('tokenauth')){
        this.$store.commit('billet/addItem', payload)
      }else{
        this.$nuxt.$emit('openlogin')
        //this.$emit("openlogin");
      }
      //this.$toast.success('Adicionado ao bilhete de apostas!',{duration:600})
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric' }
      return new Date(date).toLocaleDateString('pt', options)
    },
  },

};
</script>

<style scoped>

</style>
