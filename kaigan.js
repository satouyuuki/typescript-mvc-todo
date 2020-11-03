var myString = 'foo'; // プリミティブ型文字列
var primitiveString = String('foo');
var objectString = new String('foo');
// var myStringCopy = myString;
// var myString = null;
// console.log(myString, myStringCopy);
// console.log(myString === primitiveString);
// console.log(myString === objectString);

// オブジェクトはメモリ上のアドレスに保存される
// var myObject = {};
// var copyObject = myObject;
// myObject.foo = 'baa';
// console.log(myObject, copyObject);

// プリミティブ型でもオブジェクトのように扱われたときは一時的にオブジェクトになる
var num = 23;
num.toString(); // '23'

var CustomConstructor = function () {
  this.foo = 'bar';
}
var instanceOfCustomObject = new CustomConstructor;
console.log(instanceOfCustomObject instanceof CustomConstructor);

// インスタンスは自身のプロパティーを持つことができる
var myArray = new Array();
myArray.prop = 'test';
console.log(myArray.prop);

// よくみるとbooleanでさえもobject
// [[PrimitiveValue]]: false

// Object()オブジェクトとjavascriptオブジェクトは違う