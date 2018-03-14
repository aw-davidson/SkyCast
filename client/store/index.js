import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import location from './location'
import forecast from './forecast'
import queries from './queries'
import date from './date'

const reducer = combineReducers({user, location, forecast, queries, date})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './location'
export * from './forecast'
export * from './queries'
export * from './date'

