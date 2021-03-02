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

/* ---Problem solving approach--- */

/*

Write a function which takes in a string and returns increments of each character
in the string

*/

// const incrementer = function (letter, arr) {
//   let init = 0;
//   arr.forEach((el) => {
//     if (el === letter) init++;
//   });
//   return init;
// };

// const charincrement = function (str) {
//   let object = {};
//   const convertToArray = str.toLowerCase().split("");
//   console.log(convertToArray);
//   convertToArray.forEach((letter) => {
//     // guard clause
//     if (!(letter.match(/^[0-9a-z]+$/) !== null)) return;

//     object[`${letter}`] = incrementer(letter, convertToArray);
//   });

//   return object;
// };

// console.log(charincrement("Your PIN number is 1234!"));

// // check if a string is alphanumeric

// const isAlphaNumeric = function (char) {
//   return char.match(/^[0-9a-z]+$/) !== null;
// };

// console.log(isAlphaNumeric("!")); // false
// console.log(isAlphaNumeric("$")); // false
// console.log(isAlphaNumeric("a")); // true

// function charincrement(str) {
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

// function charincrement(str) {
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

/* ---Problem solving patterns--- */

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

// frequency incrementer pattern

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  let frequencyincrementer1 = {};
  let frequencyincrementer2 = {};
  for (let val of arr1) {
    frequencyincrementer1[val] = (frequencyincrementer1[val] || 0) + 1;
  }

  for (let val of arr2) {
    frequencyincrementer2[val] = (frequencyincrementer2[val] || 0) + 1;
  }

  for (let key in frequencyincrementer1) {
    if (!(key ** 2 in frequencyincrementer2)) return false;
    if (frequencyincrementer2[key ** 2] !== frequencyincrementer1[key])
      return false;
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

Implement a function called incrementUniqueValues, which accepts a sorted array and
increments the unique values in the array. There can be negative numbers in the 
array, but it will always be sorted 

*/

console.log("///////////////");

// function incrementUniqueValues(arr) {
//   if (arr.length === 0) return 0;

//   let left1 = 0;
//   let left2 = 1;
//   let increment = 1;
//   while (left2 < arr.length) {
//     if (arr[left1] === arr[left2]) {
//       left1++;
//       left2++;
//     } else {
//       increment++;
//       left1++;
//       left2++;
//     }
//   }
//   return increment;
// }

function incrementUniqueValues(arr) {
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

console.log(incrementUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(incrementUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(incrementUniqueValues([])); // 0
console.log(incrementUniqueValues([-2, -1, -1, 0, 1])); // 4
console.log(incrementUniqueValues([9])); // 1

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
passed in. You can solve this using the frequency incrementer pattern or multiple pointers 
pattern

 */

// frequency incrementer pattern

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

/* 

Write a function called findLongestSubstring, which accepts a string and 
returns the length of the longest substring with all distinct characters

*/

function findLongestSubstring(str) {
  let i = 0;
  let j = 0;
  let set = new Set();
  let n = str.length;
  let longest = 0;
  while (i < n && j < n) {
    if (!set.has(str[j])) {
      set.add(str[j]);
      j++;
      longest = Math.max(longest, j - i);
    } else {
      set.delete(str[i]);
      i++;
    }
  }
  return longest;
}

// console.log(findLongestSubstring("")); //0
// console.log(findLongestSubstring("rithmschool")); //7
// console.log(findLongestSubstring("thisisawesome")); //6
// console.log(findLongestSubstring("thecatinthehat")); //7
// console.log(findLongestSubstring("bbbb")); //1
// console.log(findLongestSubstring("longestsubstring")); //8
// console.log(findLongestSubstring("thisishowwedoit")); //6

/*  ---Recursion--- */

// factorial

/*  recursively
note : 0! = 1
 */
// function factorial(num) {
//   if (num === 0) return 1;
//   return num * factorial(num - 1);
// }

// iteratively
function factorial(num) {
  let product = 1;
  for (let i = num; i > 0; i--) {
    product *= i;
  }
  return product;
}
console.log(factorial(4));
console.log(factorial(5));

// incrementdown by recursion
function incrementdown(num) {
  if (num < 0) {
    console.log("All done!!!");
    return "All done. Congratulations!!!";
  }
  console.log(num);
  return incrementdown(num - 1);
}
console.log(incrementdown(6));

// helper method recursion

/* 

Try to collect all of the odd values in an array

 */

// function collectOddValues(arr) {
//   let result = [];
//   function helper(helperInput) {
//     if (helperInput.length === 0) return;
//     if (helperInput[0] % 2 !== 0) {
//       result.push(helperInput[0]);
//     }
//     helper(helperInput.slice(1));
//   }
//   helper(arr);
//   return result;
// }

// pure recursion

function collectOddValues(arr) {
  let newArr = [];
  if (arr.length === 0) {
    return newArr;
  }

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValues(arr.slice(1)));
  return newArr;
}

console.log("///////////////");

/* 
Write a function called power which accepts a base and an exponent. The function
should return the power of the base to the exponent. This function should mimic
the functionality of Math.pow()
 */

function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
// console.log(power(2, 0));
// console.log(power(2, 2));
// console.log(power(2, 4));

/* 
Write a function called productOfArray which takes in an array of numbers and 
returns the product of them all
 */

// function productOfArray(arr) {
//   let product = 1;

//   function helper(helperInput) {
//     if (helperInput.length === 0) return;
//     product = product * helperInput[0];
//     helper(helperInput.slice(1));
//   }

//   helper(arr);
//   return product;
// }

function productOfArray(arr) {
  if (arr.length === 0) {
    return 1;
  }

  return arr[0] * productOfArray(arr.slice(1));
}

console.log(productOfArray([1, 2, 3])); // 6
console.log(productOfArray([1, 2, 3, 10])); // 60

/* 

Write a function called recursiveRange which accepts a number and adds up
all the numbers from 0 to the number passed to the function

 */

function recursiveRange(num) {
  if (num === 0) return 0;
  return num + recursiveRange(num - 1);
}
// console.log(recursiveRange(6));
// console.log(recursiveRange(10));

/* 

fib
Write a recursive function called fib which accepts a number and returns the nth
number in the Fibonacci sequence. Recall that the Fibonacci sequence is the
sequence of whole numbers 0, 1, 1, 2, 3, 5, 8,... which starts with 0 and 1, and
where every number thereafter is equal to the sum of the previous two numbers

 */

// time complexity O(n)
function fib_bottom_up(num) {
  let arr = [0, 1];
  for (let i = 2; i <= num; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr[num];
}

// time complexity O(2^n)
// function fib(num) {
//   if (num === 1) return 1;
//   if (num === 0) return 0;
//   return fib(num - 2) + fib(num - 1);
// }

function fib(n) {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// time complexity O(n)
function fib_memoize(n, memo = []) {
  if (memo[n] !== undefined) {
    return memo[n];
  }
  if (n === 1 || n === 2) {
    return 1;
  }

  let result = fib_memoize(n - 1, memo) + fib_memoize(n - 2, memo);
  memo[n] = result;
  return result;
}

console.log(fib(4)); // 3
console.log(fib(10)); // 55
console.log(fib(28)); // 317811
console.log(fib(35)); // 9227465

console.log("///////////////");

/* 

Write a recursive function called reverse which accepts a string and returns
a new string in reverse

 */

// function reverse(str) {
//   return str.split("").reverse().join("");
// }

// function reverse(str) {
//   let arr = [];
//   for (let i = str.length - 1; i >= 0; i--) {
//     arr.push(str[i]);
//   }
//   return arr.join("");
// }

// function reverse(str) {
//   let arr = [];
//   function helper(helperInput) {
//     if (helperInput.length === 0) {
//       return;
//     }
//     arr.push(helperInput[helperInput.length - 1]);
//     helper(helperInput.slice(0, -1));
//   }
//   helper(str);
//   return arr.join("");
// }

function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}
// console.log(reverse("awesome"));
// console.log(reverse("rithmschool"));

/* 

Write a recursive function called isPalindrome which returns true if the
string passed to it is a palindrome (reads the same forward and backward). 
Otherwise it returns false

 */

// multiple pointers pattern

// function isPalindrome(str) {
//   let i = 0;
//   let j = str.length - 1;
//   while (i < j) {
//     if (str[i] !== str[j]) return false;
//     if (str[i] === str[j]) {
//       i++;
//       j--;
//     }
//   }
//   return true;
// }

// recursive

// function isPalindrome(str) {
//   if (str[0] !== str[str.length - 1]) return false;
//   if (str.length <= 1) return true;
//   return isPalindrome(str.slice(1, -1));
// }

function isPalindrome(str) {
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
}

// console.log(isPalindrome("awesome")); // false
// console.log(isPalindrome("foobar")); // false
// console.log(isPalindrome("tacocat")); // true
// console.log(isPalindrome("amanaplanacanalpanama")); // true
// console.log(isPalindrome("amanaplanacanalpandemonium")); // false

/* 

Write a recursive function called someRecursive which accepts an array and 
a callback. The function returns true if a single value in the array returns
true when passed to the callback. Otherwise it returns false 

*/
const isOdd = (val) => val % 2 !== 0;
// function someRecursive(arr, callback) {
//   for (let i = 0; i < arr.length; i++) {
//     const result = callback(arr[i]);
//     if (result) return true;
//   }
//   return false;
// }

// recursive
function someRecursive(arr, callback) {
  if (arr.length === 0) return false;
  if (callback(arr[0])) return true;
  return someRecursive(arr.slice(1), callback);
}

// console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
// console.log(someRecursive([4, 6, 8, 9], isOdd)); // true
// console.log(someRecursive([4, 6, 8], isOdd)); // false
// console.log(someRecursive([4, 6, 8], (val) => val > 10)); // false

/* 

Write a recursive function called flatten which accepts an array of arrays
and returns a new array with all values flattened  

*/

// function flatten(arr) {
//   return arr.flat(Infinity);
// }

// recursive
// function flatten(arr) {
//   return arr.reduce(
//     (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
//     []
//   );
// }

function flatten(oldArr) {
  let newArr = [];
  for (let i = 0; i < oldArr.length; i++) {
    if (Array.isArray(oldArr[i])) {
      newArr = newArr.concat(flatten(oldArr[i]));
    } else {
      newArr.push(oldArr[i]);
    }
  }
  return newArr;
}

// console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
// console.log(flatten([[1], [2], [3]])); // [1,2,3]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3]

/* 

Write a recursive function called capitalizeFirst. Given an array of strings,
capitalize the first letter of each string in the array 

*/
// function capitalizeFirst(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
//   }
//   return arr;
// }

function capitalizeFirst(arr) {
  let container = [];
  (function helper(helperInput) {
    if (helperInput.length === 0) return;
    const val = helperInput[0][0].toUpperCase() + helperInput[0].slice(1);
    container.push(val);
    helper(helperInput.slice(1));
  })(arr);
  return container;
}

// console.log(capitalizeFirst(["car", "taco", "banana"]));

/*

Write a recursive function called nestedEvenSum. Return the sum of all even
numbers in an object which may contain nested objects.

*/

/* let obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

let obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
}; */

function nestedEvenSum(obj) {
  let sum = 0;
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      sum += nestedEvenSum(obj[key]);
    } else if (Number.isFinite(obj[key]) && obj[key] % 2 === 0) {
      sum += obj[key];
    }
  }
  return sum;
}
// console.log(nestedEvenSum(obj1)); // 6
// console.log(nestedEvenSum(obj2)); // 10

/* 

Write a recursive function called capitalizeWords. Given an array of words, return
a new array containing each word capitalized

*/
// function capitalizeWords(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i].toUpperCase();
//   }
//   return arr;
// }

function capitalizeWords(arr) {
  let container = [];

  function helper(helperInput) {
    if (helperInput.length === 0) return;
    helperInput[0] = helperInput[0].toUpperCase();
    container.push(helperInput[0]);
    helper(helperInput.slice(1));
  }
  helper(arr);

  return container;
}
// console.log(capitalizeWords(["i", "am", "learning", "recursion"]));
// ["I", "AM", "LEARNING", "RECURSION"]

/*

 Write a function called stringifyNumbers which takes in an object and finds
all of the values which are numbers and converts them to strings. Recursion
would be a great way to solve this

 */

function stringifyNumbers(obj) {
  let newObj = {};

  for (let key in obj) {
    if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers(obj[key]);
    } else if (Number.isFinite(obj[key])) {
      newObj[key] = obj[key].toString();
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

// function stringifyNumbers(obj) {
//   for (let key in obj) {
//     if (obj[key] instanceof Object) {
//       stringifyNumbers(obj[key]);
//     } else if (Number.isFinite(obj[key])) {
//       obj[key] = obj[key] + "";
//     }
//   }
//   return obj;
// }

// let obj = {
//   num: 1,
//   test: [],
//   data: {
//     val: 4,
//     info: {
//       isRight: true,
//       random: 66,
//     },
//   },
// };

// console.log(stringifyNumbers(obj));
// console.log(obj);

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

/* 
Write a function called collectStrings which accepts an object and returns
an array of all the values in the object that have a typeof string 
*/

function collectStrings(obj) {
  let arr = [];

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      arr = arr.concat(collectStrings(obj[key]));
    } else if (typeof obj[key] === "string") {
      arr.push(obj[key]);
    }
  }

  return arr;
}

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

// console.log(collectStrings(obj)); // ["foo", "bar", "baz"])
console.log("///////////////");

/* ------Searching Algorithms------ */

/* 
Write a function called linearSearch which accepts an array and a value,
and returns the index at which the value exists. If the value does not exist
in the array, return -1 
*/

function linearSearch(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return i;
    }
  }
  return -1;
}
// console.log(linearSearch([10, 15, 20, 25, 30], 15)); //1
// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)); //5
// console.log(linearSearch([100], 100)); // 0
// console.log(linearSearch([1, 2, 3, 4, 5], 6)); //-1
// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)); //-1
// console.log(linearSearch([100], 200)); //-1

