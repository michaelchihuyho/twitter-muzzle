import {combineReducers} from 'redux'

import twitter from './twitter'
import loading from './loading'

export default combineReducers({
    twitter
  , loading
})
