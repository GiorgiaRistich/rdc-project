var amqp = require('amqplib/callback_api');

let host = 'amqp://2.236.50.195'

function log(severity, msg) {
    amqp.connect(host, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        if (severity != "info" && severity!="error") {
            throw 'errore'
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var exchange = 'direct_logs';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });
            channel.publish(exchange, severity, Buffer.from(msg));
        });

        setTimeout(function () {
            connection.close();
        }, 500);
    });
}

module.exports.log=log