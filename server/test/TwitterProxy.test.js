var should = require('should')
  , rewire = require('rewire')
  , sinon = require('sinon')

require('should-sinon')
require('sinon-as-promised')

var TwitterProxy = rewire('../lib/module/twitter/TwitterProxy')

describe('#getTweets()', function() {
    var clientGetStub

    beforeEach(function() {
        clientGetStub = sinon.stub()

        TwitterProxy.__set__({
            TwitterClient: {
                get: clientGetStub
            }
          , console: {
              error: function() {}
            }
        })
    })

    it('should get a users tweets', function(done) {
        var req = {}
          , res = {}
          , tweets = []

        req.query = {}
        req.params = {username: 'test'}
        res.send = function(body) {
            body.should.equal(tweets)
            clientGetStub.should.be.calledWith('statuses/user_timeline', {
                screen_name: 'test'
              , count: 20
              , exclude_replies: true
              , include_rts: false
            })
            done()
        }

        clientGetStub.resolves(tweets)

        TwitterProxy.getTweets(req, res)
    })

    it('should respond 500 when tweets cannot be retrieved', function(done) {
        var req = {}
          , res = {}
          , tweets = []

        req.query = {}
        req.params = {username: 'test'}
        res.sendStatus = function(statusCode) {
            statusCode.should.equal(500)
            clientGetStub.should.be.calledWith('statuses/user_timeline', {
                screen_name: 'test'
              , count: 20
              , exclude_replies: true
              , include_rts: false
            })
            done()
        }

        clientGetStub.rejects('Some error')

        TwitterProxy.getTweets(req, res)
    })
})
