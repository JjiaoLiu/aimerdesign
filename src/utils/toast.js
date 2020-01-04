import {Message} from "element-ui";

let can = true;
export const toast = (message, type = 'warning', delay = 3000) => {
	if (!can) {
		return false
	}
	can = false;
	let msg = Message({
		type: type,
		message: message,
		duration: 0
	});
	setTimeout(() => {
		msg.close();
		can = true;
	}, delay)
};
