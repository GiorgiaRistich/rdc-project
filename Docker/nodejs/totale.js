var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const fs = require('fs');
const { Pool, Client } = require("pg");
var amqp = require('amqplib/callback_api');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser')
app.use(cookieParser())
require('dotenv').config()
var cors = require('cors')
app.use(cors())


var client_id = process.env.client_id
var client_secret = process.env.client_secret
var red_uri = process.env.redirect_uri
var idchatmedico = process.env.idchatmedico
var token = process.env.token
var tokenapi = process.env.tokenapi
var dbpassword = process.env.dbpassword //db password postgres
var db = process.env.db //db postgres
var amqphost = process.env.amqphost
var database=process.env.database   //url database couch
var host=process.env.host   //url host
var postgresuser=process.env.postgresuser
var postgreshost=process.env.postgreshost
var mailuser=process.env.mailuser
var mailpass=process.env.mailpass
var pathlog='file_log/'
var lastdosi="10"

var smtpTransport = nodemailer.createTransport({    //necessario per l'invio di mail
    service: "Gmail",
    auth: {
        user: mailuser,
        pass: mailpass
    },
    tls: { rejectUnauthorized: false }
});

app.post('/form_iniziale', function(req, res){  //funzione chiamata dal form iniziale
    var info = req.body //CF, name, mail nel body
    request({   //controlla se il CF è nel database degli assistiti del medico
        url: database+'cf_medico/'+info.CF,
        method: 'GET'
    }, function(error, response, body){
        if (response.statusCode == 404) {   //se non è un assistito reindirizza alla pagina noCF
            res.redirect(host+'/noCF')
        }
        else if (response.statusCode == 200) {  //se è un assistito controlla se è già registrato
            log("info", "si controlla che l'assistito si sia registrato")
            request({   //chiama il database dei registrati
                url: database+'patients/'+info.CF, 
                method: 'GET'
            }, function(error2, response2, body2){
                var datiinmemoria = JSON.parse(body2)
                rand=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);
                if (response2.statusCode==404){ //se non è già registrato crea l'oggetto paz
                    log("info","inserimento paziente")
                    paz = {
                        "name":info.name,
                        "mail":info.mail,
                        "verificato":false,
                        "booked":false,
                        "codverifica":rand
                    }
                    
                    request({   //salva l'oggetto paz con una PUT sul database dei registrati
                        url: database+'patients/'+info.CF,
                        method: 'PUT',
                        body: JSON.stringify(paz)
                    }, function(error3, response3, body3){
                        if (error3) {
                            log("error", error3.toString())
                            res.redirect('http://localhost/grafica/error.html') 
                        }
                        else {
                            log("info","pronti a verificare")
                            res.redirect(host+'/sendverify?CF='+info.CF)    //reindirizza a sendverify
                        }
                    })
                    
                }
                else if (response.statusCode==200){ //se è già registrato
                    paziente=JSON.parse(body2)
                    if (paziente.verificato==false){    //controlla se non è verificato

                        request({
                            url: database+'patients/'+info.CF,
                            method: 'GET'
                        }, function(error3, response3, body3){
                            if(error3) {
                                log("error", error3.toString());
                                res.redirect('http://localhost/grafica/error.html') 
                            } else {
                                var info3 = JSON.parse(body3);  //aggiorna i dati in database con i nuovi inseriti
                                info3.name=info.name
                                info3.mail=info.mail
                                
                                request({   //salva i nuovi dati nel database
                                    url: database+'patients/'+info.CF,
                                    method: 'PUT',
                                    body: JSON.stringify(info3)
                                }, function(error4, response4, body4){
                                    if(error4) {
                                        log("error", error4.toString())
                                        res.redirect('http://localhost/grafica/error.html') 
                                    } else {    //reindirizza a sendverify
                                        res.redirect(host+'/sendverify?CF='+info.CF)
                                    }
                                });
                            }
                        });

                    }
                    else if (paziente.booked==true){    //se il paziente ha già prenotato
                        log("info","controllo correttezza dati")
                        if (datiinmemoria.name==info.name && datiinmemoria.mail==info.mail){ //controlla correttezza dati inseriti
                             request({   //controlla se è già stato assegnato un cookie
                                url: database+'cookies/'+info.CF,
                                method: 'GET'
                            }, function(error3, response3, body3){
                                
                                var info3 = JSON.parse(body3);
                                randcookie=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);

                                if (response3.statusCode==404) {    //se non è stato assegnato
                                    info3 = {
                                        "cookie":randcookie
                                    }
                                    request({   //crea un cookie e lo salva nel database cookies
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            log("error", error4.toString())
                                            res.redirect('http://localhost/grafica/error.html') 
                                        } else {
                                            res.cookie('cookie', randcookie) //manda il cookie
                                            res.redirect('http://localhost'+'/visualizza_prenotazione/visualizza.php?CF='+info.CF) //reindirizza a visualizzaprenotazione
                                        }
                                    });
                                }
                                else if (response3.statusCode==200){ //se è già stato assegnato
                                    info3.cookie=randcookie
                                    request({ //aggiorna il cookie nel database
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            log("error", error4.toString())
                                            res.redirect('http://localhost/grafica/error.html') 
                                        } else {
                                            res.cookie('cookie', randcookie) //manda il cookie
                                            res.redirect('http://localhost'+'/visualizza_prenotazione/visualizza.php?CF='+info.CF) //reindirizza a visualizzaprenotazione
                                        }
                                    });
                                }
                                else {
                                    log("error", error3.toString())
                                    res.redirect('http://localhost/grafica/error.html') 
                                }
                                
                            });
                        }
                        else { //se è già verificato e ha inserito dati errati
                            log("info","bisogna ricontrollare i dati inseriti")
                            res.send("ricontrolla i dati inseriti")
                        }
                    }
                    else { //se è verificato ma non ha ancora prenotato
                        if (datiinmemoria.name==info.name && datiinmemoria.mail==info.mail){ //controlla correttezza dati inseriti
                            
                            request({ //controlla se è già presente un cookie per il CF
                                url: database+'cookies/'+info.CF,
                                method: 'GET'
                            }, function(error3, response3, body3){
                                
                                var info3 = JSON.parse(body3);
                                randcookie=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);

                                if (response3.statusCode==404) { //se non c'è lo crea
                                    info3 = {
                                        "cookie":randcookie
                                    }
                                    request({ //e lo salva nel DB
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            log("error", error4.toString())
                                            res.redirect('http://localhost/grafica/error.html') 
                                        } else {
                                            res.cookie('cookie', randcookie) //manda il cookie
                                            res.redirect('http://localhost'+'/Paginaprenotazione/paginaprenotazione.php?CF='+info.CF) //reindirizza a paginadiprenotazione
                                        }
                                    });
                                }
                                else if (response3.statusCode==200){ //se c'è già un cookie
                                    info3.cookie=randcookie
                                    request({ //lo aggiorna
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            log("error", error4.toString())
                                            res.redirect('http://localhost/grafica/error.html') 
                                        } else {
                                            res.cookie('cookie', randcookie) //manda il cookie
                                            res.redirect('http://localhost'+'/Paginaprenotazione/paginaprenotazione.php?CF='+info.CF) //reindirizza a pagina di prenotazione
                                        }
                                    });
                                }
                                else {
                                    log("error", error3.toString())
                                    res.redirect('http://localhost/grafica/error.html') 

                                }                        
                            });
                        }
                        else { //se è già verificato e ha inserito i dati errati
                            log("info","si deve ricontrollare i dati")
                            res.send("ricontrolla i dati inseriti")
                        }
                    }
                }
                else {
                    log("error", error2.toString())
                    res.redirect('http://localhost/grafica/error.html') 
                }
            })
        }
        else {
            log("error", error.toString())
            res.redirect('http://localhost/grafica/error.html') 
        }
    })

});


