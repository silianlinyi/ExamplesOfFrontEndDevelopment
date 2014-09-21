/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	this.Class = function() {};

	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();

function merge(src, desc) {
	for (var i in src) {
		desc[i] = src[i];
	}
	return desc;
}

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
	var styleInfo = window.getComputedStyle ? window.getComputedStyle(el, "") : el.currentStyle;
	return styleInfo[name];
}

//function getByClass(oParent, tagName, newClass) {        
//	var aElements = oParent.getElementsByTagName(tagName);        
//	var ret = [];        
//	for (var i = 0; i < aElements.length; i++) {            
//		var cutClass = aElements[i].className.split(' ');            
//		for (var j = 0; j < cutClass.length; j++) {                
//			if (cutClass[j] == newClass) {                    
//				ret.push(aElements[i]);                    
//				break;                
//			}            
//		}        
//	}        
//	return ret;    
//};

function getByClass(clsName, parent) {
	if (document.getElementsByClassName) {
		return document.getElementsByClassName(clsName);
	}
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

(function() {

	var Panel = Class.extend({

		init: function(config) {
			config = config || {};
			this.config = merge(config, this.defaults);

			this._createDOM();
			this.addDOMEvent();
		},

		// 默认配置
		defaults: {
			width: 400,
			height: 300,
			minWidth: 250,
			minHeight: 150,
			title: "标题"
		},

		_createDOM: function() {

			this.el = document.createElement("div");
			this.el.className = 'ui-panel';
			this.el.style.width = this.config.width - 2 + 'px';
			this.el.style.height = this.config.height - 2 + 'px';
			this.el.style.left = this.config.left + 'px';
			this.el.style.top = this.config.top + 'px';

			this.elements = {};
			// 标题
			this.elements.title = document.createElement('div');
			this.elements.title.className = 'title';
			this.elements.title.innerHTML = this.config.title;
			this.el.appendChild(this.elements.title);

			this.elements.btns = document.createElement('div');
			this.elements.btns.className = 'btns';
			this.el.appendChild(this.elements.btns);

			// 最小化
			this.elements.minimize = document.createElement('a');
			this.elements.minimize.className = 'btn minimize'
			this.elements.minimize.innerHTML = "最小化";
			this.elements.btns.appendChild(this.elements.minimize);

			// 最大化
			this.elements.maximize = document.createElement('a');
			this.elements.maximize.className = 'btn maximize'
			this.elements.maximize.innerHTML = "最大化";
			this.elements.btns.appendChild(this.elements.maximize);

			// 关闭
			this.elements.close = document.createElement('a');
			this.elements.close.className = 'btn close'
			this.elements.close.innerHTML = "关闭";
			this.elements.btns.appendChild(this.elements.close);

			this.elements.ctrlR = document.createElement('div');
			this.elements.ctrlR.className = 'ctrl ctrl-r';
			this.elements.ctrlR.setAttribute('data-type', 'r');
			this.el.appendChild(this.elements.ctrlR);

			this.elements.ctrlB = document.createElement('div');
			this.elements.ctrlB.className = 'ctrl ctrl-b';
			this.elements.ctrlB.setAttribute('data-type', 'b');
			this.el.appendChild(this.elements.ctrlB);

			this.elements.ctrlRB = document.createElement('div');
			this.elements.ctrlRB.className = 'ctrl ctrl-rb';
			this.elements.ctrlRB.setAttribute('data-type', 'rb');
			this.el.appendChild(this.elements.ctrlRB);

			this.ctrlList = [this.elements.ctrlR, this.elements.ctrlB, this.elements.ctrlRB];

			document.body.appendChild(this.el);
		},

		addDOMEvent: function() {
			var me = this;

			var mouseMove = function(e) {
				var e = e || window.event;
				var offsetX = e.clientX - me.startX;
				var offsetY = e.clientY - me.startY;
				if (me.type === 'r') {
					me.resizeX(offsetX);
				} else if (me.type === 'b') {
					me.resizeY(offsetY);
				} else if (me.type === 'rb') {
					me.resize(offsetX, offsetY);
				}
				me.startX = e.clientX;
				me.startY = e.clientY;
			};

			var mouseUp = function(e) {
				removeEvent(document, 'mousemove', mouseMove);
				removeEvent(document, 'mouseup', mouseUp);
			};

			for (var i = 0, len = me.ctrlList.length; i < len; i++) {
				addEvent(me.ctrlList[i], 'mousedown', function(e) {
					e = e || window.event;
					me.startX = e.clientX;
					me.startY = e.clientY;
					me.type = this.getAttribute && this.getAttribute('data-type') || this.dataset && this.dataset.type;
					addEvent(document, 'mousemove', mouseMove);
					addEvent(document, 'mouseup', mouseUp);
				});
			}

			addEvent(me.elements.close, 'click', function() {
				me.close();
			});
		},

		// 调整横向大小
		resizeX: function(offsetX) {
			var width = parseInt(css(this.el, 'width')) + offsetX;
			if (width < this.config.minWidth) {
				width = this.config.minWidth;
			}
			this.el.style.width = width + 'px';
			return this;
		},

		// 调整纵向大小
		resizeY: function(offsetY) {
			var height = parseInt(css(this.el, 'height')) + offsetY;
			if (height < this.config.minHeight) {
				height = this.config.minHeight;
			}
			this.el.style.height = height + 'px';
			return this;
		},

		// 调整大小
		resize: function(offsetX, offsetY) {
			this.resizeX(offsetX);
			this.resizeY(offsetY);
			return this;
		},

		// 设置标题
		setTitle: function(title) {
			this.elements.title.innerHTML = title;
		},

		// 最小化
		minimize: function() {

		},

		// 最大化
		maximize: function() {

		},

		// 向下还原
		restoreDown: function() {

		},

		// 关闭
		close: function() {
			this.el.remove();
		},

		moveX: function(offsetX) {

		},

		moveY: function(offsetY) {

		},

		move: function(offsetX, offsetY) {

		}

	});

	window.Panel = Panel;

}());