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

function css(el, name) {
	var styleInfo = window.getComputedStyle ? window.getComputedStyle(el, "") : el.currentStyle;
	return styleInfo[name];
}

function getByClass(clsName) {
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

var Panel = Class.extend({

	init: function(config) {
		var me = this;
		me.config = config;
		me.el = document.getElementById(me.config.id);

		me.ctrlList = getByClass('ui-panel-ctrl');

		me.ctrlR = getByClass('ui-panel-ctrl-r')[0];
		me.ctrlB = getByClass('ui-panel-ctrl-b')[0];
		me.ctrlRB = getByClass('ui-panel-ctrl-rb')[0];

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
			EventUtil.removeEvent(document, 'mousemove', mouseMove);
			EventUtil.removeEvent(document, 'mouseup', mouseUp);
		};

		for (var i = 0, len = me.ctrlList.length; i < len; i++) {
			EventUtil.addEvent(me.ctrlList[i], 'mousedown', function(e) {
				var e = e || window.event;
				me.startX = e.clientX;
				me.startY = e.clientY;
				me.type = this.getAttribute && this.getAttribute('data-type') || this.dataset && this.dataset.type;
				EventUtil.addEvent(document, 'mousemove', mouseMove);
				EventUtil.addEvent(document, 'mouseup', mouseUp);
			});
		}
	},

	resizeX: function(offsetX) {
		var me = this;
		var width = css(me.el, 'width');
		me.el.style.width = parseInt(width) + offsetX + 'px';
		return this;
	},

	resizeY: function(offsetY) {
		var me = this;
		var height = css(me.el, 'height');
		me.el.style.height = parseInt(height) + offsetY + 'px';
		return this;
	},

	resize: function(offsetX, offsetY) {
		this.resizeX(offsetX);
		this.resizeY(offsetY);
		return this;
	}
});

var panel = new Panel({
	id: 'ui-panel'
});