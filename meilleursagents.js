
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');



function getCleanString(indexStart, textCut, stringToBeClean){
  stringToBeClean = stringToBeClean.substring(indexStart, stringToBeClean.length);
  var index = stringToBeClean.indexOf(textCut);
  stringToBeClean = stringToBeClean.substring(0, index);
  return stringToBeClean;
}

var url = 'https://www.meilleursagents.com/prix-immobilier/argenteuil-95100/';


module.exports = {
  getDataFromWebSite2: function(url){
    var json = {prixMoyenAppart : "", prixMoyenMaison : "", loyerMensuel : "", evolutionAnnuelle : ""};

  // The URL we will scrape from - in our example Anchorman 2.


      // The structure of our request call The first parameter is our URL The
      // callback function takes 3 parameters, an error, response status code
      // and the html request(url, function(error, response, html){ if(!error){

      request(url, function(error, response, html){

              //   First we'll check to make sure no errors occurred when making the request

            if(!error){
              // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

              var $ = cheerio.load(html);

              // Finally, we'll define the variables we're going to capture

              var prixMoyenAppart, prixMoyenMaison, loyerMensuel, evolutionAnnuelle;

              // Look for the average price per m² of an appart
              $('.prices-summary__values').filter(function(){
                  var data = $(this);
                  prixMoyenAppart = data.children().next().children().first().next().next().text();

              })

              // Look for the average price per m² of a house
              $('.prices-summary__values').filter(function(){
                  var data = $(this);
                  prixMoyenMaison = data.children().next().next().children().first().next().next().text();

              })

              // Look for the average monthly rent price per m²
              $('.prices-summary__values').filter(function(){
                  var data = $(this);
                  loyerMensuel = data.children().next().next().next().children().first().next().next().text();

              })

              // Look for the average monthly rent price per m²
              $('.prices-summary__right-panel').filter(function(){
                  var data = $(this);
                  evolutionAnnuelle = data.children().children().children().next().children().first().text();

              })

              // The web site give us strings with wastes
              // Then, wse have to clean it.
              prixMoyenAppart = getCleanString(14, "\n", prixMoyenAppart)
              prixMoyenMaison = getCleanString(14, "\n", prixMoyenMaison)
              loyerMensuel = getCleanString(14, "\n", loyerMensuel)
              evolutionAnnuelle = getCleanString(44, "\n", evolutionAnnuelle)



              // Fill json file.
              json.prixMoyenAppart = prixMoyenAppart;
              json.prixMoyenMaison = prixMoyenMaison;
              json.loyerMensuel = loyerMensuel;
              json.evolutionAnnuelle = evolutionAnnuelle;

              //Print results
              console.log(prixMoyenAppart);
              console.log(prixMoyenMaison);
              console.log(loyerMensuel);
              console.log(evolutionAnnuelle);


              //Fin du if
            }

            fs.writeFile('outputMA.json', JSON.stringify(json, null, 4), function(err){

              console.log('File successfully written! - Check your project directory for the outputMA.json file');

            })
            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.

            //Fin du request
    })

//Fin du function
}

//Fin du exports
}
