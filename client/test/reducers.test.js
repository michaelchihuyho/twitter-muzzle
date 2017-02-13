import should from 'should'
import sinon from 'sinon'
import Immutable from 'immutable'

import loadingReducer from '../src/reducers/loading'
import twitterReducer from '../src/reducers/twitter'
import * as ActionTypes from '../src/actions/actionTypes'

describe('loading reducer', function() {
    it('initializes loading state to false', function() {
        var action = {}
        var newState = loadingReducer(undefined, action)
        newState.should.be.false()
    })
    it('sets loading state when tweet retrieval begins', function() {
        var action = {type: ActionTypes.GET_TWEETS_START}
        var newState = loadingReducer(false, action)
        newState.should.be.true()
    })
    it('resets loading state when tweet retrieval completes', function() {
        var action = {type: ActionTypes.GET_TWEETS_END}
        var newState = loadingReducer(true, action)
        newState.should.be.false()
    })
    it('resets loading state when tweet retrieval errors', function() {
        var action = {type: ActionTypes.GET_TWEETS_ERROR}
        var newState = loadingReducer(true, action)
        newState.should.be.false()
    })
})

describe('twitter reducer', function() {
    it('should reset error state when tweet retrieval begins', function() {
        var state = Immutable.fromJS({
            tweets: []
          , hasError: true
          , errorMessage: ''
        })
        var action = {type: ActionTypes.GET_TWEETS_START}
        var newState = twitterReducer(state, action)
        newState.get('hasError').should.be.false()
    })
    it('should add tweets to state when tweet retrieval completes', function() {
        var state = Immutable.fromJS({
            tweets: []
          , hasError: false
          , errorMessage: ''
        })
        var action = {
            type: ActionTypes.GET_TWEETS_END
          , payload: [{text: 'test tweet'}]
        }
        var newState = twitterReducer(state, action)
        newState.get('tweets').size.should.eql(1)
        newState.get('tweets').first().toJS().should.eql({text: 'test tweet'})
    })
    it('should set error state and error message when tweet retrieval fails', function() {
        var state = Immutable.fromJS({
            tweets: []
          , hasError: false
          , errorMessage: ''
        })
        var action = {
            type: ActionTypes.GET_TWEETS_ERROR
          , payload: 'test error message'
        }
        var newState = twitterReducer(state, action)
        newState.get('hasError').should.be.true()
        newState.get('errorMessage').should.eql('test error message')
    })
})
