import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'

const initialState = Immutable.fromJS({
})

export default function reducer(state = initialState, action) {
    var newState

    switch (action.type) {
        case ActionTypes.GET_STUFF_START:
            return state
        case ActionTypes.GET_STUFF_END:
            return state
        default:
            return state
    }
}
