// Insert an element in the correct order into a sorted linked list. (assume that the list holds integer)
'use strict';

function insertElement(num, list) {

  let theHead = list.head;
  while (theHead.value < num) {
    theHead = theHead.next;
  }
  // insert num in the right position
  // go back by 1
  // assume num is an object that I point to
  theHead.next = num;
  num.next = the

}