#!/usr/bin/env node

var amqp = require('amqplib');

amqp.connect('amqp://localhost').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(ch) {
    var q = 'task_queue';
    var ok = ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ok = ok.then(function(_qok) {
      return ch.consume('nodejs.export.order', function(msg) {
        var stringToJson = JSON.parse(msg.content);
        console.log(" [x] Received '%s'", stringToJson);
      }, {noAck: true});
    });
    return ok.then(function(_consumeOk) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).catch(console.warn);



