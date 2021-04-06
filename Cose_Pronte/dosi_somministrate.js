var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));


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

                let text = Buffer.from(info.content, 'base64').toString();
                
                var corpo = JSON.parse(text)

                var dositotali=0
                corpo.data.forEach(function(item){
                    dositotali=dositotali+item.dosi_somministrate
                })

                res.send(dositotali.toString())
            }
            else {
                console.log(response.statusCode)
            }
        }
    );

});


app.listen(3000);