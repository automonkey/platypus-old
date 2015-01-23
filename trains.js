var http = require('http');

var testData =
{ 'BUG':
  {
    'time': '16:30',
    'platform': '16'
  }
};

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
      callback(testData);
    });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });
};

module.exports = {
  getTrains: getTrains
};
