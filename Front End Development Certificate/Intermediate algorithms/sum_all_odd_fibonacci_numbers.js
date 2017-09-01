/*
Given a positive integer num, return the sum of all odd Fibonacci numbers
that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional
number in the sequence is the sum of the two previous numbers. The first six
numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers
less than 10 are 1, 1, 3, and 5.
*/

// create a function prototype which returns the last element of an array
Array.prototype.last = function() {
  return this[this.length - 1];
};

// create a function prototype which returns the second to last element
// of an array
Array.prototype.secondToLast = function() {
  return this[this.length - 2];
};

function sumFibs(num) {

  // create the fibonacci array
  var fibArray = [1,1];
  while (fibArray.secondToLast() + fibArray.last() <= num) {
    fibArray.push(fibArray.secondToLast() + fibArray.last());
  }

  // filter for odd numbers in array and return the sum of them
  return fibArray.filter(function(num) {
    return num % 2 !== 0;
  }).reduce(function(sum, value) {
    return sum + value;
  });
}
