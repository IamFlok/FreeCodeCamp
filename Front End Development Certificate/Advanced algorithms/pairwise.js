/*
Given an array arr, find element pairs whose sum equal the second argument
arg and return the sum of their indices.

If multiple pairs are possible that have the same numeric elements but
different indices, return the smallest sum of indices. Once an element has
been used, it cannot be reused to pair with another.

For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum
to 20 are [7, 13] and [9, 11]. We can then write out the array with their
indices and values.

7 + 13 = 20 → Indices 0 + 3 = 3
9 + 11 = 20 → Indices 1 + 2 = 3
3 + 3 = 6 → Return 6
*/

function pairwise(arr, arg) {

  return arr.reduce(function(acc, val, index, array){
    for (var i = index+1; i < array.length; i++) {
      if (array[index] + array[i] == arg) {
        acc += i + index;
        array[index] = array[i] = NaN;
      }
    }
    return acc;
  }, 0);
}
