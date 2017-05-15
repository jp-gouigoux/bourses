var http = require('http');

var amountCalculation = function(article){

    const r = random(1,5);

    if (r !== 4){
        const ascii = article.beneficiaire.charCodeAt(0);
        let montant = ascii * 100;

        article.montant = montant;
        article.status = 'EN TRAITEMENT';
    } else {

        article.montant = 0;
        article.status = 'REFUSE';
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
    path: '/bourses/'+article.beneficiaire,
    method: 'PUT',
    json: JSON.parse(article)
    },function(error,request,body){
        
        request({
            host: url,
            port: 85,
            path: '/calcul/'+article.beneficiaire,
            method: 'POST'
        }) 

    });

}

exports.amountCalculation = amountCalculation;
exports.updateArticle = updateArticle;
