<template>

  <div class="row matches-featured">
    <div class="col-md-4 px-1" v-for="(item,index) in this.matches">
      <div class="card bg-white">
        <div class="card-body" style="background: url('/soccer.jpg');background-position: center; opacity: 1;">
          <p class="text-white fw-bold">{{ formatDate(item.date) }}</p>
          <div class="d-flex justify-content-around">
            <div class="text-white fw-bold">{{ item.home_team }}</div>
            <div class="text-white fw-bold">{{ item.away_team }}</div>
          </div>
          <div class="d-flex justify-content-around">
            <div class="bg-white rounded-1 p-1 justify-content-between d-flex" style="width: 60px;">
              <div class="fs-11">1</div>
              <div class="fw-bold">
                {{ $store.state.settings.oddDefault }}
              </div>
            </div>
            <div class="bg-white rounded-1 p-1 justify-content-between d-flex" style="width: 60px;">
              <div class="fs-11">2</div>
              <div class="fw-bold">
                {{ $store.state.settings.oddDefault }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
      showHideSpinner: true,
    };
  },
  computed: {
    faAngleDown() {
      return faAngleDown
    },
  },
  async mounted() {
    await this.getMatches()
  },
  methods: {
    getMatches() {
      try {
        this.$axios.get("/laravel/api/sportsbook/sports/soccer/featuredmatches")
          .then(res => {
            this.matches = res.data.data;
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
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric' }
      return new Date(date).toLocaleDateString('pt', options)
    },
  },

};
</script>

<style scoped>

</style>
