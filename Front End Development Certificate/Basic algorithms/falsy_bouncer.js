/*
Remove all falsy values from an array.

Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
*/

function isItTrue(value) {
  if (value) {
    return value;
  }
}

function bouncer(arr) {
  return arr.filter(isItTrue);
}
