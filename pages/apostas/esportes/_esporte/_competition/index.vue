<template>

  <div class="">

    <div class="row ">
      <div class="col-md-9">

        <h3 class="text-white mt-3">{{championship_name}}</h3>

        <div class="card mt-2">

          <div class="card-body" v-if="matches.length>0">
            <div class="row border-bottom">
              <div class="col-md-5 match-details d-inline-flex justify-content-between text-white">
                Jogos
              </div>
              <div class="col-md-6 match-details d-flex text-white" v-if="reference==='Soccer'">
                <div class="col-md-4 text-center">
                  1
                </div>
                <div class="col-md-4 text-center">
                  X
                </div>
                <div class="col-md-4 text-center">
                  2
                </div>
              </div>
              <div class="col-md-6 match-details d-flex text-white" v-else>
                <div class="col-md-6 text-center">
                  1
                </div>
                <div class="col-md-6 text-center">
                  2
                </div>
              </div>
            </div>
            <div class="row border-bottom py-1" v-for="(item, index) in this.matches" v-if="item.bookmakers.length>0">
              <div >
                <div class="row d-flex" v-if="item.bookmakers[0].markets[0].outcomes.length===3">
                  <div class="col-md-5 match-details d-inline-flex justify-content-between link-competitors" style="border-right: 1px solid #555; padding-right: 20px;">
                    <div class="text-white">
                      <NuxtLink :to="{ name:'apostas-esporte-competition-id', params:{esporte:reference,competition:championship_reference,id:item.id}  }" class="">
                        <strong>{{item.home_team}}</strong>
                        <br>
                        <strong>{{item.away_team}}</strong>
                      </NuxtLink>
                    </div>
                    <div class="text-white">
                      <strong>0</strong>
                      <br>
                      <strong>0</strong>
                    </div>
                  </div>
                  <div class="col-md-6 match-details d-flex">
                    <div class="col-md-4 text-center link-match">
                      <button class="btn btn-bet">
                        <strong>{{item.bookmakers[0].markets[0].outcomes[0].price?item.bookmakers[0].markets[0].outcomes[0].price:""}}</strong>
                      </button>
                    </div>
                    <div class="col-md-4 text-center link-match">
                      <button class="btn btn-bet">
                        <strong>{{item.bookmakers[0].markets[0].outcomes[2].price?item.bookmakers[0].markets[0].outcomes[2].price:""}}</strong>
                      </button>
                    </div>
                    <div class="col-md-4 text-center link-match">
                      <button class="btn btn-bet">
                        <strong>{{item.bookmakers[0].markets[0].outcomes[1].price?item.bookmakers[0].markets[0].outcomes[1].price:""}}</strong>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-1 more-options d-flex link-match text-center">
                    <NuxtLink :to="{ name:'apostas-esporte-competition-id', params:{esporte:reference,competition:championship_reference,id:item.id}  }" class="pt-2">
                      <fa-icon :icon="faChevronRight" style="margin-right: 10px;"/>
                    </NuxtLink>
                  </div>
                </div>
                <div class="row justify-content-between" v-else>
                  <div class="col-md-5 match-details d-inline-flex justify-content-between link-competitors" style="border-right: 1px solid #555; padding-right: 20px;">
                    <div class="text-white">
                      <NuxtLink :to="{ name:'apostas-esporte-competition-id', params:{esporte:reference,competition:championship_reference,id:item.id}  }" class="">
                        <strong>{{item.home_team}}</strong>
                        <br>
                        <strong>{{item.away_team}}</strong>
                      </NuxtLink>
                    </div>
                    <div class="text-white">
                      <strong>0</strong>
                      <br>
                      <strong>0</strong>
                    </div>
                  </div>
                  <div class="col-md-6 match-details d-flex">
                    <div class="col-md-6 text-center link-match">
                      <button class="btn btn-bet">
                        <strong>{{item.bookmakers[0].markets[0].outcomes[0].price?item.bookmakers[0].markets[0].outcomes[0].price:""}}</strong>
                      </button>
                    </div>
                    <div class="col-md-6 text-center link-match">
                      <button class="btn btn-bet">
                        <strong>{{item.bookmakers[0].markets[0].outcomes[1].price?item.bookmakers[0].markets[0].outcomes[1].price:""}}</strong>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-1 more-options d-flex">
                    <NuxtLink :to="{ name:'apostas-esportes-esporte-competition-id', params:{esporte:reference,competition:championship_reference,id:item.id}  }" class=" pt-2">
                      <fa-icon :icon="faChevronRight" style="margin-right: 10px;"/>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body text-center" v-else>
            <em class="text-white-50">Nenhum evento foi encontrado</em>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<script>
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
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
      matches: [],
    };
  },
  computed: {
    faChevronRight () {
      return faChevronRight
    },
  },
  mounted() {
    this.getCompetition();
  },
  methods: {

    async getCompetition() {
      await this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.esporte+"/championship/"+this.$route.params.competition)
        .then(res => {
          this.id = res.data.data.sport.id;
          this.name = res.data.data.sport.name;
          this.slug = res.data.data.sport.slug;
          this.reference = res.data.data.sport.reference;
          this.status = res.data.data.sport.status;

          this.championship_name = res.data.data.chapionship.name;
          this.championship_slug = res.data.data.chapionship.slug;
          this.championship_id = res.data.data.chapionship.id;
          this.championship_reference = res.data.data.chapionship.reference;

          this.matches = res.data.data.result;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },

  },
}
</script>
