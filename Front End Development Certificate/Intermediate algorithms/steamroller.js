/*
Flatten a nested array. You must account for varying levels of nesting.
*/

function steamrollArray(arr) {

  // check every argument, if next argument is an array,
  // merge and recall the function
  return arr.reduce(function(val, next) {
    return (Array.isArray(next)) ?
    val.concat(steamrollArray(next)) : val.concat(next);
  }, []);
}
