<template>

    <div v-if="$store.state.settings.modemaintenance==='2'">
      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper" :class="{'sidebar-enable': this.$store.state.sidebar.sidebarcassino }">
        <FrontHeader />
        <FrontSidebar />

        <div class="content-page-internal">

          <Nuxt />

        </div>

        <FrontFooter />
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

export default {
  data() {
    return {
      showHideSpinner: true
    }
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },
  async mounted() {
    this.showHideSpinner = false;
    await this.$store.dispatch('sports/fetchSports')
    await this.$store.dispatch('sidebar/fetchDevice')
    await this.$store.dispatch('user/fetchBalance')
    await this.$store.dispatch('banners/fetchBanners')
  },
};
</script>
