/*
This problem is the same as the previous problem (HTTP COLLECT) in that
  you need to use http.get(). However, this time you will be provided with
  three URLs as the first three command-line arguments.

  You must collect the complete content provided to you by each of the URLs
  and print it to the console (stdout). You don't need to print out the
  length, just the data as a String; one line per URL. The catch is that you
  must print them out in the same order as the URLs are provided to you as
  command-line arguments.

  To install bl: npm install bl
*/

var http = require('http');
var bl = require('bl');

var result = []
var counter = 0;

function printResults () {
  for (var i = 0; i < 3; i++) {
    console.log(result[i]);
  }
}

function httpGet (idx) {
  http.get(process.argv[2 + idx], (response) => {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err);
      }

      result[idx] = data.toString();
      counter++;

      if (counter === 3) {
        printResults();
      }
    }));
  });
}

for (var i = 0; i < 3; i++) {
  httpGet(i);
}
