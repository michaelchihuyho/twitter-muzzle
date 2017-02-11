import '../less/all.less'

// React
import React from 'react'
import ReactDOM from 'react-dom'

// Hot reloading
import {AppContainer} from 'react-hot-loader';

import App from './components/App'

function render(RootAppComponent) {
    ReactDOM.render(
        <AppContainer>
            <RootAppComponent/>
        </AppContainer>
      , document.getElementById('react-container')
    )
}

function run() {
    render(App)
    if (module.hot) {
        module.hot.accept('./components/App', () => {
            const newApp = require('./components/App').default
            render(newApp)
        })
    }
}

// Run the application when both DOM is ready and page content is loaded
if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run)
} else {
    window.attachEvent('onload', run)
}
