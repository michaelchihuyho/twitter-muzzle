import Cookie from 'js-cookie'

const baseUrl = '/api'

export function getTweets(username) {
    return fetch(baseUrl + '/tweets/' + username)
        .then(function(response) {
            return response.json()
        })
}
