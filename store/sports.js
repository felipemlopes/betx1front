export const state = () => ({
  sports: [],
})

export const getters = {
  getSports(state) {
    return state.sports
  },
}


export const mutations = {
  setSports (state, allItems) {
    state.sports = allItems
  },
}

export const actions = {
  async fetchSports({commit}){
    let sportsData = [];
    await this.$axios.get("/laravel/api/sportsbook/sports").then( response => {
      response.data.data.forEach( el => {
        let details = {
          id: el.id,
          name: el.name,
          slug: el.slug,
          reference: el.reference,
          status: el.status,
        }
        sportsData.push(details);
      });
      commit('setSports', sportsData)
    }).catch( e => console.log(e) );
  },
}



