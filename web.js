var express = require("express");
var logfmt = require("logfmt");
var app = express();
var trains = require('./lib/trains.js');

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  trains.getTrains(function(results) {
    res.send(results);
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
