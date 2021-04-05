import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, Col, Form, Image, Row} from 'react-bootstrap'
import AlertComponent from '../main/AlertComponent'
import axios from 'axios/index'
import Loader from '../main/Loader'
import {addNewImageLegend, deleteLegend} from '../../actions/rootCalendarActions'

const AddImageLegend = ({history, calendar, loading, id}) => {

    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [uploading, setUploading] = useState(false)

    // Получаю путь к файлу, загруженному на сервер
    const uploadFile = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        }
        catch (e) {
            console.error(e)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addNewImageLegend(text, image, id))
    }

    const deleteLegendHandler = (legendId) => {
        dispatch(deleteLegend(id, legendId))
    }

    return (
        <Row className='py-4'>
            <Col>
                <h2>Добавь легенду в свой календарь</h2>
                <AlertComponent/>
                <Form className='py-3' onSubmit={submitHandler}>
                    <Form.Group controlId='image'>
                        <Form.Label>Выбери картинку для легенды</Form.Label>
                        <Form.Control type='text'
                                      placeholder='image'
                                      value={image}
                                      onChange={({target}) => setImage(target.value)}
                        >

                        </Form.Control>
                        <Form.File id='image-file'
                                   label='choose file'
                                   custom onChange={uploadFile}
                        ></Form.File>
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
                            <Row key={legend._id}>
                                <Col xs={1}>
                                    <div id='image-cell'>
                                        <Image src={`http://localhost:3333/${legend.imageSrc}`} width='30px' height='30px'/>
                                    </div>
                                </Col>
                                <Col xs={4}>{legend.text}</Col>
                                <Col xs={2}>
                                    <Button
                                        className='btn-sm'
                                        onClick={() => deleteLegendHandler(legend._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        )}
            </Col>
        </Row>
    )
}

export default AddImageLegend