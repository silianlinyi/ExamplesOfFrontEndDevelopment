CSS与JavaScript是两个有着明确分工的领域，前者负责页面的视觉效果，后者负责与用户的行为互动。
但是，它们毕竟同属网页开发的前端，因此不可避免有着交叉和互相配合。本节介绍如果通过JavaScript操作CSS。

## 1. DOM元素的CSS操作

### 1.1 HTML元素的style属性

操作DOM元素的CSS样式，最简单的方法之一就是使用DOM元素的getAttribute方法、setAttribute方法和removeAttribute方法，读写或删除HTML元素的style属性。

```
div.setAttribute('style', 'background-color:red;border:1px solid black;');
```

### 1.2 style对象
DOM元素本身还提供style属性，用来操作CSS样式。

**（1）简介**
DOM元素的style属性指向一个对象，用来读写页面元素的行内CSS样式。

```
var divStyle = document.querySelector('div').style; 

divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';

divStyle.backgroundColor // red
divStyle.border // 1px solid black 
divStyle.height // 100px
divStyle.width // 100px
```

从上面代码可以看到，style属性指向一个对象（简称style对象），该对象的属性与css规则名一一对应，但是需要改写。具体规则是将横杠从CSS规则名中去除，
然后将横杠后的第一个字母大写，比如background-color写成backgroundColor。如果CSS规则名是JavaScript保留字，则规则名之前需要加上字符串“css”，比如float写成cssFloat。

注意，style对象的属性值都是字符串，而且包括单位。所以，divStyle.width不能设置为100，而要设置为'100px'。

**（2）style对象的cssText属性**
style对象的cssText可以用来读写或删除整个style属性。

```
divStyle.cssText = 'background-color:red;border:1px solid black;height:100px;width:100px;';
```

**（3）CSS模块的侦测**
CSS的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对CSS模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做“CSS模块的侦测”。

一个比较普遍适用的方法是，判断某个DOM元素的style对象的某个属性值是否为字符串。

```
typeof element.style.animationName === 'string';
typeof element.style.transform === 'string';
```

如果是的话，就说明该属性在style对象中确实存在，代表浏览器支持该CSS属性。所有浏览器都能用这个方法，但是使用的时候，需要把不同浏览器的CSS规则前缀也考虑进去。

```
typeof document.getElementById("content").style['-webkit-animation'] === 'string'
```

这种侦测方法可以写成一个函数。

```
function isPropertySupported(property){
    if (property in document.body.style) return true;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
    var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

    for(var i=0; i<prefixes.length; i++){
        if((prefixes[i] + prefProperty) in document.body.style) return true;
    }

    return false;
}

isPropertySupported('background-clip')
// true
```

此外，部分浏览器（Firefox 22+, Chrome 28+, Opera 12.1+）目前部署了supports API，可以返回是否支持某条CSS规则。但是，这个API还没有成为标准。

```
CSS.supports('transform-origin', '5px');
CSS.supports('(display: table-cell) and (display: list-item)');
```

**（4）style对象的方法**
style对象有以下三个方法，也可以用来设置、读取和删除行内CSS规则，而且不必改写CSS规则名。

* setPropertyValue(propertyName,value)：设置某个CSS属性。
* getPropertyValue(propertyName)：读取某个CSS属性。
* removeProperty(propertyName)：删除某个CSS属性。

```
divStyle.setProperty('background-color','red');
divStyle.getPropertyValue('background-color');
divStyle.removeProperty('background-color');
```

**（5）style对象的animation-play-state属性**
animation-play-state属性用来控制暂停动画的播放。该属性需要加上浏览器前缀。

```
element.style.webkitAnimationPlayState = "paused";
element.style.webkitAnimationPlayState = "running";
```

### 1.3 CSS生成内容
“CSS生成内容”指的是通过CSS，向DOM添加的元素。主要的方法是通过“:before”和“:after”生成伪元素，然后用content属性指定伪元素的内容。

假定HTML代码如下：

```
<div id="test">Test content</div>
```

相应的CSS如下：

```
#test:before {
    content: 'Before ';
    color: #FF0;
}
```

