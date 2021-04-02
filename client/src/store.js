import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {alertReducer} from './reducers/alertReducer'
import {authReducer} from './reducers/authReducer'

const reducer = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
})

const initState = {}

const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(thunk)))

export default store