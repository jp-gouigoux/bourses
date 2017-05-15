var express  = require('express');
var app = express();
var port = process.env.PORT || 80;

//var url = process.env.URLDemandeBourse || "localhost";

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

app.listen(port);
console.log("App listening on port " + port);