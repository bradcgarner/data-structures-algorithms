'use strict';

function countSheep(numSheep) {
  if(numSheep === 0) return('done');
  console.log(`Another sheep jumped over the fence - ${numSheep}`);
  return countSheep(numSheep - 1);
}
//console.log(countSheep(5));
  
function arrayDouble(inArr) {
  if(inArr.length === 0) return [];
  return [inArr[0] * 2, ...arrayDouble(inArr.slice(1))];
}
// console.log(arrayDouble([0, 5, 17, 82]));

function double_all(arr) {
  if (!arr.length) {
    return [];
  }
  return [arr[0] * 2, ...double_all(arr.slice(1))];
}
var arr = [10,5,3,4];
// console.log(double_all(arr));

function itRevString(inStr) {
  let outStr = '';
  for (let i = inStr.length-1; i >= 0; i-- ) {
    outStr += inStr.charAt(i);
  }
  return outStr;
}
// console.log('iterative', itRevString('Monday'));

function revString(inStr) {
  if(inStr.length < 1) return '';
  return revString(inStr.slice(1)) + inStr.charAt(0);
}
// console.log('recursive', revString('Monday'));

function reverse(str) {
  if (str.length < 2) {
    return str;
  }
  return reverse(str.slice(1)) + str[0];
}
// console.log(reverse('tauhida'));

function itNthTriangle(inInt) {
  let outNum = 0;
  for(let i = inInt; i > 0; i--) {
    outNum += i;
  }
  return outNum;
}
//console.log('iterative', itNthTriangle(5));

function nthTriangle(inInt) {
  if(inInt === 1) return 1;
  return inInt + nthTriangle(inInt - 1);
}
//console.log('recursive', nthTriangle(5));
  
function triangle(n) {
  if (n < 2) 
    return n;
  return n + triangle(n - 1);
}
//console.log(triangle(5));

function strSplit(inStr, inSplitter) {
  if(!inStr) return'';
  const thisChar = inStr.charAt(0) === inSplitter ? ' ' : inStr.charAt(0);
  return thisChar + strSplit(inStr.slice(1), inSplitter);
}
//console.log(strSplit('This-string', '-'));      //"This string"

function split(str, sep) {
  var idx = str.indexOf(sep);
  if (idx == -1) 
    return [str];
  return [str.slice(0, idx)].concat(split(str.slice(idx + sep.length), sep));
}
console.log(split('1/12/2017', '/'));


const binary = num => {
  if (num ===1) return 1;
  const next = binary(Math.floor(num/2));
  const now = num%2;
  return `${next}${now}`;  
};
// console.log(binary(25));

function convertToBinary(num){
  if(num>0){
    let binary = Math.floor(num%2);
    return (convertToBinary(Math.floor(num/2))+ binary);
  } else {
    return '';
  }
}
console.log(convertToBinary(25));

const getRemainder = (wordArray, index) => {          // console.log('remainder funct',wordArray, index);
  const tempArray = [...wordArray];                   // console.log('tempArray',tempArray);
  tempArray.splice(index, 1);                         // console.log('tempArray2',tempArray);
  return tempArray;
};

const anagram = wordArray => {
  if (wordArray.length === 1) return wordArray;
    
  let newArray = [];
  for (let i=0; i<=wordArray.length-1; i++) {
    let firstLetter = wordArray[i];
    const remainder = getRemainder(wordArray, i);     // console.log(`OUTER: ${i} first`, firstLetter,'remainder', remainder);
    const next = anagram(remainder);                  // console.log(`OUTER: ${i} first`, firstLetter,'remainder', remainder,'next', next);
    next.forEach((item, index)=>{
      newArray.push(firstLetter + next[index]);      
    });                                               // console.log('OUTER newArray',newArray);
  }
  return newArray; 
};

console.log( anagram(['e','a','s','t']) );
