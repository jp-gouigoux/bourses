const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const gmailSend = require('gmail-send')

const listener = 87

const server = http.createServer(app)
server.listen(listener)

app.use(bodyParser.json())

app.post('/send-notification', (req, res) => {
  const { beneficiaire, montantAffecte } = req.body

  if (beneficiaire && montantAffecte) {
    gmailSend({
      user: 'emn.fil2018@gmail.com',
      pass: 'cyZGFGT9UHQwpf',
      to: beneficiaire,
      subject: 'Reponse de bourse',
      text: `BRAVO POUR VOS BOURSES, votre montant affecté est de ${montantAffecte}`
    })()

    res.status(200)
  } else {
    res.status(400)
  }
})
