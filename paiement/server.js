var http = require('http');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var listener = 8686;

var server = http.createServer(app);
server.listen(listener);

var path = require("path");

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/paiement', function(req, res) {
    var payment = req.body.payment;
    var montant = payment.amount;
    var beneficiaire = req.body.beneficiaire;

    console.log(montant,beneficiaire);
    const options = {
      method: 'POST',
      url: 'http://swarmjpg.westeurope.cloudapp.azure.com:8787/send-notification',
      body: {
        beneficiaire: beneficiaire,
        montant: montant
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        res.status(500);
        res.send('Demande de paiement non prise en compte');
        console.log(error);
      } else {
        res.status(200);
        res.send("Demande de paiement enregistrée pour bénéficiaire " + payment.identifier + " d'un montant de " + montant + " à la date du " + payment.paymentDate);
        console.log(body);
      }
    });

});

app.get('/', function(req, res) {
    res.status(200);
    res.send("Test OK");
});
