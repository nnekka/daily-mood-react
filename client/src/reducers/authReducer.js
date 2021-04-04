import {constants} from '../constants'

const initState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    user: {},
    loading: true,
    error: {}
}

export const authReducer = ( state = initState, action ) => {

    switch (action.type) {
        case constants.LOGIN_REGISTER_SUCCESS:
            return { ...state, loading: false, token: action.payload }
        case constants.FAIL:
            return { ... state, loading: false, error: action.payload }
        case constants.LOGOUT:
            return { ... state, token: null, user: {}}
        case constants.GET_LOGGED_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        default:
            return state
    }
}