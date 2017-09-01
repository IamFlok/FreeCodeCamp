/*
Return an English translated sentence of the passed binary string.

The binary string will be space separated.
*/

function binaryAgent(str) {

  var binaryArray = str.split(" ");
  var newArray = [];

  for (var i = 0; i<binaryArray.length; i++) {
    newArray.push(String.fromCharCode(parseInt(binaryArray[i], 2)));
  }

  return newArray.join("");
}
