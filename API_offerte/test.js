var request = require('request');

urldaprovare='http://localhost:3000/prenotazioni?CF=ABCDEF01G23H456I'
//urldaprovare='http://localhost:3000/prenotazioni'

request.get({
    url: urldaprovare,
    method: 'GET'
    }, function(error, response, body) {
        var info = JSON.parse(body)
        console.log(info)
        //console.log(info.elenco)
        //console.log(info.totaleprenotazioni)
    }
)