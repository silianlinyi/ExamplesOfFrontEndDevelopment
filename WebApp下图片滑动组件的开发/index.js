//所有的数据
var data = [{
	height: 950,
	width: 800,
	src: "imgs/1.jpg"
}, {
	height: 1187,
	width: 900,
	src: "imgs/2.jpg"
}, {
	height: 766,
	width: 980,
	src: "imgs/3.jpg"
}, {
	height: 754,
	width: 980,
	src: "imgs/4.jpg"
}, {
	height: 493,
	src: "imgs/5.jpg",
	width: 750
}, {
	height: 500,
	src: "imgs/6.jpg",
	width: 750
}, {
	height: 600,
	src: "imgs/7.jpg",
	width: 400
}];

function Slider(opts) {
	this.wrap = opts.dom;
	this.data = opts.data;

	this.init();
	this.renderDOM();
	this.bindDOM();
}

Slider.prototype.init = function() {
	// 算出窗口的长宽比
	this.radio = window.innerHeight / window.innerWidth;
	// 设定一页的宽度
	this.scaleW = window.innerWidth;
	// 当前图片的索引
	this.index = 0;
};

Slider.prototype.renderDOM = function() {
	var wrap = this.wrap;
	var data = this.data;
	var len = data.length;

	this.outer = document.createElement('ul');
	for (var i = 0; i < len; i++) {
		var li = document.createElement('li');
		var item = data[i];
		li.style.webkitTransform = 'translate3d(' + this.scaleW * i + 'px, 0, 0)';
		if (item['height'] / item['width'] > this.radio) {
			li.innerHTML = '<img src="' + item.src + '" height="' + window.innerHeight + '" />';
		} else {
			li.innerHTML = '<img src="' + item.src + '" width="' + window.innerWidth + '" />';
		}
		this.outer.appendChild(li);
	}
	this.wrap.appendChild(this.outer);
}

Slider.prototype.bindDOM = function() {

}

new Slider({
	'dom': document.getElementById('canvas'),
	'data': data
});