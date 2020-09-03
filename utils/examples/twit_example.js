var Twit = require('twit')

var T = new Twit({
  consumer_key:         '96ZvrTUnWUyILSDGj5wLCHuNx',
  consumer_secret:      'him1YU0ESVVg2YlYjUgL2HxvBaIoP2B1ZXMbxPAmg8T2CtNHKr',
  access_token:         '3508152736-lETjzYaryaLVC8BLNaVI7lu6eEemH2cmuvqFU4P',
  access_token_secret:  'mYaPHWQFRwdnJVEzulczX1duOvgNW1MKWk8jn3Hr6aPHP',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

var stream = T.stream('statuses/filter', {track:['platzi','open source', 'node']})

// Obtener tweets
stream.on('tweet', function (tweet) {
  console.log(`Tweet from ${tweet.user.name} (${tweet.user.screen_name})`);
})