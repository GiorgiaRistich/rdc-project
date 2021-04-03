var express = require('express');
var bodyParser     =        require("body-parser");
var req = require('request');
var req2 = require('request');
var request = require('request');
require('dotenv').config()
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var contenuto = {
    mail: '',
    rand: '',
    verified: false,
    name: '',
    CF: '',
    booked: false
}


function scrivi_db(mail, rand, name, CF){

    req2({
        url: 'http://admin:adminpass@2.236.50.195:5984/patients/'+, //URL to hit
        method: 'GET',
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            var info = JSON.parse(body);
    
            val._rev=info._rev
            
            
            req2({
                url: 'http://admin:admin@127.0.0.1:5984/my_database/'+city, //URL to hit
                //qs: {city: city, val: val}, //Query string data
                method: 'PUT',
                headers: {
                    //'content-type': 'application/json'
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(val)
                //body: 'Hello Hello! String body!' //Set the body as a string
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
                }
            });
        }
    });
    
    }