/* 

Write a function called binarySearch which accepts a sorted array and a value
and returns the index at which the value exists. Otherwise, return -1

*/

function binarySearch(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  let middle;
  while (start <= end) {
    middle = Math.floor((start + end) / 2);
    if (arr[middle] === num) return middle;
    if (arr[middle] < num) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}

console.log(binarySearch([2, 5, 6, 9, 13, 15, 28, 30], 9));

/* Naive string search
Suppose you want to increment the number of times a smaller string appears in a longer
string  */

function incrementFrequency(largerStr, smallerStr) {
  let increment = 0;
  let largeLen = largerStr.length;
  let smallLen = smallerStr.length;

  for (let i = 0; i <= largeLen - smallLen; i++) {
    INNER: for (let j = 0; j < smallLen; j++) {
      if (largerStr[i + j] !== smallerStr[j]) {
        break INNER;
      }
      if (j === smallLen - 1) {
        increment++;
      }
    }
  }
  return increment;
}

// console.log(incrementFrequency("caoanhquan", "an"));

/* ----------Sorting Algorithms----------- */

// Bubble sort

function bubbleSort(arr) {
  // const swap = function (arr, index1, index2) {
  //   if (index1 === index2) return;

  //   let temp = arr[index1];
  //   arr[index1] = arr[index2];
  //   arr[index2] = temp;
  // };

  const swap = function (arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };
  let noSwaps;
  for (
    let lastUnsortedIndex = arr.length - 1;
    lastUnsortedIndex > 0;
    lastUnsortedIndex--
  ) {
    noSwaps = true;
    for (let i = 0; i < lastUnsortedIndex; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}
// console.log(bubbleSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50]));

// Selection sort

function selectionSort(arr) {
  const swap = function (arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };
  let minIndex;

  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }

  return arr;
}

// console.log(selectionSort([3, 44, 38, 27, 10, 1]));
// console.log(selectionSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 46, 4, 19, 50]));
// console.log(selectionSort([34, 22, 10, 19, 17]));

// insertion sort

function insertionSort(arr) {
  for (
    let firstUnsortedIndex = 1;
    firstUnsortedIndex < arr.length;
    firstUnsortedIndex++
  ) {
    let newElement = arr[firstUnsortedIndex];
    let i;
    for (i = firstUnsortedIndex; i > 0 && arr[i - 1] > newElement; i--) {
      arr[i] = arr[i - 1];
    }
    arr[i] = newElement;
  }

  return arr;
}

/* 

insertion technique

- create newElement = arr[firstUnsortedIndex] : keep track the value that we're looking at
- arr[i] = arr[i -1] : move the array forward 1 index 

 */

// console.log(insertionSort([20, 35, -15, 7, 55]));
console.log("///////////////");

// merge sort
/* 
Merge two sorted arrays
Given two sorted arrays, the task is to merge them in a sorted manner

Input: arr1 = [1,3,4,5] and arr2 =[2,4,6,8]
Output: arr3 =[1,2,3,4,4,5,6,8]
*/

// merge helper
function mergingArray(arr1, arr2) {
  let arr = [];
  let i = 0,
    j = 0;

  // traverse both array
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arr.push(arr1[i]);
      i++;
    } else {
      arr.push(arr2[j]);
      j++;
    }
  }

  // store remaining elements of first array
  while (i < arr1.length) {
    arr.push(arr1[i]);
    i++;
  }
  // store remaining elements of second array
  while (j < arr2.length) {
    arr.push(arr2[j]);
    j++;
  }

  return arr;
}

