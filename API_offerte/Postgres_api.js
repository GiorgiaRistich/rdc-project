var express = require('express');
var app = express();
const { Pool, Client } = require("pg");

dbpassword="adminpass"
db="progettordc"

app.get('/prenotazioni', function(req, res) {

    const pool = new Pool({
        user: "postgres",
        host: "2.236.50.195",
        database: db,
        password: dbpassword,
        port: "5432"
    });

    //console.log(Object.keys(req.query).length==0)

    if (JSON.stringify(req.query)=='{}') {
        querystring="SELECT * FROM prenotazioni"
        pool.query(querystring, function (error, response) {
            var risp={
                totaleprenotazioni: response.rows.length,
                elenco: response.rows
            }
            res.send(risp);
            pool.end();
        }
        );
    }
    else {
        CF=req.query.CF
        querystring="SELECT * FROM prenotazioni where cf='"+CF+"'"
        pool.query(querystring, function (error, response) {
            var risp={
                prenotazione: response.rows
            }
            res.send(risp);
            pool.end();
        }
        );
    }

})


app.listen(3000)