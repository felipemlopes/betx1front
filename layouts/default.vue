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
  mounted() {
    this.$cookies.modal = true
    this.showHideSpinner = false;
    this.$store.dispatch('user/fetchBalance')
  },

};
</script>
<style scoped>

</style>
