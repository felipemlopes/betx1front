<template>
  <div class="col-md-6">
    <div class="d-flex justify-content-between border-warning border-bottom">
      <div class="font-size-14 text-white-50">
      <span class="d-block">
        América FC
      </span>
        <span class="d-block">
        Atlético Mineiro
      </span>
      </div>
      <div class="text-white-50">
        <span class="d-block">17/03</span>
        <span class="d-block">19:00</span>
      </div>
    </div>
    <div class="card ">
      <div class="card-body p-0 pb-2">
        <div class="d-flex justify-content-around pt-3 pb-0 border-bottom border-dark ">
          <div class="font-weight-bold border-bottom border-danger border-bottom-2-danger">
            Principal
          </div>
          <div class="font-weight-bold">
            Gols
          </div>
          <div class="font-weight-bold">
            Cartões
          </div>
          <div class="font-weight-bold">
            Handcap
          </div>
        </div>

        <div class="px-3 mt-2">
          <span class="font-weight-bold font-size-18 text-white">Principais</span>
          <div class="d-flex justify-content-around bg-dark py-2">
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Casa</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Empate</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Fora</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
          </div>
        </div>

        <div class="px-3 mt-2">
          <span class="font-weight-bold font-size-18 text-white">Chance dupla</span>
          <div class="d-flex justify-content-around bg-dark py-2">
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Casa</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Empate</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Fora</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
          </div>
        </div>

        <div class="px-3 mt-2">
          <span class="font-weight-bold font-size-18 text-white">Chance dupla</span>
          <div class="d-flex justify-content-around bg-dark py-2">
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Casa</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Empate</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Fora</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
          </div>
        </div>

        <div class="px-3 mt-2">
          <span class="font-weight-bold font-size-18 text-white">Chance dupla</span>
          <div class="d-flex justify-content-around bg-dark py-2">
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Casa</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between border-right font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Empate</span>
              <span class="text-warning pr-2">4.74</span>
            </div>
            <div class="d-flex justify-content-between font-weight-bold" style="width: 33%;">
              <span class="text-white-50 pl-2">Fora</span>
              <span class="text-warning pr-2">4.74</span>
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
    match_id:String,
  },
  data(){
    return {
      match: null,
      markets: [],
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
    await this.getMarkets()
    await this.getMatch()
  },
  methods: {
    getMarkets() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/markets")
        .then(res => {
          this.markets = res.data.data;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    getMatch() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/event/"+this.match_id)
        .then(res => {
          this.match = res.data.data;
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
