<template>

  <div class="">
    <div class="row mt-5">
      <div class="col-md-9">

        <div class="card">
          <div class="card-body">
            <h3>Todas as Competições</h3>
            <div class="row">
              <div class="col-md-4 mt-2" v-for="(item, index) in this.competitions">
                <NuxtLink :to="{ name:'apostas-esportes-esporte-competition', params:{esporte:reference,competition:item.reference}  }" class="btn btn-dark btn-block" style="width: 100%;">
                  {{item.name}}
                </NuxtLink>
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
  name: '',
  layout: 'defaultaposta',
  data(){
    return {
      id: null,
      name: null,
      slug: null,
      reference: null,
      status: null,
      matches: [],
      competitions: [],
    };
  },
  computed: {

  },
  mounted() {
    this.getCompetitions();
  },
  methods: {
    async getCompetitions() {
      await this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug)
        .then(res => {
          this.id = res.data.data.sport.id;
          this.name = res.data.data.sport.name;
          this.slug = res.data.data.sport.slug;
          this.reference = res.data.data.sport.reference;
          this.status = res.data.data.sport.status;
          this.competitions = res.data.data.result;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getSport() {
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
