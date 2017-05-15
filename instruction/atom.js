var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
var fs = require('fs');
var brms = require('./brms.js');

var initAtom = function(url){

    var req = request(url)
    var options = '';
    var feedparser = new FeedParser();

    req.on('error', function (error) {
      console.log(error);
    });

    req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    }
    else {
        stream.pipe(feedparser);
    }
    });

    feedparser.on('error', function (error) {
      console.log(error);
    });

    feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while (item = stream.read()) {
        const status = item['atom:content']['m:properties']['d:statut']['#'];

        if(status === 'DEPOSE'){
            let article = brms.amountCalculation(item);
            console.log('Statut de l\'article : '+ article['atom:content']['m:properties']['d:statut']['#']);
            console.log('Montant :' + article['atom:content']['m:properties']['d:montant']['#']);
            //brms.updateArticle(article);
        }
    }
    });
}

exports.initAtom = initAtom;


  //   fs.createReadStream(url)
  // .on('error', function (error) {
  //   console.error(error);
  // })
  // .pipe(new FeedParser())
  // .on('error', function (error) {
  //   console.error(error);
  // })
  // .on('meta', function (meta) {
  //   console.log('===== %s =====', meta.title);
  // })
  // .on('readable', function() {
  //   var stream = this, item;
  //   while (item = stream.read()) {

  //     const status = item['atom:content']['m:properties']['d:statut']['#'];

  //       if(status === 'DEPOSE'){
  //           let article = brms.amountCalculation(item);
  //           console.log('Statut de l\'article : '+ article['atom:content']['m:properties']['d:statut']['#']);
  //           console.log('Montant :' + article['atom:content']['m:properties']['d:montant']['#']);
  //           //brms.updateArticle(article);
  //       }
        
  //   }
  // });