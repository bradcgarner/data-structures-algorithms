'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else { // else in this case is >=
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  get(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.get(key);
    } else if (key > this.key && this.right) {
      return this.right.get(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) { // node = node to use ILO this
    if (this.parent) { // this = what we want to replace
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  _findMin(){
    if (!this.left){
      return this;
    }
    return this.left._findMin();
  }
  _findMax(){
    if (!this.right){
      return this;
    }
    return this.right._findMax();
  }
}

const binaryTree = new BinarySearchTree();
binaryTree.insert(6, 'giri');
binaryTree.insert(7, 'brad');
binaryTree.insert(5, 'test5');
binaryTree.insert(4, 'test4');
binaryTree.insert(3, 'test3');
binaryTree.insert(8, 'test8');
binaryTree.insert(7, 'test8');
binaryTree.insert(2, 'test8');
binaryTree.insert(9, 'test8');
binaryTree.insert(1, 'test8');
binaryTree.insert(0, 'test8');
const binaryTree1 = new BinarySearchTree();


//console.log(binaryTree);
// console.log('get 4', binaryTree.get(4));

//binaryTree.(9);

// console.log('after', binaryTree);

function height(tree){
  
  if (tree.left && tree.right){
    return 1 + Math.max(height(tree.left), height(tree.right));
  }  else if (tree.left){
    return 1 + height(tree.left);
  } else if (tree.right){
    return 1 + height(tree.right);
  } else {
    return 1;
  }
}
// function height(tree){
//   console.log(tree);
//   if (!tree.left && !tree.right){
//     return 1;
//   } else {
//     return 1 + Math.max((height(tree.left) || 0), (height(tree.right) || 0));
  
//   }
// }
//console.log(height(binaryTree1));
// console.log(height(binaryTree));

function isBinarySearchTree(tree){
  //if left is less than this or left is null return 1
  // else return 0
  //if right is greater than this or right is null return 1
  // else return 0
  
  if (tree.left && tree.right){
    if (tree.left.key < tree.key && tree.right.key >= tree.key){
      return Math.min(isBinarySearchTree(tree.left), isBinarySearchTree(tree.right));
    } else {
      return 0;
    }
  }  else if (tree.left){
    let less = tree.left.key < tree.key ? 1:0;
    if (less === 0){
      return 0;
    } else {
      return Math.min(less, isBinarySearchTree(tree.left));}
  } else if (tree.right){

    let less = tree.right.key >= tree.key ? 1 : 0;
    if ( less === 0){
      return 0;
    } else {
      return Math.min(less, isBinarySearchTree(tree.right));}
  } else {
    return 1;
  } }


// console.log(binaryTree);
// console.log(isBinarySearchTree(binaryTree));
// binaryTree.left.key = 17;
// console.log(binaryTree);
// console.log(isBinarySearchTree(binaryTree));

//

function thirdLargest(tree){
  if (!tree.right){
    let arr = [tree.key];
    return arr;
  } else {
    let returnedArr = thirdLargest(tree.right);
    if(returnedArr.length === 3){
      return returnedArr;
    } else {
      return returnedArr.concat(tree.key);
    }
  }
}

console.log(thirdLargest(binaryTree));



