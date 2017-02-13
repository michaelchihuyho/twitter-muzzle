import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CalmTweet from './CalmTweet'

import {twitterActions} from '../actions'

class Timeline extends Component {
    constructor(props) {
        super(props)

        this.fetchTweets(props.params.username)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.username !== nextProps.params.username) {
            this.fetchTweets(nextProps.params.username)
        }
    }

    fetchTweets(username) {
        this.props.dispatch(twitterActions.getTweets(username))
    }

    render() {
        if (this.props.loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        if (this.props.twitter.get('hasError')) {
            return (
                <div>
                    {this.props.twitter.get('errorMessage')}
                </div>
            )
        } else {
            return (
                <div>
                    {this.props.twitter.get('tweets').valueSeq().map(tweet =>
                        <CalmTweet
                            key={tweet.get('id_str')}
                            username={tweet.get('user').get('screen_name')}
                            created={tweet.get('created_at')}
                            profilePicUrl={tweet.get('user').get('profile_image_url_https')}
                            rawText={tweet.get('text')}
                        />
                    )}
                </div>
            )
        }
    }
}

export default connect(
    (state) => {
        return {
            twitter: state.twitter
          , loading: state.loading
        }
    }
)(Timeline)
