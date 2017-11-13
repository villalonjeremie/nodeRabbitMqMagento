#!/usr/bin/env node

var amqp = require('amqplib');

amqp.connect('amqp://localhost').then(function(conn) {
  return conn.createChannel().then(function(ch) {
    var q = 'nodejs.export.order';
    var msg = 'JSON Order/Product';


    var ok = ch.assertQueue(q, {durable: false});

    return ok.then(function(_qok) {
      ch.sendToQueue(q, new Buffer(msg));
      console.log(" [x] Send '%s'", msg);
      return ch.close();
    });
  }).finally(function() { conn.close(); });
}).catch(console.warn);
	