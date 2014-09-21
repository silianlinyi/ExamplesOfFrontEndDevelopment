# 浏览器的JavaScript引擎

## 1.JavaScript代码嵌入网页的方法
在网页中嵌入JavaScript代码有多种方法。

### 1.1 直接添加代码块
通过script标签，可以直接将JavaScript代码嵌入网页。

```
<script>
// some JavaScript code
</script>
```

### 1.2 加载外部脚本
script标签也可以指定加载外部的脚本文件。

```
<script src="example.js"></script>
```

如果脚本文件使用了非英语字符，还应该注明编码。

```
<script charset="utf-8" src="example.js"></script>
```

加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的console.log语句直接被忽略。

```
<script charset="utf-8" src="example.js">
    console.log('Hello World!');
</script>
```

### 1.3 行内代码
除了上面两种方法，HTML语言允许在某些元素的事件属性和a元素的href属性中，直接写入JavaScript。

```
<div onclick="alert('Hello')"></div>
<a href="javascript:alert('Hello')"></a>
```

这种写法将HTML代码与JavaScript代码混写在一起，非常不利于代码管理，不建议使用。

## 2.外部脚本的加载

### 2.1 网页底部加载
加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续页面渲染。这被称为“阻塞效应”。

这是因为JavaScript代码可能会修改页面，所以必须等它执行完才能接着渲染。由于这个原因，如果某段代码的下载或执行时间特别长，浏览器就会呈现“假死”状态，失去响应。
为了避免这种情况，较好的做法是将script标签都放在页面底部，而不是头部。

将脚本文件都放在网页尾部加载，还有一个好处。在DOM结构生成之前就调用DOM，JavaScript会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时DOM肯定已经生成了。

```
<head>
    <script>
        console.log(document.body.innerHTML); 
    </script>
</head>
```

上面代码执行时会报错，因为此时body元素还未生成。

一种解决方法是设定DOMContentLoaded事件的回调函数。

```
<head>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            console.log(document.body.innerHTML);
         });
    </script>
</head>
```

但是，如果将脚本放在页面底部，连回调函数也不用写了。

```
<body>
    <!-- 其他代码  -->
    <script>
        console.log(document.body.innerHTML);
    </script>
</body>
```

### 2.2 load事件

当script标签指定的外部脚本文件下载和解析完成，会触发一个load事件，可以为这个事件指定回调函数。

```
<script src="jquery.min.js" onload="console.log('jQuery已加载！')"></script>
```

### 2.3 多个脚本的加载
如果有多个script标签，比如下面这样：

```
<script src="1.js"></script>
<script src="2.js"></script>
```

浏览器会同时平行下载1.js和2.js，但是执行时会保证先执行1.js，然后再执行2.js，即使后者先下载完成，也是如此。也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。

当然，加载这两个脚本都会产生“阻塞效应”，必须等到它们都加载完成，浏览器才会继续页面渲染。

此外，对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般最多同时下载六个。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。

### 2.4 defer属性
为了解决脚本文件下载阻塞网页渲染的问题，一个方法是加入defer属性。

```
<script src="1.js" defer></script>
<script src="2.js" defer></script>
```

有了defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在DOMContentLoaded事件触发前执行（即刚刚读取完</html>标签），而且可以保证执行顺序就是它们在页面上出现的顺序。
但是，浏览器对这个属性的支持不够理想，IE（<=9）还有一个bug，无法保证2.js一定在1.js之后执行。

对于内置而不是连接外部脚本的script标签，以及动态生成的script标签，defer属性不起作用。

### 2.5 async属性
解决“阻塞效应”的另一个方法是加入async属性。

```
<script src="1.js" async></script>
<script src="2.js" async></script>
```

async属性可以保证脚本下载的同时，浏览器继续渲染。一旦渲染完成，再执行脚本文件，即“异步执行”。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。
哪个脚本先下载结束，就先执行那个脚本。IE 10支持async属性，低于这个版本的IE都不支持。

如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定。

### 2.6 脚本的动态嵌入
除了用静态的script标签，还可以动态嵌入script标签。

```
['1.js', '2.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
```

这种方法的好处是，动态生成的script标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。

如果想避免这个问题，可以设置async属性为false。

```
['1.js', '2.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
```
上面的代码依然不会阻塞页面渲染，而且可以保证2.js在1.js后面执行。不过需要注意的是，在这段代码后面加载的脚本文件，会因此都等待2.js执行完成后再执行。

此外，动态嵌入还有一个地方需要注意。动态嵌入必须等待CSS文件加载完成后，才会去下载外部脚本文件。静态加载就不存在这个问题，script标签指定的外部脚本文件，都是与CSS文件同时并发下载的。

### 2.7 加载使用的协议
如果不指定协议，浏览器默认采用HTTP协议下载。

```
<script src="example.js"></script>
```

上面的example.js默认就是采用http协议下载，如果要采用HTTPs协议下载，必需写明（假定服务器支持）。

```
<script src="https://example.js"></script>
```

但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。

```
<script src="//example.js"></script>
```

## 3.JavaScript虚拟机




