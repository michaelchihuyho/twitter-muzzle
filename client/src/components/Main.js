import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUsernameChange(e, newValue) {
        e.preventDefault()
        this.setState({username: newValue})
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div className="container">
                <h1>Twitter Muzzle</h1>
                <div className="search">
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            hintText="(e.g. realDonaldTrump)"
                            floatingLabelText="Twitter Username"
                            fullWidth={true}
                        />
                    </form>
                </div>
                <div className="results">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
