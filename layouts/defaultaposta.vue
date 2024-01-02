<template>

    <div>

      <div class="" id="wrapper">
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
  mounted() {

  },
};
</script>
