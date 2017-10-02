/* Detail + Car*/

//Detail父组件中 当前页面商品的数据

export const SET_DATAS = 'SET_DATAS'

//chose组件选择的颜色
export const CHANGE_COL_SELECTED = 'CHANGE_COL_SELECTED'

//chose组件选择的尺寸

export const CHANGE_SIZE_SELECTED = 'CHANGE_SIZE_SELECTED'

//footer组件中保存添加的商品的数据

export const ADD_PRODUCT = 'ADD_PRODUCT'

//footer组件中保存购物车数量的数据

export const CHANGE_COUNT = 'CHANGE_COUNT'

//提交订单后重新设置购物车商品列表,把打钩并提交的商品去掉,即保留unSelectedList
export const RESET_CARLIST = 'RESET_CARLIST'

//提交订单后重新设置购物车商品数量
export const RESET_COUNT = 'RESET_COUNT'


// 购物车里打钩的商品

export const SET_SELECTEDLIST = 'SET_SELECTEDLIST'

//购物车里没打钩的商品

export const SET_UNSELECTEDLIST = 'SET_UNSELECTEDLIST'



//全局loading状态

export const SET_LOADING = 'SET_LOADING'

// 改变token(权限)
export const CHANGE_TOKEN = 'CHANGE_TOKEN'

// 分类页的aside index
export const CHANGE_TABINDEX = 'CHANGE_TABINDEX'
