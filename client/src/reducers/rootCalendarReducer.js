import {constants} from "../constants";

const initState = {
    calendar: {},
    calendars: [],
    loading: true,
    error: {}
}


export const rootCalendarReducer = (state = initState, action) => {
    switch (action.type) {
        case constants.GET_CALENDARS_OF_LOGGED_USER:
            return {...state, loading: false, calendars: action.payload}
        case constants.CREATE_CALENDAR_SUCCESS:
        case constants.DELETE_SUCCESS:
        case constants.UPDATE_CALENDAR_LEGEND_DAY_SUCCESS:
            return {...state, loading: false, success: true}
        case constants.RESET:
            return {...state, loading: true, success: false}
        case constants.GET_CALENDAR_BY_ID_SUCCESS:
            return {...state, loading: false, calendar: action.payload}
        default:
            return state
    }
}