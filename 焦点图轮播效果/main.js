window.onload = function() {
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;
	var len = buttons.length;
	var animating = false; // 标识是否还处于动画中
	var timer; // 定时动画句柄

	function animate(offset) {
		animating = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 300;
		var interval = 10;
		var speed = offset / (time / interval);

		var go = function() {
			if ((speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + 'px';
				setTimeout(go, interval);
			} else {
				animating = false;
				list.style.left = newLeft + 'px';
				if (newLeft == -3600) {
					list.style.left = '-600px';
				}
				if (newLeft == 0) {
					list.style.left = '-3000px';
				}
			}
		}
		go();
	}

	function showButton() {
		for (var i = 0; i < len; i++) {
			if (buttons[i].className = 'on') {
				buttons[i].className = '';
			}
		}
		buttons[index - 1].className = 'on';
	}
	
	function prevOne() {
		if (animating) {
			return;
		}
		index--;
		if (index == 0) {
			index = len;
		}
		showButton();
		animate(600);
	}
	
	function nextOne() {
		if (animating) {
			return;
		}
		index++;
		if (index == 6) {
			index = 1;
		}
		showButton();
		animate(-600);
	}

	prev.onclick = function() {
		prevOne();
	};

	next.onclick = function() {
		nextOne();
	};

	for (var i = 0; i < len; i++) {
		buttons[i].onclick = function() {
			if (animating) {
				return;
			}
			if (this.className == 'on') {
				return;
			}
			var myIndex = this.getAttribute('index');
			var offset = -600 * (myIndex - index);
			animate(offset);
			index = myIndex;
			showButton();
		};
	}
	
	function play() {
		timer = setTimeout(function() {
			nextOne();
			play();
		}, 3000);
	}
	
	function stop() {
		clearTimeout(timer);
	}
	
	play();
	
	container.onmouseover = function() {
		stop();
	};
	
	container.onmouseout = function() {
		play();
	}

};