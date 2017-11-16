'use strict';

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

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

class HashMapChain {
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


const chainHashMap = new HashMapChain();
// console.log(chainHashMap);
chainHashMap.set('Hobbit','Bilbo');
console.log('after set', chainHashMap);
console.log(chainHashMap.get('Hobbit'));
// chainHashMap.set('Wizard','Gandolf');
// console.log(chainHashMap.get('Hobbit')); // Bilbo
// chainHashMap.set('Hobbit','Frodo'); // overwrite
// console.log(chainHashMap.get('Hobbit')); // Frodo
// chainHashMap.set('Human','Aragon');
// chainHashMap.set('Elf','Legolas');
// chainHashMap.set('Maiar','The Necromancer');
// chainHashMap.set('RingBearer','Gollum');
// chainHashMap.set('LadyOfLight','Galadriel');
// chainHashMap.set('HalfElven','Arwen');
// chainHashMap.set('Ent','Treebeard');
// console.log(chainHashMap.get('Maiar')); // The Necromancer

// chainHashMap.set('Maiar','Sauron'); // overwrite
// console.log(chainHashMap.get('Maiar')); // The Sauron

// console.log(chainHashMap.length);

// chainHashMap.remove('HalfElven');
// console.log(chainHashMap.length);
// console.log(myFirstHashMap.get('HalfElven'));

