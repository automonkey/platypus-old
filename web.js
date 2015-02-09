var express = require("express");
var logfmt = require("logfmt");
var app = express();
var trains = require('./lib/trains.js');

app.use(logfmt.requestLogger());

app.set('view engine', 'jade');

function resultsResponseGenerator(req) {
  switch(req.accepts(['html', 'json'])) {
    case 'json':
      return function(res, resultsJson) {
        res.send(resultsJson);
      };
    case 'html':
      return function(res, resultsJson) {
        res.render('results', resultsJson);
      };
  }

  return null;
}

app.get('/', function(req, res) {
  var responseGenerator = resultsResponseGenerator(req);
  if(responseGenerator === null) {
    res.sendStatus(406);
    return;
  }

  trains.getTrains(function (resultsJson) {
    responseGenerator(res, resultsJson);
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
