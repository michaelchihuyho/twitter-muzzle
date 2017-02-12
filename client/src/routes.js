import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'

// Components
import Main from './components/Main'

export function createRoutes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <Route path="users/:username"/>
            </Route>
        </Router>
    )
}
