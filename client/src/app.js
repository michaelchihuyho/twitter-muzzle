import '../less/all.less'

// React
import React from 'react'
import ReactDOM from 'react-dom'

// React Router
import {createRoutes} from './routes'

// Redux
import {Provider} from 'react-redux'
import store from './store/store'

class Root extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <div>
                    {createRoutes()}
                </div>
            </Provider>
        )
    }
}

function run() {
    ReactDOM.render(
        <Root/>
      , document.getElementById('react-container')
    )
}

// Run the application when both DOM is ready and page content is loaded
if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run)
} else {
    window.attachEvent('onload', run)
}
