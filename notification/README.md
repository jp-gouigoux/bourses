# Microservice notification

## Responsabilité

Ce service a pour rôle d'envoyer des notifications par email.

## Format 

Accepte seulement un JSON valide dans ce format : 

```
{
  "beneficiaire": "anael.chardan@gmail.com",
  "montantAffecte": 100000
}
```

## Lancement

docker run -d -p 87:87 bourses-notification
