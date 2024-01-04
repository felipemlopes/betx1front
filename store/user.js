export const state = () => ({
  totalbalance: 0,
  balance: 0,
  bonus: 0,
})

export const getters = {
  getTotalbalance(state) {
    return state.totalbalance
  },
  getBalance(state) {
    return state.balance
  },
  getBonus(state) {
    return state.bonus
  }
}


export const mutations = {
  setTotalbalance (state, item) {
    state.totalbalance = item
  },
  setBalance (state, item) {
    state.balance = item
  },
  setBonus (state, item) {
    state.bonus = item
  },
}

export const actions = {
  fetchBalance({commit}){
    if(this.$cookies.get("tokenauth")){
      this.$axios.get("/laravel/api/user/balance").then( response => {
        commit('setTotalbalance', response.data.data.total)
        commit('setBalance', response.data.data.saldo)
        commit('setBonus', response.data.data.bonus)
      }).catch( e => console.log(e) );
    }
  },


}



