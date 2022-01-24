import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters,
  mutations: {
    //mutation中尽可能完成单一的事件, 所以有判断类似的复杂操作最好放在actions里
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions

})
export default store