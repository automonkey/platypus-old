var http = require('http');
var parser = require('./parse.js');

var stationResultsUrl = function() {
  return process.env.TRAIN_LOOKUP_BASE_URL + '/VIC/BUG';
};

var getTrains = function(callback) {
  http.get(stationResultsUrl(), function(res) {
    var data = [];
    res.setEncoding('utf8');
    res.on('data', function(d) {
      data.push(d);
    });
    res.on('end', function() {
      var response =
        { 'Burgess Hill' :
          parser.parse(data.join('')) };
      callback(response);
    });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });
};

module.exports = {
  getTrains: getTrains
};
