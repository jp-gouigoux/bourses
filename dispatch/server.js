var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');
const _ = require('lodash')

var listener = 83;

var server = http.createServer(app);
server.listen(listener);

var path = require('path');

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/demandes-bourses', function(req, res) {
  res.status(200);

    // res.send(createFile([1, 2, 3]))

  return request({
      method: 'GET',
      uri: 'http://swarmjpg.westeurope.cloudapp.azure.com:82'
    },
        function(error, response, body) {
          if (error) {
              return console.error('GET Failed :', error);
            }
          console.log(response.statusCode);
          var content = body;
          console.log('Content recieved', content)
            // Transformations sur content
          res.send(createFile(content));
        });
});

function createFile(entities) {
  console.log('entities', entities)
  var entries = _.map(entities, e => createEntries(e))
  console.log('entries', entries)


  return createHeader() +
        _.join(entries, '') +
        createFooter();
}

function createHeader() {
  return '<?xml version="1.0" encoding="utf-8" standalone="yes"?>' +
        '<feed xml:base=http://services.odata.org/OData/OData.svc/' +
        'xmlns:d=http://schemas.microsoft.com/ado/2007/08/dataservices' +
        'xmlns:m=http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' +
        'xmlns="http://www.w3.org/2005/Atom">' +
        '<title type="text">Bourses</title>' +
        '<id>http://swarmjpg.westeurope.cloudapp.azure.com:82/bourses</id>' +
        '<updated>2017-05-15T08:38:14Z</updated>' +
        '<link rel="self" title="Categories" href="Categories" />';
}

function createEntries(entity) {
  console.log('createEntries', entity)
  return '   <entry>  ' +
        '       <id>http://swarmjpg.westeurope.cloudapp.azure.com:82/bourses/nom1</id>  ' +
        '       <title type="text">nom1</title>  ' +
        '       <updated>2017-05-15T08:38:14Z</updated>  ' +
        '       <author>  ' +
        '         <name />  ' +
        '       </author>  ' +
        '       <link   ' +
        '           rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products"  ' +
        '           type="application/atom+xml;type=feed"  ' +
        '           title="Products" href="Categories(0)/Products" />  ' +
        '       <category term="ODataDemo.Category"  ' +
        '           scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />  ' +
        '       <content type="application/xml">  ' +
        '         <m:properties>  ' +
        '           <d:Beneficiaire>' + entity.beneficiaire + '</d:Beneficiaire>  ' +
        '           <d:RevenuFiscal>' + entity.revenuFiscal + '</d:RevenuFiscal>  ' +
        '           <d:GeolocFoyerLong>' + entity.goelocFoyer.lon + '</d:GeolocFoyerLong>  ' +
        '           <d:GeolocFoyerLat>' + entity.geolocFoyer.lat + '</d:GeolocFoyerLat>  ' +
        '           <d:GeolocEcoleLong>' + entity.geolocEcole.lon + '</d:GeolocEcoleLong>  ' +
        '           <d:GeolocEcoleLat>' + entity.geolocEcole.lat + '</d:GeolocEcoleLat>  ' +
        '           <d:PersonnesCharge>' + entity.personnesCharge + '</d:PersonnesCharge>  ' +
        '         </m:properties>  ' +
        '       </content>  ' +
        '    </entry>  ';
}

function createFooter() {
  return '</feed>'
}

