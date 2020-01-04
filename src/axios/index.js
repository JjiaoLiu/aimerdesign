import axios from "axios";
import {toast} from './../utils/toast'

const Axios = axios.create({
	timeout: 200000,
	responseType: "json",
	headers: {
		"Content-Type": "application/json; charset=UTF-8"
	},
	withCredentials: true,
});

// Axios.interceptors.request.use(config => {
// 	return config;
// }, error => {
// 	return Promise.reject(error);
// });
//
Axios.interceptors.response.use(response => {
	if (response.data.status === 'ok' && response.data.code === '0') {
		if (response.data.data.login_flag === false) {
			// alert('login_flag === false');
			window.location.href = process.env.VUE_APP_LOGIN + "/passport/login?redirect_to=" + encodeURIComponent(window.location.href);
			return Promise.reject(response);
		}
		return response
	}
	if (response.data.code === 101) {
		// alert('未登录');
		window.location.href = process.env.VUE_APP_LOGIN + "/passport/login?redirect_to=" + encodeURIComponent(window.location.href);
		return Promise.reject(response);
	} else {
		toast(response.data.data, 'error');
		return Promise.reject(response);
	}
}, error => {
	return Promise.reject(error);
});

export default {
	install: function (Vue) {
		Object.defineProperty(Vue.prototype, "$axios", {value: Axios});
	}
};
