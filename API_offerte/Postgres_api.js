var express = require('express');
var app = express();
const { Pool, Client } = require("pg");

dbpassword="adminpass"
db="test"
querystring="SELECT * FROM prova"

app.get('/database', function(req, res) {

    const pool = new Pool({
        user: "postgres",
        host: "2.236.50.195",
        database: db,
        password: dbpassword,
        port: "5432"
    });

    pool.query(
        querystring,
        function (error, response) {
            var risp={
                elenco:response.rows
            }
            res.send(risp);
            pool.end();
        }
    );

})


app.listen(3000)