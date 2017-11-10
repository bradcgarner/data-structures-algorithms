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

// ( [ ] { 

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
    } else if ( isBracket(chr) === 'closed' && bracketsMatch(bracketStack.peek() , chr)) {
      bracketStack.pop();
    } else if ( isBracket(chr) === 'closed' && !(bracketsMatch(bracketStack.peek() , chr))) {
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

matchingBrackets('abcd(ef{g})h[]{[(()]}ij');