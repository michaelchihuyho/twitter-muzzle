import request from 'reqwest'
import Q from 'q'
import Cookie from 'js-cookie'
const baseUrl = '/api'

var parseXhrError = function parseXhrError(error) {
    try {
        return Q.reject(JSON.parse(error.response))
    } catch (e) {
        return Q.reject(error)
    }
}

export function getStuff() {
    return Q(request({
        url: baseUrl + '/stuff'
      , type: 'json'
      , contentType: 'application/json'
      , method: 'get'
    }))
        .fail(parseXhrError)
}

export function postStuff(myStuff) {
    var data = {
        stuff: myStuff
    }
    return Q(request({
        url: baseUrl + '/stuff'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , headers: {
            'x-csrf-token': Cookie.get('skeleton-csrf-token')
      }
      , data: JSON.stringify(data)
    }))
    .fail(parseXhrError)
}
