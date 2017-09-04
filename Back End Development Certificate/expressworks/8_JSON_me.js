/*
Write a server that reads a file, parses it to JSON and outputs the content
to the user.

The port is passed in process.argv[2].  The file name is passed in process.argv[3].

Respond with:

    res.json(object)

Everything should match the '/books' resource path.
*/

var express = require('express');
var fs = require('fs');

var app = express();
var port = process.argv[2];
var file = process.argv[3];

app.get('/books', function(req, res) {
    fs.readFile(file, (err, data) => {
        if (err) return res.sendStatus(500);
        try {
            var content = JSON.parse(data);
        } catch (err) {
            res.sendStatus(500)
        }
        res.json(content);
    });
});

app.listen(port);
