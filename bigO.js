'use strict';

// Even or odd
// O(1) because runs once regardless
function isEven(value){
  if (value % 2 == 0){
    return true;
  }
  else
    return false;
}

// Are you here?
// O(n^2) polynomial because nested loop; question: arrays aren't related?
function areYouHere(arr1, arr2) {
  for (let i=0; i<arr1.length; i++) {
    const el1 = arr1[i];
    for (let j=0; j<arr2.length; j++) {
      const el2 = arr2[j];
      if (el1 === el2) return true;
    }
  }
  return false;
}

// Doubler
// O(n) linear: perform 1 operation per piece of data regardless of size
function doubleArrayValues(array) {
  for (let i=0; i<array.length; i++) {
    array[i] *= 2;
  }
  return array;
}

// Naive Search
// O(n) linear: same as above
function naiveSearch(array, item) {
  for (let i=0; i<array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
}

// Creating pairs:
// we said O(2^n) exponential: perform sub-loop same # of reps as overall array
// O(n^2) polynomial
// array of 2 items: 4 actions
// array of 100 items: 100 * 100 = 10,000
function createPairs(arr) {
  for (let i = 0; i < arr.length; i++) { // go thru array once
    for(let j = i+1; j < arr.length; j++) { // go thru array almost once
      console.log(arr[i] + ', ' +  arr[j] );
    }
  }
}

// Computing fibonaccis
// A fibonacci sequence is one where every number is the sum of the previous two numbers in the sequence. For example the following is a fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34. The first number always starts at 1 (technically it is 0). Then the second number is 0+1 = 1, the third number is the sum of the first and the second numbers (1 + 2 = 3) and the sequence continues in a similar manner.

// Here, we have a function generateFib that uses iteration to generate a fibonacci sequence. Determine its run time complexity in big O.

// linear: fixed set of steps per each unit of data
function generateFib(num) {
  let result = [];
  for (let i = 1; i <= num; i++) { // once per item

    // we're adding the first item
    // to the result list, append the
    // number 0 to results
    if (i === 1) {
      result.push(0);
    }
    // ...and if it's the second item
    // append 1
    else if (i == 2) {
      result.push(1);
    }

    // otherwise, sum the two previous result items, and append that value to results.
    else {
      result.push(result[i - 2] + result[i - 3]);
    }
  }
  // once the for loop finishes
  // we return `result`.
  return result;
}

//An Efficient Search
//In this example, we return to the problem of searching using a more sophisticated approach than in naive search, above.

//Assume that the input array is always sorted.

// O(log(n)) - cuts data set in half each operation
function efficientSearch(array, item) {
  let minIndex = 0;
  let maxIndex = array.length - 1;
  let currentIndex;
  let currentElement;

  while (minIndex <= maxIndex) {
    currentIndex = Math.floor((minIndex + maxIndex) / 2);
    currentElement = array[currentIndex];

    if (currentElement < item) {
      minIndex = currentIndex + 1;
    }
    else if (currentElement > item) {
      maxIndex = currentIndex - 1;
    }
    else {
      return currentIndex;
    }
  }
  return -1;
}

// Random element
// O(1)... trick question? We only do 1 operation...
function findRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Is it prime?
// O(n)
// O(n!) crazy! for a single input, this could run millions of times.
// for a number 999983, would we run 999981 times?
// This is linear related to value of integer, but should we count # items?
function isPrime(n) {
  // if n is less than 2 or a decimal, it's not prime
  if (n < 2 || n % 1 != 0) { // runs once
    return false;
  }
  // otherwise, check if `n` is divisible by any integer
  // between 2 and n.
  for (let i = 2; i < n; ++i) {
    if (n % i == 0) return false;
  }
  return true;
}

/*=================================================================================
Exercise 1 - Counting Sheep
Write a recursive program that counts how many sheep jumps over the fence. 
Your program should take a number as an input. That number should be the number 
of sheep you have. The program should diplay the number along with the msg "Another 
sheep jumps over the fence" until no more sheep left.
*/

/*
 * @function countSheep
 * @desc     Recursive program that counts how many sheep jumps over the fence. 
 * @param    {number} num - the number sheep 
 * @returns  
 * @display  displays how many sheep jumped over the fence
 */

// 0(n) does function one time per sheep count
function countSheep(num){
  //stopping condition of base case
  if(num === 0){
    console.log('All sheep jumped over the fence');
  } 
  //this is the recursive case
  //this will be executed until it reaches base case
  else{
    console.log(`${num}: Another sheep jumps over the fence`);
    countSheep(num-1);
  }
}
countSheep(10);

/*=================================================================================
Exercise 2 - Array double
Write a program that takes an array as input which contains an unknown set of numbers, 
and output an array which doubles the values of each item in that array. 
Test your solution by trying a handful of different arrays.
*/

/**
* Recursive program that doubles the values of each item in an array
* @param    an array
* @returns  an array with each elements doubled
*/

// o(n) linear does simple operation of multiplication over the array once per number
function double_all(arr) {
  if (!arr.length) {
    return [];
  }
  return [arr[0] * 2, ...double_all(arr.slice(1))];
}
var arr = [10,5,3,4];
console.log(double_all(arr));

/*=================================================================================
Exercise 3 - Reverse String
Write a program that reverses a string. Take a string as input, reverse the string, and return the new string.
*/
// o(n) linear one operation per character = directly proportinal to size of string
function reverse(str) {
  if (str.length < 2) {
    return str;
  }
  return reverse(str.slice(1)) + str[0];
}
console.log(reverse('tauhida'));

/*=================================================================================
Exercise 4 - Triangular Number
Calculates the nth triangular number.
A triangular number counts the objects that can form an equilateral triangle. 
The nth triangular number is the number of dots composing a triangle with n dots on a side, 
and is equal to the sum of the n natural numbers from 1 to n. 
This is the Triangular Number Sequence: 1, 3, 6, 10, 15, 21, 28, 36, 45
                        *
          *           *    *
*     |   *   *  |   *    *    *  |
1st     2nd             3rd             nth?  
*/
//Should always return n*(n+1)/2

// o(n) linear amount of calculation is directly proportional to size of number
function triangle(n) {
  if (n < 2) 
    return n;
  return n + triangle(n - 1);
}

/*=================================================================================
Exercise 5 - String Splitter
Split a string based upon a separator (similar to String.prototype.split).
*/
// o(n) linear Directly proportional to the size of the string inputted
function split(str, sep) {
  var idx = str.indexOf(sep);
  if (idx == -1) 
    return [str];
  return [str.slice(0, idx)].concat(split(str.slice(idx + sep.length), sep))
}
console.log(split('1/12/2017', '/'));

/*=================================================================================
Exercise 6 - Binary Representation
Write a recursive function that prints out the binary representation of a given number. 
For example the program should take 3 as an input and print 11 as output, or 25 as an input 
and print 11001 as an output. Note that the binary representation of 0 should be 0. 
*/

/**
* Recursive program that prints the binary representation of a number
* @param   number 
* @returns  binary representation of that number
*/
//o(log(n)) logrithmic more efficent in larger numbers as it always slices in half
function convertToBinary(num){
  if(num>0){
    let binary = Math.floor(num%2);
    return (convertToBinary(Math.floor(num/2))+ binary);
  }else{
    return '';
  }


}
console.log(convertToBinary(25));

/*=================================================================================
Exercise 7 - Anagrams
An anagram is any word or phrase that exactly reproduces the letters in another order. 
Write a program that creates an anagram (listing all the rearrangements of a word) of a given word. 
For example, if the user types east, the program should list all 24 permutations, including eats, etas, teas, 
and non-words like tsae.
Hint: For your algorithm, you might want to think about a prefix and use that to create the new words. 
For example, given east, use e as a prefix and you would place e in front of all six permutations of ast 
— ast, ats, sat, sta, tas, and tsa. This will give you the words east, eats, esat, esta, etas, and etsa. 
Continue this way until you find all the anagrams for east. There should be 24 of them.
*/
// factorial o(n!) gets crazy big 5*4*3*2*1 // size
function printAnagram(word){
  console.log(`The word for which we will find an anagram is ${word}`);
  anagrams(' ', word);

}
function anagrams(prefix, str){
  if(str.length <= 1){
    console.log(`The anagram is ${prefix}${str}`);
  } else {
    for(let i=0; i<str.length; i++){
      let currentLetter = str.substring(i, i+1);
      let previousLetters = str.substring(0,i);
      let afterLetters = str.substring(i+1);
      anagrams(prefix+currentLetter, previousLetters+afterLetters);
    }
  }

}
printAnagram('east');

/*
Exercise 8 - Animal Hierarchy
*/
// o(n) linear even though we loop through loops we only touch each piece of data once
const AnimalHierarchy = [
  {id: 'Animals','Parent': null},
  {id: 'Mammals','Parent': 'Animals'},
  {id: 'Dogs','Parent':'Mammals' },
  {id: 'Cats','Parent':'Mammals' },
  {id: 'Golden Retriever','Parent': 'Dogs'},
  {id: 'Husky','Parent':'Dogs' },
  {id: 'Bengal','Parent':'Cats' }
]

// ==============================
function traverse(AnimalHierarchy, parent) {
  let node = {};
  
  AnimalHierarchy.filter(item => item.Parent === parent)
    .forEach(item => node[item.id] = traverse(AnimalHierarchy, item.id));
  return node;  
}
console.log(traverse(AnimalHierarchy, null));


/*=================================================================================
Exercise 9 - Factorial
Write a recursive program that finds the factorial of a given number. 
The factorial of a number can be found by multiplying that number by each number 
between itself and one. The factorial of 5 is equal to 5 * 4 * 3 * 2 * 1 = 120
*/
// o(n) linear the output is exponential however, the input will cause the amount of math 
// to rise by a very similar amount of computations
function factorial(n) {  
// Base Case - when n is equal to 0, we stop the recursion
  if (n === 0) {
    return 1;
  }
  // Recursive Case
  // It will run for all other conditions except when n is equal to 0
  return n * factorial(n - 1);
}

console.log(factorial(5)); //120

/*=================================================================================
Exercise 10 - Fibonacci
Write a recursive program that prints the fibonacci sequence of a given number. 
The fibonnaci sequence a series of numbers in which each number is the sum of the two preceding numbers. 
For example the 7th fibonacci number in a fibonaci sequence is  13. The sequence looks as follows: 1 1 2 3 5 8 13.
*/
// o(2^n) exponential growth becaue it multiplies by an certian multiplyer of 2 in this case
function fibonacci(n) {
// Base case
  if (n <= 0) {
    return 0;
  }
  // Base case
  if (n <= 2) {
    return 1;
  }	
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);	
}
console.log(fibonacci(7));

