<template>

    <div>

      <div class="" id="wrapper">
        <FrontCassinoHeader />
        <FrontCassinoSidebar />

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
  mounted() {
    this.$store.dispatch('games/fetchGames')
    this.$store.dispatch('sidebar/fetchDevice')
    this.$store.dispatch('user/fetchBalance')
  },
};
</script>
