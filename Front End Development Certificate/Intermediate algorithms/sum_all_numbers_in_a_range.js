/*
We'll pass you an array of two numbers. Return the sum of those two numbers
and all numbers between them.

The lowest number will not always come first.
*/

function sumAll(arr) {

  // sort the array in numerical order
  var sortedArray = arr.sort(function (a, b) {
    return a - b;
  });

  // store the range in a new array
  var newArray = [];
  for (var i = sortedArray[0]; i<=sortedArray[1]; i++) {
    newArray.push(i);
  }

  return newArray.reduce(function(sum, next) {
    return sum += next;
  });
}
