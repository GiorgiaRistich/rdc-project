var express=require('express');

var nodemailer = require("nodemailer");
var app=express();

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rdcprogetto@gmail.com",
        pass: "ncwkeexrfagortko"
    }
});

//rand va inserito in DB con la mail e ritirato fuori dalla verify

var rand, mailOptions, host, link;

app.get('/send',function(req,res){
    rand=Math.floor(Math.random() * 1000000);
    host=req.get('host');
    link="http://"+host+"/verify?id="+rand;
    
    mailOptions={
        from: '"Verify your email" <rdcprogetto@gmail.com>',
        to : req.query.mail,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    
    console.log(mailOptions);
    
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }
        else{
            console.log("Messaggio inviato: " + response.message);
            res.end("Apri la mail e premi sul link di verifica");
        }
    });
});

app.get('/verify',function(req,res){
    if(req.query.id==rand)
    {
        console.log("email verificata");
        res.end("<h1>Email "+mailOptions.to+" verificata");
    }
    else
    {
        console.log("email non verificata");
        res.end("<h1>Bad Request</h1>");
    }
});

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});