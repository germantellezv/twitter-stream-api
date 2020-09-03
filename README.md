# twitter-stream-api

Get the N amount of tweets that match with certaing words

## Installation

```
npm install
```

## Usage

You will need to open 3 shells. In the first shell will be running express, in the second one will be running the subscriber, this is RabbitMQ enqueing tweets for the consumer that will be opend in the third shell.

```
1. npm run start
2. npm run subscriber
3. npm run consumer
```

Now, you can open a browser and access to http://localhost:3000 and see the 50 latest tweets.
