#!/usr/bin/env node

var amqp = require('amqplib');
var connectMongo = require('../mongodb/connect.js');
var base_url = "mongodb://localhost:27017/";
var dbname = "magento";
var url = "mongodb://localhost:27017/magento";

var data = {
  action : "insertDocuments",
  collection : "test",
  url : url,
  db : dbname,
  insert : new Array(),
  updateOne : {change : {"sku":"BLGA3088-WH001"}, set: {"sku":"BLGA3088-WH002"}},
  deleteOne : {"sku":"BLGA3088-WH002"} 
}

var insertInMongoDb = (connect, data, err) => {
    return new Promise((resolve, reject) => {
        console.log('début insertion');
        if (err) {
            reject('Error insert db');
        }
        resolve(connect.actionToDb(data));
    });
}


amqp.connect('amqp://localhost').then((conn) => {
  process.once('SIGINT', () => {conn.close();});

  return conn.createChannel().then((ch) => {
    let q = 'task_queue';
    let ok = ch.assertQueue(q, {durable: true});
    let buffer = new Array();
    let countConsume = 0;
    ch.prefetch(1);
    ok = ok.then((_qok) => {
      return ch.consume('nodejs.export.order', msg => {
        let stringToJson = JSON.parse(msg.content);
        countConsume++;

        console.log("[x] Received '%s'", stringToJson);
        buffer.push(stringToJson);

        if(countConsume === 1){
          
          console.log('lenght before ' + buffer.length);
          data.insert = buffer;
          console.log('lenght after ' + buffer.length);
          //reset Buffer;
          buffer = new Array();
          console.log('consume Debut');
          let connect = new connectMongo(data);
          insertInMongoDb(connect,data)
          .then(() => {
              console.log('fin insertion');
          })
          .then(() =>{
              countConsume = 0;
          })
          .catch( err => {
              console.log(err); 
          });
          console.log('consume Fin');
        };

      }, {noAck: true});
    });
    return ok.then((_consumeOk) => {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).catch(console.warn);



