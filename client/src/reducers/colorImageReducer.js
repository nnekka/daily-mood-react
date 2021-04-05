import {constants} from '../constants'

const initState = {
  legend: null
}

export const colorImageReducer = ( state = initState, action ) => {

    switch (action.type) {
        case constants.SET_LEGEND:
            return { legend: action.payload }
        default:
            return state
    }
}