'use strict';

export class BinarySearchTree {
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

export class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  insert(index, value) {
    // console.log('insert', index, value);
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    const newNode = {
      value
    };

    if (index === 0) {                             // insert at head
      newNode.next = this.head;
      newNode.prior = null;
      this.head = newNode;
    } else {
      // console.log('else');
      const priorNode = this._find(index - 1); 
      // console.log('found priorNode',priorNode, index);     
      if (!priorNode.next) {                       // insert at end
        newNode.next = null;
        newNode.prior = priorNode;
        priorNode.next = newNode;
        // console.log('newNode after assignment', newNode);
      } else {                                    // insert in middle
        // console.log('middle'); 
        const nextNode = this._find(index);
        newNode.next = nextNode;
        newNode.prior = priorNode;
        priorNode.next = newNode;
        nextNode.prior = newNode;
      }
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
      const nextNode = this._find(index + 1);
      priorNode.next = nextNode;
      nextNode.prior = priorNode;
      console.log('removed!');
    }

    this.length--;
  }
}

export class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    // below is option we changed so that we aren't doubly nesting objects
    const newNode = typeof value !== 'object' ? { value } : value ;

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
}

export class HashMap {
  constructor(
    initialCapacity=8, 
    MAX_LOAD_RATIO,
    SIZE_RATIO)
    {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0
    this.MAX_LOAD_RATIO = 0.9,
    this.SIZE_RATIO = 3;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }
}

export class HashMapChain {
  constructor() {
    this.length = 0;
    this._slots = [];
    this._capacity = 10; // question: capacity is fixed
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    // console.log(index);

    if (!index) {       // will this work if the slot is just empty?
      throw new Error('Key error');
    } else {
      console.log('this._slots[index]',this._slots[index]);
      console.log('this._slots[index].head',this._slots[index].head);
      
      let node = this._slots[index].head;
      // console.log('node', node)
      while (node.key !== key && node.next) {
        node = node.next;
      }
      return node.key === key ? node.value : undefined ; 
    }
  }

  set(key, value) {
    const index = this._findSlot(key);
    if (!this._slots[index]) {                   // confirm this works if the value is just empty
      this._slots[index] = new LinkedList();
    }
    let slot = this._slots[index];
    slot.insert(slot.length, {key, value});
    console.log('slot after insert', index, slot);
    // console.log('this._slots[index]', this._slots[index]);
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    return hash % this._capacity;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    let node = slot.head;
    let counter = 0;
    while (node.key !== key || !node.next) {
      node = node.next;
      counter++;
    }
    if(node.key === key ) {
      slot.remove(counter);
    }
  }

}

export class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    // if the top of the stack is empty, then the data will be the
    // top of the stack
    if (this.top === null) {
      this.top = createNode(data);
      return;
    }

    // if the top already has something then create a new node
    // add data to the new node
    // have the pointer point to the top 
    const node = createNode(data, this.top);
    this.top = node;
  }

  peek() {
    // if the top of the stack does not have anything 
    // then the stack is empty
    // otherwise return what's on the top
    if (this.top === null) {
      return null;
    }

    return this.top.data;
  }

  pop() {
    //in order to remove the top of the stack, you have to point
    //the pointer to the next item and that next item becomes the
    //top of the stack
    const node = this.top;
    this.top = node.next;
    return node.data;
  }

  display() {
    // displays the entire contents of the stack
    let node = this.top;
    while (node !== null) {
      console.log(node.data);
      node = node.next;
    }
  }
}

export class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = createQNode(data);

    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }

    this.last = node;

    if (this.first === null) {
      this.first = node;
    }
  }

  dequeue() {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
      this.last = null;
    }

    return node.data;
  }
}