<template>

    <div>
      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper" :class="{'sidebar-enable': this.$store.state.sidebar.sidebarcassino }">
        <FrontApostasHeader />
        <FrontApostasSidebar />

        <div class="content-page">

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
    await this.$store.dispatch('banners/fetchBanners')
  },
};
</script>