/*=================================================================================
Exercise 11 - Organization Chart
Write a recursive program that prints the following organization chart. Your output should show the output to be 
as shown below with proper indentation to show the hierarchy.
*/

// o(n) linear. the intensity of this function is dependent on the size of the data being
// processed 
var organization = {
  'Zuckerberg': {		
    'Schroepfer': {
      'Bosworth': {
        'Steve':{},
        'Kyle':{},
        'Andra':{}
      },
      'Zhao': {
        'Richie':{},
        'Sofia':{},
        'Jen':{}
      },
      'Badros': {
        'John':{},
        'Mike':{},
        'Pat':{}
      },
      'Parikh': {
        'Zach':{},
        'Ryan':{},
        'Tes':{}
      }
    },
    'Schrage': {
      'VanDyck': {
        'Sabrina':{},
        'Michelle':{},
        'Josh':{}
      },
      'Swain': {
        'Blanch':{},
        'Tom':{},
        'Joe':{}
      },
      'Frankovsky': {
        'Jasee':{},
        'Brian':{},
        'Margaret':{}
      }
    },
    'Sandberg': {
      'Goler': {
        'Eddie':{},
        'Julie':{},
        'Annie':{}
      },
      'Hernandez': {
        'Rowi':{},
        'Inga':{},
        'Morgan':{}
      },
      'Moissinac': {
        'Amy':{},
        'Chuck':{},
        'Vinni':{}
      },
      'Kelley': {
        'Eric':{},
        'Ana':{},
        'Wes':{}
      }
    }}};
function traverse(node, indent=0) {
  for (var key in node) {
    console.log(' '.repeat(indent), key);
    traverse(node[key], indent + 4);
  }
}

console.log(traverse(organization));