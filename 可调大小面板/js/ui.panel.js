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

function css(el, name) {
	var styleInfo = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle;
	return styleInfo[name];
}

function getByClass(clsName) {
	if (document.getElementsByClassName) {
		return document.getElementsByClassName(clsName);
	} else {
		var elements = document.getElementsByTagName("*");
		var ret = [];
		for (var i = 0, len = elements.length; i < len; i++) {
			if (elements[i].className === "") {
				continue;
			}
			if (elements[i].className.match(clsName)) {
				ret.push(elements[i]);
			}
		}
		return ret;
	}
}

function merge(source, dest) {
	for (var i in dest) {

	}
}

(function(global) {
	var root = global;

	function Panel(config) {
		this.init(config);
		this.render();
		this.bindTitleEvent();
		this.bindCtrlEvent();
	}

	Panel.prototype.init = function(config) {
		this.config = config;
	};

	Panel.prototype.render = function() {
		var self = this;
		self.panel = document.createElement('div');
		self.panel.className = 'ui panel';

		self.panel.style.left = (self.config.left || 0) + 'px';
		self.panel.style.top = (self.config.top || 0) + 'px';
		var width = Math.min(window.innerWidth - self.config.left - 2, Math.max(150, self.config.width - 2));
		var height = Math.min(window.innerHeight - self.config.top - 2, Math.max(150, self.config.height - 2));
		self.panel.style.width = width + 'px';
		self.panel.style.height = height + 'px';

		self.title = document.createElement('div');
		self.title.className = 'ui title';
		self.title.innerHTML = self.config.title || '这是默认的标题';
		self.panel.appendChild(self.title);

		self.ctrlR = document.createElement('div');
		self.ctrlR.className = 'ui ctrl r';
		self.panel.appendChild(self.ctrlR);

		self.ctrlL = document.createElement('div');
		self.ctrlL.className = 'ui ctrl l';
		self.panel.appendChild(self.ctrlL);

		self.ctrlB = document.createElement('div');
		self.ctrlB.className = 'ui ctrl b';
		self.panel.appendChild(self.ctrlB);

		self.ctrlLB = document.createElement('div');
		self.ctrlLB.className = 'ui ctrl lb';
		self.panel.appendChild(self.ctrlLB);

		self.ctrlRB = document.createElement('div');
		self.ctrlRB.className = 'ui ctrl rb';
		self.panel.appendChild(self.ctrlRB);

		self.config.renderTo.appendChild(self.panel);
	};

	Panel.prototype.bindTitleEvent = function() {
		var self = this;
		var disX = 0;
		var disY = 0;
		var moveHandler = function(e) {
			e = e || window.event;
			var left = e.clientX - disX;
			var top = e.clientY - disY;
			left = Math.min(window.innerWidth - self.panel.offsetWidth, Math.max(0, left));
			top = Math.min(window.innerHeight - self.panel.offsetHeight, Math.max(0, top));
			self.panel.style.left = left + 'px';
			self.panel.style.top = top + 'px';
		};
		var upHandler = function(e) {
			e = e || window.event;
			removeEvent(document, 'mousemove', moveHandler);
			removeEvent(document, 'mouseup', upHandler);
		};
		addEvent(self.title, 'mousedown', function(e) {
			e = e || window.event;
			disX = e.clientX - self.panel.offsetLeft;
			disY = e.clientY - self.panel.offsetTop;

			addEvent(document, 'mousemove', moveHandler);
			addEvent(document, 'mouseup', upHandler);
		});
	};

	Panel.prototype.bindCtrlEvent = function() {
		var self = this;
		var ctrlList = getByClass('ctrl');
		var len = ctrlList.length;
		var startX = 0;
		var startY = 0;
		var type = 'r';
		var moveHandler = function(e) {
			e = e || window.event;
			var offsetX = e.clientX - startX;
			var offsetY = e.clientY - startY;

			switch (type) {
				case 'r':
					self.resizeR(offsetX);
					break;
				case 'b':
					self.resizeB(offsetY);
					break;
				case 'rb':
					self.resizeR(offsetX);
					self.resizeB(offsetY);
					break;
				case 'l':
					self.resizeL(offsetX);
					break;
				case 'lb':
					self.resizeL(offsetX);
					self.resizeB(offsetY);
					break;
				default:
					break;
			}
			startX = e.clientX;
			startY = e.clientY;
		};
		var upHandler = function(e) {
			removeEvent(document, 'mousemove', moveHandler);
			removeEvent(document, 'mouseup', upHandler);
		};

		for (var i = 0; i < len; i++) {
			addEvent(ctrlList[i], 'mousedown', function(e) {
				e = e || window.event;
				startX = e.clientX;
				startY = e.startY;
				type = this.className.split(' ')[2];
				addEvent(document, 'mousemove', moveHandler);
				addEvent(document, 'mouseup', upHandler);
			});
		}
	};

	Panel.prototype.resizeL = function(offsetX) {
		var width = css(this.panel, 'width');
		var left = css(this.panel, 'left');
		this.panel.style.width = parseInt(width) - offsetX + 'px';
		this.panel.style.left = parseInt(left) + offsetX + 'px';
	};

	Panel.prototype.resizeR = function(offsetX) {
		var width = css(this.panel, 'width');
		this.panel.style.width = parseInt(width) + offsetX + 'px';
	};

	Panel.prototype.resizeB = function(offsetY) {
		var height = css(this.panel, 'height');
		this.panel.style.height = parseInt(height) + offsetY + 'px';
	}

	root.Panel = Panel;

})(window);