app.get('/sendverify', function(req, res){ //chiama la send e manda il messaggio "controlla la mail"
    request({
        url:host+'/send?CF='+req.query.CF
    }, function(error, response, body){
        if (error) {
            log("error", error.toString())
            res.redirect('http://localhost/grafica/error.html') 
        }
        else {
            log("info", "si deve controllare la mail")
            res.redirect('http://localhost/HomePage/index.php?from=checkmail')
        }
    })
})


app.get('/noCF', function(req, res){ //pagina se provo a registrare un codice fiscale non di un assistito
    log("info","CF non presente")
    res.send('Impossibile prenotare, codice fiscale non presente')
})



app.get('/send',function(req,res){ //manda la mail di verifica con nodemailer

    request({
        url: database+'patients/'+req.query.CF,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            log("error", error.toString())
            res.redirect('http://localhost/grafica/error.html') 
        }
        else {
            paziente=JSON.parse(body)
            var link=host+"/verify?id="+paziente.codverifica+"&CF="+paziente._id;
            var mailOptions={
                from: '"Verifica la mail" <'+mailuser+'>',
                to : paziente.mail,
                subject : "Conferma il tuo account email",
                html : "Buongiorno,<br> se i tuoi dati sono corretti clicca sul link. <br>"+
                    "Altrimenti ripeti la procedura di prenotazione.<br><br>"+
                    "Nome: "+paziente.name + "<br>Codice Fiscale: "+paziente._id+"<br><br>"+
                    "<a href="+link+">Premi qui per verificare</a>"
            } //si richiede di verificare la mail solo se i dati sono corretti
            
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    log("error", error.toString())
                    res.redirect('http://localhost/grafica/error.html') 
                }
                else{
                    log("info", "mail inviata")
                    res.end("Apri la mail e premi sul link di verifica");
                }
            });

        }
    })

});


