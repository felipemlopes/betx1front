<template>
  <div>
    <div class="left-side-menu" :class="{ active: isOpenMobile }">

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

            <li class="list-inline-item">
              <NuxtLink to="/" class="text-white">
                <svg data-cy="ic-home" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: inherit; width: auto; height: 32px;">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.669 8.94762C16.2887 8.60535 15.7113 8.60535 15.331 8.94762L7.33104 16.1476C7.12032 16.3373 7 16.6074 7 16.8909V23.0002C7 23.5525 7.44772 24.0002 8 24.0002H11.2727C11.825 24.0002 12.2727 23.5525 12.2727 23.0002V21.6002C12.2727 19.9433 13.6159 18.6002 15.2727 18.6002H16.7273C18.3841 18.6002 19.7273 19.9433 19.7273 21.6002V23.0002C19.7273 23.5525 20.175 24.0002 20.7273 24.0002H24C24.5523 24.0002 25 23.5525 25 23.0002V16.8909C25 16.6074 24.8797 16.3373 24.669 16.1476L16.669 8.94762ZM13.9931 7.46104C15.134 6.43421 16.866 6.43421 18.0069 7.46104L26.0069 14.661C26.639 15.23 27 16.0405 27 16.8909V23.0002C27 24.657 25.6569 26.0002 24 26.0002H20.7273C19.0704 26.0002 17.7273 24.657 17.7273 23.0002V21.6002C17.7273 21.0479 17.2796 20.6002 16.7273 20.6002H15.2727C14.7204 20.6002 14.2727 21.0479 14.2727 21.6002V23.0002C14.2727 24.657 12.9296 26.0002 11.2727 26.0002H8C6.34315 26.0002 5 24.657 5 23.0002V16.8909C5 16.0405 5.36096 15.23 5.99311 14.661L13.9931 7.46104Z"></path>
                </svg>
                <span class="text-white-50"> Home </span>
              </NuxtLink>
            </li>

            <li class="list-inline-item">
              <NuxtLink :to="{ name:'cassino'}" class="text-white">
                <svg class="bt248" width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: rgb(255, 255, 255); width: 28px; height: 28px;">
                  <path d="M144.6 24.88C137.5 14.24 145.1 0 157.9 0H354.1C366.9 0 374.5 14.24 367.4 24.88L320 96H192L144.6 24.88zM332.1 136.4C389.7 172.7 512 250.9 512 416C512 469 469 512 416 512H96C42.98 512 0 469 0 416C0 250.9 122.3 172.7 179 136.4C183.9 133.3 188.2 130.5 192 128H320C323.8 130.5 328.1 133.3 332.1 136.4V136.4zM235.9 224V230C230.3 231.2 224.1 232.9 220 235.1C205.1 241.9 192.1 254.5 188.9 272.8C187.1 283 188.1 292.9 192.3 301.8C196.5 310.6 203 316.8 209.6 321.3C221.2 329.2 236.5 333.8 248.2 337.3L250.4 337.9C264.4 342.2 273.8 345.3 279.7 349.6C282.2 351.4 283.1 352.8 283.4 353.7C283.8 354.5 284.4 356.3 283.7 360.3C283.1 363.8 281.2 366.8 275.7 369.1C269.6 371.7 259.7 373 246.9 371C240.9 370 230.2 366.4 220.7 363.2C218.5 362.4 216.3 361.7 214.3 361C203.8 357.5 192.5 363.2 189 373.7C185.5 384.2 191.2 395.5 201.7 398.1C202.9 399.4 204.4 399.9 206.1 400.5C213.1 403.2 226.4 407.4 235.9 409.6V416C235.9 427.1 244.9 436.1 255.1 436.1C267.1 436.1 276.1 427.1 276.1 416V410.5C281.4 409.5 286.6 407.1 291.4 405.9C307.2 399.2 319.8 386.2 323.1 367.2C324.9 356.8 324.1 346.8 320.1 337.7C316.2 328.7 309.9 322.1 303.2 317.3C291.1 308.4 274.9 303.6 262.8 299.9L261.1 299.7C247.8 295.4 238.2 292.4 232.1 288.2C229.5 286.4 228.7 285.2 228.5 284.7C228.3 284.3 227.7 283.1 228.3 279.7C228.7 277.7 230.2 274.4 236.5 271.6C242.1 268.7 252.9 267.1 265.1 268.1C269.5 269.7 283 272.3 286.9 273.3C297.5 276.2 308.5 269.8 311.3 259.1C314.2 248.5 307.8 237.5 297.1 234.7C292.7 233.5 282.7 231.5 276.1 230.3V224C276.1 212.9 267.1 203.9 255.1 203.9C244.9 203.9 235.9 212.9 235.9 224L235.9 224z"></path>
                </svg>
                <span class="text-white-50"> Cassino </span>
              </NuxtLink>
            </li>

            <!-- <li class="menu-title">Navigation</li> -->
            <!--<li class="list-inline-item w-100" v-for="(item,index) in this.$store.state.sports.sports">
              <NuxtLink :to="{ name:'esportes-slug', params:{slug:item.slug}}" class="text-white">
                <svg v-html="item.icon" class="bt248" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px;">
                </svg>
                <span class="text-white-50"> {{ item.name_display }} </span>
              </NuxtLink>
            </li>-->


            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'brazil'}}" class="text-white">
                <img src="/flags/br.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> Brasil </span>
              </NuxtLink>
            </li>
            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'england'}}" class="text-white">
                <img src="/flags/gb.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> Inglaterra </span>
              </NuxtLink>
            </li>
            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'spain'}}" class="text-white">
                <img src="/flags/es.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> Espanha </span>
              </NuxtLink>
            </li>
            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'france'}}" class="text-white">
                <img src="/flags/fr.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> França </span>
              </NuxtLink>
            </li>
            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'germany'}}" class="text-white">
                <img src="/flags/de.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> Alemanha </span>
              </NuxtLink>
            </li>
            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'italy'}}" class="text-white">
                <img src="/flags/it.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> Itália </span>
              </NuxtLink>
            </li>

            <li class="list-inline-item w-100">
              <NuxtLink :to="{ name:'esportes-slug-paises-slugpais', params:{slug:'soccer',slugpais:'italy'}}" class="text-white">
                <img src="/flags/it.svg" class="bt248 mr-2" width="32" height="32" style="fill: currentcolor; color: rgb(255, 255, 255); width: 32px; height: 32px; margin-right: 10px;border-radius: 50%;">
                <span class=" text-white-50"> Internacional </span>
              </NuxtLink>
            </li>

            <li class="menu-title"></li>

            <li class="list-inline-item">
              <a class="text-white" v-on:click="openAffiliate">
                <svg class="bt248" width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: rgb(255, 255, 255); width: 28px; height: 28px;">
                  <path d="M144.6 24.88C137.5 14.24 145.1 0 157.9 0H354.1C366.9 0 374.5 14.24 367.4 24.88L320 96H192L144.6 24.88zM332.1 136.4C389.7 172.7 512 250.9 512 416C512 469 469 512 416 512H96C42.98 512 0 469 0 416C0 250.9 122.3 172.7 179 136.4C183.9 133.3 188.2 130.5 192 128H320C323.8 130.5 328.1 133.3 332.1 136.4V136.4zM235.9 224V230C230.3 231.2 224.1 232.9 220 235.1C205.1 241.9 192.1 254.5 188.9 272.8C187.1 283 188.1 292.9 192.3 301.8C196.5 310.6 203 316.8 209.6 321.3C221.2 329.2 236.5 333.8 248.2 337.3L250.4 337.9C264.4 342.2 273.8 345.3 279.7 349.6C282.2 351.4 283.1 352.8 283.4 353.7C283.8 354.5 284.4 356.3 283.7 360.3C283.1 363.8 281.2 366.8 275.7 369.1C269.6 371.7 259.7 373 246.9 371C240.9 370 230.2 366.4 220.7 363.2C218.5 362.4 216.3 361.7 214.3 361C203.8 357.5 192.5 363.2 189 373.7C185.5 384.2 191.2 395.5 201.7 398.1C202.9 399.4 204.4 399.9 206.1 400.5C213.1 403.2 226.4 407.4 235.9 409.6V416C235.9 427.1 244.9 436.1 255.1 436.1C267.1 436.1 276.1 427.1 276.1 416V410.5C281.4 409.5 286.6 407.1 291.4 405.9C307.2 399.2 319.8 386.2 323.1 367.2C324.9 356.8 324.1 346.8 320.1 337.7C316.2 328.7 309.9 322.1 303.2 317.3C291.1 308.4 274.9 303.6 262.8 299.9L261.1 299.7C247.8 295.4 238.2 292.4 232.1 288.2C229.5 286.4 228.7 285.2 228.5 284.7C228.3 284.3 227.7 283.1 228.3 279.7C228.7 277.7 230.2 274.4 236.5 271.6C242.1 268.7 252.9 267.1 265.1 268.1C269.5 269.7 283 272.3 286.9 273.3C297.5 276.2 308.5 269.8 311.3 259.1C314.2 248.5 307.8 237.5 297.1 234.7C292.7 233.5 282.7 231.5 276.1 230.3V224C276.1 212.9 267.1 203.9 255.1 203.9C244.9 203.9 235.9 212.9 235.9 224L235.9 224z"></path>
                </svg>
                <span class="text-white-50"> Indique um amigo </span>
              </a>
            </li>

            <li class="menu-title"></li>

            <li class="list-inline-item">
              <NuxtLink to="/" class="text-white">
                <svg width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor; color: rgb(255, 255, 255); width: 28px; height: 28px;">
                  <path d="M342.5 214.7C342.6 214.6 342.4 214.8 342.5 214.7l128.1-128.1c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0L297.3 169.5c-.0742 .0742 .0742-.0762 0 0C317.1 178.1 333 194.9 342.5 214.7zM169.5 297.3C169.4 297.4 169.6 297.2 169.5 297.3l-128.1 128.1c-12.5 12.5-12.5 32.75 0 45.25C47.63 476.9 55.81 480 64 480s16.38-3.125 22.62-9.375l128.1-128.1c.0742-.0742-.0742 .0762 0 0C194.9 333 178.1 317.1 169.5 297.3zM342.5 297.3C342.4 297.2 342.6 297.4 342.5 297.3c-9.463 19.78-25.43 35.74-45.21 45.21c.0742 .0762-.0742-.0742 0 0l128.1 128.1C431.6 476.9 439.8 480 448 480s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L342.5 297.3zM86.63 41.38c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L169.5 214.7c.0742 .0742-.0762-.0742 0 0c9.463-19.78 25.43-35.74 45.21-45.21c-.0742-.0762 .0742 .0742 0 0L86.63 41.38z" fill="currentColor"></path><path d="M214.7 169.5C227.2 163.5 241.2 160 256 160s28.76 3.51 41.29 9.502c.0742-.0762-.0742 .0742 0 0l115.5-115.6C369.5 20.26 315.2 0 256 0S142.5 20.26 99.2 53.95L214.7 169.5C214.8 169.6 214.6 169.4 214.7 169.5zM169.5 297.3C163.5 284.8 160 270.8 160 256s3.51-28.76 9.502-41.29c-.0762-.0742 .0742 .0742 0 0L53.95 99.2C20.26 142.5 0 196.8 0 256s20.26 113.5 53.95 156.8L169.5 297.3C169.6 297.2 169.4 297.4 169.5 297.3zM458.1 99.2l-115.6 115.5c-.0742 .0742 .0762-.0742 0 0C348.5 227.2 352 241.2 352 256s-3.51 28.76-9.502 41.29c.0762 .0742-.0742-.0742 0 0l115.6 115.5C491.7 369.5 512 315.2 512 256S491.7 142.5 458.1 99.2zM297.3 342.5C284.8 348.5 270.8 352 256 352s-28.76-3.51-41.29-9.502c-.0742 .0762 .0742-.0742 0 0l-115.5 115.6C142.5 491.7 196.8 512 256 512s113.5-20.26 156.8-53.95L297.3 342.5C297.2 342.4 297.4 342.6 297.3 342.5z"></path>
                </svg>
                <span class="text-white-50"> Ajuda </span>
              </NuxtLink>
            </li>

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
      opensidebarmobile: false,
      countriesmenu: [],
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
    classSidebar () {
      return "d-none"
    },
    isOpenMobile() {
      console.log(this.opensidebarmobile)
      if(this.opensidebarmobile){
        return "active"
      }
      return ""
    },
  },
  created() {
    this.$nuxt.$on('togglemenu', () => {
      //console.log('teste togglemenu')
      //console.log(this.opensidebarmobile)
      this.opensidebarmobile = !this.opensidebarmobile
      //console.log(this.opensidebarmobile)
    })
  },
  async mounted() {

  },
  methods: {
    openAffiliate() {
      console.log('clicou')
      this.$nuxt.$emit('openAffiliateModal')
    }
  },

};
</script>

<style scoped>

</style>
