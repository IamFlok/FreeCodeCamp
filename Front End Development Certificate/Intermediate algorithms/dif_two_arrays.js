/*
Compare two arrays and return a new array with any items only found in one of
the two given arrays, but not both. In other words, return the symmetric
difference of the two arrays.
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
