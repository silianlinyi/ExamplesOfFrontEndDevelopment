# Array 对象

## 4.ECMAScript 5 新加入的数组方法
ECMAScript 5新增了9个数组实例的方法，分别是map、forEach、filter、every、some、reduce、reduceRight、indexOf和lastIndexOf。其中，前7个与函数式（functional）操作有关

这些方法可以在数组上使用，也可以在字符串和类似数组的对象上使用，这是它们不同于传统数组方法的一个地方。

在用法上，这些方法的参数是一个函数，这个作为参数的函数本身又接受三个参数：数组的当前元素elem、该元素的位置index和整个数组arr（详见下面的实例）。
另外，上下文对象（context）可以作为第二个参数，传入forEach(), every(), some(), filter(), map()方法，用来绑定函数运行时的上下文。

对于不支持这些方法的老式浏览器（主要是IE 8及以下版本），可以使用函数库es5-shim，或者Underscore和Lo-Dash。

### 4.1 map方法，forEach方法
map方法对所有元素依次调用一个函数，根据函数结果返回一个新数组。

```
var arr = [1, 2, 3];
arr.map(function(elem, index, arr){
    return elem * elem;
});
// [1, 4, 9]
```

通过函数的call方法，map方法可以用于字符串。

```
[].map.call('abc', function (x) { return x.toUpperCase() })
// [ 'A', 'B', 'C' ]

// 或者

'abc'.split('').map(function (x) { return x.toUpperCase() })
// [ 'A', 'B', 'C' ]
```

forEach方法对所有元素依次执行一个函数，它与map的区别在于不返回新数组，而是对原数组的成员执行某种操作，甚至可能改变原数组的值。

```
var arr = [1, 2, 3];
arr.forEach(function(elem, index, arr){
    return elem * elem;
});
```

从上面代码可以看到，map和forEach的参数格式是一样的，都是一个函数。该函数接受三个参数，分别是当前元素、当前元素的位置（从0开始）、整个数组。

这两个方法都可以接受第二个参数，用来绑定函数中的this关键字。

```
var arr = [1, 2, 3];
arr.map(function(elem, index, arr){
this.push(elem*elem)
}, out);
```

上面代码表示，如果提供一个数组作为第二个参数，则函数内部的this关键字就指向这个数组。

### 4.2 filter方法
filter方法依次对所有数组成员调用一个测试函数，返回结果为true的成员组成一个新数组返回。

```
var arr = [1,2,3,4,5];
arr.filter(function(elem, index, arr){
    return (elem > 3);     
})
// [4,5]
```

上面代码将大于3的原数组成员，作为一个新数组返回。

filter方法的参数必须是一个返回布尔值的函数。该函数的第一个参数是当前数组成员的值，这是必需的，后两个参数是可选的，分别是当前数组成员的位置和整个数组。

```
var arr = [1,2,3,4,5];
arr.filter(function(elem, index, arr){
    return index % 2 === 0;
});
// [1, 3, 5]
```

上面代码返回原数组偶数位置的成员组成的新数组。

### 4.3 some方法，every方法

这两个方法类似“断言”（assert），用来判断数组成员是否符合某种条件。

some方法对所有元素调用一个测试函数，只要有一个元素通过该测试，就返回true，否则返回false

```
var arr = [1,2,3,4,5];
arr.some(function(elem, index, arr){
    return elem >= 3;
});
// 返回true
```

上面代码表示，如果存在大于等于3的数组成员，就返回true。

every方法对所有元素调用一个测试函数，只有所有元素通过该测试，才返回true，否则返回false。

```
var arr = [1,2,3,4,5];
arr.every(function(elem, index, arr){
    return elem >= 3;
});
// 返回false
```

上面代码表示，只有所有数组成员大于等于3，才返回true。

从上面的代码可以看到，some和every的使用方法与map和forEach是一致的，参数完全一模一样。也就是说，它们也可以使用第二个参数，用来绑定函数中的this关键字。

### 4.4 reduce方法，reduceRight方法
reduce和reduceRight方法的作用，是依次处理数组的每个元素，最终累计为一个值。这两个方法的差别在于，reduce对数组元素的处理顺序是从左到右，reduceRight则是从右到左，其他地方完全一样。

reduce方法的第一个参数是一个处理函数。该函数接受四个参数，分别是：

* 用来累计的变量（即当前状态）
* 数组的当前元素
* 当前元素在数组中的序号（从0开始）
* 原数组

这四个参数之中，只有前两个是必须的，后两个则是可选的。

```
[1, 2, 3, 4, 5].reduce(function(x, y){
    return x+y;
});
// 15
```

上面代码的参数x表示累计变量，默认为0，y则是数组的当前元素。reduce方法依次将每个数组元素加入x，最终返回它们的总和15。

利用reduce方法，可以写一个数组求和的sum方法。

```
Array.prototype.sum = function (){
    return this.reduce(function (partial, value){
        return partial + value;
    })
};
[3,4,5,6,10].sum()
// 28
```

如果要对累计变量指定初值，可以把它放在reduce方法的第二个参数。

```
[1, 2, 3, 4, 5].reduce(function(x, y){
    return x+y;
}, 10);
// 25
```

上面代码指定参数x的初值为10，所以数组元素从10开始累加，最终结果为25。

由于reduce方法依次处理每个元素，所以实际上还可以用它来搜索某个元素。比如，下面代码是找出长度最长的数组元素。

```
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, '');
}
```

### 4.5 indexOf 和 lastIndexOf
ECMAScript 5新增的9个方法之中，有2个与函数式编程无关，分别是indexOf和lastIndexOf。

indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。

```
var a = ['a','b','c'];

a.indexOf('b')
// 1

a.indexOf('y')
// -1
```

indexOf方法还可以接受第二个参数，表示搜索的开始位置。

```
['a','b','c'].indexOf('a', 1)
// -1
```

上面代码从位置1开始搜索字符a，结果为-1，表示没有搜索到。

lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

```
var a = [2, 5, 9, 2];

a.lastIndexOf(2)
// 3

a.lastIndexOf(7)
// -1
```

注意，如果数组中包含NaN，这两个方法不适用。

```
[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
```

这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值。

### 4.6 链式使用

上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用。

```
var users = [{name:"tom", email:"tom@example.com"},
             {name:"peter", email:"peter@example.com"}];

users
.map(function (user){ return user.email; })
.filter(function (email) { return /^t/.test(email); })
.forEach(alert);
// 弹出tom@example.com
```

## 5.参考链接

[1] https://github.com/es-shims/es5-shim
[2] http://lodash.com/
[3] http://underscorejs.org/
[4] http://modernweb.com/2013/11/25/fun-with-javascript-native-array-functions/
