'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this.unique = 0;
  }

  static _hashString(string) {
    // validate if needed
    let letter = string.toLowerCase();
    let code = string.charCodeAt(letter.slice(0,1));
    return code = code - 97; // converts lowercase a to 0 from unicode 97    
  }

  set(key, value) {
    const index = HashMap._hashString(key);
    if ( this._slots[index] ) { // if something is in there
      this._slots[index] = null;
      this.unique--;      
    } else {
      this._slots[index] = {
        key,
        value,
      };
      this.unique++;
    }
  }
}

const checkString = string => {
  const pairedLetters = new HashMap(26);
  for (let i=0; i<string.length; i++) {
    pairedLetters.set(string.charAt(i), true);
  }
  const message = pairedLetters.unique > 1 ? `${string} ain't no palindrome!` : `${string} is a palindrome!` ;
  console.log(message);
};

checkString('racecar');
checkString('notapalindrome');
checkString('abba');
checkString('mom');
checkString('somethingelse');
checkString('amanaplanacanalpanama');
checkString('SAIPPUAKIVIKAUPPIAS');

// pass in a string
// function to loop through the string's characters & pass in each character individually
// check pairedLetters.unique at the end
