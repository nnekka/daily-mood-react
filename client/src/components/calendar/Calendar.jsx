import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {constants} from '../../constants'
import {getCalendarByID} from '../../actions/rootCalendarActions'
import Loader from '../main/Loader'
import {Col, Row} from 'react-bootstrap'
import CalendarField from './CalendarField'
import Legend from './Legend'
import $ from 'jquery'

const Calendar = ({match}) => {

    const calendarID = match.params.id
    const dispatch = useDispatch()
    const rootCalendar = useSelector(state => state.rootCalendar)
    const {loading, calendar, success} = rootCalendar

    const days = calendar.days
    console.log(days)

    useEffect(() => {
        if (success) {
            dispatch({type: constants.RESET})
        } else {
            if (loading || !calendar.title) {
                dispatch(getCalendarByID(calendarID))
            } else {
                if (calendar.legendType === 'цветная') {
                    calendar.days.map(x => {
                        $(`#${x.day * 100}${x.month}`).css("background-color", `${x.legend.color}`)
                    })
                } else if (calendar.legendType === 'с картинками') {
                    calendar.days.map(x => {
                        $(`#${x.day * 100}${x.month}`).css("background", `url("http://localhost:3333/uploads/${x.legend.imageSrc.substring(8)}")`)
                        $(`#${x.day * 100}${x.month}`).css("background-size", `100% auto`)
                    })
                }

            }
        }
    }, [dispatch, success, loading, calendar, calendarID])


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