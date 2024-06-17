<template>
  <div>
    <a v-b-toggle="'collapse-'+competition_id" class="text-white font-weight-bold d-flex justify-content-between border-bottom">
        <span class="text-dark fw-bold fs-16">
          <img :src="country_flag" :style="{width:'15px'}"> {{ country_displayname }} / {{ competition_name }}

        </span>
        <span class="badge text-warning">
          <fa-icon :icon="faAngleDown" style="margin-right: 10px;"/>
        </span>
    </a>
    <b-collapse :id="'collapse-'+competition_id">

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

          <div class="row table-line" v-for="(item, index) in matches">
            <div class="col-sm-6 col-12 ellipsis div-team">
              <div class="d-flex">
                <div class="text-warning">{{item.home_score}}</div>
                <div class="fw-bold px-2">{{item.home_team}}</div>
              </div>
              <div class="d-flex">
                <div class="text-warning">{{item.away_score}}</div>
                <div class="fw-bold px-2">{{item.away_team}}</div>
              </div>
            </div>
            <div class="col-sm-2 col-2">
              {{item.elapsed}}
              {{item.elapsed>0?'º':''}}
            </div>
            <div class="col-sm-4 col-12 text-center div-btn-odds">
              <button class="btn btn-primary" v-on:click="addToBillet({'id':item.id,'home_team':item.home_team,'away_team':item.away_team,'market':'Home/Away','team':1,'team_name':item.home_team,'amount':'','odd':$store.state.settings.oddDefault})">
                <strong>{{ $store.state.settings.oddDefault }}</strong>
                <div class="fs-11 d-block" style="height: 16px">{{ JSON.parse(item.liquidity).home }}</div>
              </button>
              <button class="btn btn-primary" v-on:click="addToBillet({'id':item.id,'home_team':item.home_team,'away_team':item.away_team,'market':'Home/Away','team':2,'team_name':item.away_team,'amount':'','odd':$store.state.settings.oddDefault})">
                <strong>{{ $store.state.settings.oddDefault }}</strong>
                <div class="fs-11 d-block" style="height: 16px">{{ JSON.parse(item.liquidity).away }}</div>
              </button>
            </div>
          </div>

        </div>
      </div>

    </b-collapse>
  </div>
</template>

<script>
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

export default {
  name: "Competition",
  props: {
    sport_slug:String,
    country_id:String,
    country_flag:String,
    country_name:String,
    country_displayname:String,
    competition_id:Number,
    competition_name:String,
  },
  data(){
    return {
      matches: [],
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
  created() {
    this.$nuxt.$on('gamefinished', (item) => {
      this.removeMatch(item.match_id)
    })
    this.$nuxt.$on('gameupdateliquidity', (item) => {
      this.updateMatchLiquidity(item.match_id,item.liquidity)
    })
    this.$nuxt.$on('gameupdateresult', (item) => {
      this.updateMatchResult(item.match_id,item.home,item.away)
    })
    this.$nuxt.$on('gameupdatetime', (item) => {
      this.updateMatchTime(item.match_id,item.elapsed)
    })
  },
  async mounted() {
    await this.getMatches()
  },
  methods: {
    async getMatches() {
      try {
        await this.$axios.get("/laravel/api/sportsbook/sports/championship/"+this.competition_id+"/next")
          .then(res => {
            this.matches = res.data.data;
            this.showHideSpinner=false
            console.log(this.matches)
          })
          .catch(err => {
            this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
            this.showHideSpinner=false
          });
      }catch (e){
        console.log("fail", e)
      }
    },
    async addToBillet(payload) {
      if(this.$cookies.get('tokenauth')){
        this.$store.commit('billet/addItem', payload)
      }else{
        this.$nuxt.$emit('openlogin')
      }
      //this.$toast.success('Adicionado ao bilhete de apostas!',{duration:600})
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric' }
      return new Date(date).toLocaleDateString('pt', options)
    },
    removeMatch(id){
      let i = this.matches.map(item => item.id).indexOf(id) // find index of your object
      this.matches.splice(i, 1)
    },
    updateMatchTime(id,time){
      let i = this.matches.map(item => item.id).indexOf(id) // find index of your object
      const result = this.matches.filter(element => element.id.toString() === id.toString())[0];
      if(typeof(result) === 'object'){
        result.elapsed=time
        this.matches[i] = result
      }
    },
    updateMatchResult(id,home,away){
      let i = this.matches.map(item => item.id).indexOf(id) // find index of your object
      const result = this.matches.filter(element => element.id.toString() === id.toString())[0];
      if(typeof(result) === 'object'){
        result.home_score=home
        result.away_score=away
        this.matches[i] = result
      }
    },
    updateMatchLiquidity(id,liquidity){
      let i = this.matches.map(item => item.id).indexOf(id) // find index of your object
      const result = this.matches.filter(element => element.id.toString() === id.toString())[0];
      if(typeof(result) === 'object'){
        result.liquidity=liquidity
        this.matches[i] = result
      }
    },
  }
}
</script>

<style scoped>

</style>