app.get('/verify',function(req,res){ //viene chiamata dal link nella mail di verifica
    request({ //chiama il database dei pazienti registrati
        url: database+'patients/'+req.query.CF,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            log("error", error.toString())
            res.redirect('http://localhost/grafica/error.html') 
            
        }
        else {
            paziente=JSON.parse(body)  
            if(req.query.id==paziente.codverifica){ //se il codice nel link di verifica coincide con quello nel database

                var info = paziente;
                info.verificato=true //setta il verificato nella variabile info
                
                request({ //aggiorna il paziente aggiungendo il verificato nel database
                    url: database+'patients/'+paziente._id,
                    method: 'PUT',
                    body: JSON.stringify(info)
                }, function(error2, response2, body2){
                    if(error2) {
                        log("error", error2.toString())
                        res.redirect('http://localhost/grafica/error.html') 
                    } else {
                        log("info", "mail verificata")
                        request({ //controllo se ha già un cookie
                            url: database+'cookies/'+paziente._id,
                            method: 'GET'
                        }, function(error3, response3, body3){
                            
                            var info2 = JSON.parse(body3);
                            randcookie=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);

                            if (response3.statusCode==404) { //se non lo ha
                                info2 = {
                                    "cookie":randcookie
                                }
                                request({ //lo aggiungo nel database cookies
                                    url: database+'cookies/'+paziente._id,
                                    method: 'PUT',
                                    body: JSON.stringify(info2)
                                }, function(error4, response4, body4){
                                    if(error4) {
                                        log("error", error4.toString())
                                        res.redirect('http://localhost/grafica/error.html') 
                                    } else {
                                        log("info", "cookie inviato")
                                        res.cookie('cookie', randcookie) //mando il cookie
                                        res.redirect('http://localhost'+'/Paginaprenotazione/paginaprenotazione.php?CF='+paziente._id) //reindirizzo a paginadiprenotazione
                                    }
                                });
                            }
                            else if (response3.statusCode==200){ //se ha già un cookie assegnato nel database
                                info2.cookie=randcookie
                                request({ //aggiorno il cookie nel database
                                    url: database+'cookies/'+paziente._id,
                                    method: 'PUT',
                                    body: JSON.stringify(info2)
                                }, function(error4, response4, body4){
                                    if(error4) {
                                        log("error", error4.toString())
                                        res.redirect('http://localhost/grafica/error.html') 
                                    } else {
                                        log("info", "cookie inviato")
                                        res.cookie('cookie', randcookie) //invio il nuovo cookie
                                        res.redirect('http://localhost'+'/Paginaprenotazione/paginaprenotazione.php?CF='+paziente._id) //reindirizzo a paginadiprenotazione
                                    }
                                });
                            }
                            else {
                                log("error", error3.toString())
                                res.redirect('http://localhost/grafica/error.html') 
                            }                        
                        });
                    }
                });
                    
                

            }
            else{ //se il codice di verifica del link non coincide con quello nel mio database
                log("info", "codice di verifica errato")
                res.end("<h1>Bad Request</h1>");
            }
        }
    })
});





app.get('/logincalendar', function (req, res) { //devo avere querystring con CF=...
  res.redirect("https://accounts.google.com/o/oauth2/v2/auth?" +
    "scope=https://www.googleapis.com/auth/calendar&response_type=code&redirect_uri=" +
    red_uri + "&client_id=" + client_id + "&state=" + req.query.cf);
});

