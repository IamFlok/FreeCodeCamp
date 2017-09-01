/*
Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and
backward, ignoring punctuation, case, and spacing.

Note
You'll need to remove all non-alphanumeric characters (punctuation,
spaces and symbols) and turn everything lower case in order to check for
palindromes.
*/

function palindrome(str) {

  // store only alphabets in lowercase
  var lowStripped = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // reverse alphabets and store in a new string for compariton
  var arr = lowStripped.split("").reverse();
  var reversedString = arr.join("");

  return (lowStripped == reversedString) ? true : false;
}
