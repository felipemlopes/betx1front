<template>

    <div>
      <LoadSpinner v-if="showHideSpinner" />
      <div class="" id="wrapper">
        <FrontCassinoHeader />
        <FrontCassinoSidebar />

        <div class="content-page-internal">

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
    await this.$store.dispatch('games/fetchGames')
    await this.$store.dispatch('sidebar/fetchDevice')
    await this.$store.dispatch('user/fetchBalance')
  },
};
</script>
