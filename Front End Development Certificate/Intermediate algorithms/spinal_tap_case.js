/*
Convert a string to spinal case. Spinal case is
all-lowercase-words-joined-by-dashes.
*/

function spinalCase(str) {

  // use regex to split valid words
  var newStr = str.replace(/([a-z])([A-Z])/g, '$1-$2');
  // replace spaces or underscores with dashes
  return newStr.replace(/\s|_/g, '-').toLowerCase();
}
