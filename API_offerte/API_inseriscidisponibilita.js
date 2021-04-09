const e = require('express');
var express = require('express');
var app = express();
const { Pool, Client } = require("pg");

dbpassword="adminpass"
db="progettordc"

app.get('/insertdisp', function(req, res) {

    const pool = new Pool({
        user: "postgres",
        host: "2.236.50.195",
        database: db,
        password: dbpassword,
        port: "5432"
    });

    if(Object.keys(req.query).length!=3) {
        res.send({error: 'numero parametri errato'})
        pool.end()
    }
    
    else {

        giorno=req.query.giorno
        orario=req.query.orario
        totdisponibilita=req.query.totdisponibilita

        if (typeof giorno == 'undefined' || typeof orario == 'undefined' || typeof totdisponibilita == 'undefined') {
            res.send({errore: 'passati parametri errati'})
            pool.end()
        }
        
        else {
            querystring="select * from disponibilita where giorno='"+giorno+"' and orario='"+orario+"'"
            pool.query(querystring, function (error, response) {
                if (response.rowCount) {
                    res.send({error: 'data e orario già presenti nel database'})
                    pool.end()
                }
                else {
                
                    querystring="INSERT INTO disponibilita(giorno, orario, totdisponibilita) VALUES ('"+
                        giorno+"', '"+orario+"', '"+totdisponibilita+"')"
                    pool.query(querystring, function (error, response) {
                        if (response.rowCount==1) {
                            res.send({conferma: 'disponibilità inserita'});
                        }
                        else {
                            res.send({errore: "errore connessione al database"})
                        }
                        pool.end();
                    }
                    );
                }

            })
        }

    }

})


app.listen(3000)