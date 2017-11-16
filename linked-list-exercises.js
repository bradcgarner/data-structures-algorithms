'use strict';
//Exercise 1
export class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    const newNode = {
      value
    };

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    }
    else {
      const priorNode = this._find(index - 1);
      newNode.next = priorNode.next;
      priorNode.next = newNode;
    }

    this.length++;
  }

  _find(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return this._find(index).value;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (index === 0) {
      this.head = this.head.next;
    }

    else {
      const priorNode = this._find(index - 1);
      priorNode.next = priorNode.next.next;
      console.log('removed!');
    }
    this.length--;
  }

  createLoop(start, end) {
    const startPoint = this._find(start); // find object whose 'next' should change
    const endPoint = this._find(end);     // find object to point to
    startPoint.next = endPoint;           // change pointer
  }

  insertAsLoop(index, value, loopTo) {

    const endPoint = this._find(loopTo); // find object to loop to

    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    const newNode = {
      value
    };

    if (index === 0) {
      newNode.next = endPoint;
      this.head = newNode;
    }
    else {
      const priorNode = this._find(index - 1);
      newNode.next = endPoint;
      priorNode.next = newNode;
    }

    this.length++;
  }
}

let something = new LinkedList();

something.insert(0, 52);
something.insert(1, 62);
something.insert(2, 63);
something.insert(3, 64);
something.insert(4, 65);
something.insert(5, 66);
something.insertAsLoop(6,67,4);

something.createLoop(3,1);

display(something);
console.log(something.head);
console.log(something.head.next);
console.log(something.head.next.next);
console.log(something.head.next.next.next);
console.log(something.head.next.next.next.next);

//Exercise 2
function display(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(`value: ${list.get(i)}`);
  }
}
// console.log('original list');
// display(something);

function findSize(list) {
  let counter = 1;
  let nextOne = list.head;
  while (nextOne.next !== null) {
    nextOne = nextOne.next;
    counter++;
  }
  console.log('findSize', counter);
  return counter;
}

function isEmpty(list) {
  if (!list.head) {
    return true;
  }
  return false;
}

function findPrevious(list, index) {
  return list.get(index - 1);
}

function findLast(list) {
  let nextOne = list.head;
  while (nextOne.next !== null) {
    nextOne = nextOne.next;
  }
  return nextOne.value;
}

//Exercise 3
function findMiddle(list) {
  let pointerOne = list.head;
  let pointerTwo = list.head;
  let counter = 0;
  while (pointerTwo.next) {
    if (counter % 2 === 0 && counter > 0) {
      pointerOne = pointerOne.next;
    }
    pointerTwo = pointerTwo.next;
    counter++;
  }
  return pointerOne.value;
}

//Exercise 4
function thirdFromLast(list) {
  let size = findSize(list);
  return list.get(size - 3);
}

//Exercise 5
function reverseList(list) {
  const newList = new LinkedList();
  let current = list.head;
  newList.insert(0, current.value);
  while (current.next !== null) {
    newList.insert(0, current.next.value);
    current = current.next;
  }
  return newList;
}

function reverse(list, newList) {
  let current = list.head;
  // console.log(current);
  if (!current.next) {
    // console.log('base case', newList);
    return newList.insert(0, current.value);
  }
  else {
    newList.insert(0, current.value);
    // console.log('new list after insertion', newList);
    list.remove(0);
    // console.log('list after remove', list);
    return reverse(list, newList);
  }
}

function recursiveReverseList(list) {
  const newList = new LinkedList();
  reverse(list, newList);
  return newList;
}
// const newList = reverseList(something);

const emptyList = new LinkedList();
// const variable = recursiveReverseList(something);

// Exercise 6

//Exercise 7
