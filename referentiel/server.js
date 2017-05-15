var http = require('http');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var listener = 82;

var server = http.createServer(app);
server.listen(listener);

mongoose.connect('mongodb://swarmjpg.westeurope.cloudapp.azure.com:27017', function(err) {
	if(err) {
		console.log('connection error (first try)', err);
		setTimeout(function() {
			mongoose.connect('mongodb://swarmjpg.westeurope.cloudapp.azure.com:27017', function(err) {
				if(err) {
					console.log('connection error (second try)', err);
					setTimeout(function() {
						mongoose.connect('mongodb://swarmjpg.westeurope.cloudapp.azure.com:27017', function(err) {
							if(err) {
								console.log('connection error (three strikes... you are out)', err);
							} else {
								console.log('successful connection (third try... almost out)');
							}
						});
					},10000);
				} else {
					console.log('successful connection (second try)');
				}
			});
		},5000);
	} else {
		console.log('successful connection (first try)');
	}
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var path = require("path");

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var bourseSchema = mongoose.Schema({
	beneficiaire : String,
	revenuFiscalReference : Number,
	geolocFoyer : {
		lat : Number,
		lon : Number
	},
	geolocEcole : {
		lat : Number,
		lon : Number
	},
	nbPersonnesCharge : Number
});

var Bourse = mongoose.model('Bourse', bourseSchema);
var root = '/bourses';

app.get(root + '/', function(req, res) {
	Bourse.find(function(err, bourses) {
		if(err) {
			res.status(500);
			res.send(err);
		} else if(!bourses || bourses.length < 1) {			
			res.status(404);
			res.send('NOT FOUND');
		} else {
			res.status(200);
			res.send(bourses);
		}
	});
});

app.get(root + '/:id', function(req, res) {
	var id = req.params.id;
	Bourse.find({ beneficiaire : id}, function(err, bourse) {
		if(err) {
			res.status(500);
			res.send(err);
		} else if(!bourse) {			
			res.status(404);
			res.send('NOT FOUND');
		} else {
			res.status(200);
			res.send(bourse);
		}
	});
});

app.post(root + '/', function(req, res) {
	var bourse = new Bourse(req.body);
	bourse.save(function(err) {
		if(err) {
			res.status(400);
			res.send(err);
		} else {
			res.status(201);
			res.send(root + '/' + bourse.beneficiaire);
		}
	});
});

app.put(root + '/:id', function(req, res) {
	var id = req.params.id;
	Bourse.update({ beneficiaire : id}, {$set: req.body}, function(err) {
		if(err) {
			res.status(500);
			res.send(err);
		} else {
			res.status(200);
			res.send('MISE A JOUR EFFECTUEE');
		}
	});
});

app.patch(root + '/:id', function(req, res) {
	res.status(501);
	res.send();
	/*
	var id = req.params.id;
	Bourse.update({ beneficiaire : id}, {$set: req.body}, function(err) {
		if(err) {
			res.status(500);
			res.send(err);
		} else {
			res.status(200);
			res.send('MISE A JOUR EFFECTUEE');
		}
	});
	*/
});

app.delete(root + '/:id', function(req, res) {
    var id = req.params.id;
	Bourse.remove({ beneficiaire : id}, function(err) {
		if(err) {
			res.status(500);
			res.send(err);
		} else {
			res.status(200);
			res.send('SUPPRESSION EFFECTUEE');
		}
	});
});