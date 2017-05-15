var http = require('http');
var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var listener = 84;
var server = http.createServer(app);
var path = require("path");

var atom = require('./atom.js');

const FEED = 'http://swarmjpg.westeurope.cloudapp.azure.com:83/demandes-bourses'
//const FEED = __dirname+'/atom.xml';

server.listen(listener);

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/poll', function(req, res) {
    
    atom.initAtom(FEED);
});
