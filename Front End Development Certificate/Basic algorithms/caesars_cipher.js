/*
One of the simplest and most widely known ciphers is a Caesar cipher, also
known as a shift cipher. In a shift cipher the meanings of the letters are
shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are
shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns
a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character
(i.e. spaces, punctuation), but do pass them on.
*/

function rot13(str) {

  // store the charCodes of characters in an array
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i));
  }

  // alphabetic unicodes are between 65 - 90
  // non-alphabetic are returned unchanged
  var newArray = arr.map(function(val) {
    if (val < 65 || val > 90) {
      return String.fromCharCode(val);
    } else if (val <= 77) {
      return String.fromCharCode(val + 13);
    } else { return String.fromCharCode(val - 13); }
  });

  return newArray.join("");
}
