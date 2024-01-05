<template>
  <div>
    <div class="left-side-menu" :class="{ 'd-none': this.$store.state.sidebar.sidebarcassino }">

      <div class="h-100" data-simplebar="init"><div class="simplebar-wrapper" style="margin: 0px;">
        <div class="simplebar-height-auto-observer-wrapper">
          <div class="simplebar-height-auto-observer"></div>
        </div>
        <div class="simplebar-mask">
          <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
          <div class="simplebar-content-wrapper" style="height: 100%; overflow: hidden scroll;">
            <div class="simplebar-content" style="padding: 0px;">

        <!-- User box -->


        <!--- Sidemenu -->
        <div id="sidebar-menu">

          <ul id="side-menu">

            <!-- <li class="menu-title">Navigation</li> -->

            <li>
              <NuxtLink :to="{ name:'cassino-promocoes-id', params:{id:promotion.id}  }" class="btn btn-primary btn-block mx-2 fw-bold fs-5">
                Bônus de até R${{promotion.limit}}
              </NuxtLink>
            </li>

            <li class="menu-title mt-2 text-white text-uppercase fw-bold fs-5 pointer" style="pointer-events: auto;">
              <NuxtLink :to="{ name:'cassino' }" class="text-white pointer">
                <span class="text-white"> Cassino </span>
              </NuxtLink>
            </li>

            <li v-for="(item, index) in this.games">
              <NuxtLink :to="{ name:'cassino-game-slug', params:{slug:item.slug}  }">
                <i class="uil uil-dice-five text-success"></i>
                <span class="text-white"> {{ item.name }} </span>
              </NuxtLink>
            </li>



            <li class="menu-title mt-2"></li>

            <!--<li>
              <a href="">
                <i class="uil uil-life-ring text-success"></i>
                <span class="text-white"> Central de ajuda </span>
              </a>
            </li>-->

          </ul>

        </div>
        <!-- End Sidebar -->

        <div class="clearfix"></div>

      </div>
          </div>
          </div>
        </div>
        <div class="simplebar-placeholder" style="width: auto; height: 751px;"></div>
      </div>
        <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
          <div class="simplebar-scrollbar" style="width: 0px; display: none;"></div>
        </div>
        <div class="simplebar-track simplebar-vertical" style="visibility: visible;">
          <div class="simplebar-scrollbar" style="height: 54px; transform: translate3d(0px, 0px, 0px); display: block;"></div>
        </div>
      </div>
      <!-- Sidebar -left -->

    </div>
  </div>
</template>

<script>
export default {

  data(){
    return {
      promotion: {
        id: null,
        name: null,
        code: null,
        thumb: null,
        description: null,
        rollover: null,
        percent: null,
        limit: null
      },
    };
  },
  computed: {
    games () {
      return this.$store.state.games.populargames
    },
    classSidebar () {
      return "d-none"
    },
  },
  mounted() {
    this.$store.dispatch('games/fetchPopularGames')
    this.getPromotion()
  },
  methods: {
    async getPromotion() {
      this.$axios.get("/laravel/api/promotion/")
        .then(res => {
          this.promotion.id = res.data.data.id;
          this.promotion.thumb = res.data.data.thumb;
          this.promotion.name = res.data.data.name;
          this.promotion.code = res.data.data.code;
          this.promotion.description = res.data.data.description;
          this.promotion.rollover = res.data.data.rollover;
          this.promotion.limit = res.data.data.limit;
          this.promotion.percent = res.data.data.percent;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },

};
</script>

<style scoped>

</style>
