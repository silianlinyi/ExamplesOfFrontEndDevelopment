function addEvent(ele, type, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(type, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + type, handler);
	} else {
		ele['on' + type] = handler;
	}
}

function removeEvent(ele, type, handler) {
	if (ele.removeEventListener) {
		ele.removeEventListener(type, handler, false);
	} else if (ele.detachEvent) {
		ele.detachEvent('on' + type, handler);
	} else {
		ele['on' + type] = null;
	}
}

function $(id) {
	return document.getElementById(id);
}

function getByClass(clsName, parent) {
	var oParent = parent ? $(parent) : document;
	var elements = oParent.getElementsByTagName("*");
	var ret = [];

	for (var i = 0, len = elements.length; i < len; i++) {
		if (elements[i].className == clsName) {
			ret.push(elements[i]);
		}
	}
	return ret;
}

window.onload = function() {

	var loginPanel = $('loginPanel');
	var login_logo_webqq = getByClass('login_logo_webqq', 'loginPanel')[0];
	var disX;
	var disY;

	function mouseMove(e) {
		e = e || window.event;
		var left = e.clientX - disX;
		var top = e.clientY - disY;
		var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
		var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var maxL = winWidth - loginPanel.offsetWidth - 10;
		var maxT = winHeight - loginPanel.offsetHeight - 10;

		if (left < 0) {
			left = 0;
		} else if (left > maxL) {
			left = maxL;
		}

		if (top < 0) {
			top = 0;
		} else if (top > maxT) {
			top = maxT;
		}

		loginPanel.style.left = left + 'px';
		loginPanel.style.top = top + 'px';
	}
	
	function mouseUp(e) {
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}

	addEvent(login_logo_webqq, 'mousedown', function(e) {
		e = e || window.event;
		disX = e.clientX - loginPanel.offsetLeft;
		disY = e.clientY - loginPanel.offsetTop;
		addEvent(document, 'mousemove', mouseMove);
		addEvent(document, 'mouseup', mouseUp);
	});



};