<template>

  <div class="container">



    <div class="row mt-3 p-2">
      <FrontBanner></FrontBanner>
    </div>

    <div class="row">

      <FrontCassinoGameByProviders></FrontCassinoGameByProviders>

    </div>
  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'default',
  data(){
    return {
      promotion: null,
      left: 0,
      originX: 0,
      originLeft: 0,
      sport: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
        meta: "",
      },
    };
  },
  computed: {
    games () {
      return this.$store.state.games.games
    },
    faPlay () {
      return faPlay
    },
    slugSport(){
      return "soccer";
    },
  },
  async mounted() {
    await this.getSport()
  },
  methods: {
    getSport() {
      try {
        this.$axios.get("/laravel/api/sportsbook/sports/"+this.slugSport)
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
      }catch (e){
        console.log("fail", e)
      }
    },
  },
}
</script>

