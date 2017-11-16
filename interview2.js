'use strict';
const BinarySearchTree = require('./binarytree');

'use strict';

// converting an existing sorted array into a new bst
// conversion to be O(n)

// resulting tree will be height balanced

// root node start @ middle of array
// recurse through left of middle of the array, same right of middle of the array

// input = array
// output = bst

// input
const array = [0,1,2,3,4,5,6,7,8,9,10];

// output
//               5
//       3              7
//   2       4       6      8

const converter = (array) => {
  const tree = new BinarySearchTree();
  let count = 0;
  const looper = (start=0, end=array.length-1) => {      
    const midpoint = Math.floor((end+start)/2); 
    if ( start > end || start < 0 || end < 0) {
      return;
    } else if ( start === midpoint || end === midpoint ) {
      tree.insert(array[midpoint], array[midpoint]);
      return;
    } else {
      tree.insert(array[midpoint], array[midpoint]);
      looper(start, midpoint - 1);
      looper(midpoint + 1, end);
    }
  };
  return looper();
};

const btree = converter(array);

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

console.log(inOrderPrint(btree));

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

console.log(preOrderPrint(btree));
