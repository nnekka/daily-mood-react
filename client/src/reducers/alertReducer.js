import {constants} from '../constants'

export const alertReducer = ( state = [], action ) => {

    switch (action.type) {
        case constants.SET_ALERT:
            return state.concat(action.payload)
        case constants.REMOVE_ALERT:
            return state.filter(x => x.id !== action.payload)
        default:
            return state
    }
}