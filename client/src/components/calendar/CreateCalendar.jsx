import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button, Form} from 'react-bootstrap'
import AlertComponent from '../main/AlertComponent'
import {createNewCalendar} from '../../actions/rootCalendarActions'

const CreateCalendar = ({ history }) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [year, setYear] = useState(2021)
    const [legendType, setLegendType] = useState('цветная')
    const rootCalendar = useSelector(state => state.rootCalendar)
    const {success} = rootCalendar

    useEffect(() => {
        if (success){
            history.push('/dashboard')
        }
    }, [success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createNewCalendar(title, description, year, legendType))
    }

    return (
        <div className='py-5'>
            <h2 className='text-center'>Создай свой календарь</h2>
            <AlertComponent/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label><strong>Название календаря</strong></Form.Label>
                    <Form.Control
                        placeholder='название'
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Опиши, для чего этот календарь, что он отражает</strong></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='описание'
                        value={description}
                        onChange={({target}) => setDescription(target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Год</strong></Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='год'
                        value={year}
                        onChange={({target}) => setYear(target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Выбери тип легенды</Form.Label>
                    <Form.Control
                        as="select"
                        value={legendType}
                        onChange={({target}) => setLegendType(target.value)}
                    >
                        <option></option>
                        <option>цветная</option>
                        <option>с картинками</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button type='submit'>Создать календарь</Button>
                </Form.Group>

            </Form>
        </div>
    )
}

export default CreateCalendar