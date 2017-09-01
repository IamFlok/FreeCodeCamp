/*
Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.

  for installing moment: npm install moment
*/

const url = require('url');
const http = require('http');
const moment = require('moment');

const port = process.argv[2];

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const pathname = url.parse(req.url, true).pathname;
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (pathname === '/api/parsetime') {
    return res.end(JSON.stringify({
      hour: moment(query.iso).hour(),
      minute: moment(query.iso).minute(),
      second: moment(query.iso).second()
    }));
  } else if (pathname === '/api/unixtime') {
    return res.end(JSON.stringify({
      unixtime: Number(moment(query.iso).format('x'))
    }));
  }

  res.end(JSON.stringify({
    success: false,
    message: `${pathname} is not a valid endpoint`
  }));
});

server.listen(port);
