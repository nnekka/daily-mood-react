import { v4 as uuidv4 } from 'uuid'
import { constants } from '../constants'


export const setAlert = ( msg, type ) => (dispatch) => {

    const id = uuidv4()

    dispatch({
        type: constants.SET_ALERT,
        payload: { id, msg, type }
    })

    setTimeout(() =>
        dispatch({
            type: constants.REMOVE_ALERT,
            payload: id
        }), 3000)
}