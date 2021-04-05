import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../main/Loader'
import AlertComponent from '../main/AlertComponent'
import {getCalendars} from '../../actions/rootCalendarActions'
import CalendarList from './CalendarList'
import {Button, Card, Col, Row} from 'react-bootstrap'
import {constants} from '../../constants'

const Dashboard = ({history}) => {

    const dispatch = useDispatch()
    const rootCalendar = useSelector(state => state.rootCalendar)
    const {loading, error, calendars, success} = rootCalendar


    useEffect(() => {
        dispatch({ type: constants.CALENDAR_RESET })
        if (success){
            dispatch({ type: constants.RESET })
        } else {
            dispatch(getCalendars())
        }

    }, [dispatch, success])

    return (
        <div className='py-5 text-center'>

            {error && <AlertComponent/>}
            {loading ? <Loader/> :
                calendars.length > 0
                    ? <CalendarList calendars={calendars} history={history}/>
                    : <div>У вас еще нет календарей.
                        <div className='py-3'>
                            <Button onClick={() => history.push('/create-calendar')}>Создать</Button>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Dashboard