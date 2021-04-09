var express = require('express');
var app = express();
var request = require('request')

let database = 'http://admin:adminpass@2.236.50.195:5984/'



app.get('/registrati', function (req, res) {


    if (Object.keys(req.query).length == 0) {
        request({
            url: database + 'patients/_all_docs',
            method: 'GET'
        }, function (error, response, body) {
            if (error) {
                console.log(error)
                res.send("qualcosa non va")
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
                            res.send("qualcosa non va")
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
                                res.send(reg)
                            }
                        }
                    })
                })

            }
        });

    }
    else if (Object.keys(req.query).length == 1 && typeof req.query.cf != 'undefined') {
        request({
            url: database + 'patients/'+req.query.cf,
            method: 'GET'
        }, function (error, response, body) {
            if (error) {
                console.log(error)
                res.send("qualcosa non va")
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
                res.send(trasm)
            }
        })
    }
    else {
        res.send({errore: 'passati parametri errati'})
    }

})


app.listen(3000)