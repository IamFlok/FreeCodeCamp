/*
You will be provided with an initial array (the first argument in the
destroyer function), followed by one or more arguments. Remove all elements
from the initial array that are of the same value as these arguments.
*/

function destroyer(arr) {

  // check for every arguments
  for (var i = 1; i < arguments.length; i++) {
    var element = arguments[i];

    // while the element is part of the array
    while (arr.includes(element)) {

      // check for the indicies of the arguments
        var indicies = [];
        var idx = arr.indexOf(element);
        while (idx != -1) {
          indicies.push(idx);
          idx = arr.indexOf(element, idx + 1);
        }

        // remove elements from array using their indicies
        for (var x = 0; x < indicies.length; x++) {
          arr.splice(indicies[x],1);
        }
     }
  }
  return arr;
}
