'use strict';

const  { BinarySearchTree } = require('./binarytree'); 

// linear search
// Exercise 1

// Given the following dataset

// 89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5 76 62

// Write a function to find a particular value in the unsorted list.



function linearSearch(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] === value) {
      return i;
    }
  }
  return null; 
}

// binary search 
// Exercise 2

// Use the dataset from the previous exercise for this exercise. Use array.sort to sort the dataset. Then implement Binary search to find a particular value in the dataset.

function binarySearch(arr, value, start=0, end=arr.length) {
  console.log(`${start}, ${end}`);
  if(start > end ) return null; 
    
  let index = Math.floor((start + end) /2); 

  if(arr[index] === value) {
    return index; 
  }
  if(arr[index] > value) {
    return binarySearch(arr, value, start, index - 1); 
  }
  if(arr[index] < value) {
    return binarySearch(arr, value, index + 1, end);
  }
}

const myArr = [1,2,3,4,5,6,7,8];

// console.log(binarySearch(myArr, 7)); 


// depth first 

const myTree = new BinarySearchTree(); 
myTree.insert(5,5);
myTree.insert(5,5);
myTree.insert(4,4);
myTree.insert(2,2);
myTree.insert(8,8);
myTree.insert(9,9);
myTree.insert(10,10);
myTree.insert(7,7);

function depthFirstSearch(tree, value) {
  if (tree.key === value) {
    return tree.value;
  }
  let left; 
  let right; 
  if (!tree.left && !tree.right) {
    return null; 
  }
  if (tree.left) {
    left = depthFirstSearch(tree.left, value);
  }

  if (tree.right) {
    right = depthFirstSearch(tree.right, value);
  }
  if(left === value) {
    return left; 
  }
  else if (right === value) {
    return right;
  }
  else {
    return null; 
  }
}

// console.log(depthFirstSearch(myTree, 2)); 


// Exercise 3
// look for a book in a library with a Dewey Decimal index. Express as search algorithm.

// assume ordered regardless
// how is the data stored? array, b/c ordered regardless
// stored as tree?
// array: binary search, start @ middle, and keep dividing in half until found
// tree: implement one of tree algos, DFS depth first search in order (left, middle, right)
// start at root, if matching return, if less recurse left, if higher, recurse right.
// when found return, if nothing left, return null
// return value can be anything from that node or the entire node (e.g. the key, the value, a pointer to the entire node object)

const searchDewey = (theBook, theList, start=0, end=theList.length) => {
  const index = Math.floor(theList.length/2);
  if (index === theBook) {
    return true;
  } else if (start>end) {
    return false;
  } else if (index > theBook) {
    searchDewey(theBook, theList, start, index - 1);
  } else {                                             // if index < theBook
    searchDewey(theBook, theList, index + 1, end);
  }
};

// Exercise 4
// Then implement in-order, pre-order, and post-order functions on bst.
// starter data:
// 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22

// Check answers:
// pre-order: 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90
// InOrder: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90
// Post-order: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25

const starterData = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
const ourTree = new BinarySearchTree(); 
starterData.forEach(num => ourTree.insert(num, num)); 

function preOrderPrint(tree, arr=[]) {
  arr.push(tree.value); 
  if(tree.left){
    preOrderPrint(tree.left, arr);
  }
  if(tree.right) {
    preOrderPrint(tree.right, arr);
  }
  return arr; 
}

function inOrderPrint(tree, arr=[]) {
  if(tree.left){
    inOrderPrint(tree.left, arr);
  }
  arr.push(tree.value); 
  if(tree.right) {
    inOrderPrint(tree.right, arr);
  }
  return arr; 
}

function postOrderPrint(tree, arr=[]) {

  if(tree.left){
    postOrderPrint(tree.left, arr);
  }
  if(tree.right) {
    postOrderPrint(tree.right, arr);
  }
  arr.push(tree.value); 
  return arr; 
}

// console.log(preOrderPrint(ourTree)); 
// console.log(inOrderPrint(ourTree));
// console.log(postOrderPrint(ourTree));



// Exercise 5
// share price over a week is: [128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the company on one day, and sell the shares on one of the following days, write an algorithm to work out what the maximum profit.

// What's the input variable? Inputs are buy date and sell date? And the output is profit for that day?
// Or is the input just the array, and the algorithm determines the most profitable buy & sell dates and the profit from that date combination?

// for the former, array[input] - array[sell] = profit
// for the latter, 
// most profitable highest - lowest
// higher index must be greater than the lower index (i.e. later sell date than buy date)
// if that ^ test fails, go to the next highest number
// edge case lowest number is last date
// start @ first date: get highest number after that; that is your #1 choice
// recurse through the array, and see if you can do better, better moves up to #1 choice
// @ end, return #1 choice
// 128 all sells are losses, return lowest loss, -5
// 97: #1 = -5; 123 - 97 = 26; 26 > -5; #1 = 26;





const prices = [128, 97, 528, 121, 123, 98, 97, 105];

const makeMunny = prices => {
  const pricePoints = [];
  let highestEver;
  for (let i = prices.length - 1 ; i>=0 ; i--) {
    if (prices[i] > highestEver) {
        pricePoints.push({high:prices[i], low:prices[i], delta:0});
    } else if (prices[i] < ) {

    }
  }

};



// const makeMoney = (prices) => {
//   let largest=0; 
//   let smallest=0; 
//   let difference = 0; 
//   for (let i =0; i < prices.length; i++) {
//     if(prices[i] > largest) {
//       largest = prices[i]; 
//     }
//     if(prices[i] < smallest) {
//       smallest = prices[i]; 
//     }
//     if((largest - smallest > difference) && (largest !== 0) && (smallest !== 0 )) {
//       difference = largest - smallest;
//     }
//   }
//   return difference; 
// };

console.log(makeMoney(prices));

// working version V

// const prices = [128, 528, 97, 528, 121, 123, 98, 97, 105];

// const makeMoney = (sharePrices, current=0, most=0) => {
//   if (sharePrices.length - current >= 2) {
//     for (let i=current+1; i<sharePrices.length; i++) {
//       most = (( sharePrices[i] - sharePrices[current] ) > most) ? ( sharePrices[i] - sharePrices[current] ) : most ;
//     }
//     return makeMoney(sharePrices, current+1, most);    
//   } else {
//     return most;
//   }
// };

// console.log(makeMoney(prices));





// Exercise 6 - This is fun exercise to do - make this an optional one after you are done with all the exercises above
// Imagine that you wanted to find what the highest floor of a 100 story building you could drop an egg was, without the egg breaking. But you only have two eggs. Write an algorithm to work out which floors you should drop the eggs from to find this out in the most efficient way

11;
1111;


50;
25;
12;
6;
3;
1;
0;





