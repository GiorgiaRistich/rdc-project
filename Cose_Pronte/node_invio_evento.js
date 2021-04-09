var express = require('express');
var app = express();
var request = require('request');
const fs = require('fs');

const { Pool, Client } = require("pg");
let dbpassword = "adminpass"
let db = "progettordc"

let rawdata = fs.readFileSync('credentials.json');
let sec = JSON.parse(rawdata);
client_id = sec.web.client_id;
client_secret = sec.web.client_secret;
red_uri = sec.web.redirect_uris[0];

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
    user: "postgres",
    host: "2.236.50.195",
    database: db,
    password: dbpassword,
    port: "5432"
  });
  
  request.post({ url: 'https://www.googleapis.com/oauth2/v4/token', form: formData },
    function Callback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      else {
        var info = JSON.parse(body);
        let a_t = info.access_token;

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
          dataeorafine.setTime(dataeorainizio.getTime() + 30*60*1000)
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
              res.send("evento creato");
              //res.redirect(paginavisualizzaprenotazione)
            }
            else {
              console.log(response);
            }
          });
        })

      }
    });

});




app.listen(3000);