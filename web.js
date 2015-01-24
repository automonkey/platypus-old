var express = require("express");
var logfmt = require("logfmt");
var app = express();
var hbs = require('express3-handlebars');
var trains = require('./lib/trains.js');

app.use(logfmt.requestLogger());
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  trains.getTrains(function(results) {
    res.render('trains', results);
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
