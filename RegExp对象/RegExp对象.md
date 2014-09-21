## 正则表达式的两种使用方式

* 使用正则对象本身的方法，将字符串作为参数，比如regex.test(string)。
* 使用字符串对象的方法，将正则对象作为参数，比如string.match(regex)。

## 2.正则对象的属性和方法

### 2.1 属性

正则对象的属性主要如下：

* ignoreCase：放回一个布尔值，表示是否设置了i修饰符，该属性只读
* global：返回一个布尔值，表示是否设置了g修饰符，该属性只读。
* lastIndex：返回下一次开始搜索的位置。该属性可读写，但是只在设置了g修饰符时有意义。
* source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。
* multiline：返回一个布尔值，表示是否设置了m修饰符，该属性只读。

下面是属性应用的实例。

```
var r = /abc/igm;

r.ignoreCase // true
r.global // true
r.multiline // true
r.lastIndex // 0
r.source // "abc"
```

### 2.2 test方法
test方法返回布尔值，用来验证字符串是否符合某个模式。

```
/cat/.test('cats and dogs') // true
```

上面代码验证参数字符串之中是否包含cat，结果返回true。

如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。

```
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false
```
上面代码的正则对象使用了g修饰符，表示要记录搜索位置。接着，三次使用test方法，每一次开始搜索的位置都是上一次匹配的后一个位置。

如果正则模式是一个空字符串，则匹配所有字符串。

```
new RegExp("").test("abc"); // true
```

### 2.3 exec方法
exec方法返回匹配结果。

```
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null
```

上面代码表示，如果匹配成功，exec方法返回一个数组，里面是匹配结果。如果匹配失败，返回null。

如果正则表示式包含圆括号，则返回的数组会包括多个元素。其中，第一个元素是整个匹配成功的结果，后面的元素就是圆括号对应的匹配成功的组，
也就是说第二个元素就对应第一个括号，第三个元素对应第二个括号，以此类推。整个返回数组的length属性等于匹配成功的组数+1。

```
var s = '_x_x';
var r = /_(x)/;

r.exec(s) // ["_x", "x"]
```

上面代码的exex方法，返回一个数组。第一个元素是整个匹配的结果，第二个元素是圆括号匹配的结果。

exec方法的返回数组还包含以下两个属性：

* input：整个原字符串
* index：整个模式匹配成功的开始位置。

```
var r = /a(b+)a/;
var arr = r.exec("_abbba_aba_");
arr
// ["abbba", "bbb"]
arr.index
// 1
arr.input
// "_abbba_aba_"
```

上面代码中的index属性等于1，是因为从原字符串的第二个位置开始匹配成功。

如果正则表达式加上g修饰符，则可以使用多次exec方法，下一次搜索的位置从上一次匹配成功结束的位置开始。

```
var r = /a(b+)a/g;

var a1 = r.exec("_abbba_aba_");
a1 // ["abbba", "bbb"]
a1.index // 1
r.lastIndex // 6

var a2 = r.exec("_abbba_aba_");
a2 // ["aba", "b"]
a2.index // 7
r.lastIndex // 10

var a3 = r.exec("_abbba_aba_");
a3 // null
a3.index // TypeError: Cannot read property 'index' of null
r.lastIndex // 0

var a4 = r.exec("_abbba_aba_");
a4 // ["abbba", "bbb"]
a4.index // 1
r.lastIndex // 6
```

上面代码连续用了四次exec方法，前三次都是从上一次匹配结束的位置向后匹配。当第三次匹配结束以后，整个字符串已经到达尾部，
正则对象的lastIndex属性重置为0，意味着第四次匹配将从头开始。

利用g修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。

```
var r = /a(b+)a/g;
var s = "_abbba_aba_";
while(true) {
    var match = r.exec(s);
    if (!match) break;
    console.log(match[1]);
}
// bbb
// b
```

如果正则对象是一个空字符串，则exec方法会匹配成功，但返回的也是空字符串。

```
var r1 = new RegExp("");
var a1 = r1.exec("abc");
a1 // [""]
a1.index // 0
r1.lastIndex // 0 

var r2 = new RegExp("()");
var a2 = r2.exec("abc");
a2 // ["", ""]
a2.index // 0
r2.lastIndex // 0
```

## 3. 字符串对象的方法
字符串对象的方法之中，有4种与正则对象有关。

* match：返回匹配的子字符串。
* search：按照给定的正则规则进行搜索。
* replace：按照给定的正则规则进行替换。
* split：按照给定规则进行字符串分割。

### 3.1 match方法
match方法对字符串进行正则匹配，返回匹配结果。

```
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1) // ["x"]
s.match(r2) // null
```



### 3.2 search方法

### 3.3 replace方法

### 3.4 split方法


## 4. 匹配规则

































