export default function ({ app, redirect, route }) {
  const refaffiliate = route.query.ref;
  const cookieaffiliate = app.$cookies.get("tokenaffiliate");
  if(refaffiliate){
    if(cookieaffiliate){
      app.$cookies.remove("tokenaffiliate");
      app.$cookies.set("tokenaffiliate",refaffiliate,{ maxAge: 60 * 60 * 24 * 7});
    }else{
      app.$cookies.set("tokenaffiliate",refaffiliate,{ maxAge: 60 * 60 * 24 * 7});
    }
  }

}
