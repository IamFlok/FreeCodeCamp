/*
Create an Express.js server that processes PUT '/message/:id' requests.

For instance:

    PUT /message/526aa677a8ceb64569c9d4fb

As a response to these requests, return the SHA1 hash of the current date
plus the sent ID:

    require('crypto')
      .createHash('sha1')
      .update(new Date().toDateString() + id)
      .digest('hex')
*/

var express = require('express');
var app = express();

var port = process.argv[2];

app.put('/message/:id', function(req, res) {
    var id = req.params.id;
    var str = require('crypto')
        .createHash('sha1')
        .update(new Date().toDateString() + id)
        .digest('hex')
    res.send(str);
});

app.listen(port);