// console.log(mergingArray([1, 3, 4, 5], [2, 4, 6, 8]));

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let middle = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, middle));
  let right = mergeSort(arr.slice(middle));

  return mergingArray(left, right);
}
// console.log(mergeSort([12, 11, 13, 5, 6, 7]));

// quick sort

// pivot helper
function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = function (arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };
  let pivotIndex = start;
  let pivotValue = arr[start];

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotValue) {
      pivotIndex++;
      swap(arr, pivotIndex, i);
    }
  }
  swap(arr, start, pivotIndex);
  return pivotIndex;
}

console.log(pivot([5, 2, 1, 8, 4, 7, 6, 3])); //4
console.log(pivot([11, 10, 40, 50, 6])); // 2

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    let index = pivot(arr, start, end);
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
  }

  return arr;
}

console.log(quickSort([5, 2, 1, 8, 4, 7, 6, 3]));

/* 
radix sort
radix = base
*/

// radix helper method
// find the digit in [num] at the given [place] value
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
// find the number of digits in [num]
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

//find the number of digits in the largest numbers in the list
function mostDigits(arr) {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arr[i]));
  }
  return maxDigits;
}

function radixSort(arr) {
  const maxDigitCount = mostDigits(arr);
  for (let k = 0; k < maxDigitCount; k++) {
    let bucket = [...Array(10)].map(() => []);
    for (let i = 0; i < arr.length; i++) {
      bucket[getDigit(arr[i], k)].push(arr[i]);
    }
    arr = bucket.flat(1);
    // arr = [].concat(...bucket);
  }
  return arr;
}

