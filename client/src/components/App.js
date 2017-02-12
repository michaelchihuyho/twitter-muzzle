// React
import React, {Component} from 'react'

// React Router
import {createRoutes} from '../routes'

// Redux
import {Provider} from 'react-redux'
import store from '../store/store'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Root extends Component {
    render () {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <div>
                        {createRoutes()}
                    </div>
                </MuiThemeProvider>
            </Provider>
        )
    }
}
