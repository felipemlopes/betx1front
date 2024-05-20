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

          <img src="" alt="LOGO">

          <button class="btn btn-mobile" v-on:click="toggleBetBillet">
            <fa-icon :icon="faFileInvoice" class=""/>
            <span class="text">Bilhete de Aposta</span>
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
      showHideSpinner: true
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
    }

  },

  methods: {
    toggleMenu() {
      this.$nuxt.$emit('togglemenu')
    },
    toggleBetBillet() {
      this.$nuxt.$emit('togglebillet')
    }
  }
};
</script>
