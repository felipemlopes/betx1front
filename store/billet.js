export const state = () => ({
  items: [],
})

export const getters = {
  getItems(state) {
    return state.items
  }
}

export const mutations = {
  addItem (state, payload) {
    if(state.items.filter(element => element.id.toString() === payload.id.toString()).length===0){
      state.items.push(payload);
    }else if(state.items.filter(element => element.id.toString() === payload.id.toString()).length===1){
      const item = state.items.filter(element => element.id.toString() === payload.id.toString())[0];
      let index = Object.keys(state.items).find(key => state.items[key] === item)
      state.items[index] = payload
    }
  },
  updateAmount (state, payload) {
    let id = payload.id
    let amount = payload.amount
    const item = state.items.filter(element => element.id.toString() === id.toString())[0];
    let index = Object.keys(state.items).find(key => state.items[key] === item)
    item.amount=amount
    state.items[index] = item
  },
  removeItem (state, id) {
    const item = state.items.filter(element => element.id.toString() === id.toString())[0];
    let index = Object.keys(state.items).find(key => state.items[key] === item)
    state.items.splice(index, 1);
  },
  clearBillet (state) {
    state.items = []
  },

}


