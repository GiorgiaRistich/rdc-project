var express=require('express');

var nodemailer = require("nodemailer");
var app=express();

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "giorgia.ristich@gmail.com",
        pass: "kecnvnbcxxbdybva"
    }
});


var rand,mailOptions,host,link;

app.get('/send',function(req,res){
        rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : 'giorgia.ristich@gmail.com',
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
    }else{
        console.log("Messaggio inviato: " + response.message);
    res.end("sent");
     }
});
});

app.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    console.log(host);
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log(" Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email verificata");
            res.end("<h1>Email "+mailOptions.to+"  verificata");
        }
        else
        {
            console.log("email no verificata");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
    });

    app.listen(3000,function(){
        console.log("Express Started on Port 3000");
    });