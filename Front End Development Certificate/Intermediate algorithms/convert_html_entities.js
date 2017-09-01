/*
Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a
string to their corresponding HTML entities.
*/

function convertHTML(str) {

  var entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\"': '&quot;',
    '\'': '&apos;'
  };

  return str.split('').map(function(char) {
    return entities[char] || char;
  }).join("");
}
