import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'

// Components
import Main from './components/Main'
import Timeline from './components/Timeline'

export function createRoutes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <Route path="users/:username" component={Timeline}/>
            </Route>
        </Router>
    )
}
