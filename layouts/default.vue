<template>

    <div>
      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper" :class="{'sidebar-enable': this.$store.state.sidebar.sidebarcassino }">
        <FrontHeader />
        <FrontSidebar />

        <div class="content-page-internal d-flex p-0">

          <Nuxt />

          <FrontSidebarright></FrontSidebarright>

        </div>

        <FrontFooter />
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
    await this.$store.dispatch('settings/fetchSettings')
    if(this.$cookies.get('tokenauth')){
      await this.$store.dispatch('bets/fetchBets')
    }

  },
};
</script>
