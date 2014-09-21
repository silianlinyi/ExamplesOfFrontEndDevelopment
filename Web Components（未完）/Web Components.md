# Web Components
the future of web development

不同的网站往往需要一些相同的模块，比如日历、调色板等等，这种模块就被称为“组件”（component）。
未来的网站开发，可以像搭积木一样，把组件合在一起，就组成了一个网站。很显然，组件非常有利于代码的重复利用。

Web Components就是网页组件的规范。它不是单一的规范，而是一系列的技术组成，包括Template、Custom Element、Shadow DOM、HTML Import等。

## 1.template标签
template标签表示网页中某些重复出现的部分的代码模板。它存在于DOM之中，但是在页面中不可见。

下面的代码用来检查，浏览器是否支持template标签。

```
function supportsTemplate() {
  return 'content' in document.createElement('template');
}

if (supportsTemplate()) {
  // 支持
} else {
  // 不支持
}
```

下面是一个模板的例子。

**<template>元素特点**

* 内容被解析，但是不显示
* 图片资源不会被下载
* 脚本资源不会被下载或者执行
* 只有等到真正使用的时候，才会执行上面的操作

## 2.custom element

### 2.1 document.registerElement方法
### 2.2 添加属性和方法

## 3.Shadow DOM

**特点：**

* 挂载在某一个元素下面，但是不在DOM里面显示
* 完全独立当前文档，不受当前文档样式的影响

## 4.Polymer.js

### 4.1 直接使用的组件
### 4.2 安装
### 4.3 自定义组件
### 4.4 组件的使用方法

## 5.参考链接

http://webcomponents.org/
http://www.polymer-project.org/
http://x-tags.org
