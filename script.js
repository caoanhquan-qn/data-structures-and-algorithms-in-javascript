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

// frequency counter pattern

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
// function validAnagram(str1, str2) {
//   if (str1.length !== str2.length) return false;
//   let obj1 = {};
//   let obj2 = {};
//   for (const val of str1) {
//     obj1[val] = (obj1[val] || 0) + 1;
//   }

//   for (const val of str2) {
//     obj2[val] = (obj2[val] || 0) + 1;
//   }
//   for (let key in obj1) {
//     if (!(key in obj2)) return false;
//     if (obj1[key] !== obj2[key]) return false;
//   }
//   return true;
// }

function validAnagram(first, second) {
  if (first.length !== second.length) return false;
  const lookup = {};
  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }

  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    if (!lookup[letter]) return false;
    else lookup[letter] -= 1;
  }
  return true;
}

console.log(validAnagram("", "")); // true
console.log(validAnagram("aaz", "zza")); // false
console.log(validAnagram("anagram", "nagaram")); // true
console.log(validAnagram("rat", "cat")); //false
console.log(validAnagram("awesome", "awesom")); // false
console.log(validAnagram("qwerty", "qeywrt")); // true
console.log(validAnagram("texttwisttime", "timetwisttext")); // true

/*

Write a function called sumZero which accepts a sorted array of integers. The
function should find the first pair where the sum is 0. Return an array that includes 
both values that sum to zero or undefined if a pair does not exist

*/
// function sumZero(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === 0) {
//         return [arr[i], arr[j]];
//       }
//     }
//   }
// }

// multiple pointers pattern

function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

// time complexity - O(n) and space complexity - O(1)

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // [-3,3]
console.log(sumZero([-2, 0, 1, 3])); // undefined
console.log(sumZero([1, 2, 3])); // undefined

/* 

Implement a function called countUniqueValues, which accepts a sorted array and
counts the unique values in the array. There can be negative numbers in the 
array, but it will always be sorted 

*/

console.log("///////////////");

// function countUniqueValues(arr) {
//   if (arr.length === 0) return 0;

//   let left1 = 0;
//   let left2 = 1;
//   let count = 1;
//   while (left2 < arr.length) {
//     if (arr[left1] === arr[left2]) {
//       left1++;
//       left2++;
//     } else {
//       count++;
//       left1++;
//       left2++;
//     }
//   }
//   return count;
// }

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;

  let left1 = 0;
  let left2 = 1;

  while (left2 < arr.length) {
    if (arr[left1] === arr[left2]) {
      left2++;
    } else {
      left1++;
      arr[left1] = arr[left2];
      left2++;
    }
  }
  return left1 + 1;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
console.log(countUniqueValues([9])); // 1

console.log("///////////////");

/*

 Write a function called maxSubarraySum which accepts an array of integers and
 a number called n. The function should calculate the maximum sum of n
 consecutive elements in the array

*/

// function maxSubarraySum(arr, num) {
//   if (arr.length < num) return null;
//   let i = 0;
//   let j = num - 1;
//   let max = 0;

//   for (let x = 0; x <= j; x++) {
//     max += arr[x];
//   }

//   while (j < arr.length) {
//     let sum = 0;
//     for (let k = i; k <= j; k++) {
//       // console.log(k);
//       sum += arr[k];
//     }
//     // console.log(sum);
//     if (sum > max) {
//       max = sum;
//     }

//     i++;
//     j++;
//   }
//   return max;
// }

// function maxSubarraySum(arr, num) {
//   if (num > arr.length) return null;
//   let max = -Infinity;
//   for (let i = 0; i < arr.length - num + 1; i++) {
//     let temp = 0;
//     for (let j = 0; j < num; j++) {
//       temp += arr[i + j];
//     }
//     if (temp > max) {
//       max = temp;
//     }
//   }
//   return max;
// }

// sliding window

// function maxSubarraySum(arr, num) {
//   let maxSum = 0;
//   let tempSum = 0;
//   if (arr.length < num) return null;
//   for (let i = 0; i < num; i++) {
//     maxSum += arr[i];
//   }
//   tempSum = maxSum;
//   for (let i = num; i < arr.length; i++) {
//     tempSum = tempSum - arr[i - num] + arr[i];
//     maxSum = Math.max(maxSum, tempSum);
//   }
//   return maxSum;
// }

// console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)); // 10
// console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)); // 17
// console.log(maxSubarraySum([4, 2, 1, 6], 1)); // 6
// console.log(maxSubarraySum([4, 2, 1, 6, 2], 4)); //13
// console.log(maxSubarraySum([], 4)); // null

/*

Given a sorted array of integers, write a function called search, that accepts
a value and returns the index where the value passed to the function is located.
If the value is not found, return -1

 */

console.log("///////////////");

// function search(arr, num) {
//   const correctIndex = arr.indexOf(num);
//   return correctIndex;
// }

// function search(arr, num) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === num) {
//       return i;
//     }
//   }
//   return -1;
// }

