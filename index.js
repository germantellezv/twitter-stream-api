var Twit = require('twit')
var amqp = require("amqplib/callback_api");
var queue = "task_queue";
var msg = process.argv.slice(2).join(' ') || "Hello World!";

var T = new Twit({
  consumer_key:         '96ZvrTUnWUyILSDGj5wLCHuNx',
  consumer_secret:      'him1YU0ESVVg2YlYjUgL2HxvBaIoP2B1ZXMbxPAmg8T2CtNHKr',
  access_token:         '3508152736-lETjzYaryaLVC8BLNaVI7lu6eEemH2cmuvqFU4P',
  access_token_secret:  'mYaPHWQFRwdnJVEzulczX1duOvgNW1MKWk8jn3Hr6aPHP',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

var stream = T.stream('statuses/filter', {track:['platzi','open source', 'node']})

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
    
    // Obtener tweets
    stream.on('tweet', async function (tweet) {
      
      // Enviar mensaje a la cola
      const sent = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(tweet)),{
        persistent: true
      });
      // Validar que se envió el tweet
      sent ?
      console.log(`Tweet from ${tweet.user.name} (@${tweet.user.screen_name}) has been sent.`):
      console.log(`Tweet from ${tweet.user.name} (@${tweet.user.screen_name}) couldn't be sent.`);
    })

  });
});


