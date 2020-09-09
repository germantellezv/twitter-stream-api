// const redis = require("redis");
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = {
  getTweets: async () => {
    let result = [];
    const tweets = await client.lrange("tweets_list", -50, -1);
    for (const tweet of tweets) {
      let parsedTweet = JSON.parse(tweet);
      var aux = {
        created_at: parsedTweet.created_at,
        id: parsedTweet.id,
        id_str: parsedTweet.id_str,
        text: parsedTweet.text,
        source: parsedTweet.source,
        truncated: parsedTweet.truncated,
      };
      result.push(aux);
    }
    return result;
  },

  /* getTweets: () => {
    const client = redis.createClient();
    let result = []
    
    client.lrange("tweets_list", -50, -1, function (err, tweets) {
      
      for (const tweet of tweets) {
        let parsedTweet = JSON.parse(tweet);
        var aux = {
          created_at: parsedTweet.created_at,
          id: parsedTweet.id,
          id_str: parsedTweet.id_str,
          text: parsedTweet.text,
          source: parsedTweet.source,
          truncated: parsedTweet.truncated,
        };
        result.push({text:"Hola mundo mundialx"})
      }
    });
    client.quit()
    return result
  } */
  /* getTweets: async () => {
    try {

      const client = redis.createClient();

      client.on("error", function (error) {
        console.error(error);
      });

      
      client.lrange("tweets_list", -50, -1, function (err, tweets) {
        let result = [];
        
        for (const tweet of tweets) {
          let parsedTweet = JSON.parse(tweet);
          var aux = {
            created_at: parsedTweet.created_at,
            id: parsedTweet.id,
            id_str: parsedTweet.id_str,
            text: parsedTweet.text,
            source: parsedTweet.source,
            truncated: parsedTweet.truncated,
          };
          return aux
        }
        
        return result

      });

    } catch (error) {
      console.log("bad");
      console.error(error);
    }
  }, */
};
