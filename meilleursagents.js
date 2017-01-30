
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  // The URL we will scrape from - in our example Anchorman 2.

      url = 'https://www.meilleursagents.com/prix-immobilier/argenteuil-95100/';

      // The structure of our request call
      // The first parameter is our URL
      // The callback function takes 3 parameters, an error, response status code and the html
        request(url, function(error, response, html){
                if(!error){

                  var $ = cheerio.load(html);

                  // Finally, we'll define the variables we're going to capture

                  var title, release, rating;
                  var json = { title : "", release : "", rating : ""};

                }


                // To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('outputMA.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')





            })


})

app.listen('8081')
console.log('Magic happens on port 8081');

exports = module.exports = app;
