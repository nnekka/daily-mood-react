import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {alertReducer} from './reducers/alertReducer'
import {authReducer} from './reducers/authReducer'
import {rootCalendarReducer} from './reducers/rootCalendarReducer'
import {colorImageReducer} from './reducers/colorImageReducer'

const reducer = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    rootCalendar: rootCalendarReducer,
    colorImage: colorImageReducer
})

const initState = {}

const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(thunk)))

export default store