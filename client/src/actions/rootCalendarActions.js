import axios from 'axios'
import {constants} from '../constants'
import {setAlert} from './alertActions'

export const getCalendars = () => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token
            }
        }

        const { data } = await axios.get('/api/calendars', config)

        dispatch({
            type: constants.GET_CALENDARS_OF_LOGGED_USER,
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

export const createNewCalendar = (title, description, year, legendType) => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/calendars', {title, description, year, legendType}, config)

        dispatch({
            type: constants.CREATE_CALENDAR_SUCCESS,
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

export const deleteCalendarById = (id) => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token,
            }
        }

        const { data } = await axios.delete(`/api/calendars/${id}`, config)

        dispatch({
            type: constants.DELETE_SUCCESS
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

export const getCalendarByID = (id) => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token
            }
        }

        const { data } = await axios.get(`/api/calendars/${id}`, config)

        dispatch({
            type: constants.GET_CALENDAR_BY_ID_SUCCESS,
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

export const addNewImageLegend = (text, imageSrc, id) => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/calendars/${id}/legend`, {text, imageSrc} ,config)

        dispatch({
            type: constants.UPDATE_CALENDAR_LEGEND_DAY_SUCCESS,
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

export const deleteLegend = (calendarId, legendId) => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token,
            }
        }

        const { data } = await axios.delete(`/api/calendars/${calendarId}/legend/${legendId}`, config)

        dispatch({
            type: constants.DELETE_SUCCESS
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

export const addNewColorLegend = (color, text, id) => async(dispatch, getState) => {
    try {
        const {auth: { token }} = getState()
        const config = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/calendars/${id}/legend`, {color, text} ,config)

        dispatch({
            type: constants.UPDATE_CALENDAR_LEGEND_DAY_SUCCESS,
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

