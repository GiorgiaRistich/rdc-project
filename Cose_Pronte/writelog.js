var amqp = require('amqplib/callback_api');
var fs = require('fs');

let host = 'amqp://2.236.50.195'

amqp.connect(host, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'direct_logs';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }

            channel.bindQueue(q.queue, exchange, "info");

            channel.consume(q.queue, function (msg) {
                fs.appendFile('file_log/info.log', msg.content.toString()+'\n', function(err){
                    if (err) throw err
                })
            }, {
                noAck: true
            });
        });
    });
});


amqp.connect(host, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'direct_logs';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }

            channel.bindQueue(q.queue, exchange, "error");

            channel.consume(q.queue, function (msg) {
                fs.appendFile('file_log/error.log', msg.content.toString()+'\n', function(err){
                    if (err) throw err
                })
            }, {
                noAck: true
            });
        });
    });
});