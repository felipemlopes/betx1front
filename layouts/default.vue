<template>
    <div>

      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper">
        <FrontHeader />
        <!--<FrontCassinoSidebar />-->

        <div class="content-page" style="margin-left: 0px !important;">

          <Nuxt />

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
    await this.$store.dispatch('user/fetchBalance')
    await this.$store.dispatch('banners/fetchBanners')
  },

};
</script>
<style scoped>

</style>
