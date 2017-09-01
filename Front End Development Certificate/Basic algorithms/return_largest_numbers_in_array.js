/*
Return an array consisting of the largest number from each provided sub-array.
For simplicity, the provided array will contain exactly 4 sub-arrays.

Remember, you can iterate through an array with a simple for loop,
and access each member with array syntax arr[i].
*/

function largestOfFour(arr) {

  var newArray = arr.map(function(num) {
    var biggestNum = 0;
    for (var i = 0; i < 4;i++) {
      if (biggestNum < num[i]) {
        biggestNum = num[i];
      }
    }
    return biggestNum;
  });

  return newArray;
}
