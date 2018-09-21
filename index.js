const express = require('express');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'oIqaujYUBTnfrcCKfzvBNdVuo',
  consumer_secret: 'cMqesj02sAqKp3z4MNOULD8FxNJEYthbGE1V6TL4REt47eI5E8',
  access_token_key: '75998516-79HZ1hp8a2Yt6Q44goPkjG3gL65Du7gOlHC3gGqsu',
  access_token_secret: 'FEhNnkRJdLLD436lq5gZZFQwKnvus9tImdz0u7ypdGgtb'
});

const defaults = {
  screen_name: 'realDonaldTrump',
  tweet_mode: 'extended',
  count: 20,
};

const app = express();

app.route('/:handle')
  .get(function(req, res) {
    const params = {
      ...defaults,
      max_id: req.query.max_id,
      screen_name: req.params.handle,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        res.json(tweets);
      } else {
        console.error(error)
      }
    });
  });

app.listen(3000, function(error) {
  console.log('Trump listening on port 3000');
});
