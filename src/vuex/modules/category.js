import Util from '../../util/common'
import * as types from '../types'

const state = {
  tabIndex:0
}

const mutations = {
  [types.CHANGE_TABINDEX] (state,res) {
    state.tabIndex = res
  }
}


export default {
  state,
  mutations
}
