var Twitter = require('twitter')
  , secrets = require('../../../../secrets.json')

var TwitterClient = new Twitter({
    consumer_key: secrets.twitter_api_key
  , consumer_secret: secrets.twitter_api_secret
  , bearer_token: secrets.twitter_bearer_token
})

var TwitterProxy = function TwitterProxy() {}

TwitterProxy.prototype.getTweets = function getTweets(req, res, next) {
    var params = {
        screen_name: req.params.username
      , count: req.query.count || 20
      , exclude_replies: true
      , include_rts: false
    }

    return TwitterClient.get('statuses/user_timeline', params)
        .then((tweets) => {
            res.send(tweets)
        })
        .catch((error) => {
            // TODO: handle error better
            console.error(error)
            res.sendStatus(500)
        })
}

module.exports = new TwitterProxy()