app.get('/got_token', function (req, res) {

  var formData = {
    code: req.query.code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: red_uri,
    grant_type: 'authorization_code'
  }
  
  var cf=req.query.state

  const pool = new Pool({
    user: postgresuser,
    host: postgreshost,
    database: db,
    password: dbpassword,
    port: "5432"
  });
  
  request.post({ url: 'https://www.googleapis.com/oauth2/v4/token', form: formData },
    function Callback(err, httpResponse, body) {
      if (err) {
        log("error", err.toString())
        return
      }
      else {
        var info = JSON.parse(body);
        var a_t = info.access_token;

        pool.query("SELECT datap FROM prenotazioni WHERE cf='"+cf+"'", function(error0, response0){

          var dataeora = response0.rows[0].datap

          var event = {
            summary: "Appuntamento per il vaccino",
            location: 'Studio medico',
            start: {
              dateTime: ""
            },
            end: {
              dateTime: ""
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          }
          dataeorainizio=new Date(dataeora)
          dataeorafine=new Date()
          dataeorafine.setTime(dataeorainizio.getTime() - 90*60*1000)
          dataeorainizio.setTime(dataeorafine.getTime() - 30*60*1000)
          event.start.dateTime = dataeorainizio.toISOString()
          event.end.dateTime = dataeorafine.toISOString()
        
          var options = {
            method: 'POST',
            url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            headers: {
              'Authorization': 'Bearer ' + a_t,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(event),
          };
          request(options, function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                log("info","evento creato in calendario utente")
                res.redirect("http://localhost/Success/success.html")
            }
            else {
                log("error", error.toString())
            }
          });
        })

      }
    });

});





function log(severity, msg) {
    amqp.connect(amqphost, function (error0, connection) {
        if (error0) {
            log(severity, msg)
            return
        }
        if (severity != "info" && severity!="error") {
            log(severity, msg)
            return
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                log(severity, msg)
                return
            }
            var exchange = 'direct_logs';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });
            channel.publish(exchange, severity, Buffer.from(msg));
        });

        setTimeout(function () {
            connection.close();
        }, 500);
    });
}




function amqplisteninfo(){

        amqp.connect(amqphost, function (error0, connection) {
            if (error0) {
                amqplisteninfo()
                return
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    amqplisteninfo()
                    return
                }
                var exchange = 'direct_logs';
        
                channel.assertExchange(exchange, 'direct', {
                    durable: false
                });
        
                channel.assertQueue('', {
                    exclusive: true
                }, function (error2, q) {
                    if (error2) {
                        amqplisteninfo()
                        return
                    }
        
                    channel.bindQueue(q.queue, exchange, "info");
        
                    channel.consume(q.queue, function (msg) {
                        fs.appendFile('file_log/info.log', msg.content.toString()+'\n', function(err){
                            if (err) {
                                amqplisteninfo()
                                return
                            }
                        })
                    }, {
                        noAck: true
                    });
                });
            });
        });
}




function amqplistenerror(){
    
        amqp.connect(amqphost, function (error0, connection) {
            if (error0) {
                amqplistenerror()
                return
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    amqplistenerror()
                    return
                }
                var exchange = 'direct_logs';
        
                channel.assertExchange(exchange, 'direct', {
                    durable: false
                });
        
                channel.assertQueue('', {
                    exclusive: true
                }, function (error2, q) {
                    if (error2) {
                        amqplistenerror()
                        return
                    }
        
                    channel.bindQueue(q.queue, exchange, "error");
        
                    channel.consume(q.queue, function (msg) {
                        fs.appendFile('file_log/error.log', msg.content.toString()+'\n', function(err){
                            if (err) {
                                amqplistenerror()
                                return
                            }
                        })
                    }, {
                        noAck: true
                    });
                });
            });
        });

}

amqplisteninfo()
amqplistenerror()






app.get('/dosi', function(req, res){
  
    request.get(
      
        {
            url: 'https://api.github.com/repos/italia/covid19-opendata-vaccini/contents/dati/vaccini-summary-latest.json',
            method: 'GET',
            headers: {
                'User-Agent':'Api'
            },
        }, 
        
        
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
            
                var info = JSON.parse(body);

                var text = Buffer.from(info.content, 'base64').toString();
                
                var corpo = JSON.parse(text)

                var dositotali=0
                corpo.data.forEach(function(item){
                    dositotali=dositotali+item.dosi_somministrate
                })
                log("info","dosi calcolate")
                lastdosi=dositotali.toString()
                res.send(dositotali.toString())
            }
            else {
                res.send(lastdosi)
            }
        }
    );

});




app.get('/telegrammedico', function (req, res) {
    telegram_invia_db()
    log("info","resoconto inviato al medico")
    res.send('inviato')
})


