import should from 'should'
import sinon from 'sinon'
import shouldSinon from 'should-sinon'
import sinonAsPromised from 'sinon-as-promised'

import {getTweets, getTweetsStart, getTweetsEnd, getTweetsError, __RewireAPI__ as twitterActionsRewire} from '../src/actions/twitter'
import * as ActionTypes from '../src/actions/actionTypes'

describe('twitter', function(){
    describe('#getTweets()', function(){
        it('should return a function that will asynchronously retrieve tweets', function() {
            var thunk = getTweets('test_username')

            var dispatchStub = sinon.stub()
              , getTweetsStub = sinon.stub()
              , getTweetsStartStub = sinon.stub()
              , getTweetsEndStub = sinon.stub()
              , tweets = []

            twitterActionsRewire.__Rewire__('Api', {getTweets: getTweetsStub})
            twitterActionsRewire.__Rewire__('getTweetsStart', getTweetsStartStub)
            twitterActionsRewire.__Rewire__('getTweetsEnd', getTweetsEndStub)

            getTweetsStub.resolves(tweets)

            return thunk(dispatchStub)
                .then(function(){
                    dispatchStub.should.be.calledTwice()
                    getTweetsStub.should.be.calledWithExactly('test_username')
                    getTweetsStartStub.should.be.calledOnce()
                    getTweetsEndStub.should.be.calledWithExactly(tweets)

                    twitterActionsRewire.__ResetDependency__('Api')
                    twitterActionsRewire.__ResetDependency__('getTweetsStart')
                    twitterActionsRewire.__ResetDependency__('getTweetsEnd')
                })
        })
        it('should return a function that will handle tweet retrieval errors', function() {
            var thunk = getTweets('test_username')

            var dispatchStub = sinon.stub()
              , getTweetsStub = sinon.stub()
              , getTweetsStartStub = sinon.stub()
              , getTweetsErrorStub = sinon.stub()

            twitterActionsRewire.__Rewire__('Api', {getTweets: getTweetsStub})
            twitterActionsRewire.__Rewire__('getTweetsStart', getTweetsStartStub)
            twitterActionsRewire.__Rewire__('getTweetsError', getTweetsErrorStub)

            getTweetsStub.rejects(new Error('test error'))

            return thunk(dispatchStub)
                .then(function(){
                    dispatchStub.should.be.calledTwice()
                    getTweetsStub.should.be.calledWithExactly('test_username')
                    getTweetsStartStub.should.be.calledOnce()
                    getTweetsErrorStub.should.be.calledWithExactly('test error')

                    twitterActionsRewire.__ResetDependency__('Api')
                    twitterActionsRewire.__ResetDependency__('getTweetsStart')
                    twitterActionsRewire.__ResetDependency__('getTweetsError')
                })
        })
    })
    describe('#getTweetsStart()', function(){
        it('should return the GET_TWEETS_START action', function(){
            var action = getTweetsStart()
            action.should.have.value('type', ActionTypes.GET_TWEETS_START)
        })
    })
    describe('#getTweetsEnd()', function(){
        it('should return the GET_TWEETS_END action with payload', function(){
            var payload = {some: 'payload'}
            var action = getTweetsEnd(payload)
            action.should.have.value('type', ActionTypes.GET_TWEETS_END)
            action.should.have.value('payload', payload)
        })
    })
    describe('#getTweetsError()', function(){
        it('should return the GET_TWEETS_ERROR action with message payload', function(){
            var payload = 'some error'
            var action = getTweetsError(payload)
            action.should.have.value('type', ActionTypes.GET_TWEETS_ERROR)
            action.should.have.value('payload', payload)
        })
    })
})
