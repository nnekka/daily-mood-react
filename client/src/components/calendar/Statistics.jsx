import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../main/Loader'
import {getCalendarByID} from '../../actions/rootCalendarActions'
import {Col, Row} from 'react-bootstrap'

const Statistics = ({match}) => {

    const dispatch = useDispatch()
    const calendarId = match.params.id

    const rootCalendar = useSelector(state => state.rootCalendar)
    const {loading, calendar: {title, legends, days, legendType}} = rootCalendar

    // объект с полями: цвет + количество || картинка + количество
    const statObject = loading || !title
        ? {}
        : legendType === 'с картинками'
            ? days
                .map((day) => {
                    return {legend: day.legend.imageSrc.substring(8), count: 1}
                })

                .reduce((a, b) => {
                    a[b.legend] = (a[b.legend] || 0) + b.count
                    return a
                }, {})
            : legendType === 'цветная'
                ? days
                    .map((day) => {
                        return {legend: day.legend.color, count: 1}
                    })

                    .reduce((a, b) => {
                        a[b.legend] = (a[b.legend] || 0) + b.count
                        return a
                    }, {})
                : null


    useEffect(() => {

        dispatch(getCalendarByID(calendarId))

    }, [dispatch])

    return (
        <div className='py-5'>
            {loading || !title ? <Loader/> :
                <>
                    <h1>Статистика по календарю {title}</h1>
                    <Row>
                        <Col md={8}>
                            <Row className='py-3'>
                                <Col md={4}>
                                    Всего заполнено дней:
                                </Col>
                                <Col md={2}>
                                    {days.length}
                                </Col>
                            </Row>
                            {legends.map((legend) =>
                                <Row key={legend._id}>

                                    <Col md={4}>
                                        {legend.text}
                                    </Col>
                                    <Col md={3}>

                                        {legendType === 'цветная'
                                            ? Object.entries(statObject)
                                                .find(x => x[0] === legend.color)[1]
                                            : legendType === 'с картинками'
                                                ? Object.entries(statObject)
                                                    .find(x => x[0] === legend.imageSrc.substring(8))[1]
                                                : 0
                                        }
                                    </Col>
                                    <Col md={2}>
                                        {legendType === 'цветная'
                                            ? (Object.entries(statObject)
                                                .find(x => x[0] === legend.color)[1] / days.length * 100)
                                                .toFixed(1)
                                            : legendType === 'с картинками'
                                                ? (Object.entries(statObject)
                                                    .find(x => x[0] === legend.imageSrc.substring(8))[1] / days.length * 100)
                                                    .toFixed(1)
                                                : 0
                                        }%
                                    </Col>
                                </Row>
                            )}


                        </Col>
                        <Col md={4}>
                            <h3>Легенды</h3>
                            //сюда легенды поместить
                        </Col>
                    </Row>
                </>
            }
        </div>
    )
}

export default Statistics