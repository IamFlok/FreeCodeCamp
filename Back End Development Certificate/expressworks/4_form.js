/*
Write a route ('/form') that processes HTML form input
(<form><input name="str"/></form>) and prints backwards the str value.

for bodyparser: npm install body-parser
*/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.argv[2];

app.use(bodyParser.urlencoded({extended: false}));
app.post('/form', function(req, res) {
    res.send(req.body.str.split('').reverse().join(''));
});

app.listen(port);
