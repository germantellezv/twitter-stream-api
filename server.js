const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();

// Validar error on redis connection
client.on("error", function(error) {
  console.error(error);
});

// Obtain the latest 50 tweets
app.get("/", function (req, res) {

  client.lrange("tweets_list", -50, -1, function (err, reply) {
    let data = []
    // Add new items to the beginning of an array:
    for (const key of reply) {
      data.unshift(JSON.parse(key))
    }

    console.log(`Mostrando ${reply.length} resultados`);
    res.send(data);
  });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

