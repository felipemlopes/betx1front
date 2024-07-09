<template>
  <div>
    <div class="row table-header m-0 p-0">
      <div class="col-sm-6 header-match">

      </div>
      <div class="col-12 col-sm-6">
        <div class="d-flex justify-content-end header-match-markets">
          <div class="px-3">
            1
          </div>
          <div class="px-3">
            2
          </div>
        </div>
      </div>
    </div>

    <div class="row table-line pt-1 pb-1" v-for="(item,index) in matches">
      <div class="col-sm-6 col-12 ellipsis div-team">
        <div class="d-flex">
          <div class="fw-bold pr-2 team-name text-start">
            {{item.home_team}}
          </div>
        </div>
        <div class="d-flex">
          <div class="fw-bold pr-2 team-name text-start">
            {{item.away_team}}</div>
        </div>
      </div>
      <div class="col-sm-6 col-12 ellipsis div-team-score-mobile">
        <div class="d-flex">
          <div class="text-white pr-2 team-score-mobile">
            {{item.home_score}}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-white pr-2 team-score-mobile">
            {{item.away_score}}</div>
        </div>
      </div>
      <div class="col-sm-6 col-12 text-center div-btn-odds ">
        <div class="d-flex justify-content-end w-100">
          <div class="d-grid px-2 align-content-center match-time">
            <span v-if="item.elapsed">
              {{item.elapsed}}
              {{item.elapsed>0?'º':''}}
            </span>
            <span v-else>
              {{formatDate(item.date)}}
            </span>
          </div>
          <div class="score-match d-grid px-2 match-score">
            <span class="text-white-50">{{item.home_score}}</span>
            <span class="text-white-50">{{item.away_score}}</span>
          </div>
          <div class="odds-btn-div">
            <button class="btn btn-primary btn-sm rounded-0" v-on:click="addToBillet({'id':item.id,'home_team':item.home_team,'away_team':item.away_team,'market':'Home/Away','team':1,'team_name':item.home_team,'amount':'','odd':$store.state.settings.oddDefault})">
              <strong>{{ $store.state.settings.oddDefault }}</strong>
              <div class="fs-11 d-block" style="height: 16px">{{ JSON.parse(item.liquidity).home }}</div>
            </button>
            <button class="btn btn-primary btn-sm rounded-0" v-on:click="addToBillet({'id':item.id,'home_team':item.home_team,'away_team':item.away_team,'market':'Home/Away','team':2,'team_name':item.away_team,'amount':'','odd':$store.state.settings.oddDefault})">
              <strong>{{ $store.state.settings.oddDefault }}</strong>
              <div class="fs-11 d-block" style="height: 16px">{{ JSON.parse(item.liquidity).away }}</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Championship",
  props: ['matches'],
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
  methods: {
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
  },
}
</script>

<style scoped>

</style>
