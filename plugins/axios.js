
export default function ({ $axios, redirect, $store, app }) {

  //console.log(app.$cookies.get('tokenauth'))
  $axios.onRequest(config => {
    const tokenbearer = app.$cookies.get('tokenauth');
    config.headers.Accept = "application/json";
    if(tokenbearer){
      config.headers.Authorization = 'Bearer ' + tokenbearer;
    }

    console.log('Making request to ' + config.url);
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log('ERROR Making request to ' + JSON.stringify(error.config.url));
    if (code === 400) {
      redirect('/400')
    }else if(code === 422){
    }else if(code === 409){
      redirect('/email/verificar')
    }else if(code === 401){
      app.$cookies.remove('tokenauth')
      redirect('/login')
    }
  })
}
