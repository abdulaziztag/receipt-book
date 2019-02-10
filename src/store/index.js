import Vue from 'vue'
import Vuex from 'vuex'
import receipts from './receipts'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    receipts, user, shared
  }
})