console.log(radixSort([3221, 2, 10, 9680, 577]));

/* ----------Data Structures---------- */

// singly linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // time complexity : O(1)
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // time complexity : O(n)
  pop() {
    if (!this.head) return undefined;
    if (this.length === 1) {
      let popped = this.head;
      this.head = this.tail = null;
      this.length = 0;
      return popped;
    }

    let current = this.head;
    let secondLast;
    while (current.next) {
      secondLast = current;
      current = current.next;
    }
    secondLast.next = null;
    this.tail = secondLast;
    this.length--;
    return current;
  }

  // time complexity : O(1)
  shift() {
    if (!this.head) return undefined;
    if (this.length === 1) {
      let shifted = this.head;
      this.head = this.tail = null;
      this.length = 0;
      return shifted;
    }
    let currentHead = this.head;
    this.head = currentHead.next;
    currentHead.next = null;
    this.length--;
    return currentHead;
  }

  // time complexity : O(1)
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter < index) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(index, value) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = value;
      return true;
    }
    return false;
  }
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) {
      return !!this.push(value);
    }
    if (index === 0) {
      return !!this.unshift(value);
    }
    let newNode = new Node(value);
    let nextToIndex = this.get(index - 1);
    newNode.next = nextToIndex.next;
    nextToIndex.next = newNode;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }

    let prevNode = this.get(index - 1);
    let removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }
  // common Javascript interview question
  reverse() {
    this.tail = this.head;
    let next;
    let prev;
    let current = this.head;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    return this;
  }
  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}
