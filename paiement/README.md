# Microservice paiement

## Responsabilité

Ce service a pour rôle d'effectuer les demandes de paiement reçues.
La demande est validée une fois le service [bourses-notification](https://github.com/jp-gouigoux/bourses/tree/master/notification) averti.

## Lancement

    docker run -d -p 8686:8686 bourses-paiement
