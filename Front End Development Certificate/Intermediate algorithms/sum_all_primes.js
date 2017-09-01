/*
Sum all the prime numbers up to and including the provided number.

A prime number is defined as a number greater than one and having only two
divisors, one and itself. For example, 2 is a prime number because it's only
divisible by one and two.

The provided number may not be a prime.
*/

function sumPrimes(num) {

  // create an array of the prime numbers and sum
  primeArray = [];
  for (var i = 2; i<=num; i++) {
    if (isPrime(i)) {
      primeArray.push(i);
    }
  }

  return primeArray.reduce(function(sum, val) {
    return sum + val;
  });
}

// validate if the argument is a prime number
function isPrime(val) {
  for (var j = 2; j<val; j++) {
    if (val % j === 0) {
      return false;
    }
  }
  return true;
}
