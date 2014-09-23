define(function() {

	function iCanvas(config) {
		this.config = config;

		this.init();
	}

	// 类方法
	// ==========================================


	// 实例方法
	// ==========================================
	iCanvas.prototype.init = function() {
		this.canvasContainer = document.querySelector(this.config.renderTo);
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.canvasContainer.offsetWidth;
		this.canvas.height = this.canvasContainer.offsetHeight;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.canvasContainer.appendChild(this.canvas);
		this.context = this.canvas.getContext('2d');
	};

	/**
	 * 绘制矩形（不填色）
	 * @param {Number} x 矩形左上角的 x 坐标
	 * @param {Number} y 矩形左上角的 y 坐标
	 * @param {Number} width 矩形的宽度，以像素计
	 * @param {Number} height 矩形的高度，以像素计
	 * @param {Object} options 可选配置选项
	 */
	iCanvas.prototype.strokeRect = function(x, y, w, h, options) {
		options = options || {};
		var ctx = this.context;
		ctx.save();
		ctx.strokeStyle = options.strokeStyle || ctx.strokeStyle;
		ctx.lineWidth = options.lineWidth || ctx.lineWidth;
		ctx.lineJoin = options.lineJoin || ctx.lineJoin;
		ctx.miterLimit = options.miterLimit || ctx.miterLimit;
		var arr = options.shadow ? options.shadow.split(' ') : [ctx.shadowOffsetX, ctx.shadowOffsetY, ctx.shadowBlur, ctx.shadowColor];
		ctx.shadowOffsetX = arr[0];
		ctx.shadowOffsetY = arr[1];
		ctx.shadowBlur = arr[2];
		ctx.shadowColor = arr[3];
		ctx.strokeRect(x, y, w, h);
		ctx.restore();
	};

	/**
	 * 绘制“已填色”的矩形
	 * @param {Number} x 矩形左上角的 x 坐标
	 * @param {Number} y 矩形左上角的 y 坐标
	 * @param {Number} width 矩形的宽度，以像素计
	 * @param {Number} height 矩形的高度，以像素计
	 * @param {Object} options 可选配置选项
	 */
	iCanvas.prototype.fillRect = function(x, y, w, h, options) {
		options = options || {};
		var ctx = this.context;
		ctx.save();
		ctx.fillStyle = options.fillStyle || ctx.fillStyle;
		ctx.globalAlpha = options.globalAlpha || ctx.globalAlpha;
		var arr = options.shadow ? options.shadow.split(' ') : [ctx.shadowOffsetX, ctx.shadowOffsetY, ctx.shadowBlur, ctx.shadowColor];
		ctx.shadowOffsetX = arr[0];
		ctx.shadowOffsetY = arr[1];
		ctx.shadowBlur = arr[2];
		ctx.shadowColor = arr[3];
		ctx.fillRect(x, y, w, h);
		ctx.restore();
	};

	/**
	 * 清空给定矩形内的指定像素
	 * @param {Number} x 要清除的矩形左上角的 x 坐标
	 * @param {Number} y 要清除的矩形左上角的 y 坐标
	 * @param {Number} width 要清除的矩形的宽度，以像素计
	 * @param {Number} height 要清除的矩形的高度，以像素计
	 */
	iCanvas.prototype.clearRect = function(x, y, w, h) {
		this.context.clearRect(x, y, w, h);
	};

	/**
	 * 创建线性的渐变对象
	 * @param {Number} x0 	渐变开始点的 x 坐标
	 * @param {Number} y0 	渐变开始点的 y 坐标
	 * @param {Number} x1	渐变结束点的 x 坐标
	 * @param {Number} y1	渐变结束点的 y 坐标
	 */
	iCanvas.prototype.createLinearGradient = function(x0, y0, x1, y1, options) {
		options = options || {};
		options.colorStops = options.colorStops || [
			[0, 'white'],
			[1, 'black']
		];
		var ctx = this.context;
		var grd = ctx.createLinearGradient(x0, y0, x1, y1);
		for (var i = 0, len = options.colorStops.length; i < len; i++) {
			grd.addColorStop(options.colorStops[i][0], options.colorStops[i][1]);
		}
		return grd;
	};

	/**
	 * 创建放射状/圆形渐变对象
	 * @param {Number} x0	渐变的开始圆的 x 坐标
	 * @param {Number} y0	渐变的开始圆的 y 坐标
	 * @param {Number} r0	开始圆的半径
	 * @param {Number} x1	渐变的结束圆的 x 坐标
	 * @param {Number} y1	渐变的结束圆的 y 坐标
	 * @param {Number} r1	结束圆的半径
	 */
	iCanvas.prototype.createRadialGradient = function(x0, y0, r0, x1, y1, r1, options) {
		options = options || {};
		options.colorStops = options.colorStops || [
			[0, 'white'],
			[1, 'black']
		];
		var ctx = this.context;
		var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
		for (var i = 0, len = options.colorStops.length; i < len; i++) {
			grd.addColorStop(options.colorStops[i][0], options.colorStops[i][1]);
		}
		return grd;
	};

	/**
	 * 在指定的方向内重复指定的元素，元素可以是图片、视频，或者其他 <canvas> 元素。
	 * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} image	规定要使用的图片、画布或视频元素。
	 * @param {String} option
	 * repeat	默认。该模式在水平和垂直方向重复。
	 * repeat-x	该模式只在水平方向重复。
	 * repeat-y	该模式只在垂直方向重复。
	 * no-repeat	该模式只显示一次（不重复）。
	 */
	iCanvas.prototype.createPattern = function(image, option) {
		option = option || "repeat";
		return this.context.createPattern(image, option);
	};

	/**
	 * 从原始画布中剪切任意形状和尺寸
	 * 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。
	 * 您也可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
	 */
	iCanvas.prototype.clip = function() {
		this.context.clip();
	};

	/**
	 * 通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点
	 * 提示：二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。
	 * 曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。
	 * @param {Number} x0 开始点的 x 坐标
	 * @param {Number} y0 开始点的 y 坐标
	 * @param {Number} cpx 贝塞尔控制点的 x 坐标
	 * @param {Number} cpy 贝塞尔控制点的 y 坐标
	 * @param {Number} x 结束点的 x 坐标
	 * @param {Number} y 结束点的 y 坐标
	 */
	iCanvas.prototype.quadraticCurve = function(x0, y0, cpx, cpy, x1, y1, options) {
		options = options || {};
		var ctx = this.context;
		ctx.save();
		ctx.lineWidth = options.lineWidth || ctx.lineWidth;
		ctx.strokeStyle = options.strokeStyle || ctx.strokeStyle;
		ctx.lineCap = options.lineCap || ctx.lineCap;
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.quadraticCurveTo(cpx, cpy, x1, y1);
		ctx.stroke();
		ctx.restore();
	};

	/**
	 * 通过使用表示三次贝塞尔曲线的指定控制点，向当前路径添加一个点。
	 * 提示：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。
	 * 如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。
	 * @param {Number} x0 开始点的 x 坐标
	 * @param {Number} y0 开始点的 y 坐标
	 * @param {Number} cp1x 第一个贝塞尔控制点的 x 坐标
	 * @param {Number} cp1y	第一个贝塞尔控制点的 y 坐标
	 * @param {Number} cp2x	第二个贝塞尔控制点的 x 坐标
	 * @param {Number} cp2y	第二个贝塞尔控制点的 y 坐标
	 * @param {Number} x1 结束点的 x 坐标
	 * @param {Number} y1 结束点的 y 坐标
	 */
	iCanvas.prototype.bezierCurve = function(x0, y0, cp1x, cp1y, cp2x, cp2y, x1, y1, options) {
		options = options || {};
		var ctx = this.context;
		ctx.save();
		ctx.lineWidth = options.lineWidth || ctx.lineWidth;
		ctx.strokeStyle = options.strokeStyle || ctx.strokeStyle;
		ctx.lineCap = options.lineCap || ctx.lineCap;
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, y1);
		ctx.stroke();
		ctx.restore();
	};

	/**
	 * fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
	 * @param {String} text 规定在画布上输出的文本。
	 * @param {Number} x 开始绘制文本的 x 坐标位置（相对于画布）。
	 * @param {Number} y 开始绘制文本的 y 坐标位置（相对于画布）。
	 * @param {Number} maxWidth 可选。允许的最大文本宽度，以像素计。
	 */
	iCanvas.prototype.fillText = function(text, x, y, options) {
		options = options || {};
		var ctx = this.context;
		ctx.save();
		ctx.font = options.font || ctx.font;
		ctx.fillStyle = options.fillStyle || ctx.fillStyle;
		if (options.maxWidth) {
			ctx.fillText(text, x, y, options.maxWidth);
		} else {
			ctx.fillText(text, x, y);
		}
		ctx.restore();
	};

	/**
	 * strokeText() 方法在画布上绘制文本（没有填色）。文本的默认颜色是黑色。
	 * @param {String} text 规定在画布上输出的文本。
	 * @param {Number} x 开始绘制文本的 x 坐标位置（相对于画布）。
	 * @param {Number} y 开始绘制文本的 y 坐标位置（相对于画布）。
	 * @param {Number} maxWidth 可选。允许的最大文本宽度，以像素计。
	 */
	iCanvas.prototype.strokeText = function(text, x, y, options) {
		options = options || {};
		var ctx = this.context;
		ctx.save();
		ctx.font = options.font || ctx.font;
		ctx.strokeStyle = options.strokeStyle || ctx.strokeStyle;
		if (options.maxWidth) {
			ctx.strokeText(text, x, y, options.maxWidth);
		} else {
			ctx.strokeText(text, x, y);
		}
		ctx.restore();
	};

	/**
	 * measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
	 * 提示：如果您需要在文本向画布输出之前，就了解文本的宽度，那么请使用该方法。
	 * @param {String} text	要测量的文本。
	 */
	iCanvas.prototype.measureText = function(text) {
		return this.context.measureText(text);
	};

	iCanvas.prototype.drawImage = function(img, sx, sy, swidth, sheight, x, y, width, height) {
		if (arguments.length === 3) {
			this.context.drawImage(img, sx, sy);
		} else if (arguments.length === 5) {
			this.context.drawImage(img, sx, sy, swidth, sheight);
		} else if (arguments.length === 9) {
			this.context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
		}
	};

	/**
	 * 创建新的空白 ImageData 对象
	 */
	iCanvas.prototype.createImageData = function() {
		if (arguments.length === 2) {
			return this.context.createImageData(arguments[0], arguments[1]);
		} else {
			return this.context.createImageData(arguments[0]);
		}
	};

	iCanvas.prototype.getImageData = function(x, y, width, height) {
		return this.context.getImageData(x, y, width, height);
	};

	iCanvas.prototype.putImageData = function(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
		if (arguments.length === 3) {
			this.context.putImageData(imgData, x, y);
		} else if (arguments.length === 7) {
			this.context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
		}
	};

	/**
	 * 保存当前环境的状态
	 */
	iCanvas.prototype.save = function() {
		this.context.save();
	};

	/**
	 * 返回之前保存过的路径状态和属性
	 */
	iCanvas.prototype.restore = function() {
		this.context.restore();
	};

	iCanvas.prototype.toDataURL = function() {
		return this.canvas.toDataURL();
	};

	return iCanvas;

});