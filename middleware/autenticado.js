export default function ({ app, redirect }) {
  //const token = localStorage.getItem('_token')
  const token = app.$cookies.get("tokenauth");

  if (!token) {
    return redirect('/login')
  }
}
