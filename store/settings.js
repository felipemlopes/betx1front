export const state = () => ({
  oddDefault: '',
  settings: [],
  modemaintenance:"2",
  telegram:""
})

export const getters = {
  getOddDefault(state) {
    return state.oddDefault
  },
  getSettings(state) {
    return state.settings
  },
  getModemaintenance(state) {
    return state.modemaintenance
  },
  getTelegram(state) {
    return state.telegram
  }
}


export const mutations = {
  setOddDefault (state, item) {
    state.oddDefault = item
  },
  setSettings (state, allItems) {
    state.settings = allItems
  },
  setModemaintenance (state, allItems) {
    state.modemaintenance = allItems
  },
  setTelegram (state, allItems) {
    state.telegram = allItems
  }
}

export const actions = {
  async fetchSettings({commit}){
    let settingsData = '';
    let oddData = '';
    let modemaintenance = '';
    let telegram = '';
    try {
      await this.$axios.get("/laravel/api/settings").then( response => {
        //console.log(response.data.data)
        /*let details = {
          deposit_min_amount: response.data.data.deposit_min_amount,
          withdraw_min_amount: response.data.data.withdraw_min_amount,
          withdraw_auto_max_amount: response.data.data.withdraw_auto_max_amount,
          odds_format: response.data.data.odds_format,
          comission_default: response.data.data.comission_default,
          odd_default: response.data.data.odd_default,
        }
        settingsData.push(details);*/
        oddData = response.data.data.odd_default
        modemaintenance = response.data.data.modemaintenance
        telegram = response.data.data.telegram

        commit('setOddDefault',oddData)
        commit('setModemaintenance',modemaintenance)
        commit('setTelegram',telegram)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
    //console.log(settingsData)
    //console.log(state)
  },
}



