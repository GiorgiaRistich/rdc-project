
var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser')
app.use(cookieParser())

let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rdcprogetto@gmail.com",
        pass: "ncwkeexrfagortko"
    }
});
let database='http://admin:adminpass@2.236.50.195:5984/'
let host='http://localhost:3000'

app.post('/form_iniziale', function(req, res){
    var info = req.body
    request({
        url: database+'/cf_medico/'+info.CF, //URL to hit
        method: 'GET'
    }, function(error, response, body){
        if (response.statusCode == 404) {
            res.redirect(host+'/noCF')
        }
        else if (response.statusCode == 200) {
            
            request({
                url: database+'patients/'+info.CF, //URL to hit
                method: 'GET'
            }, function(error2, response2, body2){
                var datiinmemoria = JSON.parse(body2)
                rand=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);
                if (response2.statusCode==404){
                    paz = {
                        "name":info.name,
                        "mail":info.mail,
                        "verificato":false,
                        "booked":false,
                        "codverifica":rand
                    }
                    
                    request({
                        url: database+'patients/'+info.CF, //URL to hit
                        method: 'PUT',
                        body: JSON.stringify(paz)
                    }, function(error3, response3, body3){
                        if (error3) {
                            console.log(error3)
                        }
                        else {
                            res.redirect(host+'/sendverify?CF='+info.CF)
                        }
                    })
                    
                }
                else if (response.statusCode==200){
                    paziente=JSON.parse(body2)
                    if (paziente.verificato==false){

                        request({
                            url: database+'patients/'+info.CF, //URL to hit
                            method: 'GET'
                        }, function(error3, response3, body3){
                            if(error3) {
                                console.log(error3);
                            } else {
                                var info3 = JSON.parse(body3);
                                info3.name=info.name
                                info3.mail=info.mail
                                
                                request({
                                    url: database+'patients/'+info.CF,
                                    method: 'PUT',
                                    body: JSON.stringify(info3)
                                }, function(error4, response4, body4){
                                    if(error4) {
                                        console.log(error4);
                                    } else {
                                        res.redirect(host+'/sendverify?CF='+info.CF)
                                    }
                                });
                            }
                        });

                    }
                    else if (paziente.booked==true){
                        if (datiinmemoria.name==info.name && datiinmemoria.mail==info.mail){
                            
                            request({
                                url: database+'cookies/'+info.CF, //URL to hit
                                method: 'GET'
                            }, function(error3, response3, body3){
                                
                                var info3 = JSON.parse(body3);
                                randcookie=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);

                                if (response3.statusCode==404) {
                                    info3 = {
                                        "cookie":randcookie
                                    }
                                    request({
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            console.log(error4);
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 36000000})
                                            res.redirect(host+'/visualizzaprenotazione?CF='+info.CF)
                                        }
                                    });
                                }
                                else if (response3.statusCode==200){
                                    info3.cookie=randcookie
                                    request({
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            console.log(error4);
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 36000000})
                                            res.redirect(host+'/visualizzaprenotazione?CF='+info.CF)
                                        }
                                    });
                                }
                                else {
                                    console.log(error3)
                                }
                                
                            });
                        }
                        else {
                            res.send("ricontrolla i dati inseriti")
                        }
                    }
                    else {
                        if (datiinmemoria.name==info.name && datiinmemoria.mail==info.mail){
                            
                            request({
                                url: database+'cookies/'+info.CF, //URL to hit
                                method: 'GET'
                            }, function(error3, response3, body3){
                                
                                var info3 = JSON.parse(body3);
                                randcookie=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);

                                if (response3.statusCode==404) {
                                    info3 = {
                                        "cookie":randcookie
                                    }
                                    request({
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            console.log(error4);
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 36000000})
                                            res.redirect(host+'/paginadiprenotazione?CF='+info.CF)
                                        }
                                    });
                                }
                                else if (response3.statusCode==200){
                                    info3.cookie=randcookie
                                    request({
                                        url: database+'cookies/'+info.CF,
                                        method: 'PUT',
                                        body: JSON.stringify(info3)
                                    }, function(error4, response4, body4){
                                        if(error4) {
                                            console.log(error4);
                                        } else {
                                            res.cookie('cookie', randcookie, {maxAge: 36000000})
                                            res.redirect(host+'/paginadiprenotazione?CF='+info.CF)
                                        }
                                    });
                                }
                                else {
                                    console.log(error3)
                                }                        
                            });
                        }
                        else {
                            res.send("ricontrolla i dati inseriti")
                        }
                    }
                }
                else {
                    console.log(error2)
                }
            })
        }
        else {
            console.log(error)
            res.send("Errore sconosciuto")
        }
    })

});


