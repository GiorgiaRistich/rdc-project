var request = require('request');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/setcookie', function(req, res){
    res.cookie('cookietest', 'valorecookie')
    res.send("ho settato i cookie")
})

app.get('/readcookie', function(req, res){
    res.send(req.cookies)
})

app.get('/deletecookie', function(req, res){
    res.clearCookie('cookietest')
    res.send('eliminato')
})

app.listen(3000);