function telegram_invia_db() {

    const pool = new Pool({
        user: postgresuser,
        host: postgreshost,
        database: db,
        password: dbpassword,
        port: "5432"
    });

    pool.query(
        "SELECT * FROM prenotazioni",
        function (error, response) {
            if (error) log("error", error.toString())
            else {
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
                            function (error1, response, body) {
                                if (error1) log("error", error1.toString())
                            }
                        )
                        pool.end();
                    }
                })
            }
            
        }
    );

}





var lastupdate = '0'
var info, newupdate, newmessages, CF, idchat

function repeat(){
    request({
        url: 'https://api.telegram.org/bot'+token+'/getUpdates'
    },
        function (error, response, body) {
            if (error) log("error", error.toString())
            else {
                info = JSON.parse(body)
                if (info.result.length!=0){
                    newupdate = info.result[info.result.length - 1].update_id
                    if (lastupdate=='0') lastupdate=newupdate
                    if (newupdate != lastupdate) {
                        newmessages = newupdate - lastupdate
                        for (var i = 0; i < newmessages; i++) {
                            CF = info.result[info.result.length - 1 - i].message.text
                            if (CF!='/start') {
                                idchat=info.result[info.result.length - 1 - i].message.from.id
                                const pool = new Pool({
                                    user: postgresuser,
                                    host: postgreshost,
                                    database: db,
                                    password: dbpassword,
                                    port: "5432"
                                });
                            
                                pool.query(
                                    "SELECT * FROM prenotazioni WHERE cf='"+CF.toUpperCase()+"'",
                                    function (error2, response2) {
                                        if (response2.rowCount==0) {
                                            textpren='Prenotazione non trovata'
                                        }
                                        else {
                                            infopren=response2.rows[0]
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
                                            function (error3, response3, body3) {
                                                if (error3) log("error", error3.toString())
                                                log("info","dati inviati al paziente")
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
            setTimeout(repeat, 1000)
        }
    )
}

repeat()




//
//API
//



app.post('/insertdisp', function(req, res) {

    if (typeof req.body.token != 'undefined' && req.body.token==tokenapi){
            
        const pool = new Pool({
            user: postgresuser,
            host: postgreshost,
            database: db,
            password: dbpassword,
            port: "5432"
        });

        if(Object.keys(req.body).length!=4) {
            res.status(400).send({errore: 'passati parametri errati'})
            pool.end()
        }
        
        else {

            giorno=req.body.giorno //giorno va in formato americano e.g. 03-14-2021 -> 14 marzo 2021
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
                                    log("info","API disponibilità inserita")
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





app.get('/prenotazioni', function(req, res) {

    if (typeof req.query.token != 'undefined' && req.query.token==tokenapi){

        const pool = new Pool({
            user: postgresuser,
            host: postgreshost,
            database: db,
            password: dbpassword,
            port: "5432"
        });

        if (Object.keys(req.query).length == 1) {
            querystring="SELECT * FROM prenotazioni"
            pool.query(querystring, function (error, response) {
                if (error) {
                    log("error", error.toString())
                    res.status(500).send({errore: 'errore richiesta database'})
                }
                else {
                    var risp={
                        totaleprenotazioni: response.rows.length,
                        elenco: response.rows
                    }
                    log("info","API prenotazioni restituite")
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
                    log("error", error.toString())
                    res.status(500).send({errore: 'errore richiesta database'})
                }
                else {
                    log("info","API prenotazione restituita")
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





app.get('/registrati', function (req, res) {

    if (typeof req.query.token != 'undefined' && req.query.token==tokenapi){

        if (Object.keys(req.query).length == 1) {
            request({
                url: database + 'patients/_all_docs',
                method: 'GET'
            }, function (error, response, body) {
                if (error) {
                    log("error", error.toString())
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
                                log("error", error2.toString())
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
                                    log("info","API registrati restituiti")
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
                    log("error", error.toString())
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
                    log("info","API registrato restituito")
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





app.get('/logfile', function (req, res) {
    
    if (Object.keys(req.query).length == 1 && typeof req.query.level != 'undefined' &&
                                (req.query.level=='info' || req.query.level=='error')) {
        fs.readFile(pathlog+req.query.level+'.log', 'utf8' , (err, data) => {
            if (err) {
                log("error", err.toString())
                res.status(500).send({errore: "errore lettura file"})
            }
            else {
                log("info","API logfile restituito")
                res.status(200).send({
                    level: req.query.level,
                    log: data.split('\n')
                })
            }
        })
    }
    else {
        res.status(400).send({errore: 'passati parametri errati'})
    }

})




app.use(function(req, res){
    log("error","Richiesta pagina non valida")
    res.status(404).redirect('http://localhost/grafica/error.html')
});


app.listen(3000);