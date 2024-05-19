<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="wow fadeInRight" style="visibility: visible; animation-name: fadeInRight;">
          <h1 class="text-dark font-size57 font-bold text-center">
            {{ promotion.name }}
          </h1>

          <div class="row">
            <div class="col-md-12 d-flex justify-content-center" v-show="promotion!==null" style="">
              <img :src="promotion.thumb" style="width: auto; height:200px;">
            </div>
          </div>

          <div class="mt-50">
            <div class="card mt-2">
              <div class="card-body text-white">

                <p>{{promotion.description}}</p>

                <p>
                  <strong>Bônus:</strong>
                  {{promotion.percent}}%
                </p>
                <p>
                  <strong>Limite:</strong>
                  R${{promotion.limit}}
                </p>
                <p>
                  <strong>Rollover:</strong>
                  {{promotion.rollover}}x
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',

  data(){
    return {
      promotion: {
        id: null,
        name: null,
        code: null,
        thumb: null,
        description: null,
        rollover: null,
        percent: null,
        limit: null
      },
    };
  },
  mounted() {
    this.getPromotion();
  },
  methods: {
    async getPromotion() {
      await this.$axios.get("/laravel/api/promotion")
        .then(res => {
          this.promotion.id = res.data.data.id;
          this.promotion.thumb = res.data.data.thumb;
          this.promotion.name = res.data.data.name;
          this.promotion.code = res.data.data.code;
          this.promotion.description = res.data.data.description;
          this.promotion.rollover = res.data.data.rollover;
          this.promotion.limit = res.data.data.limit;
          this.promotion.percent = res.data.data.percent;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
