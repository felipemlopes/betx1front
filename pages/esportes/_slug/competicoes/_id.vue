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

              <div class="fs-14 fw-bold pt-2 pb-2 text-white-50">{{ championship.name }}</div>

              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active">Partidas</a>
                </li>

              </ul>

            </div>

          </div>
        </div>
      </div>


      <div class="col-md-12">

        <div class="row">
          <div class="row">

            <FrontLoadspinner v-if="this.showHideSpinner"/>

            <div class="mt-0 py-1" v-else>
              <a class="text-white font-weight-bold d-flex justify-content-between border-bottom">

              </a>
              <div>
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

                    <div class="row table-line" v-for="(item, index) in this.matches">
                      <div class="col-sm-6 col-6 ellipsis">
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
                        <span v-if="item.elapsed">{{item.elapsed}}</span>
                        <span v-else>{{formatDate(item.date)}}</span>
                      </div>
                      <div class="col-sm-4 col-4 text-center">
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
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'default',
  data(){
    return {
      countries: [],
      matches: [],
      sport: {
        id: '',
        name: '',
        name_display: '',
        slug: '',
        image: '',
        icon: '',
        meta: '',
      },
      championship: {
        id: '',
        name: '',
        slug: '',
      },
      showHideSpinner: true,
    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
    faAngleDown () {
      return faAngleDown
    },
  },
  mounted() {
    this.getSport()
    this.getChampionship()
    this.getMatches()
  },
  methods: {
    getSport() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug)
        .then(res => {
          this.sport.id = res.data.data.sport.id
          this.sport.name = res.data.data.sport.name
          this.sport.name_display = res.data.data.sport.name_display
          this.sport.slug = res.data.data.sport.slug
          this.sport.icon = res.data.data.sport.icon
          this.sport.meta = res.data.data.sport.meta
          console.log( this.sport)
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    getChampionship() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/championship/"+this.$route.params.id+"/info")
        .then(res => {
          console.log(res)
          this.championship.id = res.data.data.id
          this.championship.name = res.data.data.name
          this.championship.slug = res.data.data.slug
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    getMatches() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/championship/"+this.$route.params.id+"/matches")
        .then(res => {
          this.matches = res.data.data.result;
          this.showHideSpinner=false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner=false
        });
    },
    async addToBillet(payload) {
      if(this.$cookies.get('tokenauth')){
        this.$nuxt.$emit('addedtobillet',payload)
        this.$store.commit('billet/addItem', payload)
      }else{
        this.$nuxt.$emit('openlogin')
        this.$emit("openlogin");
      }
      //this.$toast.success('Adicionado ao bilhete de apostas!',{duration:600})
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric' }
      return new Date(date).toLocaleDateString('pt', options)
    },
  },
}
</script>
