# ArrayBuffer：类型化数组
类型化数组是JavaScript操作二进制数据的一个接口。

这要从WebGL项目的诞生说起，所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、实时的数据交换，
它们之间的数据通信必须是二进制的，而不能是传统的文本格式。

比如，以文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像C语言那样，
直接操作字节，然后将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

类型化数组（Typed Array）就是在这种背景下诞生的。它很像C语言的数组，允许开发者以数组下标的形式，直接操作内存。有了类型化数组以后，
JavaScript的二进制数据处理功能增强了很多，接口之间完全可以用二进制数据通信。

## 1.分配内存
类型化数组是建立在ArrayBuffer对象的基础上的。它的作用是，分配一段可以存放数据的连续内存区域。

```
var buf = new ArrayBuffer(32);
```

上面代码生成了一段32字节的内存区域。

ArrayBuffer对象的byteLength属性，返回所分配的内存区域的字节长度。

```
var buffer = new ArrayBuffer(32);
buffer.byteLength
// 32
```

如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。

```
if (buffer.byteLength === n) {
  // 成功
} else {
  // 失败
}
```

ArrayBuffer对象有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。

```
var buffer = new ArrayBuffer(8);
var newBuffer = buffer.slice(0,3);
```

上面代码拷贝buffer对象的前3个字节，生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。

slice方法接受两个参数，第一个参数表示拷贝开始的字节序号，第二个参数表示拷贝截止的字节序号。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。

## 2.视图

### 2.1 视图的生成
ArrayBuffer作为内存区域，可以存放多种类型的数据。不同数据有不同的存储方式，这就叫做“视图”。目前，JavaScript提供以下类型的视图：

```
Int8Array：8位有符号整数，长度1个字节。
Uint8Array：8位无符号整数，长度1个字节。
Int16Array：16位有符号整数，长度2个字节。
Uint16Array：16位无符号整数，长度2个字节。
Int32Array：32位有符号整数，长度4个字节。
Uint32Array：32位无符号整数，长度4个字节。
Float32Array：32位浮点数，长度4个字节。
Float64Array：64位浮点数，长度8个字节。
```

每一种视图都有一个BYTES_PER_ELEMENT常数，表示这种数据类型占据的字节数。

```
Int8Array.BYTES_PER_ELEMENT // 1
Uint8Array.BYTES_PER_ELEMENT // 1
Int16Array.BYTES_PER_ELEMENT // 2
Uint16Array.BYTES_PER_ELEMENT // 2
Int32Array.BYTES_PER_ELEMENT // 4
Uint32Array.BYTES_PER_ELEMENT // 4
Float32Array.BYTES_PER_ELEMENT // 4
Float64Array.BYTES_PER_ELEMENT // 8
```

每一种视图都是一个构造函数，有多种方法可以生成：




## 3.DataView视图

## 4.应用

## 5.参考链接