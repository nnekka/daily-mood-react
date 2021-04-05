import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button, Col, Form, Row} from 'react-bootstrap'
import AlertComponent from '../main/AlertComponent'
import Loader from '../main/Loader'
import {addNewColorLegend, deleteLegend} from '../../actions/rootCalendarActions'

const AddColorLegend = ({ history, loading, calendar, calendarId }) => {

    const dispatch = useDispatch()
    const [color, setColor] = useState('')
    const [text, setText] = useState('')

    const colors = ['', 'red', 'blue', 'green', 'black', 'yellow', 'pink']

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addNewColorLegend(color, text, calendarId))
    }

    const deleteLegendHandler = (legendId) => {
        dispatch(deleteLegend(calendarId, legendId))
    }

    return (
        <Row className='py-4'>
            <Col>
                <h2>Добавь легенду в свой календарь</h2>
                <AlertComponent/>
                <Form className='py-3' onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Цвет легенды </Form.Label>
                        <Form.Control
                            as="select"
                            className=" m-2 mr-sm-2 form-input"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            {colors.map((color, index) =>
                                <option key={index}>{color}</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            className=" m-2 mr-sm-2 form-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button className='m-2' type='submit'>Добавить дегенду</Button>
                        <Button onClick={() => history.push('/dashboard')}>Завершить</Button>
                    </Form.Group>
                </Form>

            </Col>
            <Col>
                <h3>Добавленные легенды</h3>

                {loading ? <Loader/> :
                    !calendar.legends
                        ? <p>No legends</p>
                        : calendar.legends.map(legend =>
                            <Row key={legend._id} >
                                <Col xs={1}>
                                    <div style={{width: '20px', height: '20px', backgroundColor: `${legend.color}`}}>
                                    </div>
                                </Col>
                                <Col xs={4}> {legend.text}</Col>
                                <Col xs={2}>
                                    <Button
                                        className='btn-sm'
                                        onClick={() => deleteLegendHandler(legend._id)}
                                    ><i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        )}

            </Col>
        </Row>
    )
}

export default AddColorLegend