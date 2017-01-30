var request = require('request');
var cheerio = require('cheerio');
request('https://www.leboncoin.fr/ventes_immobilieres/1083749138.htm?ca=12_s', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('no-border').each(function(i, element){
      //var a = $(this).prev();
      console.log($(this).text());
    });
  }
});
