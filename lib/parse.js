var cheerio = require('cheerio');

var parseHtml = function(data) {
  var results = [];

  var $ = cheerio.load(data);
  var resultsDom = $('ul.results');

  for(train in ['0', '1']) {
    var resultDom = $('li#result' + train, resultsDom);

    var journeytime = $('strong:first-child', resultDom).text();
    var journeyStartTime = journeytime.replace(/\s.*/, '');

    var journeyDetails = $('small', resultDom);
    var emTexts = [];
    journeyDetails.find('em').each(function(_, e) {
      emTexts.push($(e).text());
    });

    var platformInfo = emTexts.filter(function(e) {
      return /^Platform\n\t+\d+$/.test(e);
    })[0];

    var result = {
      'time': journeyStartTime
    };

    if(platformInfo) {
      result.platform = platformInfo.replace(/\w+\s+/, '');
    }

    results.push(result);
  }

  return results;
};

module.exports = {
  parse: parseHtml
};
