
var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var logger=require('./logger');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser')
app.use(cookieParser())


let smtpTransport = nodemailer.createTransport({    //necessario per l'invio di mail
    service: "Gmail",
    auth: {
        user: "rdcprogetto@gmail.com",
        pass: "ncwkeexrfagortko"
    }
});
let database='http://admin:adminpass@2.236.50.195:5984/'    //url database
let host='http://localhost:3000'    //url host

app.post('/form_iniziale', function(req, res){  //funzione chiamata dal form iniziale
    var info = req.body //CF, name, mail nel body
    request({   //controlla se il CF è nel database degli assistiti del medico
        url: database+'/cf_medico/'+info.CF,
        method: 'GET'
    }, function(error, response, body){
        if (response.statusCode == 404) {   //se non è un assistito reindirizza alla pagina noCF
            res.redirect(host+'/noCF')
        }
        else if (response.statusCode == 200) {  //se è un assistito controlla se è già registrato
            
            request({   //chiama il database dei registrati
                url: database+'patients/'+info.CF, 
                method: 'GET'
            }, function(error2, response2, body2){
                var datiinmemoria = JSON.parse(body2)
                rand=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);
                if (response2.statusCode==404){ //se non è già registrato crea l'oggetto paz
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
                            logger.log("error", JSON.parse(response3))
                            res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                        }
                        else {
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
                                logger.log("error", JSON.parse(response3));
                                res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
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
                                        logger.log("error", JSON.parse(response4))
                                        res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                                    } else {    //reindirizza a sendverify
                                        res.redirect(host+'/sendverify?CF='+info.CF)
                                    }
                                });
                            }
                        });

                    }
                    else if (paziente.booked==true){    //se il paziente è già registrato
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
                                            logger.log("error", JSON.parse(response4))
                                            res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 3600000}) //manda il cookie
                                            res.redirect(host+'/visualizzaprenotazione?CF='+info.CF) //reindirizza a visualizzaprenotazione
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
                                            logger.log("error", JSON.parse(response4))
                                            res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 3600000}) //manda il cookie
                                            res.redirect(host+'/visualizzaprenotazione?CF='+info.CF) //reindirizza a visualizzaprenotazione
                                        }
                                    });
                                }
                                else {
                                    logger.log("error", JSON.parse(response3))
                                    res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                                }
                                
                            });
                        }
                        else { //se è già verificato e ha inserito dati errati
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
                                            logger.log("error", JSON.parse(response4))
                                            res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 3600000}) //manda il cookie
                                            res.redirect(host+'/paginadiprenotazione?CF='+info.CF) //reindirizza a paginadiprenotazione
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
                                            logger.log("error", JSON.parse(response4))
                                            res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 3600000}) //manda il cookie
                                            res.redirect(host+'/paginadiprenotazione?CF='+info.CF) //reindirizza a pagina di prenotazione
                                        }
                                    });
                                }
                                else {
                                    logger.log("error", JSON.parse(response3))
                                    res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect

                                }                        
                            });
                        }
                        else { //se è già verificato e ha inserito i dati errati
                            res.send("ricontrolla i dati inseriti")
                        }
                    }
                }
                else {
                    logger.log("error", JSON.parse(response3))
                    res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
                }
            })
        }
        else {
            logger.log("error", "errore GET in cf_medico")
            res.send("Errore sconosciuto") //fare pagina html specifica e quindi usa res.redirect
        }
    })

});


app.get('/sendverify', function(req, res){ //chiama la send e manda il messaggio "controlla la mail"
    request({
        url:host+'/send?CF='+req.query.CF
    }, function(error, response, body){
        res.send("controlla la mail")
    })
})


app.get('/noCF', function(req, res){ //pagina se provo a registrare un codice fiscale non di un assistito
    res.send('Impossibile prenotare, codice fiscale non presente')
})



app.get('/send',function(req,res){ //manda la mail di verifica con nodemailer

    request({
        url: database+'patients/'+req.query.CF,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            logger.log("error", JSON.parse(response))
            res.send("qualcosa non va") //fare pagina html specifica e quindi usa res.redirect
        }
        else {
            paziente=JSON.parse(body)
            var link=host+"/verify?id="+paziente.codverifica+"&CF="+paziente._id;
            var mailOptions={
                from: '"Verifica la mail" <rdcprogetto@gmail.com>',
                to : paziente.mail,
                subject : "Per favore conferma il tuo account mail",
                html : "Buongiorno,<br> se i suoi dati sono corretti clicchi sul link. <br>"+
                    "Altrimenti ripeta la procedura di prenotazione.<br><br>"+
                    "Nome: "+paziente.name + "<br>Codice Fiscale: "+paziente._id+"<br><br>"+
                    "<a href="+link+">Click here to verify</a>"
            } //si richiede di verificare la mail solo se i dati sono corretti
            
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    logger.log("error","errore nella funzione sendMail")
                    res.end("qualcosa non va"); //fare pagina html specifica e quindi usa res.redirect
                }
                else{
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
            logger.log("error",JSON.parse(response))
            res.send("qualcosa non va"); //fare pagina html specifica e quindi usa res.redirect
            
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
                        logger.log("error",JSON.parse(response2))
                        res.send("qualcosa non va"); //fare pagina html specifica e quindi usa res.redirect
                    } else {
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
                                        logger.log("error",JSON.parse(response4))
                                        res.send("qualcosa non va"); //fare pagina html specifica e quindi usa res.redirect
                                    } else {
                                        res.cookie('cookie', randcookie, {maxAge: 3600000}) //mando il cookie
                                        res.redirect(host+'/paginadiprenotazione?CF='+paziente._id) //reindirizzo a paginadiprenotazione
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
                                        logger.log("error",JSON.parse(response4))
                                        res.send("qualcosa non va"); //fare pagina html specifica e quindi usa res.redirect
                                    } else {
                                        res.cookie('cookie', randcookie, {maxAge: 3600000}) //invio il nuovo cookie
                                        res.redirect(host+'/paginadiprenotazione?CF='+paziente._id) //reindirizzo a paginadiprenotazione
                                    }
                                });
                            }
                            else {
                                logger.log("error",JSON.parse(response3))
                                res.send("qualcosa non va"); //fare pagina html specifica e quindi usa res.redirect
                            }                        
                        });
                    }
                });
                    
                

            }
            else{ //se il codice di verifica del link non coincide con quello nel mio database
                res.end("<h1>Bad Request</h1>");
            }
        }
    })
});



app.listen(3000);