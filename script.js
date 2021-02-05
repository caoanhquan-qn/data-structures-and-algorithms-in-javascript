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

const addUpTo = function (n) {
  return (n * (n + 1)) / 2;
};

console.log(addUpTo(6));

let t1 = performance.now(); // timer

// the number of milliseconds since the document was created
// basically since they open the window

addUpTo(1000);
let t2 = performance.now();
console.log(`Time elapsed: ${(t2 - t1) / 1000} seconds.`);

console.log("///////////////");

function onlyElementsAtEvenIndex(array) {
  var newArray = Array(Math.ceil(array.length / 2));
  for (var i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray[i / 2] = array[i];
    }
  }
  return newArray;
}

const jonas = {
  firstName: "Nick",
  age: 32,
  isSingle: true,
  score: [49, 64, 75, 85],
};

console.log(Object.keys(jonas));

// ["firstName", "age", "isSingle", "score"]

console.log(Object.values(jonas));

// ["Nick", 32, true, Array(4)]

console.log(Object.entries(jonas));

/*
0: (2) ["firstName", "Nick"]
1: (2) ["age", 32]
2: (2) ["isSingle", true]
3: (2) ["score", Array(4)]
*/
console.log(jonas.hasOwnProperty("score")); // true

/*

Write a function which takes in a string and returns counts of each character
in the string

*/

// const counter = function (letter, arr) {
//   let init = 0;
//   arr.forEach((el) => {
//     if (el === letter) init++;
//   });
//   return init;
// };

// const charCount = function (str) {
//   let object = {};
//   const convertToArray = str.toLowerCase().split("");
//   console.log(convertToArray);
//   convertToArray.forEach((letter) => {
//     // guard clause
//     if (!(letter.match(/^[0-9a-z]+$/) !== null)) return;

//     object[`${letter}`] = counter(letter, convertToArray);
//   });

//   return object;
// };

// console.log(charCount("Your PIN number is 1234!"));

// // check if a string is alphanumeric

// const isAlphaNumeric = function (char) {
//   return char.match(/^[0-9a-z]+$/) !== null;
// };

// console.log(isAlphaNumeric("!")); // false
// console.log(isAlphaNumeric("$")); // false
// console.log(isAlphaNumeric("a")); // true

// function charCount(str) {
//   let obj = {};
//   for (let i = 0; i < str.length; i++) {
//     let char = str[i].toLowerCase();
//     if (/[a-z0-9]/.test(char)) {
//       if (obj[char] > 0) {
//         obj[char]++;
//       } else {
//         obj[char] = 1;
//       }
//     }
//   }
//   return obj;
// }

// function charCount(str) {
//   let obj = {};
//   for (let char of str) {
//     char = char.toLowerCase();
//     if (/[a-z0-9]/.test(char)) {
//       obj[char] = ++obj[char] || 1;

//       // || (logical OR) : higher precedence than = (assignment)
//       // false || true => true
//     }
//   }
//   return obj;
// }

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);

  if (
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123) // lower alpha (a-z)
  ) {
    return false;
  }

  return true;
}

function charCount(str) {
  let obj = {};
  for (let char of str) {
    if (isAlphaNumeric(char)) {
      char = char.toLowerCase();
      obj[char] = ++obj[char] || 1;

      // || (logical OR) : higher precedence than = (assignment)
      // false || true => true
    }
  }
  return obj;
}

console.log(charCount("hellooo!!!! HELLO"));

/*

Write a function called same, which accepts two arrays. The function should return 
true if every value in the array has its corresponding value squared in the 
second array. The frequency of values must be the same

*/

// function same(arr1, arr2) {
//   // check length of the arrays
//   if (!(arr1.length === arr2.length)) return false;

//   //loop arr1
//   for (const num1 of arr1) {
//     // loop arr2
//     for (const num2 of arr2) {
//       if (num2 === num1 * num1) {
//         const index = arr2.indexOf(num2);
//         arr2.splice(index, 1);
//         console.log(arr2);
//       }
//     }
//   }
//   if (arr2.length === 0) return true;
//   return false;
// }

// function same(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;
//   for (let i = 0; i < arr1.length; i++) {
//     let correctIndex = arr2.indexOf(arr1[i] ** 2);
//     if (correctIndex === -1) return false;
//     arr2.splice(correctIndex, 1);
//   }
//   return true;
// }

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }

  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) return false;
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) return false;
  }
  return true;
}

// for/in loops through the properties of an object

console.log(same([1, 2, 3], [4, 1, 9])); // true
console.log(same([1, 2, 3], [1, 9])); // false
console.log(same([1, 2, 1], [4, 4, 1])); // false

console.log("///////////////");

/*

Anagrams
Given two strings, write a function to determine if the second string is an 
anagram of the first. An anagram is a word, phrase, or name formed by
rearranging the letters of another, such as cinema, formed from iceman

*/
