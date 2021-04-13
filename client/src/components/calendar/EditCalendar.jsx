import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCalendarByID, updateCalendar} from '../../actions/rootCalendarActions'
import Loader from '../main/Loader'
import {Button, Form} from 'react-bootstrap'
import {constants} from '../../constants'
import AlertComponent from '../main/AlertComponent'

const EditCalendar = ({match}) => {

    const calendarID = match.params.id
    const dispatch = useDispatch()
    const rootCalendar = useSelector(state => state.rootCalendar)
    const {loading, calendar, error, success} = rootCalendar
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [year, setYear] = useState('')

    useEffect(() => {
        if (success){
            dispatch({ type: constants.RESET })
        } else {
            dispatch(getCalendarByID(calendarID))
        }

    }, [dispatch, success])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateCalendar(title, description, year, calendarID))
    }

    return (
        <>
            {loading || !calendar.title ? <Loader/> :
                <>
                    <AlertComponent/>
                    <h3 className='py-4'>Change your calendar data</h3>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                value={title}
                                onChange={({target}) => setTitle(target.value)}
                                placeholder={calendar.title}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                type='text'
                                value={description}
                                onChange={({target}) => setDescription(target.value)}
                                placeholder={calendar.description}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type='number'
                                value={year}
                                onChange={({target}) => setYear(target.value)}
                                placeholder={calendar.year}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit'>
                                EDIT
                            </Button>
                        </Form.Group>
                    </Form>
                </>
            }

        </>
    )
}

export default EditCalendar