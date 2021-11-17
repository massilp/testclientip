'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
// require request-ip and register it as middleware
const requestIp = require('request-ip');

const router = express.Router();
router.get('/', (req, res) => {
  var ip = req.clientIp;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Your IP is' + ip + '</h1>');
  res.end();
});

app.use(requestIp.mw());
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

// test it locally from the command line
// > curl -X GET localhost:3000 # Hello, your ip address is ::1 and is of type IPv6
