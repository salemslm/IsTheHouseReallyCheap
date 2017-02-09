var leboncoin = require('./leboncoin.js')
var meilleursagents = require('./meilleursagents.js')
var express = require('express')
var jsonLeboncoin, jsonMeilleursAgents;
var app = express();
var bodyParser = require('body-parser')



app.use("/css",  express.static(__dirname + '/css'));
app.use("/images",  express.static(__dirname + '/images'));

app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post("/compare", function (req, res) {
  console.log("tu passe pas par la");

    // Get URL from POST input
    var url=req.body.url;

    leboncoin.getDataFromWebSite(url, function(json){
        var ville = json.city;
        var postalCode = json.postalCode;
        var type = json.type;


        meilleursagents.getDataFromWebSite2(postalCode, ville, type);
        res.sendFile(__dirname + '/index.html');

    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

console.log("Done !!");


//
// console.log("LOL : " + __dirname);
// app.get('/index', function(req, res){
//   res.send('id: ' + req.query.id);
//   //console.log(req.body.url);
// });
//
// var responseLeboncoin = leboncoin.getDataFromWebSite('https://www.leboncoin.fr/ventes_immobilieres/1026430112.htm?ca=12_s', function(json){
//   jsonLeboncoin = json;
// });
//
// var responseMeilleursAgents = meilleursagents.getDataFromWebSite2('https://www.meilleursagents.com/prix-immobilier/argenteuil-95100/', function(json){
//   jsonMeilleursAgents = json;
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })
//
// console.log("Done !!");
