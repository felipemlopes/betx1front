<template>

  <div class="">
    <div class="row mt-5">
      <div class="col-md-9">


      </div>

    </div>
  </div>

</template>

<script>

export default {
  name: '',
  layout: 'defaultaposta',
  data(){
    return {
      id: null,
      name: null,
      slug: null,
      reference: null,
      status: null,
      championship_name: null,
      championship_slug: null,
      championship_reference: null,
      championship_id: null,

      match_id: null,
      markets: [],
    };
  },
  computed: {

  },
  mounted() {
    this.getMatch();
  },
  methods: {

    async getMatch() {
      await this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/matches")
        .then(res => {
          console.log(res)
          this.id = res.data.data.sport.id;
          this.name = res.data.data.sport.name;
          this.slug = res.data.data.sport.slug;
          this.reference = res.data.data.sport.reference;
          this.status = res.data.data.sport.status;
          this.matches = res.data.data.result;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },

  },
}
</script>
