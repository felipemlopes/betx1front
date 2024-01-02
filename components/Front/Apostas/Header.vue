<template>
  <div>

    <div class="navbar-custom">
      <div class="container-fluid">
        <ul class="list-unstyled topnav-menu float-end mb-0">

          <li class="dropdown notification-list px-2 py-2">
            <NuxtLink :to="{ name:'cadastro'  }" class="nav-link right-bar-toggle fw-bold fs-5">
              Registre-se
            </NuxtLink>
          </li>

          <li class="dropdown notification-list px-2 py-2">
            <NuxtLink :to="{ name:'login'  }" class="nav-link right-bar-toggle btn btn-primary text-uppercase fw-bold fs-5 ">
              Entrar
            </NuxtLink>
          </li>

        </ul>

        <!-- LOGO -->
        <div class="logo-box">

          <ul class="list-unstyled list-inline">
            <li class="list-inline-item py-3">
              <NuxtLink :to="{ name:'cassino'  }" class="text-white " style="font-size: 18px;">
                <fa-icon :icon="faDice" class="pr-5" />
                Cassino
              </NuxtLink>
            </li>
            <li class="list-inline-item py-2 category-active">
              <NuxtLink :to="{ name:'apostas' }" class="text-white" style="font-size: 18px;">
                <fa-icon :icon="faFutbol" class="pr-5" />
                Esportes
              </NuxtLink>
            </li>
          </ul>

        </div>

        <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
          <li>
            <button class="button-menu-mobile">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </li>

          <li>
            <!-- Mobile menu toggle (Horizontal Layout)-->
            <a class="navbar-toggle nav-link" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
              <div class="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
            <!-- End mobile menu toggle-->
          </li>



        </ul>
        <div class="clearfix"></div>
      </div>
    </div>

  </div>
</template>

<script>

import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { faDice } from '@fortawesome/free-solid-svg-icons'
export default {
  data() {
    return {

    };
  },
  computed: {
    isLogged(){
      //return this.$store.state.auth.loggedIn
    },

    faFutbol () {
      return faFutbol
    },
    faDice () {
      return faDice
    },
  },
  mounted() {


  },
  methods: {
    async dologout(){
       //await this.$auth.logout()
    },
    toggleSidebar() {
      //this.$store.commit('sidebar/toggleSidebar')
    },

  },

};
</script>

<style scoped>
  .category-active{
    border-bottom: 3px solid #ffee59
  }
</style>
