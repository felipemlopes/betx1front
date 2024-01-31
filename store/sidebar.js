export const state = () => ({
  sidebarcassino: false,
  sidebaraposta: false,
})

export const getters = {
  getSidebarcassino(state) {
    return state.sidebarcassino
  },
  getSidebaraposta(state) {
    return state.sidebaraposta
  }
}

export const mutations = {
  setSidebarcassino (state,item) {
    state.games = item
  },
  setSidebaraposta (state,item) {
    state.sidebaraposta = item
  },
  toggleSidebarcassino (state) {
    state.sidebarcassino = !state.sidebarcassino
  },
  toggleSidebaraposta (state) {
    state.sidebaraposta = !state.sidebaraposta
  },
}

export const actions = {
  async fetchDevice({commit}){
    let mobile = await this.$mobileDetect.phone()
    console.log(mobile)
    if(mobile===null){
      commit('setSidebarcassino', false)
      commit('setSidebaraposta', false)
    }else{
      commit('setSidebarcassino', true)
      commit('setSidebaraposta', true)
    }
  }
}
