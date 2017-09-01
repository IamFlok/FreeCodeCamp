/*
Return the lowest index at which a value (second argument) should be inserted
into an array (first argument) once it has been sorted. The returned value
should be a number.

For example, getIndexToIns([1,2,3,4], 1.5) should return 1 because it is
greater than 1 (index 0), but less than 2 (index 1).

Likewise, getIndexToIns([20,3,5], 19) should return 2 because once the array
has been sorted it will look like [3,5,20] and 19 is less than 20 (index 2)
and greater than 5 (index 1).
*/

function getIndexToIns(arr, num) {

  var sortedArray = arr.sort(function (a, b) {
    return a - b;
  });

  var lastIndex = arr.length;

  // if it's the smallest number, return the first index
  if (num <= arr[0]) {
    return arr.indexOf(arr[0]);
  }
  // if it's the biggest number, it's an extra index
  else if (num > arr[lastIndex - 1]) {
    return lastIndex;
  }
  // else loop through the array to find its index
  else {
    for (var i = 0; i < lastIndex; i++) {
      if (arr[i] < num && arr[i+1] >= num) {
        return arr.indexOf(arr[i+1]);
      }
    }
  }
}
