"use strict";

/*
Suppose we want to write a function that calculates the sum of all numbers from 1 
up to (and including) some number n
*/

// const addUpTo = function (n) {
//   let total = 0;
//   for (let i = 1; i <= n; i++) {
//     total += i;
//   }
//   return total;
// };

// const addUpTo = function (n) {
//   return (n * (n + 1)) / 2;
// };

// console.log(addUpTo(6));

// timer

// let t1 = performance.now();

// the number of milliseconds since the document was created
// basically since they open the window

// addUpTo(1000);
// let t2 = performance.now();
// console.log(`Time elapsed: ${(t2 - t1) / 1000} seconds.`);

// function onlyElementsAtEvenIndex(array) {
//   var newArray = Array(Math.ceil(array.length / 2));
//   for (var i = 0; i < array.length; i++) {
//     if (i % 2 === 0) {
//       newArray[i / 2] = array[i];
//     }
//   }
//   return newArray;
// }

// const jonas = {
//   firstName: "Nick",
//   age: 32,
//   isSingle: true,
//   score: [49, 64, 75, 85],
// };

// console.log(Object.keys(jonas));

// ["firstName", "age", "isSingle", "score"]

// console.log(Object.values(jonas));

// ["Nick", 32, true, Array(4)]

// console.log(Object.entries(jonas));

/*
0: (2) ["firstName", "Nick"]
1: (2) ["age", 32]
2: (2) ["isSingle", true]
3: (2) ["score", Array(4)]
*/
// console.log(jonas.hasOwnProperty("score")); // true

/*

Write a function which takes in a string and returns counts of each character
in the string

*/

const counter = function (letter, arr) {
  let init = 0;
  arr.forEach((el) => {
    if (el === letter) init++;
  });
  return init;
};

const charCount = function (str) {
  let object = {};
  const convertToArray = str.toLowerCase().split("");
  console.log(convertToArray);
  convertToArray.forEach((letter) => {
    // guard clause
    if (!(letter.match(/^[0-9a-z]+$/) !== null)) return;

    object[`${letter}`] = counter(letter, convertToArray);
  });

  return object;
};

console.log(charCount("Your PIN number is 1234!"));

// check if a string is alphanumeric

const isAlphaNumeric = function (char) {
  return char.match(/^[0-9a-z]+$/) !== null;
};

console.log(isAlphaNumeric("!")); // false
console.log(isAlphaNumeric("$")); // false
console.log(isAlphaNumeric("a")); // true
