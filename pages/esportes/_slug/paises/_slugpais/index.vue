<template>

  <div class="container">

    <div class="row mt-3 mx-0">

      <div class="row matches-featured">
        <div class="col-md-4 px-1">
          <div class="card bg-white">
            <div class="card-body" style="background: url('/soccer.jpg');background-position: center; opacity: 1;">
              <p class="text-white fw-bold">06/07/2024 17:00</p>
              <div class="d-flex justify-content-around">
                <div class="text-white fw-bold">Brasil</div>
                <div class="text-white fw-bold">Paraguai</div>
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

        <div class="col-md-4 px-1">
          <div class="card bg-white">
            <div class="card-body" style="background: url('/soccer.jpg');background-position: center; opacity: 1;">
              <p class="text-white fw-bold">06/07/2024 17:00</p>
              <div class="d-flex justify-content-around">
                <div class="text-white fw-bold">Brasil</div>
                <div class="text-white fw-bold">Paraguai</div>
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

        <div class="col-md-4 px-1">
          <div class="card bg-white">
            <div class="card-body" style="background: url('/soccer.jpg');background-position: center; opacity: 1;">
              <p class="text-white fw-bold">06/07/2024 17:00</p>
              <div class="d-flex justify-content-around">
                <div class="text-white fw-bold">Brasil</div>
                <div class="text-white fw-bold">Paraguai</div>
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
    </div>


    <div class="col-md-12 mt-3">
      <div class="card bg-dark mb-0">
        <div class="card-body py-2 px-2">
          <h4 class="text-white-50 m-0">
            <svg v-html="this.sport.icon" class="bt248" width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: #ffee59; width: 18px; height: 18px;">
            </svg>
            {{this.sport.name_display}}:
            <span class="text-dark fw-bold fs-16">
            <img :src="country.flag" style="width: 20px;">
            {{country.displayname}}
          </span>
          </h4>
          <div class="mt-2">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <nuxt-link :to="{ name:'esportes-slug-paises-slugpais-aovivo', params:{slug:this.$route.params.slug}}" class="nav-link active">Ao vivo</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{ name:'esportes-slug-paises-slugpais-proximos', params:{slug:this.$route.params.slug}}" class="nav-link">Próximos</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <FrontLoadspinner v-if="this.showHideSpinner"/>

    <div class="row mt-2" v-else>
      <div v-if="this.championships.length>0">
        <div v-for="(item,index) in this.championships">
          <div class=" text-white">
            {{item.name}}
          </div>

          <div>
            <div class="card bg-dark mb-0">
              <div class="card-body p-0 m-0">

                <FrontChampionship :matches="partidas[item.id]"></FrontChampionship>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center mt-5">
          <em class="text-white">Nenhuma partida foi encontrada</em>
        </p>
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
      championships: [],
      partidas: [],
      sport: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
        meta: "",
      },
      country: {
        id: "",
        name: "",
        name_display: "",
        slug: "",
        icon: "",
      },
      showHideSpinner: true,
    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
    slugSport(){
      return this.$route.params.slug;
    },
  },
  async mounted() {
    await this.getSport()
    await this.getCountry()
    await this.getChampionships()
    await this.getMatches()
  },
  methods: {
    getSport() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug)
        .then(res => {
          this.sport.id = res.data.data.sport.id;
          this.sport.name = res.data.data.sport.name;
          this.sport.name_display = res.data.data.sport.name_display;
          this.sport.slug = res.data.data.sport.slug;
          this.sport.icon = res.data.data.sport.icon;
          this.sport.meta = res.data.data.sport.meta;
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
    getCountry() {
      this.$axios.get("/laravel/api/sportsbook/countries/"+this.$route.params.slugpais)
        .then(res => {
          this.country.id = res.data.data.id;
          this.country.name = res.data.data.name;
          this.country.displayname = res.data.data.country_displayname;
          this.country.name_display = res.data.data.name;
          this.country.slug = res.data.data.slug;
          this.country.icon = res.data.data.flag;
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
    getChampionships() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/championship/live?country="+this.$route.params.slugpais)
        .then(res => {
          this.championships = res.data.data;
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
    getMatches() {
      this.$axios.get("/laravel/api/sportsbook/sports/"+this.$route.params.slug+"/livematches?country="+this.$route.params.slugpais)
        .then(res => {
          console.log(this.partidas)
          console.log(res.data.data)
          this.partidas = res.data.data;
          console.log(this.partidas)
          this.showHideSpinner = false
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
          this.showHideSpinner = false
        });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric' }
      return new Date(date).toLocaleDateString('pt', options)
    },
  },
}
</script>