app.get('/sendverify', function(req, res){
    request({
        url:host+'/send?CF='+req.query.CF
    }, function(error, response, body){
        res.send("controlla la mail")
    })
})


app.get('/noCF', function(req, res){
    res.send('Impossibile prenotare, codice fiscale non presente')
})




var rand, mailOptions, link;

app.get('/send',function(req,res){

    request({
        url: database+'patients/'+req.query.CF, //URL to hit
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            console.log(error)
        }
        else {
            paziente=JSON.parse(body)
            link=host+"/verify?id="+paziente.codverifica+"&CF="+paziente._id;
            mailOptions={
                from: '"Verifica la mail" <rdcprogetto@gmail.com>',
                to : paziente.mail,
                subject : "Per favore conferma il tuo account mail",
                html : "Buongiorno,<br> se i suoi dati sono corretti clicchi sul link, <br>"+
                    "Altrimenti ripeta la procedura di prenotazione.<br>"+
                    "Nome: "+paziente.name + "<br>Codice Fiscale: "+paziente._id+"<br><br>"+
                    "<a href="+link+">Click here to verify</a>"
            }
            
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.end("errore sconosciuto");
                }
                else{
                    res.end("Apri la mail e premi sul link di verifica");
                }
            });

        }
    })

});


app.get('/verify',function(req,res){
    request({
        url: database+'patients/'+req.query.CF, //URL to hit
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            console.log(error)
        }
        else {
            paziente=JSON.parse(body)  
            if(req.query.id==paziente.codverifica){

                request({
                    url: database+'patients/'+paziente._id, //URL to hit
                    method: 'GET'
                }, function(error2, response2, body2){
                    if(error2) {
                        console.log(error2);
                    } else {
                        var info = JSON.parse(body);
                        info.verificato=true
                        
                        request({
                            url: database+'patients/'+paziente._id,
                            method: 'PUT',
                            body: JSON.stringify(info)
                        }, function(error3, response3, body3){
                            if(error3) {
                                console.log(error3);
                            } else {
                                request({
                                    url: database+'cookies/'+paziente._id, //URL to hit
                                    method: 'GET'
                                }, function(error4, response4, body4){
                                    
                                    var info3 = JSON.parse(body4);
                                    randcookie=Math.random().toString(36).substr(2,15)+Math.random().toString(36).substr(2,15);
    
                                    if (response3.statusCode==404) {
                                        info3 = {
                                            "cookie":randcookie
                                        }
                                        request({
                                            url: database+'cookies/'+paziente._id,
                                            method: 'PUT',
                                            body: JSON.stringify(info3)
                                        }, function(error5, response5, body5){
                                            if(error5) {
                                                console.log(error5);
                                            } else {
                                                res.cookie('cookie', randcookie, {maxAge: 36000000})
                                                res.redirect(host+'/paginadiprenotazione?CF='+paziente._id)
                                            }
                                        });
                                    }
                                    else if (response4.statusCode==200){
                                        info3.cookie=randcookie
                                        request({
                                            url: database+'cookies/'+paziente._id,
                                            method: 'PUT',
                                            body: JSON.stringify(info3)
                                        }, function(error5, response5, body5){
                                            if(error4) {
                                                console.log(error5);
                                            } else {
                                                res.cookie('cookie', randcookie, {maxAge: 36000000})
                                                res.redirect(host+'/paginadiprenotazione?CF='+paziente._id)
                                            }
                                        });
                                    }
                                    else {
                                        console.log(error4)
                                    }                        
                                });

                                res.redirect(host+'/paginadiprenotazione?CF='+paziente._id)
                            }
                        });
                    }
                });

            }
            else{
                res.end("<h1>Bad Request</h1>");
            }
        }
    })
});



app.listen(3000);