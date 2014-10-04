function Slider(options) {
	this.init(options);
	this.renderDOM();
	this.bindDOM();
}

Slider.prototype.init = function(options) {
	this.canvas = options.canvas;
	this.data = options.data;
	this.len = this.data.length;
	this.list = [];

	// 算出窗口的长宽比
	this.radio = window.innerHeight / window.innerWidth;
	// 设定一页的宽度
	this.scaleW = window.innerWidth;
	// 当前图片的索引
	this.index = 0;
};

Slider.prototype.renderDOM = function() {
	var data = this.data;
	var len = data.length;

	this.imgList = document.createElement('ul');
	for (var i = 0; i < len; i++) {
		var li = document.createElement('li');
		var item = data[i];
		li.style.webkitTransform = 'translate3d(' + this.scaleW * i + 'px, 0, 0)';
		if (item['height'] / item['width'] > this.radio) {
			li.innerHTML = '<img src="' + item.src + '" height="' + window.innerHeight + '" />';
		} else {
			li.innerHTML = '<img src="' + item.src + '" width="' + window.innerWidth + '" />';
		}
		this.list.push(li);
		this.imgList.appendChild(li);
	}
	this.canvas.appendChild(this.imgList);
};

Slider.prototype.bindDOM = function() {
	var self = this;
	var imgList = this.imgList;
	var startHandler = function(e) {
		e.preventDefault();
		self.offsetX = 0;
		self.startX = e.touches[0].clientX;
	};

	var moveHandler = function(e) {
		self.offsetX = e.touches[0].clientX - self.startX;
		var left = self.index === 0 ? 0 : self.index - 1;
		var right = self.index === self.len - 1 ? self.index : self.index + 1;

		for (var i = left; i <= right; i++) {
			self.list[i].style.webkitTransition = 'none';
			self.list[i].style.webkitTransform = 'translate3d(' + ((i - self.index) * self.scaleW + self.offsetX) + 'px, 0, 0)';
		}
	};

	var endHandler = function(e) {
		if (self.offsetX > 50) {
			self.index = self.index === 0 ? 0 : self.index - 1;
			self.goto(self.index);
		} else if (self.offsetX < -50) {
			self.index = self.index === self.len - 1 ? self.index : self.index + 1;
			self.goto(self.index);
		} else {
			self.goto(self.index);
		}
	};

	imgList.addEventListener('touchstart', startHandler);
	imgList.addEventListener('touchmove', moveHandler);
	imgList.addEventListener('touchend', endHandler);
}

Slider.prototype.goto = function(index) {
	var list = this.list;
	var len = this.len;
	var scaleW = this.scaleW;

	for (var i = 0; i < len; i++) {
		list[i].style.webkitTransition = 'all ease-out 0.2s';
		list[i].style.webkitTransform = 'translate3d(' + (i - index) * scaleW + 'px,0,0)';
	}
};