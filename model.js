var leboncoin = require('./leboncoin.js')
var meilleursagents = require('./meilleursagents.js')
var express = require('express')
var jsonLeboncoin, jsonMeilleursAgents;
var app = express();
var bodyParser = require('body-parser')
var path = require('path');


var prixMoyen = 0;


//Use CSS files and images
app.use("/css",  express.static(__dirname + '/css'));
app.use("/images",  express.static(__dirname + '/images'));

app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
});


//Je sais pas ca sert a quoi mdr
app.use(bodyParser.urlencoded({
    extended: true
}));
//Pareil
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.post("/compare", function (req, res) {

    // Get URL from POST input
    var url=req.body.url;

    leboncoin.getDataFromWebSite(url, function(jsonLBC){
        var ville = jsonLBC.city;
        var postalCode = jsonLBC.postalCode;
        var type = jsonLBC.type;


        meilleursagents.getDataFromWebSite2(postalCode, ville, type, function(jsonMA){
          if(type == "Appartement"){
                //On remplit les variables pour le client
            prixMoyen = jsonMA.prixMoyenAppart;
            }
            else {
              //On remplit les variables pour le client
              prixMoyen = jsonMA.prixMoyenMaison;
            }

            //res.sendFile(path.join(__dirname + '/compare.html'));
            res.render("compare", {dataMA :jsonMA, dataLBC : jsonLBC, prixMoyen: prixMoyen });

        });

    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

console.log("Done !!");


