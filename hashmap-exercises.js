'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
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

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const myFirstHashMap = new HashMap();

myFirstHashMap.set('Hobbit','Bilbo');
myFirstHashMap.set('Wizard','Gandolf');
console.log(myFirstHashMap.get('Hobbit')); // Bilbo
myFirstHashMap.set('Hobbit','Frodo'); // overwrite
console.log(myFirstHashMap.get('Hobbit')); // Frodo
myFirstHashMap.set('Human','Aragon');
myFirstHashMap.set('Elf','Legolas');
myFirstHashMap.set('Maiar','The Necromancer');
myFirstHashMap.set('RingBearer','Gollum');
myFirstHashMap.set('LadyOfLight','Galadriel');
myFirstHashMap.set('HalfElven','Arwen');
myFirstHashMap.set('Ent','Treebeard');
console.log(myFirstHashMap.get('Maiar')); // The Necromancer
myFirstHashMap.set('Maiar','Sauron'); // overwrite
console.log(myFirstHashMap.get('Maiar')); // The Sauron
console.log(myFirstHashMap.length);

myFirstHashMap.remove('HalfElven');
console.log(myFirstHashMap.length);
// console.log(myFirstHashMap.get('HalfElven'));

