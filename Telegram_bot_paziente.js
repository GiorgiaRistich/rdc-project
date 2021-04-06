var request = require('request');

var lastupdate = '0'
let token='1770679251:AAGP7RfhFfqKiDgdbhWRTzpSIoVMPp5HP1k'
var info, newupdate, newmessages, CF, idchat


function repeat(){
    request({
        url: 'https://api.telegram.org/bot'+token+'/getUpdates'
    },
        function (error, response, body) {
            if (error) console.log(error)
            else {
                info = JSON.parse(body)
                console.log(info)
                if (info.result.length==0) {
                    setTimeout(repeat, 5000)
                }
                else {
                    newupdate = info.result[info.result.length - 1].update_id
                    if (lastupdate=='0') lastupdate=newupdate
                    if (newupdate != lastupdate) {
                        newmessages = newupdate - lastupdate
                        for (let i = 0; i < newmessages; i++) {
                            CF = info.result[info.result.length - 1 - i].message.text
                            if (CF!='/start') {
                                idchat=info.result[info.result.length - 1 - i].message.from.id
                                request({
                                    url: 'https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+idchat+"&text="+CF
                                },
                                    function (error, response, body) {
                                        if (error) console.log(error)
                                    }
                                )
                            }
                        }
                        lastupdate=newupdate
                    }
                }
            }
            setTimeout(repeat, 5000)
        }
    )
}

repeat()