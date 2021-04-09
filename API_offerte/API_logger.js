var express = require('express');
var app = express();
const fs = require('fs')

path='../Cose_Pronte/file_log/'

app.get('/logfile', function (req, res) {
    
    if (Object.keys(req.query).length == 1 && typeof req.query.level != 'undefined' &&
                                (req.query.level=='info' || req.query.level=='error')) {
        fs.readFile(path+req.query.level+'.log', 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                res.send('qualcosa è andato storto')
            }
            else {
                res.send({log: data.split('\n')})
            }
        })
    }
    else {
        res.send({errore: 'passati parametri errati'})
    }

})


app.listen(3000)