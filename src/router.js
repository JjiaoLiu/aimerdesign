import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/goods',
			name: 'Goods',
			component: () => import('./views/Goods.vue'),
		},
		{
			path: '/goods_detail',
			name: 'GoodsDetail',
			component: () => import('./views/GoodsDetail.vue'),
		},
		{
			path: '/submit_order',
			name: 'SubmitOrder',
			component: () => import('./views/SubmitOrder.vue'),
		},
		{
			path: '/address_book',
			name: 'AddressBook',
			component: () => import('./views/AddressBook.vue'),
		},
		{
			path: '/edit_address',
			name: 'EditAddress',
			component: () => import('./views/EditAddress.vue'),
		},
		{
			path: '/order',
			name: 'Order',
			component: () => import('./views/Order.vue'),
		},
		{
			path: '/order_detail',
			name: 'OrderDetail',
			component: () => import('./views/OrderDetail.vue'),
		},
		{
			path: '/order_progress',
			name: 'OrderProgress',
			component: () => import('./views/OrderProgress.vue'),
		},
		{
			path: '/size',
			name: 'Size',
			component: () => import('./views/Size.vue'),
		},
		{
			path: '/make_size',
			name: 'MakeSize',
			component: () => import('./views/MakeSize.vue'),
		},
		{
			path: '/goods_order',
			name: 'GoodsOrder',
			component: () => import('./views/GoodsOrder.vue'),
		},
		{
			path: '/zt_map',
			name: 'ZTmap',
			component: () => import('./views/ZTmap.vue'),
		},
		{
			path: '/test',
			name: 'test',
			component: () => import('./views/test.vue'),
		}
	],
})


