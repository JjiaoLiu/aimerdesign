/**
 签名规则
 签名只针对业务参数
 签名规则：
 1、 将所有的参数根据参数名按照字典顺序升序排序
 2、 将排序完成以后的参数列表进行拼接（中间不加任何的字符）
 3、 在拼接完成的字符串前后追加签名密钥  Ijfs(fjweliJLJIJjfe)834u2KJKfejkjF
 4、 进行md5的加密
 5、 转换为大写
 **/
import md5 from 'md5';

const key = "Dfafjoliuwej09235402752079fdafD";

export const getSign = (obj) => {
	let keysStr = '', sign = "";
	for (var i in obj) { //1
		keysStr = keysStr + i + obj[i]; //2
	}
	sign = key + keysStr + key; //3
	// console.log("sign", sign)
	sign = md5(sign).toUpperCase(); //4，5
	return sign
}


/**
 * 判断数组
 **/
export const isArray = (o) => {
	return Array.isArray(o)
}

/**
 * 判断手机号
 **/
export const checkMobile = (o) => {
	if ((/^1(3|4|5|6|7|8|9)\d{9}$/.test(o))) {
		return true;
	}
	return false
}

/**
 * 匹配自定义文字
 **/
export const markTxt = (string, color) => {
	if (!string || !color) {
		return ''
	}
	let c = color.substr(1);
	let arr = string.split('');
	let img = '';
	arr.forEach((f) => {
		img = img + `<img src=/img/${c}/${f.toUpperCase()}.png style="height: 100%" />`
	});
	return img
};

// 封装Message
import {Message} from 'element-ui'

let toastShow = true;
export const toast = (message, type = 'warning', delay = 1500) => {
	if (!toastShow) {
		return
	}
	toastShow = false;
	let msg = Message({
		type: type,
		message: message,
		duration: 0
	});
	setTimeout(() => {
		msg.close();
		toastShow = true;
		alert(toastShow)
	}, delay)
};
