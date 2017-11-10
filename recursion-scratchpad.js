'use strict';

const binary = num => {
  
  if (num ===1) return 1;
  
  const next = binary(Math.floor(num/2));
  const now = num%2;
  
  return `${next}${now}`;
  
};

// console.log(binary(25));



// ANAGRAMS...

// east = 4 characters
// take each letter & place first
// then rearrange remaining letters in all combinations
// e ... ast 234, sat 324, tsa 432


const getRemainder = (wordArray, index) => {
  // console.log('remainder funct',wordArray, index);
  const tempArray = [...wordArray];
  // console.log('tempArray',tempArray);
  tempArray.splice(index, 1);
  // console.log('tempArray2',tempArray);
  return tempArray;  
};

const anagramRecur = wordArray => {
  console.log('top line', wordArray);
  
  if (wordArray.length === 1) return wordArray;
  
  let newArray = [];
  for (let i=0; i<=wordArray.length-1; i++) {
    // console.log('inside for: i', i);
    let firstLetter = wordArray[i];
    console.log('first', firstLetter);
    const remainder = getRemainder(wordArray, i);
    console.log('remainder', remainder);
    const next = anagramRecur(remainder);
    console.log('next', next);
    newArray.push(firstLetter + next);
    console.log('newArray',newArray);
  }
  
  // return newArray; 
  
};
  
const anagramArray = anagramRecur(['b','a','g']);
console.log('final', anagramArray);

