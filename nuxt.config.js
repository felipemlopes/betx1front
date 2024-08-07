export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Vemx1bet',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vemx1bet - Apostas Esportivas Online e Cassino' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-16x16.png' }
    ],
    bodyAttrs: {
      "data-sidebar-color":"dark"
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/api',
    "@/plugins/mask",
    { src: "@/plugins/vClickOutside", ssr: false },
    { src: "@/plugins/vuehorizontal", ssr: false },
    { src: "@/plugins/select2", ssr: false },
    { src: "@/plugins/ably.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/laravel-echo'
  ],

  /*echo: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'socket.vemx1bet.com',
    wsPort: 80,
    wssPort: 443,
    forceTLS: true,
    cluster: 'mt1',
    enabledTransports: ['ws', 'wss'],
    plugins: [ '~/plugins/echo.js' ]
  },*/

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    //'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    'nuxt-sweetalert2',
    'nuxt-mobile',
    'nuxt-vue-multiselect',
    ['@nuxtjs/bootstrap-vue', { css: false }]
  ],


  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  fontawesome: {
    component: 'FaIcon',
    suffix: false,
    icons: {
      solid: true,
      brands: true
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/laravel',
    //baseURL: "http://cassino.fmlsoftware.com.br",
    credentials: true,
    proxy: true
  },

  proxy: {
    '/laravel': {
      target: process.env.API_URL,
      pathRewrite: { '^/laravel': '' },
      changeOrigin: true
    }
  },

  /*auth: {
    plugins: [ '~/plugins/auth.js' ],
    // Options
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: '/laravel',
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'get' },
          user: { url: '/api/user', method: 'get' }
        }
      },
    }
  },*/

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router:{
    middleware: ["affiliate"]
  }
}
