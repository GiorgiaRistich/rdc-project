var express = require('express');
var app = express();
const { Pool, Client } = require("pg");

dbpassword="adminpass"


app.get('/database', function(req, res) {

    const pool = new Pool({
        user: "postgres",
        host: "2.236.50.195",
        database: "test",
        password: dbpassword,
        port: "5432"
    });

    pool.query(
        "SELECT * FROM prova",
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