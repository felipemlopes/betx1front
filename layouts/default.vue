<template>

    <div>
      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper" :class="{'sidebar-enable': this.$store.state.sidebar.sidebarcassino }">
        <FrontHeader />
        <FrontSidebar />

        <div class="content-page-internal d-flex p-0">

          <div class="custom-content-bet">
            <Nuxt />
          </div>


          <FrontSidebarright></FrontSidebarright>

        </div>

        <FrontFooter />
      </div>

      <div class="menu-mobile">
        <div class="d-flex justify-content-between">
          <button class="btn btn-mobile" v-on:click="toggleMenu">
            <fa-icon :icon="faBars" class=""/>
          </button>

          <div class="text-success px-3 balance-mobile-text" style="padding-top:0.5rem;padding-bottom:0.5rem;" v-show="this.$cookies.get('tokenauth')">
            <span class="fs-6">R$</span>
            <span class="fs-6">
               {{this.$store.state.user.balance}}
            </span>
          </div>

          <button class="btn btn-mobile" v-on:click="toggleBetBillet">
            <fa-icon :icon="faFileInvoice" class=""/>
            <span class="text billet-text">Bilhete de Aposta</span>
            <span class="badge badge-success bg-primary text-black-50 counter-bets">3</span>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import '~/assets/css/bootstrap.min.css'
import '~/assets/css/app.min.css'
import '~/assets/css/bootstrap-dark.min.css'
import '~/assets/css/app-dark.min.css'
import '~/assets/css/custom.css'
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
export default {
  data() {
    return {
      showHideSpinner: true,
    }
  },
  computed: {
    faBars () {
      return faBars
    },
    faFileInvoice () {
      return faFileInvoice
    },
  },
  created() {
    this.$nuxt.$on('togglebillet', () => {
      this.openbillet = !this.openbillet
    })
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },
  async mounted() {

    this.showHideSpinner = false;

    await this.$store.dispatch('sports/fetchSports')
    await this.$store.dispatch('sports/fetchCountries')
    await this.$store.dispatch('sidebar/fetchDevice')
    await this.$store.dispatch('user/fetchBalance')
    await this.$store.dispatch('banners/fetchBanners')
    await this.$store.dispatch('settings/fetchSettings')
    await this.$store.dispatch('banners/fetchBanners')
    if(this.$cookies.get('tokenauth')){
      await this.$store.dispatch('bets/fetchBets')
      await this.$store.dispatch('bets/fetchOpenbets')
    }

    var channel = this.$ably.channels.get("myChannel")
    channel.subscribe(message=>
    {
      if(message.name==="GameFinished"){
        console.log(message);
        this.$nuxt.$emit('gamefinished',message.data)
      }else if(message.name==="GameUpdateLiquidity"){
        console.log(message);
        this.$nuxt.$emit('gameupdateliquidity',message.data)
      }else if(message.name==="GameUpdateResult"){
        console.log(message);
        this.$nuxt.$emit('gameupdateresult',message.data)
      }else if(message.name==="GameUpdateTime"){
        console.log(message);
        this.$nuxt.$emit('gameupdatetime',message.data)
      }
      //console.log(message.name);
      //console.log(message.data);
    })

    /*this.$echo.channel('game-public-channel')
      .listen('GameFinished', (e) => {
        console.log(e);
        this.$nuxt.$emit('gamefinished',e)
      })
      .listen('GameUpdateLiquidity', (e) => {
        console.log(e);
        this.$nuxt.$emit('gameupdateliquidity',e)
      })
      .listen('GameUpdateResult', (e) => {
        console.log(e);
        this.$nuxt.$emit('gameupdateresult',e)
      })
      .listen('GameUpdateTime', (e) => {
        console.log(e);
        this.$nuxt.$emit('gameupdatetime',e)
      });*/

  },

  methods: {
    toggleMenu() {
      this.$nuxt.$emit('togglemenu')
    },
    toggleBetBillet() {
      this.$nuxt.$emit('togglebillet')
    },


  }
};
</script>
