import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

class Main extends React.Component {
    render() {
        return (
            <div>
                Hello World!
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            stuff: state.stuff.toJS()
        }
    }
)(Main)
