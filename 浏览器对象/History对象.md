### History对象
window.history对象包含浏览器的历史（url）的集合

### History方法
history.back() - 与在浏览器点击后退按钮相同
history.forward() - 与在浏览器点击向前按钮相同
history.go() - 进入历史中的某个页面

### HTML5中history对象API
HTML5基于原有对象方法新增了两个实用的API方法

* pushState方法：向历史记录堆栈的顶部添加一条记录，常用于实现页面的无刷新跳转，其调用格式如下：
window.history.pushState(data, title, [, url]);
其中，data参数表示在添加记录时传递的数据对象，该对象通常为JSON格式的字符串，参数title为页面显示的标题，
可选项参数为页面跳转地址，默认值为当前页面地址。
* replaceState方法：修改当前的历史记录值，其调用格式如下：
window.history.replaceState(data, title, [, url]);
其中，各个参数的使用说明与pushState方法相同，不再累赘。

