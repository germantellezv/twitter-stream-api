const express = require("express");
const redis = require("redis");
const resolvers = require('./lib/resolvers')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { readFileSync } = require('fs')
const { join } = require('path')

const app = express();

// GraphQl 
const typeDefs = readFileSync(join(__dirname,'lib','schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use('/api-gql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))


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

    console.log(`Mostrando ${reply.length} resultados.`);
    res.send(data);
  });
});




const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

