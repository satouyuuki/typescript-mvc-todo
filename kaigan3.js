// Array()オブジェクトもObject()オブジェクトを継承している

// 「オブジェクトリテラル」とは、{ } や{ a: 10, b: '20' } のように、波括弧を使用してプロパティを格納した（もしくは空の）状態
// プロトタイプチェーンの例
// Object.prototype.foo = 'foo'
// const foo = 'foo';
// console.log(foo.foo);

// 関数生成において、より一般的に使われる方法
// var addFunction = function (num1, num2) { return num1 + num2; }; // 関数式
// function addFunction(num1, num2) { return num1 + num2; } // 関数宣言（function文）

// functionのインスタンスプロパティ
// constructor
// arguments
// length
// インスタンスメソッド
// apply(thisArg, artArray)
// clearInterval(thisArg[, arg1[, arg2[, ...]]])

// 関数は常に値を返す
const yelp = function () {
  console.log('I am yelping!');
}
// console.log(yelp() === undefined);

// 関数もオブジェクトだから変数、配列、オブジェクトに「値」として格納できる

// jsの関数は第一級関数オブジェクトとしても扱うことができる

var addFunction = function (number1, number2) { var sum = number1 + number2; return sum; }

var myObject1 = {
  name: 'myObject',
  myMethod: function(){console.log(this)}
}
var myObject2 = function () { console.log(this); }; 

// var add = function () {
//   return arguments[0] + arguments[1];
// };

// 関数式に()をつけるとその関数が即時実行される
var foo = function foo() {
  console.log(arguments.callee);
}();

var add = function (x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    return 'pass in numbers';
  }
  return x + y;
}

// 関数の実行方法
// 関数、メソッド、コンストラクタ、call(), apply()
var greet = {
  runGreet: function () {
    console.log(this.name, arguments[0], arguments[1]);
  }
}
var cody = { name: 'cody' };
var lisa = { name: 'lisa' };
// greetオブジェクトのrunGreetメソッドをcodyオブジェクトから呼び出しているよ
greet.runGreet.call(cody, 'foo', 'bar');
// lisaオブジェクトの中から呼び出している
greet.runGreet.apply(lisa, ['foo', 'bar']);

// 無名関数を即時実行
(function (msg) {
  console.log(msg);
})('he');
(function (msg) {
  console.log(msg);
})('he');

var speak = function () {
  sayYo();
  function sayYo() { console.log( 'yo') };
}()

// 再起関数
var countDownFrom = function(num) {
  console.log(num);
  num--;
  if (num < 0) return false;
  countDownFrom(num);
}
countDownFrom(5);