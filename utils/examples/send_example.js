#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
var queue = "task_queue";
var msg = process.argv.slice(2).join(' ') || "Hello World!";

// Crear conexión
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  // Crear canal
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    
    // Declaramos la cola
    channel.assertQueue(queue, {
      durable: true,
    });

    // Enviar mensaje a la cola
    channel.sendToQueue(queue, Buffer.from(msg),{
      persistent: true
    });

    console.log(`[x] Enviado: ${msg}`);
  });

  // Cerramos la conexión
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 5000);
});
