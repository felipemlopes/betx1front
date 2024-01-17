<template>

  <div>
    <div class="row">
      <div class="col-md-12 mb-3 d-flex justify-content-center" v-show="promotion!==null" style="">
        <img :src="promotion" style="width: auto; height:200px;">
      </div>

      <div class="col-md-3" v-for="(item, index) in this.games">
        <div class="card game-box">
          <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }" class="game-box">
            <img :src="item.image" class="game-img">
            <div class="button-wrapper">
              <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }" class="btn btn-primary">
                <fa-icon :icon="faPlay" class="pr-5" />
                Jogue
              </NuxtLink>
            </div>
            <div class="game-top-text">
              <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }">
                <h4 class="fw-bold text-white">{{ item.name }}</h4>
              </NuxtLink>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'defaultcassino',
  data(){
    return {
      promotion: null,
    };
  },
  computed: {
    games () {
      return this.$store.state.games.games
    },
    faPlay () {
      return faPlay
    },
  },
  mounted() {
    this.getPromotion()
  },
  methods: {
    async getPromotion() {
      this.$axios.get("/laravel/api/promotion")
        .then(res => {
          this.promotion = res.data.data.thumb;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
