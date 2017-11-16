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

let doubleList = new DoublyLinkedList();
doubleList.insert(0,8);
doubleList.insert(1,9);
doubleList.insert(2,10);
doubleList.insert(3,11);
doubleList.insert(4,12);
doubleList.insert(5,13);
doubleList.insert(6,14);
doubleList.insert(7,15);
doubleList.insert(1,16);
console.log('doubleList');
// display(doubleList);
// console.log(doubleList.head);
// console.log(doubleList.head.next);
// console.log(doubleList.head.next.next);
// console.log(doubleList.head.next.next.next);
