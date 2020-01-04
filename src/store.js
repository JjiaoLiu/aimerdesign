import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		is_login: false,
		activeDesign: {},
		activeSize: {},
		checkout: {checkout_address: {}},
		myDesign_id: '',
		goods_id: "",
		activebuyNumber: 1
	},
	mutations: {
		setIsLogin(state, payload) {
			state.is_login = payload.is_login
		},
		setActiveDesignStore(state, payload) {
			state.activeDesign = Object.assign({}, payload.activeDesign)
		},
		setActiveSizeStore(state, payload) {
			state.activeSize = Object.assign({}, payload.activeSize);
			console.log('activeSize.recommend_info', state.activeSize.recommend_info)
		},
		setActivebuyNumber(state, payload) {
			state.activebuyNumber = payload.activebuyNumber
		},
		setAddressStore(state, payload) {
			state.checkout = Object.assign({}, state.checkout, {checkout_address: payload.checkout_address})
		},
		setCheckoutStore(state, payload) {
			state.checkout = Object.assign({}, state.checkout, payload.checkout);
		},
		setmyDesign_idStore(state, payload) {
			state.myDesign_id = payload.myDesign_id;
		},
		setGoodsIdStore(state, payload) {
			state.goods_id = payload.goods_id;
		},
	},
	actions: {}
})
