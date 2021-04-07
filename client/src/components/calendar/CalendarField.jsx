import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AlertComponent from '../main/AlertComponent'
import {addNewDay, deleteDay} from '../../actions/rootCalendarActions'
import {setAlert} from '../../actions/alertActions'

const CalendarField = ({calendar, calendarID}) => {

    const dispatch = useDispatch()
    const days = Array(32).fill(0).map((e, i) => i)
    const months = Array(13).fill(0).map((e, i) => i)
    const colorImage = useSelector(state => state.colorImage)
    const {legend} = colorImage

    // проверяет дни календаря, которых не существует, например 30 февраля или 31 апреля.
    const filterDays = (day, month) => {
        if (day > 0 && month > 0) {
            if ((day === 31 & (
                month === 2
                || month === 4
                || month === 6
                || month === 9
                || month === 11
            )) || (day === 30 && month === 2)) {
                return false
            } else return true
        } else return false

    }

    //устанавливает в определенный проверенный на валидность день выбранную легенду
    const setColor = (day, month) => {
        const resultOfCheck = filterDays(day, month)
        if (resultOfCheck && legend !== null) {
            if (legend.slice(0, 3) !== 'btn') {
                dispatch(addNewDay(day, month, legend, calendarID))
            } else {
                const dayToDelete = calendar.days.find(p => p.day === day && p.month === month)
                if (dayToDelete) {
                    dispatch(deleteDay(calendarID, dayToDelete._id))
                }
            }
        } else {
            dispatch(setAlert('Недопустимое дейтвие', 'danger'))
        }
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
                                     className={day === 0 || month === 0 ? 'colored' : 'not-colored'}
                                >
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