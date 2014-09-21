var EventUtil = {

	// 添加事件
	addEvent: function(ele, type, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(type, handler, false);
		} else if (ele.attachEvent) {
			ele.attachEvent('on' + type, handler);
		} else {
			ele['on' + type] = handler;
		}
	},

	// 删除事件
	removeEvent: function(ele, type, handler) {
		if (ele.removeEventListener) {
			ele.removeEventListener(type, handler, false);
		} else if (ele.detachEvent) {
			ele.detachEvent('on' + type, handler);
		} else {
			ele['on' + type] = null;
		}
	},

	// 获取事件对象
	getEvent: function(event) {
		return event || window.event;
	},

	// 获取事件类型
	getType: function(event) {
		return event.type;
	},

	// 获取事件目标
	getElement: function(event) {
		return event.target || event.srcElement;
	},

	// 阻止事件冒泡
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelable = true;
		}
	},

	// 阻止事件的默认行为
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}

};