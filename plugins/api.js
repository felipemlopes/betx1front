export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  })
  // Set baseURL to something different
  api.setBaseURL('/laravel')

  api.interceptors.request.use(
    (config) => {
      //const token = app.$cookies.get("tokenauth");

      console.log("aqui: "+token)
      //console.log(api.getHeaders())
      //if(typeof token !== 'undefined' && token){
      //api.setHeader("Authorization","Bearer "+token);
      //config.headers.Authorization = 'Bearer ' + $auth.strategy.token.get();
      //}

      //config.headers.Authorization = 'Bearer ' + jwtToken.getToken();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log('ERROR Making request to ' + JSON.stringify(error.config.url));
    if (code === 400) {
      redirect('/400')
    }else if(code === 401){
      //$auth.logout()
      redirect('/login')
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, error => {
    //let errorResponseData = error.response.data;
  })

  // Inject to context as $api
  inject('api', api)
}
