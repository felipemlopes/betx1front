<template>
  <div class="right-side-menu p-1" :class="{ active: isOpenMobile }">

    <div class="d-flex justify-content-evenly">
      <button class="btn btn-primary fw-bold rounded-pill" v-on:click="openCupom">Cupom</button>
      <button class="btn btn-primary fw-bold rounded-pill" v-on:click="openMyBets">Minhas Apostas</button>
    </div>
    <div v-show="show_cupom">
      <p class="text-warning m-0 mt-3 fw-bold">Bilhete de apostas</p>
      <div class="card bg-dark">
        <div class="card-body p-0">

          <div class="border-bottom border-secondary p-2" v-for="(item, index) in this.$store.state.billet.items">
            <div class="d-flex justify-content-between">
              <div>
                <p class="m-0 fs-11">
                  {{item.home_team}} x {{item.away_team}}
                </p>
                <p class="m-0 mb-2 text-white">
                  <strong>{{item.team_name}}</strong>
                  <small class="fs-11 text-white-50">Odd: {{item.odd}}</small>
                </p>
              </div>

              <div style="text-align: right;">
                <p class="m-0 text-white fw-bold">
                  <fa-icon :icon="faTrashAlt" v-on:click="removeFromBillet(item.id)"/>
                </p>
                <p class="fs-11">

                </p>
              </div>
            </div>
            <div class="d-block">
              <input type="text" class="form-control" placeholder="Valor" :value="item.amount" v-on:input="updateToBillet(item.id,$event.target.value)">
              <p class="m-0 text-white-50 fs-11" style="text-align: right;">
                Ganho potencial:
                <strong class="text-white">R${{ item.odd * item.amount }}</strong>
              </p>
            </div>
          </div>

          <div class="d-block p-2" v-if="this.$store.state.billet.items.length>0">
            <button class="btn btn-primary w-100 btn-sm" v-on:click="bet">Apostar</button>
          </div>
          <div class="d-block p-2 text-center text-white-50" v-else>
            <em>Vazio</em>
          </div>

        </div>
      </div>
    </div>
    <div v-show="show_my_bets">
      <p class="text-warning m-0 mt-3 fw-bold">Minhas Apostas</p>
      <div class="card bg-dark">
        <div class="card-body">

          <div class="d-flex justify-content-between" v-for="(item,index) in this.$store.state.bets.matchedbets">
            <div>
              <p class="m-0 text-white">
                <strong>R${{item.amount}}</strong>
                <br>
                <span class="text-dark fs-11">{{ item.selection }}</span>
              </p>
              <p class="fs-11">
                {{ item.game }}
              </p>
            </div>
            <div style="text-align: right;">
              <p class="fs-11">
                {{ item.date }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>


    <p class="text-warning m-0 fw-bold">Apostas não correspondidas</p>
    <div class="card bg-dark">
      <div class="card-body">

        <div class="d-flex justify-content-between" v-for="(item,index) in this.$store.state.bets.openbets">
          <div>
            <p class="m-0 text-white">
              <strong>R${{item.pending_amount}}</strong>
              <br>
              <span class="text-dark fs-11">{{ item.selection }}</span>
            </p>
            <p class="fs-11">
              {{ item.game }}
            </p>
          </div>
          <div style="text-align: right;">
            <p class="m-0">
              <button class="btn btn-danger btn-sm" v-on:click="removeBet(item.id)">
                <fa-icon :icon="faTrashAlt"/>
              </button>
            </p>
            <p class="fs-11">
              {{ item.date }}
            </p>
          </div>
        </div>

      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-12">
        <img src="~/assets/images/banner_sidebar.jpg" class="card-img-top img-fluid" style="height: 200px;object-fit: cover;opacity:1;border-radius: 10px;">
      </div>
    </div>

  </div>
</template>

<script>
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
export default {
  data(){
    return {
      loading: false,
      open: false,
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
      show_cupom: true,
      show_my_bets: false,
    };
  },
  computed: {
    classSidebar () {
      return "d-none"
    },
    faTrashAlt () {
      return faTrashAlt
    },
    isOpenMobile() {
      console.log(this.open)
      if(this.open){
        return "active"
      }
      return ""
    },
  },
  async mounted() {
    //await this.getPromotion()
  },
  created() {
    this.$nuxt.$on('addedtobillet',(value) => {
      this.openCupom()
    })
    this.$nuxt.$on('togglebillet',() => {
      this.open = !this.open
    })
  },
  methods: {
    async getPromotion() {
      try {
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
            this.$toast.error('Erro!',{duration:600})
          });
      }catch (e){
        console.log("fail", e)
      }
    },
    async removeFromBillet(id) {
      this.$store.commit('billet/removeItem', id)
      this.$toast.success('Removido do bilhete de apostas!',{duration:600})
    },
    async updateToBillet(id,amount) {
      this.$store.commit('billet/updateAmount', {
          id:id,
          amount:amount
      })
    },
    async bet() {
      this.loading = true
      try {
        await this.$axios.post('/laravel/api/sportsbook/bet', this.$store.state.billet.items)
          .then(res => {
            console.log(res)
            this.loading = false
            this.$store.commit('billet/clearBillet')
            this.$store.dispatch('bets/fetchOpenbets')
            this.$store.dispatch('user/fetchBalance')
            this.$store.dispatch('bets/fetchMatchedbets')
            this.openMyBets()
          }).catch(err => {
            this.loading = false
            const code = err
            console.log(code.response.data)
          });
      }catch (e){
        console.log("fail", e)
      }
      this.$store.state.billet.items
    },
    async removeBet(id){
      this.loading = true
      try {
        await this.$axios.post('/laravel/api/sportsbook/bet/'+id+'/cancel',[])
          .then(res => {
            console.log(res)
            this.loading = false
            this.$store.dispatch('bets/fetchOpenbets')
            this.$store.dispatch('user/fetchBalance')
          }).catch(err => {
            this.loading = false
            const code = err
          });
      }catch (e){
        console.log("fail", e)
      }
      this.$store.dispatch('bets/fetchOpenbets')
    },
    openCupom() {
      this.show_cupom= true
      this.show_my_bets= false
    },
    openMyBets() {
      this.show_cupom= false
      this.show_my_bets= true
    }
  },

};
</script>

<style scoped>

</style>
