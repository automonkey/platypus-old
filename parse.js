var cheerio = require('cheerio');

var parseHtml = function(data) {
  var results = {};

  var $ = cheerio.load(data);
  var resultsDom = $('ul.results');

  for(result in ['0', '1']) {
    var resultDom = $('li#result' + result, resultsDom);

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

    var platform = '?';
    if(platformInfo) {
      platform = platformInfo.replace(/\w+\s+/, '');
    }

    results[result] = { 'time': journeyStartTime,
                        'platform': platform };
  }

  return results;
};

module.exports = {
  parse: parseHtml
};
