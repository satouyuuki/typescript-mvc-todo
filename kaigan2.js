const myObject = {};

myObject.myFunction = () => console.log('hogehoge');
myObject.myArray = [];
myObject.myString = 'string';
myObject.myNumber = 33;
myObject.myDate = new Date();
myObject.myRegExp = /a/;
myObject.myNull = null;
myObject.myUndefined = undefined;
myObject.myObject = {};
myObject.myMath_PI = Math.PI;
myObject.myError = new Error('Error!');

// console.log(myObject);

const myFunction = function () { };
myFunction.myFunction = function () { };
myFunction.myArray = [];
myFunction.myString = 'string'; 
myFunction.myNumber = 33; 
myFunction.myDate = new Date(); 
myFunction.myRegExp = /a/; 
myFunction.myNull = null; 
myFunction.myUndefined = undefined; 
myFunction.myObject = {}; 
myFunction.myMath_PI = Math.PI; 
myFunction.myError = new Error('Error!');

// console.log(myFunction.myArray);

// javascriptのオブジェクトはミュータブル(可変)

// delete 演算子指定したプロパティーを削除することができる配列もok

const myArray = new Array();
myArray.foo = 'foo';
// myArray.foo;

// このjoin()メソッドは、myArrayオブジェクトが自身で持っているわけではありませんが、JavaScriptが「他のどこか」から探してくることができるプロパティにアクセスしました。この「他のどこか」は決められた場所です。JavaScriptによってArray()コンストラクタ関数が定義された際に、Array()関数のprototypeオブジェクトのプロパティに（他の様々なプロパティやメソッドとともに）join()メソッドが加えられました

// __proto__を使って、インスタンスのコンストラクタ関数のprototypeプロパティーを取得することができる

// コンストラクタ関数のプロトタイプチェーンの最後はObjectオブジェクトに行き着く
// オブジェクト.Array.Objectのprototypeに行き着く流れ
// array.__proto__.__proto__

// ホストオブジェクト
for (x in window) console.log(x); // windowオブジェクトのすべてのプロパティを列挙 javascriptのネイティブオブジェクトは列挙されない


