'use strict';
require('console-stamp')(console, '[HH:MM:ss.l]');
const express = require('express');
const util = require("util");

const redis = require("redis");
const client = redis.createClient({
  host: "172.25.0.3"
});
client.on("error", function(error) {
  console.error(error);
});
client.set("key", "value", redis.print);
client.get("key", redis.print);

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
  res.send(`<h1>Hello World!</h1><pre style="white-space: pre-wrap;">` + util.inspect($httpTransaction) + `</pre>`);
  console.log($httpTransaction);
  client.set(new Date().toISOString(), JSON.stringify($httpTransaction), redis.print);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
