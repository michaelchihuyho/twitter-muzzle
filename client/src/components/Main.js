import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

export default class Main extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
