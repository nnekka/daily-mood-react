import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import AlertComponent from '../main/AlertComponent'
import {register} from '../../actions/authActions'
import { setAlert } from '../../actions/alertActions'



const Register = ({ history }) => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const auth = useSelector(state => state.auth)
    const { user, success } = auth

    useEffect(() => {
        if (user.name){
            history.push('/dashboard')
        }
    }, [user, history, success])


    const submitHandler = (event) => {
        event.preventDefault()
        console.log(event.target)
        if (password !== password1){
            dispatch(setAlert('Пароли не совпадают', 'danger'))
        } else {
            dispatch(register(name, email, password, image))
        }
    }

    const uploadFile = async(event) => {
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
            const { data } = await axios.post('/api/upload', formData, config )
            setImage(data)
            setUploading(false)
        }
        catch (e) {
            console.error(e)
            setUploading(false)
        }
    }


    return (
        <Container>
            <Row className='justify-content-md-center py-4'>
                <Col xs={12} md={6}>
                    <h1 className='text-center'>Регистрация</h1>
                    <AlertComponent/>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name'
                                          placeholder='Enter name'
                                          value={name}
                                          onChange={({target}) => setName(target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email'
                                          placeholder='Enter email'
                                          value={email}
                                          onChange={({target}) => setEmail(target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password'
                                          placeholder='Enter password'
                                          value={password}
                                          onChange={({target}) => setPassword(target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password1'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password'
                                          placeholder='Confirm password'
                                          value={password1}
                                          onChange={({target}) => setPassword1(target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Choose avatar</Form.Label>
                            <Form.Control type='text'
                                          placeholder='avatar'
                                          value={image}
                                          onChange={({target}) => setImage(target.value)}
                                          >

                            </Form.Control>
                            <Form.File id='image-file'
                                       label='choose file'
                                       custom onChange={uploadFile}
                            ></Form.File>
                        </Form.Group>
                        <div className='text-center'>
                            <Button type='submit'>Зарегистрироваться</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register