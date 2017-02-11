// React
import React from 'react'

// React Router
import {createRoutes} from '../routes'

// Redux
import {Provider} from 'react-redux'
import store from '../store/store'

export default class Root extends React.Component {
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
