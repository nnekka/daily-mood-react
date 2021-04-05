import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {constants} from '../../constants'
import {getCalendarByID} from '../../actions/rootCalendarActions'
import Loader from '../main/Loader'
import {Col, Row} from 'react-bootstrap'
import CalendarField from './CalendarField'
import Legend from './Legend'

const Calendar = ({match}) => {

    const calendarID = match.params.id
    const dispatch = useDispatch()
    const rootCalendar = useSelector(state => state.rootCalendar)
    const {loading, calendar, error, success} = rootCalendar

    useEffect(() => {
        dispatch(getCalendarByID(calendarID))
    }, [dispatch, calendarID, success])

    return (
        <div>
            {loading || !calendar.title ? <Loader/> :

                <Row>
                    <h1>Календарь {calendar.title}</h1>
                    <Col md={10}>
                        <CalendarField calendar={calendar} calendarID={calendarID}/>
                    </Col>
                    <Col md={2}>
                        <Legend calendar={calendar}/>
                    </Col>
                </Row>

            }
        </div>
    )
}

export default Calendar