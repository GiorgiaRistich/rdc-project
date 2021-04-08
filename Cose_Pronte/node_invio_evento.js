// https://developers.google.com/identity/protocols/OAuth2WebServer

//!!!
//lancia questo e Form_invio_evento.html con GoLive
//!!!


var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");

const fs = require('fs');

let rawdata = fs.readFileSync('credentials.json');
let sec = JSON.parse(rawdata);

// console.log(sec);
client_id = sec.web.client_id;
client_secret = sec.web.client_secret;
red_uri=sec.web.redirect_uris[0];

var app = express();
var a_t = '';
app.use(bodyParser.urlencoded({ extended: false }));

// scopes https://developers.google.com/identity/protocols/googlescopes

app.get('/login', function(req, res){
  res.redirect("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&response_type=code&redirect_uri="+red_uri+"&client_id="+client_id);
});

app.get('/got_token', function(req, res){

  var formData = {
    code: req.query.code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: red_uri,
    grant_type: 'authorization_code'
  }


  request.post({url:'https://www.googleapis.com/oauth2/v4/token', form: formData}, function Callback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  
  var info = JSON.parse(body);
  a_t = info.access_token;
  res.redirect("http://localhost:5500/CODICE%20MIO/Form_invio_evento.html")

});

});






app.post('/create', function(req, res){
    var info = req.body
    var event={
        "summary":"",
        'location': 'Studio del papà di Giorgia',
        'description': 'Vaccino',
        "start":{
            "dateTime":""
        },
        "end": {
            "dateTime":""
        },
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }
    event.summary=info.summary
    event.start.dateTime=info.start
    event.end.dateTime=info.end
    
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
      }
    else {
      console.log(response);
    }
    });
  
  });




app.listen(3000);