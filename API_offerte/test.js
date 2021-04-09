var request = require('request');

//urldaprovare='http://localhost:3000/prenotazioni?CF=ABCDEF01G23H456I'
//urldaprovare='http://localhost:3000/prenotazioni'
//urldaprovare='http://localhost:3000/insertdisp?giorno=10-04-2021&orario=13:00&totdisponibilita=7'
//urldaprovare='http://localhost:3000/registrati?cf=QWERTY01U23I456O'
//urldaprovare='http://localhost:3000/registrati'

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