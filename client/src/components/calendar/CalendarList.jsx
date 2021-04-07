import React from 'react'
import {useDispatch} from 'react-redux'
import {Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {deleteCalendarById} from '../../actions/rootCalendarActions'

const CalendarList = ({calendars, history}) => {

    const dispatch = useDispatch()

    const deleteHandler = (id) => {
        if (window.confirm('Ты точно хочешь удалить календарь?')){
            dispatch(deleteCalendarById(id))
        }
    }

    return (
        <>
            <h1>Мои календари</h1>
            <Table responsive bordered className='table-sm'>
                <thead>
                <tr>
                    <th className='text-center'>
                        Название календаря
                    </th>
                    <th className='text-center'>
                        Описание
                    </th>
                    <th className='text-center'>
                        Год
                    </th>
                    <th className='text-center'>
                        Статистика
                    </th>
                    <th>
                        Тип легенды
                    </th>
                    <th>
                    </th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                {calendars.map(calendar =>
                    <tr key={calendar._id}>
                        <td width='20%' className='text-left'>
                            <Link to={calendar.legends.length === 0
                                ? `/calendar/${calendar._id}/add-legends`
                                : `/calendar/${calendar._id}`}> {calendar.title}
                            </Link>
                        </td>
                        <td width='25%' className='text-left' title={`${calendar.description}`}>
                            {calendar.description.length < 30
                                ? calendar.description
                                : calendar.description.slice(0, 30) + '...'}
                        </td>
                        <td width='10%' className='text-center'>
                            {calendar.year}
                        </td>
                        <td>
                            <Button
                                className='btn-light'
                                onClick={() => history.push(`/calendar/${calendar._id}/statistics`)}
                                disabled={calendar.days.length < 2}
                            >
                                <i className='fas fa-eye'></i>
                            </Button>
                        </td>
                        <td>{calendar.legendType}</td>
                        <td>
                            <Button
                                className='btn-light'
                                onClick={() => history.push(`/calendar/${calendar._id}/add-legends`)}>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </td>
                        <td width='10%' className='text-center'>
                            <Button
                                className='btn-light'
                                onClick={() => deleteHandler(calendar._id)}
                            >
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>

                    </tr>
                )}

                </tbody>
            </Table>
        </>
    )
}

export default CalendarList