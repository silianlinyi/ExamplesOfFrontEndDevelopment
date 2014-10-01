## 问题：浮动使父元素高度塌陷？

### 方法一、clear:both;
### 方法二、父元素BFC(IE8+)或haslayout(IE6/IE7)

**BFC/haslayout通常声明**

* float:left/right
* position:absolute/fixed
* overflow:hidden/scroll(IE7+)
* display:inline-block/table-cell(IE8+)
* width/height/zoom:1/...(IE6/IE7)

权衡后的策略

.clearfix:after {
	content:'';
	display:block;
	height:0;
	overflow:hidden;
	clear:both;
}
.clearfix {
	*zoom:1;
}

更好的方法

.clearfix:after {
	content: '';
	display:table;
	clear:both;
}
.clearfix {
	*zoom:1;
}

.clearfix应用在包含浮动子元素的父级元素上

乱入的haslayout往往会让IE6/IE7做出出格的事情！
浮动也会触发haslayout，所以，浮动在IE6/IE7下更显魔性！

但浮动普遍滥用了！



















