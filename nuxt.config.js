export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/w3.css' },
      { rel: 'stylesheet', href: '/css/style.css' },
    ],
    script: [
      // { src: "/js/bundle.min.js", type: "text/javascript"}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/mixins/user.js',
    './plugins/axios.js',
    './plugins/mixins/validation.js',
    {src: './plugins/vue-observe-visibility', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  axios: {
    credentials: true,
    baseURL: 'https://sayeeds.herokuapp.com/api'
  },
  auth: {
    /*strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: 'http://nuxt.test',
        endpoints: {
          login: { url: '/api/login', method: 'post'},
          user: { url: '/api/user', method: 'get'},
        }
      },
    }*/
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          type: 'Bearer',
          maxAge: 2592000, //30 days
        },
        user: {
          property: '',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post'},
          register: { url: '/register', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get'}
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
