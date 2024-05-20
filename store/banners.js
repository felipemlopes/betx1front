export const state = () => ({
  banners: [],
})

export const getters = {
  getBanners(state) {
    return state.banners
  }
}


export const mutations = {
  setBanners (state, allItems) {
    state.banners = allItems
  }
}

export const actions = {
  async fetchBanners({commit}){
    let bannersData = [];
    try {
      await this.$axios.get("/laravel/api/banners").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            name: el.name,
            url: el.url,
            image: el.image,
          }
          bannersData.push(details);
        });
        commit('setBanners', bannersData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  },

}