let list = new SinglyLinkedList();
list.push("you");
list.push("are");
list.push("welcome");
list.push("!!!");

// doubly linked list

class DoublyNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new DoublyNode(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    if (this.length === 1) {
      let popped = this.head;
      this.head = this.tail = null;
      this.length = 0;
      return popped;
    }
    let currentTail = this.tail;
    this.tail = currentTail.prev;
    this.tail.next = null;
    currentTail.prev = null;
    this.length--;
    return currentTail;
  }
  shift() {
    if (!this.head) return undefined;
    if (this.length === 1) {
      let shifted = this.head;
      this.head = this.tail = null;
      this.length = 0;
      return shifted;
    }
    let currentHead = this.head;
    this.head = currentHead.next;
    this.head.prev = null;
    currentHead.next = null;
    this.length--;
    return currentHead;
  }
  unshift(val) {
    let newNode = new DoublyNode(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    const indexToHead = index;
    const indexToTail = this.length - 1 - index;
    let counter = 0;
    let current;
    if (indexToHead <= indexToTail) {
      current = this.head;
      while (counter < indexToHead) {
        current = current.next;
        counter++;
      }
    } else {
      current = this.tail;
      while (counter < indexToTail) {
        current = current.prev;
        counter++;
      }
    }
    return current;
  }
  set(index, value) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = value;
      return true;
    }
    return false;
  }
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) {
      return !!this.push(value);
    }
    if (index === 0) {
      return !!this.unshift(value);
    }
    let newNode = new DoublyNode(value);
    let indexNode = this.get(index);
    newNode.next = indexNode;
    newNode.prev = indexNode.prev;
    indexNode.prev.next = newNode;
    indexNode.prev = newNode;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    let removedNode = this.get(index);
    let prevNode = removedNode.prev;
    prevNode.next = removedNode.next;
    removedNode.next.prev = prevNode;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;
    return removedNode;
  }
  reverse() {
    let current = this.head;
    this.tail = current;
    let temp;

    // swap next and prev of all nodes of doubly linked list

    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    if (temp) {
      this.head = temp.prev;
    }
    return this;
  }

  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}
let doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.push("wishing");
doublyLinkedList.push("you");
doublyLinkedList.push("a");
doublyLinkedList.push("happy");
doublyLinkedList.push("new");
doublyLinkedList.push("year");

