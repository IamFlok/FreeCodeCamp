/*
The DNA strand is missing the pairing element. Take each character, get its
pair, and return the results as a 2d array.

Base pairs are a pair of AT and CG. Match the missing element to the provided
character.

Return the provided character as the first element in each array.

For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]

The character and its pair are paired up in an array, and all the arrays are
grouped into one encapsulating array.
*/

function pairElement(str) {

  var DNAArray = str.split("");
  var DNAPairs = [["A","T"], ["T","A"], ["G","C"], ["C","G"]];
  var result = [];

  // compare each DNAArray element with the first element of each DNA Pairs
  for (var i = 0; i<str.length; i++) {
    for (var j = 0; j<DNAPairs.length; j++) {
      if (DNAArray[i] == DNAPairs[j][0]) {
        result.push(DNAPairs[j]);
      }
    }
  }
  return result;
}
