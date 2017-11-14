'use strict';


//Creates a node containing the data and a reference to the next item
function createNode(data=null, next=null) {
  return {
    data,
    next
  };
}

class Stack {
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

const s = new Stack();

s.push(1);
s.push(2);
s.push('Tauhida');

// console.log('Top of stack:', s.peek());
s.pop(); // this pops 'Tauhida' off the stack
s.push('joe');
// console.log('The stack contains:');
// s.display();




function is_palindrome(s) {
  const palindromeStack = new Stack();
  let comparisonWord = '';
  
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  // push each character onto stack - not needed if we already have a stack
  for (let i=0;i<s.length;i++ ){
    palindromeStack.push(s.charAt(i));    
  }
  // console.log('s',s);
  
  // we have a stack to compare now
  palindromeStack.display();
  
  let currentNode = palindromeStack.top;
  console.log('-------');
  // copy the stack in reverse
  while ( currentNode ) {
    comparisonWord += palindromeStack.pop(currentNode.data);
    currentNode = currentNode.next;
  }
  // console.log(comparisonWord);
  // finally compare the 2 stacks; will have same length

  return comparisonWord === s;

}

// true, true, true
// console.log(is_palindrome('dad'));
// console.log(is_palindrome('A man, a plan, a canal: Panama'));
// console.log(is_palindrome('1001'));
// console.log(is_palindrome('1002'));

// Matching parentheses in an expression

// A stack can be used to ensure that an arithmetic expression has balanced parentheses. Write a function that takes an arithmetic expression as an argument and returns the position in the expression where a parenthesis is missing or incorrect.

// For version 1, the parentheses you need to consider are ( and ). Finding a close parenthesis without an open parenthesis is an error (report the location of the close); reaching the end of the sring while still "holding" an open parenthesis is also an error (report the location of the open).

// Extension exercise: Recognize three pairs of brackets: (), [], and {}. These must be correctly nested; "([)]" is incorrect, and should report an error at the ), stating that you were expecting a ] but found a ). If this is starting to look and sound very familiar, congratulations - you're beginning to write a simple language parser!

// Extension extension exercise: Also recognize two types of quote character: "" and ''. Inside quotes, brackets aren't counted at all - in fact, nothing is counted until you reach the corresponding close quote.

function bracketsMatch(top, chr) {
  // console.log('top',top,'chr',chr);
  if (!top && isBracket(chr) === 'open' ) {
    // console.log('no top, open');
    return true;
  } else if (!top) {
    // console.log('no top');
    return false;
  } else if (
    (top === '(' && chr === ')' ) ||
    (top === '[' && chr === ']' ) ||
    (top === '{' && chr === '}' )
  ) {
    // console.log('match');
    return true;
  } 
  // console.log('none of above');
  return false;
}

function isBracket (chr) {
  if (chr === ')' || chr === ']' || chr === '}' ) {
    return 'closed';
  } else if ( chr === '(' || chr === '[' || chr === '{' ) {
    return 'open';
  }
  return 'none';
}

function matchingBrackets(text) {
  const bracketStack = new Stack();
  for (let i=0; i<text.length; i++) {
    let chr = text.charAt(i);
    // console.log('chr',chr);
    if ( isBracket(chr) === 'open' ) {
      bracketStack.push(chr);
    } else if ( isBracket(chr) === 'closed' && bracketsMatch(bracketStack.peek(), chr)) {
      bracketStack.pop();
    } else if ( isBracket(chr) === 'closed' && !(bracketsMatch(bracketStack.peek(), chr))) {
      console.log('ERROR1:',chr);
      return false;
    } else if ( isBracket(chr) !== 'none') {
      console.log('ERROR2:',chr);
      return false;
    }
    bracketStack.display(); 
    if ( bracketStack.peek()) { console.log('----'); }
  }
  console.log('end');
  bracketStack.display(); 
  
}

// matchingBrackets('abcd(ef{g})h[]{[(()]}ij');

// Square dance pairing

// As people come to the dance floor, they should be paired off as quickly as possible: man with woman, man with woman, all the way down the line. If several men arrive in a row, they should be paired in the order they came, and likewise if several women do. Maintain a queue of "spares" (men for whom you have no women yet, or vice versa), and pair them as appropriate.

// F Jane
// M Frank
// M John
// M Sherlock
// F Madonna
// M David
// M Christopher
// F Beyonce

// Female dancer is: Jane and the male dancer is: Frank
// Female dancer is: Modonna and the male dancer is: John
// Female dancer is: Beyonce and the male dancer is: Sherlock
// There are 2 male dancers waiting to dance

// The Ophidian Bank

// At the Ophidian Bank, a single teller serves a long queue of people. New customers join the end of the queue, and the teller will serve a customer only if s/he has all the appropriate paperwork. Write a representation of this queue; 25% of the time (random), a customer's paperwork isn't quite right, and it's back to the end of the queue. Show what a few minutes of the bank's lobby would look like.

function createQNode(data=null, next=null, prev=null) {
  return {
    data,
    next,
    prev
  };
}

class Queue {
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

//other funcitons that uses the queue class

function display(q) {
  let node = q.first;
  while (node !== null) {
    console.log(node.data);
    node = node.prev;
  }
}

let q = new Queue();
q.enqueue('Tauhida');
q.enqueue('Joe');
q.enqueue('Tim');
display(q);
console.log('removed',q.dequeue());
display(q);
q.enqueue('Alison');
q.enqueue('Chris');
console.log('removed',q.dequeue());
display(q);

const bankQueue = new Queue();

let counter = 1;
const bancQueueUp = customer => {
  const initializeCounter = () => {
    return 0;
  };
  console.log('--------');  
  let randomNumber = Math.floor(Math.random() * 4);
  const node = { customer, counter };
  console.log('Customer #', counter, ', ', customer, ', enters bank.');
  bankQueue.enqueue(node);
  console.log('Queue is now:');
  display(bankQueue);
  const next = bankQueue.dequeue();
  console.log('Customer #', next.counter, ', ', next.customer, ', walks to counter.');
  console.log('Queue is now:');
  if ( bankQueue.first ) { display(bankQueue); } else { console.log( '...empty');}
  if ( randomNumber === 3 ) {
    console.log('Oh no! Customer #', next.counter, '\'s paperwork is out of order. Back to the queue!');
    bankQueue.enqueue(next);
    console.log('Queue is now:');
    display(bankQueue);
  }
  counter ++;
};

bancQueueUp('Bob');
bancQueueUp('Sue');
bancQueueUp('Jane');
bancQueueUp('Mary');
bancQueueUp('Alice');
bancQueueUp('Jeff');
bancQueueUp('Snoop');
bancQueueUp('Charles');
bancQueueUp('Ginny');
bancQueueUp('Rachel');
bancQueueUp('Kim');
bancQueueUp('Vinny');
bancQueueUp('Monte');
bancQueueUp('Ezmerelda');