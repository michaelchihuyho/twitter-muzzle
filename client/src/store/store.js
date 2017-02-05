import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {persistState} from 'redux-devtools'
import rootReducer from '../reducers'

var logger = createLogger()
  , store
  , composeEnhancers

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (__DEV__) {
    store = createStore(
        rootReducer
      , composeEnhancers(
            applyMiddleware(thunk, logger)
          , persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )
    )
} else {
    store = createStore(
        rootReducer
      , composeEnhancers(
            applyMiddleware(thunk, logger)
        )
    )
}

export default store
