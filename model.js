var leboncoin = require('./leboncoin.js')
var meilleursagents = require('./meilleursagents.js')
var responseLeboncoin = leboncoin.getDataFromWebSite('https://www.leboncoin.fr/ventes_immobilieres/1026430112.htm?ca=12_s', function(json){

  console.log("resultat : " + json);
  var jsonData = json;
  return json;
});

var responseMeilleursAgents = meilleursagents.getDataFromWebSite2('https://www.meilleursagents.com/prix-immobilier/argenteuil-95100/');


console.log("Done !!");
