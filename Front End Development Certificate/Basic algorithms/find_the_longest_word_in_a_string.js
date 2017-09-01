/*
Return the length of the longest word in the provided sentence.

Your response should be a number.
*/

function findLongestWord(str) {

  var arr = str.split(" ");
  var result = 0;

  arr.map(function(str) {
    if (str.length > result) {
      result = str.length;
    }
  });

  return result;
}
