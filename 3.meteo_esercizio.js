var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const uuid = require('uuid');



const mockresponse = {
    "coord": {
        "lon": -122.08,
        "lat": 37.39
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 282.55,
        "feels_like": 281.86,
        "temp_min": 280.37,
        "temp_max": 284.26,
        "pressure": 1023,
        "humidity": 100
    },
    "visibility": 16093,
    "wind": {
        "speed": 1.5,
        "deg": 350
    },
    "clouds": {
        "all": 1
    },
    "dt": 1560350645,
    "sys": {
        "type": 1,
        "id": 5122,
        "message": 0.0139,
        "country": "US",
        "sunrise": 1560343627,
        "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
}


app.post('/meteo', function (req, res) {

    console.log("ricevuta request");
    //1. Prelevo la città dalla form req.body.city vedi form_meteo.html
    console.log(req.body.city);
    //2. Faccio la chiamata REST a https://openweathermap.org/
    //3. Scrivo i dati su DB con chiamata REST --> scrivi_db()
    //4. Rispondo all'utente  res.send...	
    //let meteo_response = mockresponse;
    let meteo_response = req.body.city;

    let url = 'http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid=83c8d6304b06b598678005d88d869009';
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);

          scrivi_db(req.body.city, JSON.stringify(info), res);
        
        }
    }
    request.get(url, callback);





    //scrivi_db(req.body.city, meteo_response, res);


});


function scrivi_db(city, val, res) {

    // curl -X PUT http://127.0.0.1:5984/my_database/"001" -d '{ " city " : city , " val" :val }'


    request({
        url: 'http://admin:admin@192.168.1.12:5984/mockdb/' + uuid.v4(), //URL to hit
        //qs: { city: city, val: val }, //Query string data
        method: 'PUT',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: val //JSON.stringify({ 'city': city, 'val': val })//Set the body as a string
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response?.statusCode, body);
            res.send(val);
        }
    });


}

app.listen(3000);
