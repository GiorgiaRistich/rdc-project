var express = require('express');
var app = express();
const { Pool, Client } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbpassword="adminpass"
db="progettordc"
token='token'
//giorno va in formato americano e.g. 03-14-2021 -> 14 marzo 2021

app.post('/insertdisp', function(req, res) {

    if (typeof req.body.token != 'undefined' && req.body.token==token){
            
        const pool = new Pool({
            user: "postgres",
            host: "2.236.50.195",
            database: db,
            password: dbpassword,
            port: "5432"
        });

        if(Object.keys(req.body).length!=4) {
            res.status(400).send({errore: 'passati parametri errati'})
            pool.end()
        }
        
        else {

            giorno=req.body.giorno
            orario=req.body.orario
            totdisponibilita=req.body.totdisponibilita

            if (typeof giorno == 'undefined' || typeof orario == 'undefined' || typeof totdisponibilita == 'undefined') {
                res.status(400).send({errore: 'passati parametri errati'})
                pool.end()
            }
            
            else {
                querystring="select * from disponibilita where giorno='"+giorno+"' and orario='"+orario+"'"
                pool.query(querystring, function (error, response) {
                    if (typeof response != 'undefined'){
                        if (response.rowCount) {
                            res.status(409).send({errore: 'data e orario già presenti nel database'})
                            pool.end()
                        }
                        else {
                        
                            querystring="INSERT INTO disponibilita(giorno, orario, totdisponibilita) VALUES ('"+
                                giorno+"', '"+orario+"', '"+totdisponibilita+"')"
                            pool.query(querystring, function (error1, response1) {
                                if (response1.rowCount==1) {
                                    res.status(200).send({conferma: 'disponibilità inserita'});
                                }
                                else {
                                    res.status(500).send({errore: "errore connessione al database"})
                                }
                                pool.end();
                            }
                            );
                        }
                    }
                    else {
                        res.status(500).send({errore: 'errore connessione al database'})
                    }

                })
            }

        }
    }
    else {
        res.status(401).send({errore: 'token errato o mancante'})
    }

})


app.listen(3000)