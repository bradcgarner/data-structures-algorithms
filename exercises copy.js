'use strict';

// Write an O(n) algorithm to sort an array of integers, where you know in advance what the lowest and highest values are.
// get delta of high and low; that is length
// newArray[value-low] = array[currentIndex]
// array=[40, 5, 19]
// length = 35; newArray[5] = array[1]
// this IS A BUCKET SORT, ICE TRAY ANALOGY
const sortAlreadyKnow = (array, hi, lo) => {
  const delta = hi - lo;
  // console.log(hi,lo,delta)
  let newArr = new Array(delta);
  array.forEach((item, index) => {
    newArr[item-lo] = item;
  });
  return newArr;
};


const array = [40,5,19,21,33,55,-1,67,83];
// NOTE: need to correct for negative numbers, move everything up by lowest negative number
// console.log(sortAlreadyKnow(array,55,-1));



// Write an algorithm to shuffle an array into a random order in-place (i.e. without creating a new array).
// create a random number generator; use Math.floor(Math.random()*(array.length-1)); always valid index
// call 2 random indices and swap
// do that for a given % of array.length, say 20% or 100%

const randomizer = array => {
  array.forEach((item, index)=> {
    let swapper = item;
    let randomIndex = Math.floor(Math.random()*(array.length-1));
    array[index] = array[randomIndex];
    array[randomIndex] = swapper;
  });
  return array;
};

console.log(randomizer(array));
// 1 2 3 4 5 6 7 8
// 1 = item
// swapper = item = 1
// randomIndex = 4
// array[index] = array[randomIndex] 
// array[randomIndex] = swapper
// 4 2 3 1 5 6 7 8


// Imagine that I gave you twenty books to sort in alphabetical order. How would you go about it? Can you express this as an algorithm?
// convert text to lowercase, convert the text to array of characters, 
// sort the array of arrays (using index[0] only) via your favorite sorting algorithm
// then start at the first array and recursively sort each group of arrays with matching first letters until first letters no longer match

// a b b a
// a p p l e
// b a n a n a
// b a a a
// b a n s
// c u p
// c a t

// array = array of all arrays
// loop through all arrays, while first letter is same
// track indices so you don't have to copy arrays, e.g. i=0, j=1 for the as.
// first letter ++, (so for as that is b & p)
// return when first letters are all different

// assume array is array of titles/strings
const bookArray = [
  'book55','book33','novel1','dictionary33','newspaper','novella','shortstory','shorterstory'
];





