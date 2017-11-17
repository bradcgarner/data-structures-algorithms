'use strict';

//Bubble sort
const array = [2, 12, 3, 11, 100, 99, -1];

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function bubbleSort(array) {

  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  if (swaps > 0) {

    return bubbleSort(array);
  }

  return array;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  //while left and right array are populated
  while (leftIndex < left.length && rightIndex < right.length) {
    //compare first index of left to right
    //if left is smaller
    if (left[leftIndex] < right[rightIndex]) {
      //push value to array and increment to continue down the array
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }
  //if only right array is populated
  for (let i = leftIndex; i < left.length; i++) {
    //push right to array
    array[outputIndex++] = left[i];
  }
  //if only left array is populated
  for (let i = rightIndex; i < right.length; i++) {
    //push left to array
    array[outputIndex++] = right[i];
  }
  return array;
}

// console.log(mergeSort(array));

function quickSort(array, start = 0, end = array.length) {

  start = start;
  end = end;
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle); //[-1, 1, 12, 3, 11, 100, 99]
  //array = line 82, middle + 1 = 
  array = quickSort(array, middle + 1, end);//
  return array;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  console.log('j before loop: '+j);
    
  for (let i = start; i < end - 1; i++) {
    console.log('i  loop: '+i);
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  // console.log('j: ' + j, 'array: ' + array);
  return j;
}
// const array2 = [1, 12, 3, 11, 100, 99, -1];

//pivot = -1
// j = start = 1
//i = start = 1
//arry[1] <= -1
//not running
//swap[arr2, arr2[end], 1]
//return j



//run once with start and end removed
console.log(quickSort(array));

const bookArray = [
  'book55','book33','novel1','dictionary33','newspaper','novella','shortstory','shorterstory'
];

console.log(quickSort(bookArray));
