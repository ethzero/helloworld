'use strict';
require('console-stamp')(console, '[HH:MM:ss.l]');
const express = require('express');
const util = require("util");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  var $httpTransaction = {
    'req.query': req.query,
    'req.headers': req.headers
  }
  res.send(`<pre>` + util.inspect($httpTransaction) + `</pre>`);
  console.log($httpTransaction);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
