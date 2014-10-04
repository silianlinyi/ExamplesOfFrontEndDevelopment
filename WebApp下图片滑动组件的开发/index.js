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

var slider = new Slider({
	'canvas': document.getElementById('canvas'),
	'data': data
});