/*
Write a function that takes two or more arrays and returns a new array of
unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included in
their original order, but with no duplicates in the final array.

The unique numbers should be sorted by their original order, but the final
array should not be sorted in numerical order.
*/

function uniteUnique(arr) {

  // create an array of the provided arguments
  var args = Array.prototype.slice.call(arguments);

  // compare each arguments and if an element is unique
  // merge it into the result
  return args.reduce(function(arr1, arr2) {
    return arr1.concat(arr2.filter(function(val) {
      return !arr1.includes(val);
    }));
  });
}
