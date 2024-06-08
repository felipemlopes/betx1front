export const state = () => ({
  sports: [],
  countries: [],
  countriesmenu: [],
})

export const getters = {
  getSports(state) {
    return state.sports
  },
  getCountries(state) {
    return state.countries
  },
  getCountriesmenu(state) {
    return state.countriesmenu
  },
}


export const mutations = {
  setSports (state, allItems) {
    state.sports = allItems
  },
  setCountries (state, allItems) {
    state.countries = allItems
  },
  setCountriesmenu (state, allItems) {
    state.countriesmenu = allItems
  },
}

export const actions = {
  async fetchSports({commit}){
    let sportsData = [];
    try {
      await this.$axios.get("/laravel/api/sportsbook/sports").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            name: el.name,
            name_display: el.name_display,
            icon: el.icon,
            slug: el.slug,
            reference: el.reference,
            meta: el.meta,
            status: el.status,
          }
          sportsData.push(details);
        });
        commit('setSports', sportsData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  },
  async fetchCountries({commit}){
    let countriesData = [];
    try {
      await this.$axios.get("/laravel/api/sportsbook/countries").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            name: el.name,
            slug: el.slug,
            flag: el.flag,
            meta: el.meta,
            status: el.status,
          }
          countriesData.push(details);
        });
        commit('setCountries', countriesData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  },
  async fetchCountriesmenu({commit}){
    let countriesData = [];
    try {
      await this.$axios.get("/laravel/api/sportsbook/countries/soccer/menu").then( response => {
        response.data.data.forEach( el => {
          let details = {
            id: el.id,
            name: el.name,
            slug: el.slug,
            flag: el.flag,
            meta: el.meta,
            status: el.status,
          }
          countriesData.push(details);
        });
        commit('setCountriesmenu', countriesData)
      }).catch( e => console.log(e) );
    }catch (e){
      console.log("fail", e)
    }
  },
}



