var http = require('http');

var amountCalculation = function(article){

    const r = random(1,5);

    const beneficiaire = article['atom:content']['m:properties']['d:beneficiaire']['#']

    if (r !== 4){

        const ascii = beneficiaire.charCodeAt(0);
        let montant = ascii * 100;

        article['atom:content']['m:properties']['d:montant']['#'] = montant;
        article['atom:content']['m:properties']['d:statut']['#'] = 'ENTRAITEMENT';
    } else {

        article['atom:content']['m:properties']['d:montant']['#'] = 0;
        article['atom:content']['m:properties']['d:statut']['#'] = 'REFUSE';
    }
    
    return article;
}

function random (low, high) {
    return Math.random() * (high - low) + low;
}

var updateArticle = function(article){

    const url = 'swarmjpg.westeurope.cloudapp.azure.com';

    request({
    host: url,
    port: 82,
    path: '/bourses/'+article['atom:content']['m:properties']['d:beneficiaire']['#'],
    method: 'PUT',
    json: JSON.parse(article)
    },function(error,request,body){
        
        request({
            host: url,
            port: 85,
            path: '/calcul/'+article['atom:content']['m:properties']['d:beneficiaire']['#'],
            method: 'POST'
        }) 

    });

}

exports.amountCalculation = amountCalculation;
exports.updateArticle = updateArticle;
