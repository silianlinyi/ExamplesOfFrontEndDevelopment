function createXHR() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
		for (var i = 0; i < versions.length; i++) {
			try {
//				return new ActiveXObject('Microsoft.XMLHTTP');
				return new ActiveXObject(version[i]);
			} catch (e) {
				// 跳过
			}
		}
	} else {
		throw new Error('您的浏览器不支持 XHR 对象!');
	}
}

function ajax(options) {
	var xhr = createXHR();
	var method = (options.method || 'GET').toUpperCase();
	var url = options.url;
	var data = options.data;
	var timeout = options.timeout || 15000;
	var timer;
	// GET请求方式
	if (method === 'GET' && data) {
		for (var key in data) {
			if (url.indexOf('?') === -1) {
				url += '?';
			} else {
				url += '&';
			}
			url += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}
	} else if (method === 'POST') {
		data = data || {};
	}
	xhr.open(method, url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			clearTimeout(timer);
			if (xhr.status === 200) {
				options.success.call(this, xhr.responseText, xhr.status, xhr);
			} else {
				options.error.call(this, xhr, xhr.statusText, xhr.status);
			}
		}
	}
	if (method === 'GET') {
		xhr.send(null);
	} else if (method === 'POST') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	timer = setTimeout(function() {
		xhr.abort();
	}, timeout);
}

var Util = {};

Util.ajax = ajax;

Util.get = function() {

}

Util.post = function() {

}