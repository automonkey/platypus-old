var async = require('async');
var http = require('http');
var parser = require('./parse.js');

var stationResultsUrl = function(destinationStation) {
  return process.env.TRAIN_LOOKUP_BASE_URL + '/VIC/' + destinationStation;
};

var getTrainsForStation = function(station, trains, taskComplete) {
  http.get(stationResultsUrl(station), function(res) {
    var data = [];
    res.setEncoding('utf8');
    res.on('data', function(d) {
      data.push(d);
    });
    res.on('end', function() {
      trains.results = parser.parse(data.join(''));
      taskComplete();
    });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
    taskComplete();
  });
};

var getTrains = function(callback) {
  var bugTrains = {results: []};
  var wvfTrains = {results: []};
  async.parallel([
    function(taskCompleteCallback) {
      getTrainsForStation('BUG', bugTrains, taskCompleteCallback);
    },
    function(taskCompleteCallback) {
      getTrainsForStation('WVF', wvfTrains, taskCompleteCallback);
    }
  ], function(err) {
    if(err) return next(err);

    var results = [
      {
        'WVF': wvfTrains.results
      },
      {
        'BUG': bugTrains.results
      }
    ];
    callback(results);
  });
};

module.exports = {
  getTrains: getTrains
};