// stack
class StackNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /* add to the beginning, time complexity: O(1) */
  push(val) {
    let newNode = new StackNode(val);
    if (!this.first) {
      this.first = this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }

  /* remove from the beginning, time complexity: O(1) */
  pop() {
    if (!this.first) return null;
    let current = this.first;
    if (this.size === 1) {
      this.first = this.last = null;
      this.size = 0;
      return current.val;
    }
    this.first = current.next;
    current.next = null;
    this.size--;
    return current.val;
  }

  print() {
    const arr = [];
    let current = this.first;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}
let stack = new Stack();

// queue

class QueueNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /* 

  enqueue : to add an item to a queue
  add to the end, time complexity O(1)
  similar to push(val) in singly linked list

   */

  enqueue(val) {
    let newNode = new QueueNode(val);
    if (!this.first) {
      this.first = this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  /*  
 
  dequeue : to remove from a queue
  remove from the beginning, time complexity: O(1) 
  similar to shift() in singly linked list

  */
  dequeue() {
    if (!this.first) return null;
    let current = this.first;
    if (this.size === 1) {
      this.first = this.last = null;
      this.size = 0;
      return current.val;
    }
    this.first = current.next;
    current.next = null;
    this.size--;
    return current.val;
  }
  print() {
    const arr = [];
    let current = this.first;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}

/* 

additionally, we can add to the beginning and remove from the end 
but that isn't efficient

*/
let queue = new Queue();

// Implement Stack using two Queues
class StackUsingQueue {
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
    this.size = 0;
  }
  push(val) {
    this.q1.enqueue(val);
    this.size++;
    return this;
  }
  pop() {
    if (this.size === 0) return null;
    while (this.q1.size !== 1) {
      this.q2.enqueue(this.q1.dequeue());
    }

    let temp = this.q1.dequeue();
    let queue = new Queue();
    queue = this.q1;
    this.q1 = this.q2;
    this.q2 = queue;
    this.size--;
    return temp;
  }
}

// Binary Search Tree
class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(val) {
    let newNode = new BSTNode(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }
  includes(val) {
    if (!this.root) return false;

    let current = this.root;
    while (true) {
      if (current.val === val) return true;
      if (current.val > val) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) return false;
    }
  }
  find(val) {
    if (!this.root) return undefined;

    let current = this.root;
    while (true) {
      if (current.val === val) return current;
      if (current.val > val) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) return undefined;
    }
  }

  kthSmallestNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  removeNode(current, value) {
    if (current === null) return current;
    if (value === current.val) {
      if (current.left === null && current.right === null) {
        return null;
      } else if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        let tempNode = this.kthSmallestNode(current.right);
        current.val = tempNode.val;

        current.right = this.removeNode(current.right, tempNode.val);
        return current;
      }
    } else if (value < current.val) {
      current.left = this.removeNode(current.left, value);
      return current;
    } else {
      current.right = this.removeNode(current.right, value);
      return current;
    }
  }
  remove(val) {
    this.root = this.removeNode(this.root, val);
  }
  findSecondLargest() {
    const data = this.dfs_InOrder();
    return data[data.length - 2];
  }

  /* A balanced tree is defined as a tree where the depth of all leaf nodes or 
  nodes with single child differ by no more than 1 */

  findHeight(node) {
    if (node === null) return -1;
    return (
      1 + Math.max(this.findHeight(node.left), this.findHeight(node.right))
    );
  }

  isBalanced(node) {
    if (node === null) return true;
    let leftHeight = this.findHeight(node.left);
    let rightHeight = this.findHeight(node.right);
    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    }
    return false;
  }
  isBalanced() {
    if (this.root === null) return true;
    let leftHeight = this.findHeight(this.root.left);
    let rightHeight = this.findHeight(this.root.right);
    if (Math.abs(leftHeight - rightHeight) <= 1) return true;
    return false;
  }

  bfs() {
    let queue = [],
      visited = [];
    if (this.root === null) return [];
    queue.push(this.root);
    while (queue.length !== 0) {
      const dequeued = queue.shift();
      visited.push(dequeued.val);
      if (dequeued.left) {
        queue.push(dequeued.left);
      }
      if (dequeued.right) {
        queue.push(dequeued.right);
      }
    }

    return visited;
  }
  dfs_PreOrder() {
    let visited = [];
    let current = this.root;
    if (!current) return [];
    function preOrder(node) {
      visited.push(node.val);
      if (node.left) {
        preOrder(node.left);
      }
      if (node.right) {
        preOrder(node.right);
      }
    }
    preOrder(current);
    return visited;
  }
  dfs_PostOrder() {
    let visited = [];
    let current = this.root;
    if (!current) return [];
    function postOrder(node) {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      visited.push(node.val);
    }
    postOrder(current);
    return visited;
  }
  dfs_InOrder() {
    let visited = [];
    let current = this.root;
    if (!current) return [];
    function inOrder(node) {
      if (node.left) inOrder(node.left);
      visited.push(node.val);
      if (node.right) inOrder(node.right);
    }
    inOrder(current);
    return visited;
  }
}

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(3);
tree.insert(9);
tree.insert(22);
tree.insert(35);
tree.insert(85);
tree.insert(77);
tree.insert(2);
tree.insert(19);

