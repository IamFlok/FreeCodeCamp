/*
Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.
*/

function fearNotLetter(str) {

  // store the first letter by its unicode
  var firstCharCode = str.charCodeAt(0);
  var missingLetter = "";

  // check if each character is matching the order by increasing unicodes
  for (var i = 0; i<str.length; i++) {
    if (str.charCodeAt(i) !== firstCharCode + i) {
      missingLetter = String.fromCharCode(firstCharCode + i);
      break;
    } else { missingLetter = undefined; }
  }

  return missingLetter;
}
