import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCalendarByID} from '../../actions/rootCalendarActions'
import Loader from '../main/Loader'
import AlertComponent from '../main/AlertComponent'
import AddColorLegend from './AddColorLegend'
import AddImageLegend from './AddImageLegend'
import {constants} from '../../constants'

const AddLegends = ({match}) => {

    const calendarID = match.params.id
    const dispatch = useDispatch()
    const rootCalendar = useSelector(state => state.rootCalendar)
    const {loading, calendar, error, success} = rootCalendar

    useEffect(() => {
        if (success){
            dispatch({ type: constants.RESET })
        } else {
            dispatch(getCalendarByID(calendarID))
        }

    }, [dispatch, calendarID, success])

    return (
        <div className='py-5'>
            <AlertComponent/>
            {loading ? <Loader/> :
                calendar.legendType === 'цветная'
                    ? <AddColorLegend loading={loading} calendar={calendar} calendarId={calendarID}/>
                    : calendar.legendType === 'с картинками'
                        ? <AddImageLegend loading={loading} calendar={calendar} id={calendarID} />
                        : <>Все плохо</>

            }

        </div>
    )
}

export default AddLegends