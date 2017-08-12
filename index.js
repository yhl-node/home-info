// var request = require('request');
// var {config} = require('./config/config.js');

// console.log(config);

/*
var promise = new Promise(function(resolve){
    resolve(42);
});
promise.then(function(value){
    console.log(value);
}).catch(function(error){
    console.error(error);
});
*/

////  简写
// Promise.resolve(42).then(function(value){
//     console.log(value);
// });

////  执行顺序
// var promise = new Promise(function (resolve){
//     console.log("inner promise"); // 1
//     resolve(42);
// });
// promise.then(function(value){
//     console.log(value); // 3
// });
// console.log("outer promise"); // 2

// function asyncFunction() {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve('Async Hello world');
//         }, 16);
//     });
// }

// asyncFunction().then(function (value) {
//     console.log(value);    // => 'Async Hello world'
// }).catch(function (error) {
//     console.log(error);
// });

/// promise chain
// function taskA() {
//     console.log("Task A");
//     throw new Error("throw Error @ Task A")
// }
// function taskB() {
//     console.log("Task B");
// }
// function onRejected(error) {
//     console.log("Catch Error: A or B", error);
// }
// function finalTask() {
//     console.log("Final Task");
// }

// var promise = Promise.resolve();
// promise
//     .then(taskA)
//     .then(taskB)
//     .catch(onRejected)
//     .then(finalTask);

/// promise chain 中如何传递参数
// function doubleUp(value) {
//     console.log('doubleUp');
//     return value * 2;
// }
// function increment(value) {
//     console.log('increment');
//     return value + 1;
// }
// function output(value) {
//     console.log(value);// => (1 + 1) * 2
// }

// var promise = Promise.resolve(1);
// promise
//     .then(increment)
//     .then(doubleUp)
//     .then(output)
//     .catch(function(error){
//         // promise chain中出现异常的时候会被调用
//         console.error(error);
//     });

/// promise.all
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
var startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (values) {
    console.log(Date.now() - startDate + 'ms');
    // 約128ms
    console.log(values);    // [1,32,64,128]
});


Promise.race([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(value);    // => 1
});