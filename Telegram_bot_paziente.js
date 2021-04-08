var request = require('request');
const { Pool, Client } = require("pg");

dbpassword="adminpass"
db="progettordc"


var lastupdate = '0'
let token='1770679251:AAGP7RfhFfqKiDgdbhWRTzpSIoVMPp5HP1k'
var info, newupdate, newmessages, CF, idchat


function repeat(){
    request({
        url: 'https://api.telegram.org/bot'+token+'/getUpdates'
    },
        function (error, response, body) {
            if (error) console.log(error)
            else {
                info = JSON.parse(body)
                if (info.result.length==0) {
                    setTimeout(repeat, 5000)
                }
                else {
                    newupdate = info.result[info.result.length - 1].update_id
                    if (lastupdate=='0') lastupdate=newupdate
                    if (newupdate != lastupdate) {
                        newmessages = newupdate - lastupdate
                        for (let i = 0; i < newmessages; i++) {
                            CF = info.result[info.result.length - 1 - i].message.text
                            if (CF!='/start') {
                                idchat=info.result[info.result.length - 1 - i].message.from.id
                                const pool = new Pool({
                                    user: "postgres",
                                    host: "2.236.50.195",
                                    database: db,
                                    password: dbpassword,
                                    port: "5432"
                                });
                            
                                pool.query(
                                    "SELECT * FROM prenotazioni WHERE cf='"+CF+"'",
                                    function (error, response) {
                                        if (response.rowCount==0) {
                                            textpren='Prenotazione non trovata'
                                        }
                                        else {
                                            infopren=response.rows[0]
                                            cfpren=infopren.cf
                                            nomepren=infopren.nome
                                            emailpren=infopren.email
                                            datapren=infopren.datap
                                            textpren='I dati della tua prenotazione:\n'+cfpren+'\n'+nomepren+'\n'+emailpren+'\n'+datapren
                                            textpren=encodeURIComponent(textpren)
                                        }
                                        request({
                                            url: 'https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+idchat+"&text="+textpren
                                        },
                                            function (error, response, body) {
                                                if (error) console.log(error)
                                            }
                                        )
                                        pool.end();
                                    }
                                );
                                
                            }
                        }
                        lastupdate=newupdate
                    }
                }
            }
            setTimeout(repeat, 5000)
        }
    )
}

repeat()