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
      trains[station] = parser.parse(data.join(''));
      taskComplete();
    });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
    taskComplete();
  });
};

var getTrains = function(callback) {
  var trains = {};
  async.parallel([
    function(taskCompleteCallback) {
      getTrainsForStation('BUG', trains, taskCompleteCallback);
    },
    function(taskCompleteCallback) {
      getTrainsForStation('WVF', trains, taskCompleteCallback);
    }
  ], function(err) {
    if(err) return next(err);
    callback(trains);
  });
};

module.exports = {
  getTrains: getTrains
};
