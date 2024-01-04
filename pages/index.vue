<template>

  <div class="">
      <div class="container">
        <div class="row">
          <div class="col-md-12 d-flex justify-content-center" v-show="promotion.thumb!==null" style="">
            <img :src="promotion.thumb" style="width: auto; height:200px;">
          </div>
          <div class="col-md-12 mt-5">
            <h1 class="text-warning">
              Bem-vindo ao <strong class="text-white">Nome!</strong>
            </h1>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-6">
            <NuxtLink :to="{ name:'cassino'}">
              <div class="card bg-primary border-0">
                <img src="~/assets/images/cassino.jpg" class="card-img-top img-fluid" style="height: 150px;object-fit: cover;opacity: 0.4;">
                <div class="card-body p-1">
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fs-3 text-black">Cassino</p>
                    <NuxtLink :to="{ name:'cassino'}" class="btn btn-secondary" style="height: fit-content;background-color: #000000;">
                      Visitar Cassino
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="col-md-6">
            <div class="card bg-success border-0">
              <img src="~/assets/images/bet.jpg" class="card-img-top img-fluid" style="height: 150px;object-fit: cover;opacity: 0.4;">
              <div class="card-body p-1">
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fs-3 text-black">Apostas Esportivas</p>
                  <a href="" class="btn btn-secondary" style="height: fit-content;background-color: #000000;" disabled>Em Breve</a>
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
export default {
  layout: 'default',
  data(){
    return {
      promotion: {
        thumb: null,
      },

    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
  },
  mounted() {
    this.getPromotion()
  },
  methods: {
    async getPromotion() {
      this.$axios.get("/laravel/api/promotion/")
        .then(res => {
          this.promotion.thumb = res.data.data.thumb;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
