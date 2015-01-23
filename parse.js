var cheerio = require('cheerio');

var parseHtml = function(data) {
  var $ = cheerio.load(data);

  var resultDom = $('ul.results li#result0');

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

  return { 'time': journeyStartTime,
           'platform': platform };
};

module.exports = {
  parse: parseHtml
};
