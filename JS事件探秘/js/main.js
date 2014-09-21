window.onload = function() {

	var box = document.getElementById('box');
	var go = document.getElementById('go');

	EventUtil.addEvent(box, 'click', function() {
		alert("我是整个父盒子");
	});

	EventUtil.addEvent(go, 'click', function(e) {
		e = EventUtil.getEvent(e);
		alert(EventUtil.getElement(e));
		EventUtil.preventDefault(e);
		EventUtil.stopPropagation(e);
	});

};