/* 

binary search
time complexity - O(log n) 

*/
function search(arr, num) {
  let min = 0;
  let max = arr.length - 1;
  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = arr[middle];
    if (currentElement < num) {
      min = middle + 1;
    } else if (currentElement > num) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

console.log(search([1, 2, 3, 4, 5, 6], 4)); // 3
console.log(search([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(search([1, 2, 3, 4, 5, 6], 11)); // -1

console.log("///////////////");

/*
Write a function called sameFrequency. Given two positive integers, find out if
the two numbers have the same frequency of digits  
 */

function sameFrequency(num1, num2) {
  const num1Str = num1 + "";
  const num2Str = num2 + "";
  if (num1Str.length !== num2Str.length) return false;
  let obj1 = {};
  let obj2 = {};
  for (const val of num1Str) {
    obj1[val] = (obj1[val] || 0) + 1;
  }
  for (const val of num2Str) {
    obj2[val] = (obj2[val] || 0) + 1;
  }
  for (const key in obj1) {
    if (!(key in obj2)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); //true
console.log(sameFrequency(22, 222)); // false

console.log("///////////////");

/* 

Implement a function called , areThereDuplicates which accepts a variable number
of arguments and checks whether there are any duplicates among the arguments
passed in. You can solve this using the frequency counter pattern or multiple pointers 
pattern

 */

// frequency counter pattern

// function areThereDuplicates(...arr) {
//   let obj = {};
//   for (const val of arr) {
//     obj[val] = (obj[val] || 0) + 1;
//     if (obj[val] > 1) return true;
//   }
//   return false;
// }

// multiple pointers pattern

// function areThereDuplicates(...arr) {
//   let pointer1 = 0;
//   let pointer2 = 1;
//   while (pointer1 < arr.length - 1) {
//     for (let i = pointer2; i < arr.length; i++) {
//       if (arr[pointer1] === arr[i]) return true;
//     }
//     pointer1++;
//     pointer2++;
//   }
//   return false;
// }

// function areThereDuplicates(...args) {
//   args.sort((a, b) => a > b);
//   let start = 0;
//   let next = 1;
//   while (next < args.length) {
//     if (args[start] === args[next]) {
//       return true;
//     }
//     start++;
//     next++;
//   }
//   return false;
// }

function areThereDuplicates(...args) {
  return new Set(args).size !== args.length;
}
console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates("a", "b", "c", "a")); // true

console.log("///////////////");

/* 
Write a function called averagePair. Given a sorted array of integers and a target
average, determine if there is a pair values in the array where the average of
the pair equals the target average. There may be more than one pair that matches
the average target
 */

// naive solution
// function averagePair(arr, targetNum) {
//   if (arr.length < 1) return false;
//   let start = 0;
//   let next = 1;
//   while (next < arr.length) {
//     for (let i = next; i < arr.length; i++) {
//       if ((arr[start] + arr[i]) / 2 === targetNum) return true;
//     }
//     start++;
//     next++;
//   }
//   return false;
// }

function averagePair(arr, targetNum) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    const avg = (arr[start] + arr[end]) / 2;
    if (avg === targetNum) return true;
    if (avg < targetNum) {
      start++;
    }
    if (avg > targetNum) {
      end--;
    }
  }
  return false;
}

console.log(averagePair([1, 2, 3], 2.5)); // true
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false
console.log(averagePair([], 4)); // false

console.log("///////////////");

/* 
Write a function called isSubsequence which takes in two strings and checks whether
the characters in the first string form a subsequence of the characters in the
second string. In other words, the function should check whether the characters 
in the first string appear somewhere in the second string without their order
changing
 */

// naive solution
// function isSubsequence(str1, str2) {
//   let pointer = 0;
//   for (let i = 0; i < str1.length; i++) {
//     for (let j = pointer; j <= str2.length; j++) {
//       if (str1[i] === str2[j]) {
//         pointer = j + 1;
//         break;
//       }
//       const str = str2.slice(pointer);
//       if (!str.includes(str1[i])) return false;
//     }
//   }
//   return true;
// }

// function isSubsequence(str1, str2) {
//   let i = 0;
//   let j = 0;
//   if (!str1) return true;
//   while (j < str2.length) {
//     if (str2[j] === str1[i]) i++;
//     if (i === str1.length) return true;
//     j++;
//   }
//   return false;
// }

function isSubsequence(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1));
  return isSubsequence(str1, str2.slice(1));
}

console.log(isSubsequence("hello", "hello world")); // true
console.log(isSubsequence("sing", "sting")); // true
console.log(isSubsequence("abc", "abracadabra")); // true
console.log(isSubsequence("abc", "acb")); // false

/* 
Given an array of integers and a number, write a function called maxSubarraySum,
which finds the maximum sum of a subarray with the length of the number passed
to the function.

Note that a subarray must consist of consecutive elements from the original array.

*/

// sliding window pattern

function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;

  if (arr.length < num) return null;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
console.log(maxSubarraySum([100, 200, 300, 400], 2)); // 700
console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)); // 5
console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5
console.log(maxSubarraySum([2, 3], 3)); // null

console.log("///////////////");

/* 

Write a function called minSubArrayLen which accepts two parameters - an array
of positive integers and a positive integer.

This function should return the minimal length of a contiguous subarray of
which the sum is greater than or equal to the integer passed to the function.
If there isn't one, return 0 instead.

*/

function minSubArrayLen(arr, num) {
  let minLen = 1;
  while (minLen <= arr.length) {
    let maxSum = 0;
    let tempSum = 0;
    for (let i = 0; i < minLen; i++) {
      maxSum += arr[i];
    }
    tempSum = maxSum;
    for (let i = minLen; i < arr.length; i++) {
      tempSum = tempSum - arr[i - minLen] + arr[i];
      maxSum = Math.max(maxSum, tempSum);
    }
    if (maxSum >= num) {
      return minLen;
    } else {
      minLen++;
    }
  }
  return 0;
}

console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2
console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2
console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)); // 3
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)); // 5
console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)); // 2
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // 0

console.log("///////////////");
