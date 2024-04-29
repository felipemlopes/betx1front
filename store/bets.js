export const state = () => ({
  bets: [],
})

export const getters = {
  getBets(state) {
    return state.bets
  }
}


export const mutations = {
  setBets (state, allItems) {
    state.bets = allItems
  }
}

export const actions = {
  async fetchBets({commit}){
    let betsData = [];
    await this.$axios.get("/laravel/api/account/bets/recent").then( response => {
      response.data.data.forEach( el => {
        let details = {
          id: el.id,
          game: el.game,
          option_selected: el.option_selected,
          multiplier: el.multiplier,
          amount: el.amount,
          pending_amount: el.pending_amount,
          win_amount: el.win_amount,
          meta: el.meta,
          status: el.status,
          status_class: el.status_class,
          date: el.date,
        }
        betsData.push(details);
      });
      commit('setBets', betsData)
    }).catch( e => console.log(e) );
  }
}



