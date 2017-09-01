/*
Create a function that sums two arguments together. If only one argument is
provided, then return a function that expects one argument and returns the sum.

For example, addTogether(2, 3) should return 5, and addTogether(2) should
return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = addTogether(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.
*/

function addTogether() {

    var firstArg = checkIfNumber(arguments[0]);
    var secondArg = checkIfNumber(arguments[1]);

    if (arguments.length > 1) {
      return (typeof firstArg === "number" && typeof secondArg === "number") ?
      firstArg + secondArg : undefined;
    } else if (typeof firstArg === "number") {
        return function(val) {
          return (typeof checkIfNumber(val) === "number") ?
            firstArg + val : undefined;
        }
    } else { return undefined; }
  }

function checkIfNumber(num){
  return (typeof num === "number") ? num : undefined;
}
