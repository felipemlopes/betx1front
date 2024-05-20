export const state = () => ({
  games: [],
  populargames: [],
})

export const getters = {
  getGames(state) {
    return state.games
  },
  getPopularGames(state) {
    return state.populargames
  }
}


export const mutations = {
  setGames (state, allItems) {
    state.games = allItems
  },
  setPopularGames (state, allItems) {
    state.populargames = allItems
  },
}

export const actions = {
  async fetchGames({commit}){
    let gamesData = [];
    try {
      await this.$axios.get("/laravel/api/cassino/games").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            name: el.name,
            slug: el.slug,
            image: el.image,
            external_id: el.external_id,
          }
          gamesData.push(details);
        });
        commit('setGames', gamesData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  },

  fetchPopularGames({commit}){
    let gamesData = [];
    try {
      this.$axios.get("/laravel/api/cassino/popular-games").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            name: el.name,
            slug: el.slug,
            image: el.image,
            external_id: el.external_id,
          }
          gamesData.push(details);
        });
        commit('setPopularGames', gamesData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  }
}



