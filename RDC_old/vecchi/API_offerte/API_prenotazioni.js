var express = require('express');
var app = express();
const { Pool, Client } = require("pg");

dbpassword="adminpass"
db="progettordc"
tokenapi='token'

app.get('/prenotazioni', function(req, res) {

    if (typeof req.query.token != 'undefined' && req.query.token==tokenapi){

        const pool = new Pool({
            user: "postgres",
            host: "2.236.50.195",
            database: db,
            password: dbpassword,
            port: "5432"
        });

        if (Object.keys(req.query).length == 1) {
            querystring="SELECT * FROM prenotazioni"
            pool.query(querystring, function (error, response) {
                if (error) {
                    console.log(error)
                    res.status(500).send({errore: 'errore richiesta database'})
                }
                else {
                    var risp={
                        totaleprenotazioni: response.rows.length,
                        elenco: response.rows
                    }
                    res.status(200).send(risp);
                }
                pool.end();
            }
            );
        }
        else if (Object.keys(req.query).length == 2 && typeof req.query.cf != 'undefined'){
            CF=req.query.cf
            querystring="SELECT * FROM prenotazioni where cf='"+CF+"'"
            pool.query(querystring, function (error, response) {
                if (error) {
                    console.log(error)
                    res.status(500).send({errore: 'errore richiesta database'})
                }
                else {
                    res.status(200).send(response.rows[0]);
                }
                pool.end();
            }
            );
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