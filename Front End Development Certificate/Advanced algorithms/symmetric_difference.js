/*
Create a function that takes two or more arrays and returns an array of
the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the
mathematical term "symmetric difference" of two sets is the set of elements
which are in either of the two sets, but not in both (A △ B = C = {1, 4}).
For every additional symmetric difference you take (say on a set D = {2, 3}),
you should get the set with elements which are in either of the two the sets
but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).
*/

function diffArray(arr1, arr2) {

  var filteredArr1 = arr1.filter(function(val){
    return !arr2.includes(val);
  });

  var filteredArr2 = arr2.filter(function(val){
    return !arr1.includes(val);
  });

  return filteredArr1.concat(filteredArr2);
}

function removeDuplicates(arr) {
  var result = [];
  arr.forEach(function(val){
    if (result.indexOf(val) < 0) {
      result.push(val);
    }
  });
  return result;
}

function sym(args) {
  // store all arguments in an array
  args = Array.prototype.slice.call(arguments);

  return args.reduce(function(acc, next) {
    acc = removeDuplicates(acc);
    next = removeDuplicates(next);
    acc = diffArray(acc, next);
    return acc;
  });
}
