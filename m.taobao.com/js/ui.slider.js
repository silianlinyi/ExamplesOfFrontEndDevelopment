(function(global) {

	function css(el, name) {
		return getComputedStyle(el)[name];
	}

	var root = global;

	function Slider(config) {
		this.init(config);
		this.render();
		this.bindEvent();
	}

	Slider.prototype.init = function(config) {
		this.config = config;
		this.wrapper = config.wrapper;
		this.data = config.data;
		this.len = config.data.length;
		this.scaleW = parseInt(css(this.wrapper, 'width'));
		this.index = 0;
	};

	Slider.prototype.renderOne = function(index) {
		var data = this.data;
		var li = document.createElement('li');
		var a = document.createElement('a');
		var img = document.createElement('img');
		img.src = data[index].src;
		a.appendChild(img);
		li.appendChild(a);
		li.setAttribute('data-index', index);
		this.sliderList.appendChild(li);
	};

	Slider.prototype.renderList = function() {
		var self = this;
		var data = self.data;
		var len = self.len;
		self.sliderList = document.createElement('ul');
		self.sliderList.style.width = self.scaleW * (len + 2) + 'px';
		self.sliderList.style.webkitTransform = 'translate3d(' + (-self.scaleW) + 'px, 0px, 0px)';
		self.renderOne(len - 1);
		for (var i = 0; i < len; i++) {
			self.renderOne(i);
		}
		self.renderOne(0);
		self.slider.appendChild(self.sliderList);
	};

	Slider.prototype.renderIndicator = function() {
		var self = this;
		var data = self.data;
		var len = data.length;
		self.indicator = document.createElement('div');
		self.indicator.className = 'indicator';
		self.spanList = [];
		for (var j = 0; j < len; j++) {
			var span = document.createElement('span');
			if (j === 0) {
				span.className = 'cur';
			}
			self.spanList.push(span);
			self.indicator.appendChild(span);
		}
		self.slider.appendChild(self.indicator);
	};

	Slider.prototype.render = function() {
		var self = this;
		self.slider = document.createElement('div');
		self.slider.className = 'ui-slider';
		self.renderList();
		self.renderIndicator();
		self.wrapper.appendChild(self.slider);
	};

	Slider.prototype.bindEvent = function() {
		var self = this;
		var sliderList = self.sliderList;

		var startHandler = function(e) {
			e.preventDefault();
			self.offsetX = 0;
			self.startX = e.touches[0].clientX;
			stop();
		};
		var moveHandler = function(e) {
			self.offsetX = e.touches[0].clientX - self.startX;
			self.sliderList.style.webkitTransition = 'none';
			self.sliderList.style.webkitTransform = 'translate3d(' + (-(self.index + 1) * self.scaleW + self.offsetX) + 'px, 0, 0)';
		};
		var endHandler = function(e) {
			if (self.offsetX < 0) {
				self.index = self.index + 1;
			} else if (self.offsetX > 0) {
				self.index = self.index - 1;
			}
			self.goto(self.index);
			play();
		};
		var play = function() {
			self.timer = setInterval(function() {
				self.index += 1;
				self.goto(self.index);
			}, 3000);
		};
		var stop = function() {
			clearInterval(self.timer);
		};

		sliderList.addEventListener('touchstart', startHandler);
		sliderList.addEventListener('touchmove', moveHandler);
		sliderList.addEventListener('touchend', endHandler);
		play();
		
		self.sliderList.addEventListener('webkitTransitionEnd', function() {
			console.log('webkitTransitionEnd');
			self.sliderList.style.webkitTransition = 'none';
			self.sliderList.style.webkitTransform = 'translate3d(' + (-self.scaleW * (self.index + 1)) + 'px, 0px, 0px)';
		});
	};

	Slider.prototype.goto = function(index) {
		var self = this;
		self.sliderList.style.webkitTransition = 'all ease-out 0.2s';
		self.sliderList.style.webkitTransform = 'translate3d(' + (-self.scaleW * (index + 1)) + 'px, 0px, 0px)';
		var spanList = self.spanList;
		var len = self.len;
		for (var i = 0; i < len; i++) {
			if (spanList[i].className = 'cur') {
				spanList[i].className = '';
			}
		}
		if (index === -1) {
			self.index = len - 1;
		} else if (index === len) {
			self.index = 0;
		}
		spanList[self.index].className = 'cur';
	};



	root.Slider = Slider;

})(this);