DOM元素的style对象无法读写伪元素的样式，这时就要用到window对象的getComputedStyle方法。JavaScript获取获取伪元素的content属性和color属性，可以使用下面的方法。

```
var test = document.querySelector('#test');
var result = window.getComputedStyle(test, ':before').content;
var color = window.getComputedStyle(test, ':before').color;
```

上面代码也可以使用window.getComputedStyle对象（详见下面介绍）的getPropertyValue方法获取。

```
var test = document.querySelector('#test');
var result = window.getComputedStyle(test, ':before').getPropertyValue('content');
var color = window.getComputedStyle(test, ':before').getPropertyValue('color');
```

### 1.4 CSS事件

**（1） 动画（animation）事件**
CSS的animation动画定义了三个事件，可以绑定回调函数：动画的开始、动画的结束、动画的循环。

```
var e = document.getElementById("animation");

e.addEventListener("animationstart", listener, false);
e.addEventListener("animationend", listener, false);
e.addEventListener("animationiteration", listener, false);
```

回调函数的范例：

```
function listener(e) {
	var l = document.createElement("li");

	switch (e.type) {

		case "animationstart":
			l.innerHTML = "Started: elapsed time is " + e.elapsedTime;
			break;

		case "animationend":
			l.innerHTML = "Ended: elapsed time is " + e.elapsedTime;
			break;

		case "animationiteration":
			l.innerHTML = "New loop started at time " + e.elapsedTime;
			break;

	}

	document.getElementById("output").appendChild(l);
}
```

上面代码的运行结果是下面的样子：

```
Started: elapsed time is 0
New loop started at time 3.01200008392334
New loop started at time 6.00600004196167
Ended: elapsed time is 9.234000205993652
```

animation-play-state属性可以控制动画的状态（暂停/播放），该属性需求加上浏览器前缀。

```
element.style.webkitAnimationPlayState = "paused";
element.style.webkitAnimationPlayState = "running";
```

**（2）过渡（transition）事件**
CSS过渡（transition）结束的时候，会触发transitionend事件。

```
$("body").on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(){
   $("body").css("transition", "none");
});
```


## 2. 样式表

### 2.1 获取样式表
### 2.2 样式表对象
### 2.3 添加样式表

## 3. window对象的CSS相关方法

### 3.1 window.getComputedStyle方法
getComputedStyle方法接受一个HTML元素作为参数，返回一个包含该HTML元素的最终样式信息的对象。所谓“最终样式信息”，指的是各种CSS规则叠加后的结果。

```
var div = document.querySelector('div');
window.getComputedStyle(div).backgroundColor
```

getComputedStyle方法只能读取CSS属性，而不能设置。它使用骆驼拼写法表示CSS规则名，比如background-color要写成backgroundColor。
getComputedStyle方法返回的颜色值一律都是rgb(#,#,#)格式。

### 3.2 window.matchMedia方法
window.matchMedia方法用来检查CSS的mediaQuery语句。各种浏览器的最新版本（包括IE 10+）都支持该方法，对于不支持该方法的老式浏览器，可以使用第三方函数库matchMedia.js。

mediaQuery有点像if语句，只要显示网页的媒介（包括浏览器和屏幕等）满足mediaQuery语句设定的条件，就会执行区块内部的语句。下面是mediaQuery语句的一个例子。

```
@media all and (max-width: 700px) {
    body {
        background: #FF0;
    }
}
```
上面的CSS代码表示，该区块对所有媒介（media）有效，且视口必须满足最大宽度不超过700像素。如果条件满足，则body元素的背景设为#FF0。

需要注意的是，mediaQuery接受两种宽度/高度的度量，一种是上例的“视口”的宽度/高度，还有一种是“设备”的宽度/高度，下面就是一个例子。

```
@media all and (max-device-width: 700px) {

}
```

视口的宽度/高度（width/height）使用documentElement.clientWidth/Height来衡量，单位是CSS像素；设备的宽度/高度（device-width/device-height）
使用screen.width/height来衡量，单位是设备硬件的像素。

window.matchMedia方法接受mediaQuery语句作为参数，返回一个MediaQueryList对象。该对象有以下两个属性。

```
* media：查询语句的内容。
* matches：如果查询结果为真，值为true，否则为false。
```




## 4. 参考链接
