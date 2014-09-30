## -webkit-filter

检索或设置对象所应用的SVG滤镜效果。
可同时提供多种效果，以空格分开。同一效果如有多组属性值，用逗号分开。目前支持十种效果

### 语法
-webkit-filter:none | blur(<number>px) | brightness(<percentage>) | contrast(<percentage>) | 
grayscale(<percentage>) | hue-rotate(<number>deg) | invert(<percentage>) | opacity(<percentage>) | 
saturate(<percentage>) | sepia(<percentage>) | drop-shadow(<length①>,<length②>,radius,<color>)

### 取值

* none	无SVG滤镜效果
* blur(<number>px)	设置对象的模糊效果
* brightness(<percentage>)	设置对象的亮度。除了百分比外，也可以用0-1的数字表达
* contrast(<percentage>)	设置对象的对比度。除了百分比外，也可以用0-1的数字表达
* grayscale(<percentage>)	设置对象的灰度。除了百分比外，也可以用0-1的数字表达
* hue-rotate(<number>deg)	设置对象的色相旋转
* invert(<percentage>)	设置对象的反色。除了百分比外，也可以用0-1的数字表达
* opacity(<percentage>)	设置对象的透明度。除了百分比外，也可以用0-1的数字表达
* saturate(<percentage>)	设置对象的饱和度。除了百分比外，也可以用0-1的数字表达
* sepia(<percentage>)	设置对象的褐色程度。除了百分比外，也可以用0-1的数字表达
* drop-shadow(<length>,<length>,radius,<color>	设置对象的阴影。第一个长度是向右偏移距离，第二个长度是向下偏移距离，皆可为负值；第三个是阴影圆角；第四个是阴影颜色

### 参考链接

[1] http://www.css3china.com/?p=980
[2] http://justcoding.iteye.com/blog/940184/
[3] http://caniuse.com/#search=-webkit-filter
[4] http://ued.ctrip.com/blog/wp-content/webkitcss/prop/filter.html​
[5] http://ued.ctrip.com/blog/wp-content/webkitcss/demo/filter.html
