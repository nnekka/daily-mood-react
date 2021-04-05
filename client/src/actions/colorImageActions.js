import {constants} from "../constants";


export const setLegend = (legendId) => dispatch => {

    dispatch({
        type: constants.SET_LEGEND,
        payload: legendId
    })
}
