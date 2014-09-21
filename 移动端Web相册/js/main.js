$(function() {
	// 测试数据
	var data = [
		["img/1.jpg", "img/1.large.jpg"],
		["img/2.jpg", "img/2.large.jpg"],
		["img/3.jpg", "img/3.large.jpg"],
		["img/4.jpg", "img/4.large.jpg"],
		["img/5.jpg", "img/5.large.jpg"],
		["img/6.jpg", "img/6.large.jpg"],
		["img/7.jpg", "img/7.large.jpg"],
		["img/8.jpg", "img/8.large.jpg"],
		["img/9.jpg", "img/9.large.jpg"],
		["img/10.jpg", "img/10.large.jpg"],
		["img/11.jpg", "img/11.large.jpg"],
		["img/12.jpg", "img/12.large.jpg"],
		["img/13.jpg", "img/13.large.jpg"],
		["img/14.jpg", "img/14.large.jpg"],
		["img/15.jpg", "img/15.large.jpg"],
		["img/16.jpg", "img/16.large.jpg"],
		["img/17.jpg", "img/17.large.jpg"]
	];

	var TOTAL = data.length;
	var $list = $('#album-list');
	var $largeBox = $('#album-large-box');
	var $largeImg = $('#album-large-box img');
	var $win = $(window);
	var winWidth = $win.width();
	var winHeight = $win.height();
	var liWidth = winWidth * 0.24;
	var liHeight = liWidth * 1.05;

	function render() {
		var temp = '';
		for (var i = 0; i < TOTAL; i++) {
			temp += '<li data-id="' + i + '" class="animated fadeIn" style="height:' + liHeight + 'px"><canvas id="cvs_' + i + '" width="' + liWidth + '" height="' + liHeight + '"></li>';
			var imgObj = new Image();
			imgObj.index = i;
			imgObj.onload = function() {
				var ctx = document.getElementById('cvs_' + this.index).getContext('2d');
				ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, liWidth, liHeight);
			}
			imgObj.src = data[i][0];
		}
		$list.append($(temp));
	}

	render();

	function showLargeImg(index, callback) {
		var imgObj = new Image();
		var imgSrc = data[index][1];
		imgObj.onload = function() {
			var rScale = this.width / this.height;
			var winScale = winWidth / winHeight;
			$largeImg.css({
				'width': 'auto',
				'height': 'auto',
				'margin-top': '0px',
				'margin-left': '0px'
			});
			$largeImg.attr('src', imgSrc);
			$largeImg.attr('data-index', index);

			if (rScale >= winScale) { // 横图
				var marginTop = (winHeight - winWidth / rScale) / 2;
				$largeImg.css({
					'width': '100%',
					'margin-top': marginTop + 'px'
				});
			} else { // 纵图
				var marginLeft = Math.abs((winWidth - winHeight * rScale) / 2);
				$largeImg.css({
					'height': '100%',
					'margin-left': marginLeft + 'px'
				});
			}
			if (callback) {
				callback();
			}
		};
		imgObj.src = imgSrc;
		$largeBox.show();
	}

	function hideLargeImg() {
		$largeBox.hide();
		$largeImg.attr('src', '');
	}

	$list.delegate('li', 'tap', function() {
		var index = this.getAttribute('data-id');
		showLargeImg(index);
	});

	$largeBox.on('tap', hideLargeImg);

	$largeBox.on('swipeLeft', function() {
		var curIndex = parseInt($(this).find('img').attr('data-index'));
		if (curIndex === TOTAL - 1) {
			return;
		}
		showLargeImg(curIndex + 1, function() {
			$largeImg[0].addEventListener('webkitAnimationEnd', function() {
				$largeImg.removeClass('animated fadeInRight');
				$largeImg[0].removeEventListener('webkitAnimationEnd');
			}, false);
			$largeImg.addClass('animated fadeInRight');
		});
	});

	$largeBox.on('swipeRight', function() {
		var curIndex = parseInt($(this).find('img').attr('data-index'));
		if (curIndex === 0) {
			return;
		}
		showLargeImg(curIndex - 1, function() {
			$largeImg[0].addEventListener('webkitAnimationEnd', function() {
				$largeImg.removeClass('animated fadeInLeft');
				$largeImg[0].removeEventListener('webkitAnimationEnd');
			}, false);
			$largeImg.addClass('animated fadeInLeft');
		});
	});

});