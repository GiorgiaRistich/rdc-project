var request = require('request');
const { Pool, Client } = require("pg");

let dbpassword = "adminpass"
let db = "progettordc"
let idchatmedico = '1298056124'
let token = '1770679251:AAGP7RfhFfqKiDgdbhWRTzpSIoVMPp5HP1k'


function telegram_invia_db() {

    const pool = new Pool({
        user: "postgres",
        host: "2.236.50.195",
        database: db,
        password: dbpassword,
        port: "5432"
    });

    pool.query(
        "SELECT * FROM prenotazioni",
        function (error, response) {
            texttot = 'Prenotazioni:'
            totalepren = response.rowCount
            response.rows.forEach(function (infopren) {
                cfpren = infopren.cf
                nomepren = infopren.nome
                emailpren = infopren.email
                datapren = infopren.datap
                texttot = texttot+'\n\n' + cfpren + '\n' + nomepren + '\n' + emailpren + '\n' + datapren
                
                totalepren=totalepren-1
                if (totalepren==0){
                    texttot = encodeURIComponent(texttot)
                    request({
                        url: 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + idchatmedico + "&text=" + texttot
                    },
                        function (error, response, body) {
                            if (error) console.log(error)
                        }
                    )
                    pool.end();
                }
            })

            
        }
    );


}


telegram_invia_db()