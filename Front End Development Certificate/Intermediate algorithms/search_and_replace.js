/*
Perform a search and replace on the sentence using the arguments provided and
return the new sentence.

First argument is the sentence to perform the search and replace on.

Second argument is the word that you will be replacing (before).

Third argument is what you will be replacing the second argument with (after).

NOTE: Preserve the case of the original word when you are replacing it. For
example if you mean to replace the word "Book" with the word "dog", it should
be replaced as "Dog"
*/

function myReplace(str, before, after) {
  var beforeArray = before.split("");
  var afterArray = after.split("");

  // compare the first letters of the words
  if (beforeArray[0] == beforeArray[0].toUpperCase() && afterArray[0] == afterArray[0].toLowerCase()) {
    afterArray[0] = afterArray[0].toUpperCase();
  } else if (beforeArray[0] == beforeArray[0].toLowerCase() && afterArray[0] == afterArray[0].toUpperCase()) {
    afterArray[0] = afterArray[0].toLowerCase();
  }

  var newAfter = afterArray.join("");

  var rep = new RegExp(before, "i");
  return str.replace(rep, newAfter);
}
