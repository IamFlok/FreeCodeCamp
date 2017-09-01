/*
Compare and update the inventory stored in a 2D array against a second 2D array
of a fresh delivery. Update the current existing inventory item quantities
(in arr1). If an item cannot be found, add the new item and quantity into the
inventory array. The returned inventory array should be in alphabetical order
by item.
*/

function updateInventory(arr1, arr2) {

    // convert the two array into one inventory for mapping
    var inventory = arr1.concat(arr2).reduce(function(acc, next) {
      if (acc[next[1]]) {
        acc[next[1]] += next[0];
      } else {
        acc[next[1]] = next[0];
      }
      return acc;
    }, {});

    // create an array with the right order
    return Object.keys(inventory).map(function(value) {
      return [inventory[value], value];
    }).sort(function(a,b) {
      if (a[1] === b[1]) {
        return 0;
      } else {
        return (a[1] < b[1]) ? -1 : 1;
      }
    });
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];
