var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  // The URL we will scrape from - in our example Anchorman 2.

      url = 'https://www.leboncoin.fr/ventes_immobilieres/1026430112.htm?ca=12_s';

      // The structure of our request call
      // The first parameter is our URL
      // The callback function takes 3 parameters, an error, response status code and the html
        request(url, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);

                    var title, price, type, location, city, postalCode, type;
                    var json = { title : "", price : "", city : "", postalCode : "", type : ""};

                    // We'll use the unique header class as a starting point.
                    // Title class is named "no-border". It's unique in the page.
                    $('.no-border').filter(function(){
                        var data = $(this);
                        title = data.text();

                    })

                    //Look for the price
                   $('.item_price.clearfix').filter(function(){
                        var data = $(this);
                        price =  data.attr('content');
                    })

                    //Look for the location
                   $('div.line.line_city').filter(function(){
                        var data = $(this);
                        location =  data.children().children().next().text();
                    })

                    //Look for the house type
                   $('div.line.line_city').filter(function(){
                        var data = $(this);
                        type =  data.next().next().children().children().next().text();
                    })

                   //Separate City and Postal codePostal
                    var locationArray = location.split(" ");
                    city = locationArray[0];
                    postalCode = locationArray[1];


                    // Ajust title.
                    title = title.substring(14, title.length);
                    var index = title.indexOf("\n");
                    title = title.substring(0, index);


                    json.type = type;
                    json.city = city;
                    json.postalCode = postalCode;
                    json.title = title;
                    json.price = price;

                    console.log(title)
                    console.log(price)
                    console.log(location)
                    console.log(type)



                }
                // To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('outputLeboncoin.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')





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
