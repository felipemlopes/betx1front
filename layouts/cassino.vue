<template>

    <div v-if="$store.state.settings.modemaintenance==='2'">
      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper" :class="{'sidebar-enable': this.$store.state.sidebar.sidebarcassino }">
        <FrontHeader />
        <FrontSidebar />

        <div class="content-page-internal d-flex p-0 pb-3">

          <Nuxt />

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

        </div>
      </div>
    </div>
    <div v-else>
      <div class="" id="wrapper" :class="{'sidebar-enable': this.$store.state.sidebar.sidebarcassino }">
        <FrontHeadermaintenance />

        <div class="mt-5 d-flex justify-content-center p-0 pt-5 pb-3 row">

          <div class="text-white fs-24 col-md-12 text-center">Em manutenção</div>
          <div class="text-white fs-16 mt-4 col-md-12 text-center">Estamos trabalhando para restabelecer.</div>

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
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },
  async mounted() {
    /*this.$echo.channel('bet')
      .listen('Game', (e) => {
        console.log(e);
      })
      .listen('App\Events\Odd', (e) => {
        console.log("aqui");
        console.log(e);
      })
      .listen('Odd', (e) => {
        console.log(e);
      });*/
    this.showHideSpinner = false;
    await this.$store.dispatch('sidebar/fetchDevice')
    await this.$store.dispatch('user/fetchBalance')
    await this.$store.dispatch('banners/fetchBanners')
    await this.$store.dispatch('settings/fetchSettings')
    await this.$store.dispatch('banners/fetchBanners')
  },
  methods: {
    toggleMenu() {
      this.$nuxt.$emit('togglemenu')
    },

  }
};
</script>
