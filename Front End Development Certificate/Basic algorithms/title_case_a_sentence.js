/*
Return the provided string with the first letter of each word capitalized.
Make sure the rest of the word is in lower case.

For the purpose of this exercise, you should also capitalize connecting
words like "the" and "of".
*/

function titleCase(str) {

  var arr = str.toLowerCase().split(" ");

  // capitalize the first char of each word
  var newArray = arr.map(function(str) {
    var replacedArray = str.split("");
    replacedArray[0] = str.charAt(0).toUpperCase();

    return replacedArray.join("");
  });

  return newArray.join(" ");
}
