import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertComponent from '../main/AlertComponent'
import {addNewDay} from '../../actions/rootCalendarActions'

const CalendarField = ({ calendar, calendarID }) => {

    const dispatch = useDispatch()
    const days = Array(32).fill(0).map((e, i) => i)
    const months = Array(13).fill(0).map((e, i) => i)
    const colorImage = useSelector(state => state.colorImage)
    const { legend } = colorImage

    const setColor = (day, month) => {
        dispatch(addNewDay(day, month, legend, calendarID))
    }

    return (
        <div className='py-lg-3'>

            <table className='table-responsive'>
                <tbody>
                {months.map((month, index) =>
                    <tr key={index}>
                        {days.map((day, i) =>
                            <td key={i}>
                                <div id={`${day * 100}${month}`}
                                     title={`${day}.${month}`}
                                     onClick={() => setColor(day, month)}
                                     className={day === 0 || month === 0 ? 'colored' : 'not-colored'}>
                                    {day === 0 && month > 0 && month}
                                    {month === 0 && day > 0 && day}
                                </div>
                            </td>
                        )}
                    </tr>
                )}

                </tbody>
            </table>

            <AlertComponent/>

        </div>
    )
}

export default CalendarField