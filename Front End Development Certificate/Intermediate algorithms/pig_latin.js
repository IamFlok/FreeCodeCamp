/*
Translate the provided string to pig latin.

Pig Latin takes the first consonant (or consonant cluster) of an English word,
moves it to the end of the word and suffixes an "ay".

If a word begins with a vowel you just add "way" to the end.

Input strings are guaranteed to be English words in all lowercase.
*/

function translatePigLatin(str) {

  var strToMove, firstPartOfNewWord, secondPartOfNewWord = "";

  for (var i = 0; i < str.length; i++) {
    var charCheck = str.charAt(i).toLowerCase();
    // find the first vowel and store the first consonant cluster
    if (charCheck == "a" || charCheck == "e" || charCheck == "i" ||
        charCheck == "o" || charCheck == "u") {
      strToMove = str.substr(0, i);
      if (i == 0) { // the word begins with vowel
        firstPartOfNewWord = str;
        secondPartOfNewWord = "way";
      } else {
        firstPartOfNewWord = str.substr(i);
        secondPartOfNewWord = strToMove + "ay";
      }
      break;
    }
  }

  return firstPartOfNewWord + secondPartOfNewWord;
}
