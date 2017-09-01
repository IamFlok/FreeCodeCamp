/*
Find the smallest common multiple of the provided parameters that can be
evenly divided by both, as well as by all sequential numbers in the range
between these parameters.

The range will be an array of two numbers that will not necessarily be in
numerical order.

e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is
evenly divisible by all numbers between 1 and 3.
*/

function smallestCommons(arr) {

  // sort the argumnent in an order and create an array of range
  var sortedArray = arr.sort(function (a, b) {
    return a - b;
  });

  var range = [];
  for (var i = sortedArray[0]; i<=sortedArray[1]; i++) {
    range.push(i);
  }

  // using Euclid's alrogithm
  var a = range[0];

  for (var j = 0; j < range.length; j++) {
    var b = range[j];
    var c = a;

    while (b && c) {
      if (b > c) {
        b %= c;
      } else {
        c %= b;
      }
    }

    a = a*range[j]/(b+c);
  }

  return a;
}
