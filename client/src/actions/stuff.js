// Uses Flux Standard Actions
// https://github.com/acdlite/flux-standard-action

import Q from 'q'

import * as ActionTypes from './actionTypes'
import * as Api from '../api'

export function sampleApiAction() {
    return dispatch => {
        dispatch(getStuffStart())

        Api.getStuff()
            .then(function(data){
                dispatch(getStuffEnd(data))
            })
            .done()
    }
}

export function getStuffStart() {
    return {
        type: ActionTypes.GET_STUFF_START
    }
}

export function getStuffEnd(data) {
    return {
        type: ActionTypes.GET_STUFF_END
      , payload: data
    }
}
