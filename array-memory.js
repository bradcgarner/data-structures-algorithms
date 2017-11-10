'use strict';

let memory = require('./memory');



class Array {
  constructor() {
    this.length = 0;
    this.ptr = memory.allocate(this.length);
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
  }

  push(value) {
    console.log('value');
    this._resize(this.length + 1);
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    console.log(memory.get(1));
    return memory.get(this.ptr + index);
  }

}
Array.SIZE_RATIO = 3;

let newArr = new Array();
console.log('before',newArr);

newArr.push('WackyWednesday1');
newArr.push('WackyWednesday2');
newArr.push('WackyWednesday3');
// newArr.push('WackyWednesday');
// newArr.push('WackyWednesday');
console.log('after',newArr);
// newArr.pop();
console.log('after pop',newArr);


// console.log(JSON.stringify(newArr.get(3)));
