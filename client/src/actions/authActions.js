import axios from 'axios'
import {constants} from '../constants'
import {setAlert} from './alertActions'

export const login = (email, password) => async(dispatch) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: constants.LOGIN_REGISTER_SUCCESS,
            payload: data.token
        })

        localStorage.setItem('token', data.token)

    }
    catch (e) {

        const errors = e.response.data.errors
        console.log(e.response)
        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')))
        }

        dispatch({
            type: constants.FAIL,
            payload: e.response && e.response.data.msg
                ? e.response.data.msg
                : e.message
        })
    }
}

export const register = (name, email, password, avatar) => async(dispatch) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password, avatar }, config)

        dispatch({
            type: constants.LOGIN_REGISTER_SUCCESS,
            payload: data.token
        })

        localStorage.setItem('token', data.token)

    }
    catch (e) {

        const errors = e.response.data.errors
        console.log(e.response)
        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')))
        }

        dispatch({
            type: constants.FAIL,
            payload: e.response && e.response.data.msg
                ? e.response.data.msg
                : e.message
        })
    }
}



export const getLoggedUser = () => async(dispatch, getState) => {
    try {
        const {auth: {token}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: token
            }
        }

        const { data } = await axios.get('/api/users/user', config)

        dispatch({
            type: constants.GET_LOGGED_USER_SUCCESS,
            payload: data
        })


    }
    catch (e) {

        const errors = e.response.data.errors
        console.log(e.response)
        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')))
        }

        dispatch({
            type: constants.FAIL,
            payload: e.response && e.response.data.msg
                ? e.response.data.msg
                : e.message
        })
    }
}

export const logout = () => dispatch => {

    localStorage.removeItem('token')
    dispatch({ type: constants.LOGOUT })
    dispatch({ type: constants.CALENDAR_RESET })
}


export const updateUserProfile = (name, image, userID) => async(dispatch, getState) => {
    try {
        const {auth: {token}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: token
            }
        }

        const { data } = await axios.put(`/api/users/${userID}`, {name, image}, config)

        dispatch({
            type: constants.UPDATE_USER_SUCCESS
        })
    }
    catch (e) {

        const errors = e.response.data.errors
        console.log(e.response)
        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')))
        }

        dispatch({
            type: constants.FAIL,
            payload: e.response && e.response.data.msg
                ? e.response.data.msg
                : e.message
        })
    }
}
