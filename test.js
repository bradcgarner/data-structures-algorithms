let arr=[[1,2,3],[4,5,6],[7,8,9]];
let sum = 0;

for (let x=0,x<arr.length; x++) {
  for (let j=0,j<arr.length; j++) {
    sum += arr[x][j]
  }
}

console.log(sum);