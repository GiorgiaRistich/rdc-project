var request = require('request');


request.get({
    url: 'http://localhost:3000/database',
    method: 'GET'
    }, function(error, response, body) {
        var info = JSON.parse(body)
        console.log(info.elenco)
    }
)