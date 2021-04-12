var express = require('express');
var app = express();
var request = require('request')

let database = 'http://admin:adminpass@2.236.50.195:5984/'

let token='token'

app.get('/registrati', function (req, res) {

    if (typeof req.query.token != 'undefined' && req.query.token==token){

        if (Object.keys(req.query).length == 1) {
            request({
                url: database + 'patients/_all_docs',
                method: 'GET'
            }, function (error, response, body) {
                if (error) {
                    console.log(error)
                    res.status(500).send({errore: 'errore richiesta database'})
                }
                else {
                    var info = JSON.parse(body)
                    var codici = []
                    info.rows.forEach(function (elemento) {
                        codici.push(elemento.id)
                    })
                    var reg = { registrati: [] }
                    var lung = codici.length
                    codici.forEach(function (element) {
                        request({
                            url: database + 'patients/' + element,
                            method: 'GET'
                        }, function (error2, response2, body2) {
                            if (error2) {
                                console.log(error2)
                                res.status(500).send({errore: 'errore richiesta database'})
                            }
                            else {
                                info2 = JSON.parse(body2)
                                var trasm = {
                                    cf: info2._id,
                                    nome: info2.name,
                                    mail: info2.mail,
                                    verificato: info2.verificato,
                                    booked: info2.booked
                                }
                                reg.registrati.push(trasm)
                                lung = lung - 1
                                if (lung == 0) {
                                    res.status(200).send(reg)
                                }
                            }
                        })
                    })

                }
            });

        }
        else if (Object.keys(req.query).length == 2 && typeof req.query.cf != 'undefined') {
            request({
                url: database + 'patients/'+req.query.cf,
                method: 'GET'
            }, function (error, response, body) {
                if (error) {
                    console.log(error)
                    res.status(500).send({errore: 'errore richiesta database'})
                }
                else {
                    var info = JSON.parse(body)
                    var trasm = {
                        cf: info._id,
                        nome: info.name,
                        mail: info.mail,
                        verificato: info.verificato,
                        booked: info.booked
                    }
                    res.status(200).send(trasm)
                }
            })
        }
        else {
            res.status(400).send({errore: 'passati parametri errati'})
        }
    }
    else {
        res.status(401).send({errore: 'token errato o mancante'})
    }

})


app.listen(3000)