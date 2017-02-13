import * as ActionTypes from '../actions/actionTypes'

const initialState = false

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_TWEETS_START:
            return true
        case ActionTypes.GET_TWEETS_END:
            return false
        case ActionTypes.GET_TWEETS_ERROR:
            return false
        default:
            return state
    }
}
