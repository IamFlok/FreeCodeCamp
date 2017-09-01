/*
Write a function that splits an array (first argument) into groups the
length of size (second argument) and returns them as a two-dimensional array.
*/

function chunkArrayInGroups(arr, size) {

  var splitCount = arr.length / size;
  var newArray = [];

  for (var i = 0; i < splitCount; i++) {
    newArray.push(arr.slice(0, size));
    arr.splice(0, size);
  }

  return newArray;
}
