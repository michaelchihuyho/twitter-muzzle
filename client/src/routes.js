import React from 'react'
import {Router, Route} from 'react-router'
import {browserHistory} from 'react-router'

// Components
import Main from './components/Main'

export function createRoutes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
            </Route>
        </Router>
    )
}
