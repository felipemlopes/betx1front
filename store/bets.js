export const state = () => ({
  bets: [],
  openbets: [],
  matchedbets: [],
})

export const getters = {
  getBets(state) {
    return state.bets
  },
  getOpenbets(state) {
    return state.openbets
  },
  getMatchedbets(state) {
    return state.matchedbets
  }
}


export const mutations = {
  setBets (state, allItems) {
    state.bets = allItems
  },
  setOpenbets (state, allItems) {
    state.openbets = allItems
  },
  setMatchedbets (state, allItems) {
    state.matchedbets = allItems
  }
}

export const actions = {
  async fetchBets({commit}){
    let betsData = [];
    try {
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
    }catch (e){
      console.log("fail", e)
    }
  },
  async fetchOpenbets({commit}){
    let betsData = [];
    try {
      await this.$axios.get("/laravel/api/sportsbook/bets/open").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            game: el.game,
            multiplier: el.multiplier,
            amount: el.amount,
            pending_amount: el.pending_amount,
            win_amount: el.win_amount,
            selection: el.selection,
            meta: el.meta,
            status: el.status,
            status_class: el.status_class,
            date: el.date,
          }
          betsData.push(details);
        });
        commit('setOpenbets', betsData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  },
  async fetchMatchedbets({commit}){
    let betsData = [];
    try {
      await this.$axios.get("/laravel/api/sportsbook/bets/matched").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            game: el.game,
            multiplier: el.multiplier,
            amount: el.amount,
            pending_amount: el.pending_amount,
            win_amount: el.win_amount,
            selection: el.selection,
            meta: el.meta,
            status: el.status,
            status_class: el.status_class,
            date: el.date,
          }
          betsData.push(details);
        });
        commit('setMatchedbets', betsData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  }
}



