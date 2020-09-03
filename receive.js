#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
var queue = "task_queue";
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

// Nos conectamos a la cola
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  // Creamos un canal
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    // Declaramos la cola que vamos a consumir
    channel.assertQueue(queue, {
      durable: true,
    });

    channel.consume(queue,function (msg) {
        
        // Push element to the list
        client.rpush("tweets_list", msg.content.toString(),function (err, reply) {
          const data = JSON.parse(msg.content.toString())
          console.log(`Tweet from ${data.user.name} (@${data.user.screen_name}) has been saved.`)
          channel.ack(msg);
        });
      },
      {
        // automatic acknowledgment mode,
        // see https://www.rabbitmq.com/confirms.html for details
        noAck: false,
      }
    );
  });
});
