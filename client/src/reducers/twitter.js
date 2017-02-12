import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'

const initialState = Immutable.fromJS({
    tweets: []
  , hasError: false
  , errorMessage: ''
})

export default function reducer(state = initialState, action) {
    var newState

    switch (action.type) {
        case ActionTypes.GET_TWEETS_START:
            newState = state.set('hasError', false)
            return newState
        case ActionTypes.GET_TWEETS_END:
            newState = state.set('tweets', Immutable.fromJS(action.payload))
            return newState
        case ActionTypes.GET_TWEETS_ERROR:
            newState = state.set('hasError', true)
            newState = newState.set('errorMessage', action.payload)
            return newState
        default:
            return state
    }
}