// Binary Heap
class MaxBinaryHeap {
  constructor() {
    this.values = [55, 39, 41, 18, 27, 12, 33];
  }
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this.values;
  }
  bubbleUp() {
    let index = this.values.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    let temp;
    while (this.values[index] > this.values[parentIndex]) {
      temp = this.values[parentIndex];
      this.values[parentIndex] = this.values[index];
      this.values[index] = temp;
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return max;
  }
  sinkDown() {
    let parentIndex = 0;
    let leftChildIndex = 2 * parentIndex + 1;
    let rightChildIndex = 2 * parentIndex + 2;
    const element = this.values[parentIndex];
    while (
      this.values[parentIndex] < this.values[leftChildIndex] ||
      this.values[parentIndex] < this.values[rightChildIndex]
    ) {
      if (
        this.values[leftChildIndex] > this.values[parentIndex] &&
        this.values[rightChildIndex] < this.values[parentIndex]
      ) {
        this.values[parentIndex] = this.values[leftChildIndex];
        this.values[leftChildIndex] = element;
        parentIndex = leftChildIndex;
        leftChildIndex = 2 * parentIndex + 1;
        rightChildIndex = 2 * parentIndex + 2;
      } else if (
        this.values[rightChildIndex] > this.values[parentIndex] &&
        this.values[leftChildIndex] < this.values[parentIndex]
      ) {
        this.values[parentIndex] = this.values[rightChildIndex];
        this.values[rightChildIndex] = element;
        parentIndex = rightChildIndex;
        leftChildIndex = 2 * parentIndex + 1;
        rightChildIndex = 2 * parentIndex + 2;
      } else if (
        this.values[leftChildIndex] > this.values[parentIndex] &&
        this.values[rightChildIndex] > this.values[parentIndex]
      ) {
        let maxValue = Math.max(
          this.values[leftChildIndex],
          this.values[rightChildIndex]
        );
        let swapIndex =
          maxValue === this.values[leftChildIndex]
            ? leftChildIndex
            : rightChildIndex;
        this.values[parentIndex] = this.values[swapIndex];
        this.values[swapIndex] = element;
        parentIndex = swapIndex;
        leftChildIndex = 2 * parentIndex + 1;
        rightChildIndex = 2 * parentIndex + 2;
      }
    }
  }
}
let heap = new MaxBinaryHeap();
/* maxbinaryheap.insert(12);
maxbinaryheap.insert(27);
maxbinaryheap.insert(18);
maxbinaryheap.insert(39);
maxbinaryheap.insert(33);
maxbinaryheap.insert(41);
maxbinaryheap.insert(55); */

/* 

test case 1
[70, 67, 65, 45, 58, 40, 53, 44, 15, 31]
[67, 58, 65, 45, 31, 40, 53, 44, 15]  
[65, 58, 53, 45, 31, 40, 15, 44]

test case 2
[55, 39, 41, 18, 27, 12, 33]
[41, 39, 33, 18, 27, 12]
[39, 27, 33, 18, 12]

*/

class MinBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this.values;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (parent <= element) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  extractMin() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0]; // keep track of this variable
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChid, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChid = this.values[leftChildIdx];
        if (element > leftChid) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild < element) ||
          (swap !== null && rightChild < leftChid)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}
let minheap = new MinBinaryHeap();

// Priority Queue

class PQNode {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new PQNode(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
    return this.values;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (parent.priority <= element.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0]; // keep track of this variable
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChid, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChid = this.values[leftChildIdx];
        if (element.priority > leftChid.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChid.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  print() {
    return this.values.map((element) => `${element.val}: ${element.priority}`);
  }
}
let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("nick", 5);
priorityQueue.enqueue("steven", 1);
priorityQueue.enqueue("zhang", 4);
priorityQueue.enqueue("lee", 2);
priorityQueue.enqueue("kento", 3);

/* Hash Table */

// hash function
// function hash(key, arrayLen) {
//   let total = 0;
//   for (let char of key) {
//     let value = char.charCodeAt(0) - 96;
//     total = (total + value) % arrayLen;
//   }
//   return total;
// }

// improve hash function
function hash(key, arrayLen) {
  let total = 0;
  let WEIRD_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * WEIRD_PRIME + value) % arrayLen;
  }
  return total;
}

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }
  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }
  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = []; // [] = truthy, [] = Array(0)
    }
    this.keyMap[index].push([key, value]);
  }
  get(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      for (let element of this.keyMap[index]) {
        const [foundKey, foundValue] = element;
        if (foundKey === key) return foundValue;
      }
    }
    return undefined;
  }
  keys() {
    let keysArr = [];
    const elements = this.keyMap.flat();
    for (const element of elements) {
      const [foundKey] = element;
      if (!keysArr.includes(foundKey)) {
        keysArr.push(foundKey);
      }
    }
    return keysArr;
  }
  values() {
    let valuesArr = [];
    const elements = this.keyMap.flat();
    for (const element of elements) {
      const [_, foundValue] = element;
      if (!valuesArr.includes(foundValue)) {
        valuesArr.push(foundValue);
      }
    }
    return valuesArr;
  }
}

let ht = new HashTable();
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
ht.set("lightcoral", "#F08080");
ht.set("mediumvioletred", "#C71585");
ht.set("plum", "#DDA0DD");

/* Graphs */

