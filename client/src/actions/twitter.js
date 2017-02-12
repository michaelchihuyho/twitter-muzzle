import Q from 'q'

import * as ActionTypes from './actionTypes'
import * as Api from '../api'

export function getTweets(username) {
    return dispatch => {
        dispatch(getTweetsStart())

        Api.getTweets(username)
            .then(function(data){
                dispatch(getTweetsEnd(data))
            })
            .done()
    }
}

export function getTweetsStart() {
    return {
        type: ActionTypes.GET_TWEETS_START
    }
}

export function getTweetsEnd(data) {
    return {
        type: ActionTypes.GET_TWEETS_END
      , payload: data
    }
}

export function getTweetsError(message) {
    return {
        type: ActionTypes.GET_TWEETS_ERROR
      , payload: message
    }
}
