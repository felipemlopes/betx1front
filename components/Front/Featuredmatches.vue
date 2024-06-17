<template>

  <div class="row">

    <FrontLoadspinner v-if="this.showspinner"/>

    <div class="mt-0 py-1" v-else v-for="(item, index) in this.championships">

      <FrontCompetitionfeatured
        :country_id="item.country_id"
        :country_flag="item.country_flag"
        :country_name="item.country_name"
        :country_displayname="item.country_displayname"
        :competition_id="item.id"
        :competition_name="item.name"></FrontCompetitionfeatured>

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
      showHideSpinnerSport: true,
    };
  },
  computed: {
    faAngleDown () {
      return faAngleDown
    },
    showspinner () {
      if(this.showHideSpinner===true || this.showHideSpinnerSport===true){
        return true
      }else{
        return false
      }
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
  },
  methods: {
    getSport() {
      try {
        this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug)
          .then(res => {
            this.sport.id = res.data.data.id;
            this.sport.name = res.data.data.name;
            this.sport.slug = res.data.data.slug;
            this.sport.flag = res.data.data.flag;
            this.sport.meta = res.data.data.meta;
            this.showHideSpinnerSport = false
          })
          .catch(err => {
            this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
            this.showHideSpinnerSport = false
          });
      }catch (e){
        console.log("fail", e)
      }
    },
    getLeagues() {
      try {
        this.$axios.get("/laravel/api/sportsbook/sports/"+this.sport_slug+"/championship/featured")
          .then(res => {
            this.championships = res.data.data;
            this.showHideSpinner = false
          })
          .catch(err => {
            this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
            this.showHideSpinner = false
          });
      }catch (e){
        console.log("fail", e)
      }
    },
  },

};
</script>

<style scoped>

</style>