// undirected graph
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(vertex1, vertex2) {
    for (const key of Object.keys(this.adjacencyList)) {
      if (key === vertex1) {
        this.adjacencyList[vertex1].push(vertex2);
      }
      if (key === vertex2) {
        this.adjacencyList[vertex2].push(vertex1);
      }
    }
    return this.adjacencyList;
  }
  removeEdge(vertex1, vertex2) {
    for (const key of Object.keys(this.adjacencyList)) {
      if (key === vertex1) {
        const index = this.adjacencyList[vertex1].indexOf(vertex2);
        if (index !== -1) {
          this.adjacencyList[vertex1].splice(index, 1);
        }
      }
      if (key === vertex2) {
        const index = this.adjacencyList[vertex2].indexOf(vertex1);
        if (index !== -1) {
          this.adjacencyList[vertex2].splice(index, 1);
        }
      }
    }
    return this.adjacencyList;
  }
  removeVertex(vertex) {
    for (const key of Object.keys(this.adjacencyList)) {
      if (key === vertex) {
        while (this.adjacencyList[vertex].length) {
          const adjacentVertex = this.adjacencyList[vertex].pop();
          this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
      }
    }
    return this.adjacencyList;
  }
  dfs_recursive(start) {
    if (!this.adjacencyList[start]) return null;
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    })(start);

    return result;
  }
  dfs_iterative(start) {
    if (!this.adjacencyList[start]) return null;
    const s = new Stack();
    const result = [];
    const visited = {};
    let currentVertex;
    s.push(start);
    while (s.size) {
      currentVertex = s.pop();
      if (!visited[currentVertex]) {
        visited[currentVertex] = true;
        result.push(currentVertex);
        this.adjacencyList[currentVertex].forEach((neighbor) => {
          if (!visited[neighbor]) {
            s.push(neighbor);
          }
        });
      }
    }
    return result;
  }
  bfs(start) {
    if (!this.adjacencyList[start]) return null;
    const result = [];
    const visited = {};
    const q = new Queue();
    let currentVertex;

    q.enqueue(start);
    visited[start] = true;
    while (q.size) {
      currentVertex = q.dequeue();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          q.enqueue(neighbor);
        }
      });
    }
    return result;
  }
}
let graph = new Graph();

/* 

graph.addVertex("Tokyo");
graph.addVertex("Dallas");
graph.addVertex("Aspen");
graph.addVertex("Hong Kong");
graph.addVertex("Los Angeles");

//////
graph.addEdge("Tokyo", "Dallas");
graph.addEdge("Tokyo", "Hong Kong");
graph.addEdge("Dallas", "Aspen");
graph.addEdge("Dallas", "Hong Kong");
graph.addEdge("Dallas", "Los Angeles");
graph.addEdge("Hong Kong", "Los Angeles"); 

*/

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

////
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

// dijkstra's algorithm
class SimplePriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }

  // time complexity O(n * log(n))
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  dijkstra(start, end) {
    const queue = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;
    for (let vertex of Object.keys(this.adjacencyList)) {
      if (vertex === start) {
        distances[vertex] = 0;
        queue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        queue.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    while (queue.values.length) {
      smallest = queue.dequeue().val;
      if (smallest === end) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let candidate = distances[smallest] + nextNode.weight;
          if (candidate < distances[nextNode.node]) {
            distances[nextNode.node] = candidate;
            previous[nextNode.node] = smallest;
            queue.enqueue(nextNode.node, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

let g = new WeightedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
////
g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

// Trie
class Trie {
  constructor() {
    this.characters = {};
    this.isWord = false;
  }
  addWord(word, index = 0) {
    if (index === word.length) {
      this.isWord = true;
    } else if (index < word.length) {
      let char = word[index];
      let subTrie = this.characters[char] || new Trie();
      subTrie.addWord(word, index + 1);
      this.characters[char] = subTrie;
    }
    return this;
  }
  removeWord(word) {
    if (word[0] === undefined) {
      this.isWord = false;
      return this;
    } else if (Object.keys(this.characters[word[0]].characters).length === 1) {
      this.isWord = false;
      delete this.characters[word[0]];
    } else if (Object.keys(this.characters[word[0]].characters).length > 1) {
      let subTrie = this.characters[word[0]];
      subTrie.removeWord(word.substr(1));
    }
    return this;
  }
  findWord(word, index = 0) {
    // This function will return the node in the trie
    // which corresponds to the end of the passed in word.

    // Be sure to consider what happens if the word is not in this Trie.

    var char = word[index];
    if (index < word.length - 1 && this.characters[char]) {
      index += 1;
      return this.characters[char].findWord(word, index);
    } else {
      return this.characters[char];
    }
  }
  getWords(words = [], currentWord = "") {
    // This function will return all the words which are
    // contained in this Trie.
    // it will use currentWord as a prefix,
    // since a Trie doesn't know about its parents.

    if (this.isWord) {
      words.push(currentWord);
    }
    for (var char in this.characters) {
      var nextWord = currentWord + char;
      this.characters[char].getWords(words, nextWord);
    }
    return words;
  }
  autoComplete(prefix) {
    // This function will return all completions
    // for a given prefix.
    // It should use find and getWords.
    var subTrie = this.findWord(prefix);
    if (subTrie) {
      return subTrie.getWords([], prefix);
    } else {
      return [];
    }
  }
}
let trie = new Trie();
