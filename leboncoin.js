var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  // The URL we will scrape from - in our example Anchorman 2.

      url = 'https://www.leboncoin.fr/ventes_immobilieres/1083503132.htm?ca=12_s';

      // The structure of our request call
      // The first parameter is our URL
      // The callback function takes 3 parameters, an error, response status code and the html
        request(url, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);

                    var title, release, rating;
                    var json = { title : "", release : "", rating : ""};

                    // We'll use the unique header class as a starting point.
                    // Title class is named "no-border". It's unique in the page.
                    $('.no-border').filter(function(){
                        var data = $(this);
                        title = data.text();
                        json.title = title;
                        console.log(title)
                    })

                    //Look for  the price
                   $('.item_price.clearfix').filter(function(){
                        var data = $(this);
                        price =  data.attr('content');
                        json.price = price;
                        console.log(price)
                    })
                }

                

            })

              //title = document.querySelector('#adview > section > header > h1').innerText
              //json.title = title

              // //Scrap the type
              // type = document.querySelector('#adview > section > section > section.properties.lineNegative > div:nth-child(8) > h2 > span.value').innerText
              // json.type = type
              //
              // //Scrap the location
              // location = document.querySelector('#adview > section > section > section.properties.lineNegative > div.line.line_city > h2 > span.value').innerText
              // json.location = location
              //
              // //Scrap the postalCode
              //
              // //Scrap the price
              // price = document.querySelector('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').innerText
              // json.price = price
              //
              // //Scrap the number of Rooms
              // nbRooms =   document.querySelector('#adview > section > section > section.properties.lineNegative > div:nth-child(9) > h2 > span.value').innerText
              // json.price = nbRooms
              //
              // //Scrap the Comments

})

app.listen('8081')
console.log('Magic happens on port 8081');

exports = module.exports = app;
