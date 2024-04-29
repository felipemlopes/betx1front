<template>
  <div class="col-md-6">
    <div class="font-weight-bold font-size-18 text-white-50">
      Eventos
    </div>
    <div class="card ">
      <div class="card-body p-0">

        <div>
          <div class="text-white p-2 font-weight-bold text-center" style="background: rgb(199, 11, 10);">
            16/03/2024
          </div>

          <div class="text-white p-2 font-weight-bold text-center bg-soft-dark">
            Brasil | Campeonato
          </div>

          <div class="p-2 bg-dark d-flex justify-content-between">
            <div class="text-white">
              <div>
                América FC
              </div>
              <div>
                Atlético Mineiro
              </div>
            </div>
            <div class="d-inline-flex">
              <div class="text-white">
                <span class="d-block">17/03</span>
                <span class="d-block">19:00</span>
              </div>
              <div class="border-left ml-2 pl-2 text-warning">
                <span class="d-block text-center">+</span>
                <span class="font-size-11">Cotações</span>
              </div>
            </div>
          </div>

          <div class="border-top border-dark bg-dark  d-flex justify-content-around pt-2 pb-2">
            <div class="text-center">
              <span class="text-white-50 d-block font-size-12">AMÉRICA FC</span>
              <span class="text-warning font-weight-bold font-size-18">4.16</span>
            </div>
            <div class="text-center">
              <span class="text-white-50 d-block font-size-12">EMPATE</span>
              <span class="text-warning font-weight-bold font-size-18">3.02</span>
            </div>
            <div class="text-center">
              <span class="text-white-50 d-block font-size-12">ATLÉTICO MINEIRO</span>
              <span class="text-warning font-weight-bold font-size-18">2.03</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    championship_id:String,
  },
  data(){
    return {
      championship: null,
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
    await this.getChampionship()
    await this.getMatches()
  },
  methods: {
    getChampionship() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/championship/"+this.championship_id)
        .then(res => {
          this.championship = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    getMatches() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/championship/"+this.championship_id+"/matches")
        .then(res => {
          this.matches = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },

};
</script>

<style scoped>

</style>
